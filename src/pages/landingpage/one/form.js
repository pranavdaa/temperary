import React from 'react'
import { Form, Select, Button, Upload, Icon, Input } from 'antd'
import * as assetActions from '../../../redux/assets/actions'
import { setTemplate } from 'redux/template/actions'
import { connect } from 'react-redux'
import feedActions from '../../../redux/activityFeed/actions'

class Index extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
    uploadList: {
      name: undefined,
      orgLogo: undefined,
      orgStamp: undefined,
      background: undefined,
      authoritySig: undefined,
    },
  }

  onFileSelect = (file, fileList) => {
    //console.log(file)
    return false
  }

  onNamechange = e => {
    let uploadList = { ...this.state.uploadList }
    uploadList['name'] = e.target.value
    this.setState({ uploadList })
  }

  handleChange = ({ file }, imgType) => {
    let uploadList = { ...this.state.uploadList }
    uploadList[imgType] = file
    this.setState({ uploadList })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let uploadList = this.state.uploadList

        this.props.addAsset('default', uploadList)

        this.props.setTemplate(uploadList)
        this.props.next()
      }
    })
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  render() {
    const { uploadList } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    }
    return (
      <Form id="tempForm" {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: 'Please input your Name!' }],
          })(<Input onChange={this.onNamechange} />)}
        </Form.Item>

        <Form.Item label="Org Logo">
          {getFieldDecorator('orglogo', {
            valuePropName: 'fileList1',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please Select Organization Logo!' }],
          })(
            <Upload
              name="logo1"
              listType="picture"
              beforeUpload={this.onFileSelect}
              showUploadList={{ showPreviewIcon: false }}
              fileList={uploadList.orgLogo && [uploadList.orgLogo]}
              onPreview={false}
              onChange={e => this.handleChange(e, 'orgLogo')}
            >
              <Button>
                <Icon type="orglogo" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="Authority Signature">
          {getFieldDecorator('authsig', {
            valuePropName: 'fileList2',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please Select Authority Signature!' }],
          })(
            <Upload
              name="logo2"
              listType="picture"
              beforeUpload={this.onFileSelect}
              showUploadList={{ showPreviewIcon: false }}
              fileList={uploadList.authoritySig && [uploadList.authoritySig]}
              onPreview={false}
              onChange={e => this.handleChange(e, 'authoritySig')}
            >
              <Button>
                <Icon type="authsig" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="Org Stamp">
          {getFieldDecorator('orgstamp', {
            valuePropName: 'fileList3',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please Select Organization Stamp!' }],
          })(
            <Upload
              name="logo3"
              listType="picture"
              beforeUpload={this.onFileSelect}
              showUploadList={{ showPreviewIcon: false }}
              fileList={uploadList.orgStamp && [uploadList.orgStamp]}
              onPreview={false}
              onChange={e => this.handleChange(e, 'orgStamp')}
            >
              <Button>
                <Icon type="orgstamp" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="Certificate Backgroug Image">
          {getFieldDecorator('cert', {
            valuePropName: 'fileList4',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please Select Certificate Background!' }],
          })(
            <Upload
              name="logo4"
              listType="picture"
              beforeUpload={this.onFileSelect}
              showUploadList={{ showPreviewIcon: false }}
              fileList={uploadList.background && [uploadList.background]}
              onPreview={false}
              onChange={e => this.handleChange(e, 'background')}
            >
              <Button>
                <Icon type="cert" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>

        {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button key="submit" htmlType="submit" type="primary" loading={loading}>
            Upload
          </Button>
        </Form.Item> */}
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.activityFeed,
  assets: { ...state.assets },
})

const mapDispatchToProps = dispatch => ({
  addAsset: (assetType, assetPaths) => dispatch(assetActions.addAsset(assetType, assetPaths)),
  setTemplate: template => dispatch(setTemplate(template)),
})
const UploadFrom = Form.create({ name: 'validate_other' })(Index)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadFrom)
