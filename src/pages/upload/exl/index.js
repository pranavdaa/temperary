import React from 'react'
import { Card, Icon, Upload, Row, Col, Button, message } from 'antd'
// import {withRouter} from "react-router-dom"
//Redux
import { connect } from 'react-redux'
import { parseExcelToJson } from '../../../redux/certificates/actions'
class UploadExcel extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  // handleUpload = () => {
  //   const { fileList } = this.state
  //   if (fileList.length == 0) {
  //     message.error(`You have not uploaded the file`)
  //   } else {
  //     const formData = new FormData()

  //     fileList.forEach(file => {
  //       formData.append(`excel`, file)
  //     })
  //     this.props.parseExcelToJson(formData)

  //     this.setState({
  //       uploading: true,
  //     })
  //   }
  // }

  handleUpload = () => {
    const { fileList } = this.state
    console.log(fileList)
    const formData = new FormData()
    if (fileList.length == 0) {
      message.error(`You have not uploaded the file`)
    } else {
      fileList.forEach(file => {
        formData.append(`excel`, file)
      })

      this.props.parseExcelToJson(formData)

      this.setState({
        uploading: true,
      })
    }
  }
  render() {
    var { fileList, uploading } = this.state
    var { pendingCertificates } = this.props
    console.log('Wpopopopo', pendingCertificates.length)

    //TODO: FIX the error in the logs
    if (pendingCertificates.length > 0) {
      this.props.history.push('/studentcert', this.props)
    }

    let uploadProps = {
      beforeUpload: file => {
        return false
      },
      onChange: ({ file }) => {
        this.setState(state => ({
          fileList: [file],
        }))
      },
      onRemove: () => {
        this.setState(state => ({
          fileList: [],
        }))
      },

      fileList,
    }

    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={24} md={20} lg={12} xl={10}>
            <Card>
              <h3 className="text-center mb-5">Upload Excel Sheet</h3>
              <center>
                <Upload.Dragger {...uploadProps}>
                  {console.log('GOT', uploadProps)}
                  <p className="ant-upload-drag-icon">
                    <Icon type="upload" />
                  </p>
                  <p className="ant-upload-hint">
                    Upload the Downloaded Excel Sheet with the details provided in the sheet
                  </p>
                </Upload.Dragger>
                <br />
                <br />
              </center>
            </Card>
          </Col>
        </Row>
        <center>
          <Button type="primary" onClick={this.handleUpload}>
            Next
          </Button>
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pendingCertificates: state.certificates.pending,
})

const mapDispatchToProps = dispatch => ({
  parseExcelToJson: payload => dispatch(parseExcelToJson(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadExcel)
