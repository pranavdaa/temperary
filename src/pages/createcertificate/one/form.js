import React from 'react'
import { Form, Select, Button, Upload, Icon, Input } from 'antd'
import * as assetActions from '../../../redux/assets/actions'
import { setTemplate } from 'redux/template/actions'
import { connect } from 'react-redux'

class Index extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    console.log('Submited')
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.next()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form
        id="tempForm"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="Select Year:">
          {getFieldDecorator('year', {
            rules: [{ required: true, message: 'Please select the Year!' }],
          })(
            <Select
              placeholder="Select Year"
              // onChange={this.handleSelectChange}
            >
              <Option value="20019">2019</Option>
              <Option value="2020">2020</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Course Name:">
          {getFieldDecorator('pcn', {
            rules: [{ required: true, message: 'Please enter Course Name!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Batch Info:">
          {getFieldDecorator('pbi', {
            rules: [{ required: true, message: 'Please enter Batch info!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}

const UploadFrom = Form.create({ name: 'validate_other' })(Index)
export default UploadFrom
