import React from 'react'
import { Card, Icon, Upload, Row, Col, Button } from 'antd'
// import {withRouter} from "react-router-dom"
//Redux
import { connect } from 'react-redux'
import { parseExcelToJson } from '../../../redux/certificates/actions'

class UploadExcel extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state

    const formData = new FormData()

    fileList.forEach(file => {
      formData.append(`excel`, file)
    })

    this.props.parseExcelToJson(formData)

    this.setState({
      uploading: true,
    })
  }

  render() {
    var { fileList, uploading } = this.state
    var { pendingCertificates } = this.props

    //TODO: FIX the error in the logs
    if (pendingCertificates.length > 0) {
      this.props.history.push('/studentcert', this.props)
    }

    let uploadProps = {
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }))
        return false
      },
      onRemove: file => {
        this.setState(state => ({
          fileList: state.fileList.filter(_file => _file.name != file.name),
        }))
      },
      fileList,
    }

    return (
      <Card>
        <h3 className="text-center mb-5">Upload Excel Sheet</h3>

        <Row type="flex" justify="center">
          <Col span={12}>
            <center>
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-hint">
                  Upload the downloaded sheet with the details provided in the Sheet
                </p>
              </Upload.Dragger>
              <br />
              <br />
              <Button type="primary" onClick={this.handleUpload}>
                Next
              </Button>
            </center>
          </Col>
        </Row>
      </Card>
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
