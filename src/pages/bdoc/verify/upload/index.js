import React, { Component, Fragment } from 'react'

//Antd
import { Upload, message } from 'antd'

//Assets
import back from '../../../../assets/signy/images/left-arrow@2x.png'
import upload from '../../../../assets/signy/images/arrows@2x.png'


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
        <Fragment>
            <img src={back} />
            <center>
                <h1>For Verification</h1>
                <p>
                    Verify your Bdoc without sign-in
                </p>

                <br/><br/>
                <Upload {...props} style={{ cursor: 'pointer', backgroundColor: '#e4e9f0'}}>
                    <p className="ant-upload-drag-icon">
                        <img src={upload} />
                    </p>
                    <br/>
                    <h4>Click or drag file to this area to upload</h4>
                    <p className="ant-upload-hint">
                        Please upload one Bdoc at a time
                    </p>
                </Upload>
            </center>
        </Fragment>
        )
    }
}

export default Index