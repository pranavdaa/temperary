import React, { Component, Fragment } from 'react'

//Antd
import { Upload, message, Card, Row, Col } from 'antd'

//Assets

import upload from '../../../assets/signy/images/arrows@2x.png'
class Index extends Component {
  render() {
    var fileList = []
    console.log(this.props.data)
    const { readBdoc } = this.props.data
    const props = {
      /* onRemove: file => {
                console.log("REMOVED: ", fileList)
            }, */
      beforeUpload: file => {
        readBdoc(file)
      },
      fileList,
    }

    return (
      <Row type="flex" justify="center">
        <Col xs={24} md={20} lg={12} xl={10}>
          <Card>
            <Fragment>
              <center>
                <h1>Preview</h1>
                <p>Verify your Bdoc</p>
                <Upload.Dragger
                  className="py-2"
                  {...props}
                  style={{ cursor: 'pointer', backgroundColor: '#e4e9f0' }}
                >
                  <p className="ant-upload-drag-icon">
                    <img src={upload} className="pt-2" />
                  </p>
                  <br />
                  <h4>Click or drag file to this area to upload</h4>
                  <p className="ant-upload-hint py-2">Please upload one Bdoc at a time</p>
                </Upload.Dragger>
              </center>
            </Fragment>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Index
