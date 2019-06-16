import React from 'react'
import { Form, Select, Button, Upload, Icon, Input, AutoComplete } from 'antd'
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

  yearOption = () => {
    let options = []
    var dt = new Date()
    var Year = dt.getFullYear()
    var i
    console.log(Year)
    for (i = Year - 10; i < Year + 10; i++) {
      options.push(<Option value={i}>{i}</Option>)
    }
    return options
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
              defaultValue={this.yearOption()[0].props.value}
              // defaultValue={this.yearCurrent()}
              placeholder="Select Year"
              // onChange={this.handleSelectChange}
            >
              {console.log('teri marzi', this.yearOption()[0].props.value)}
              {this.yearOption()}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Course Name:">
          {getFieldDecorator('pcn', {
            rules: [{ required: true, message: 'Please enter Course Name!' }],
          })(
            <AutoComplete placeholder="Blockchain101">
              <Input />
            </AutoComplete>,
          )}
        </Form.Item>
        <Form.Item label="Batch Info:">
          {getFieldDecorator('pbi', {
            rules: [{ required: true, message: 'Please enter Batch info!' }],
          })(
            <AutoComplete placeholder="Batch-1">
              <Input />
            </AutoComplete>,
          )}
        </Form.Item>
      </Form>
    )
  }
}

const UploadFrom = Form.create({ name: 'validate_other' })(Index)
export default UploadFrom
