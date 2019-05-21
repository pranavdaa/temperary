import React, { Component, Fragment } from 'react'

//Assets
import back from '../../../assets/signy/images/left-arrow@2x.png'
import upload from '../../../assets/signy/images/arrows@2x.png'

//Actions
import bdocCreator from '../../../redux/bdoc/create/actions'
import bdocReader from '../../../redux/bdoc/read/actions'

//Antd
import { Upload, message } from 'antd'
const Dragger = Upload.Dragger

import { connect } from 'react-redux'

class Index extends Component {
    render() {
        var fileList = []
        const { filesToBdoc, readBdoc } = this.props
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

const mapStateToProps = state => ({
    bdocList: state.bdocCreator,
    bdocFiles: state.bdocReader
})

const mapDispatchToProps = dispatch => ({
    filesToBdoc: payload => dispatch(bdocCreator.filesToBdoc(payload)),
    readBdoc: payload => dispatch(bdocReader.readBdoc(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)