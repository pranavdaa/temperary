import React from 'react'
import { Table, Row, Col, Card, Modal, Button, Upload, Icon, Empty } from 'antd'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import ProfileHeadCard from 'components/CleanUIComponents/ProfileHeadCard'
import { NavLink } from 'react-router-dom'
import styles from './style.module.scss'
import { connect } from 'react-redux'
import * as assetActions from '../../../redux/assets/actions'
import feedActions from '../../../redux/activityFeed/actions'

class DashboardAlpha extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
    uploadFor: undefined,
    fileList: [],
  }
  showModal = uploadFor => {
    this.setState({
      modalVisible: true,
      uploadFor,
    })
  }

  onFileSelect = (file, fileList) => {
    //console.log(file)
    return false
  }

  uploadImage = () => {
    let imageData = {}
    imageData[this.state.uploadFor] = this.state.fileList[0]
    console.log('yahoooooooooooo', imageData)
    this.props.updateAsset('default', imageData)
  }

  handleCancel = () => {
    this.setState({ modalVisible: false })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentWillMount() {
    const { getActivityFeed, getDefaultAssets } = this.props
    getActivityFeed()

    if (!Object.keys(this.props.assets.default).length) {
      getDefaultAssets('default')
    }
  }

  render() {
    const { modalVisible, loading, fileList } = this.state
    const { feed, assets } = this.props

    const tableColumns = [
      {
        title: 'Action',
        key: 'activity',
        dataIndex: 'activity',
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
    ]
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <Authorize roles={['admin']} redirect to="/">
        <Helmet title="Dashboard Alpha" />
        <Row type="flex" gutter={12}>
          <Col lg={12}>
            <Card className={styles.full_card}>
              <div className="utils__title">
                <div className={'text-center'}>
                  <i className="lnr lnr-plus-circle" />
                  <NavLink to="/template/create">
                    {' '}
                    <strong>Generated New Certificate</strong>{' '}
                  </NavLink>
                </div>
              </div>
            </Card>
          </Col>
          {/* TODO [Parmesh]: Make the activity Feed scrollable */}
          <Col lg={12}>
            <Card title={'Recently Activities'}>
              <Table pagination={false} columns={tableColumns} dataSource={feed} />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col md={6}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Organisation Logo</span>
                  <span onClick={e => this.showModal('orgLogo')}> Edit</span>
                </div>
              }
            >
              {assets.default.orgLogoPath ? (
                <ProfileHeadCard
                  backgroundImage={`${window.SITE_CONFIG.API_URL}/${assets.default.orgLogoPath}`}
                />
              ) : (
                <Empty />
              )}
            </Card>
          </Col>

          <Col md={6}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Organisation Stamp</span>
                  <span onClick={e => this.showModal('orgStamp')}> Edit</span>
                </div>
              }
            >
              {assets.default.orgStampPath ? (
                <ProfileHeadCard
                  backgroundImage={`${window.SITE_CONFIG.API_URL}/${assets.default.orgStampPath}`}
                />
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Authority Signature</span>
                  <span onClick={e => this.showModal('authoritySig')}> Edit</span>
                </div>
              }
            >
              {assets.default.authoritySigPath ? (
                <ProfileHeadCard
                  backgroundImage={`${window.SITE_CONFIG.API_URL}/${
                    assets.default.authoritySigPath
                  }`}
                />
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Background</span>
                  <span onClick={e => this.showModal('background')}> Edit</span>
                </div>
              }
            >
              {assets.default.backgroundPath ? (
                <ProfileHeadCard
                  backgroundImage={`${window.SITE_CONFIG.API_URL}/${assets.default.backgroundPath}`}
                />
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
        </Row>
        <Modal
          visible={modalVisible}
          title="Title"
          onOk={this.uploadImage}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.uploadImage}>
              Upload
            </Button>,
          ]}
        >
          <div className={`${styles.uploadWrapper} clearfix`}>
            <Upload
              listType="picture-card"
              beforeUpload={this.onFileSelect}
              className={styles.avatar_uploader}
              showUploadList={{ showPreviewIcon: false }}
              fileList={fileList}
              onPreview={false}
              onChange={this.handleChange}
            >
              {fileList.length ? null : uploadButton}
            </Upload>
          </div>
        </Modal>
      </Authorize>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.activityFeed,
  assets: { ...state.assets },
})

const mapDispatchToProps = dispatch => ({
  getActivityFeed: () => dispatch(feedActions()),
  updateAsset: (assetType, assetPaths) => dispatch(assetActions.updateAsset(assetType, assetPaths)),
  getDefaultAssets: payload => dispatch(assetActions.fetchDefaultAssets(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardAlpha)
