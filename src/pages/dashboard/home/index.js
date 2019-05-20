import React from 'react'
import { Table, Row, Col, Card, Modal, Button, Upload, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { tableData } from './data.json'
import ProfileHeadCard from 'components/CleanUIComponents/ProfileHeadCard'
import styles from './style.module.scss'
import { runInThisContext } from 'vm'
import { connect } from 'react-redux'
import * as actions from '../../../redux/assets/actions'

@connect(
  ({ assets }) => ({ assets }),
  actions,
)
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
    //console.log(imageData)
    this.props.updateAsset('default', imageData)
  }

  handleCancel = () => {
    this.setState({ modalVisible: false })
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  render() {
    //console.log(this.props)
    //console.log(this.state)
    const { modalVisible, loading, fileList } = this.state
    const tableColumns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
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
                  <a href="/">
                    {' '}
                    <strong>Generated New Certificate</strong>{' '}
                  </a>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={12}>
            <Card title={'Recently Activities'}>
              <Table pagination={false} columns={tableColumns} dataSource={tableData} />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col md={8}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Organisation Logo</span>
                  <span onClick={e => this.showModal('orgLogo')}> Edit</span>
                </div>
              }
            >
              <ProfileHeadCard />
            </Card>
          </Col>

          <Col md={8}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Organisation Stamp</span>
                  <span onClick={e => this.showModal('orgStamp')}> Edit</span>
                </div>
              }
            >
              <ProfileHeadCard />
            </Card>
          </Col>
          <Col md={8}>
            <Card
              title={
                <div className={styles.img_card_title}>
                  <span>Authority Signature</span>
                  <span onClick={e => this.showModal('authSign')}> Edit</span>
                </div>
              }
            >
              <ProfileHeadCard />
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

export default DashboardAlpha
