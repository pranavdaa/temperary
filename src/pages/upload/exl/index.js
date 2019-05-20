import React from 'react'
import { Card, Form , Icon,Upload,Row, Col ,Button } from 'antd';

class Upexl extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
      <Row type="flex" justify="center">
      <Col span={12}>
      
        <Form>
             <Form.Item label="">
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Upload the downloaded Exel Sheet <br /> with the details provided in the sheet</p>
              </Upload.Dragger>,
            )}
          </div>
        </Form.Item>
        <Row type="flex" justify="end">
      <Col span={4}>   
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item></Col>
    </Row>


     
        
    </Form>
    </Col>
    </Row>
    </Card>
    )
  }
}

const UploadExl = Form.create({ name: 'validate_other' })(Upexl);

export default UploadExl
