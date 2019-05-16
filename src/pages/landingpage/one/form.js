import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
  } from 'antd';
  
  const { Option } = Select;
  
  class Demo extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
  
          <Form.Item label="Org Logo" >
            {getFieldDecorator('orglogo', {
              valuePropName: 'fileList1',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo1"  listType="picture">
                <Button>
                  <Icon type="orglogo" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="Authority Signature" >
            {getFieldDecorator('authsig', {
              valuePropName: 'fileList2',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo2"  listType="picture">
                <Button>
                  <Icon type="authsig" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="Org Stamp" >
            {getFieldDecorator('orgstamp', {
              valuePropName: 'fileList3',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo3"  listType="picture">
                <Button>
                  <Icon type="orgstamp" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="Certificate Backgroug Image" >
            {getFieldDecorator('cert', {
              valuePropName: 'fileList4',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo4"  listType="picture">
                <Button>
                  <Icon type="cert" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
        
          {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      );
    }
  }
  
  const UploadFrom = Form.create({ name: 'validate_other' })(Demo);
  
  export default UploadFrom