import React, { Component, Fragment } from 'react'
import UploadPage from './upload'
import LoaderPage from './loader'
import ResultPage from './result'

//Actions
import bdocReader from '../../../redux/bdoc/read/actions'

import { connect } from 'react-redux'

class Index extends Component {
    render() {
        const { filesToBdoc, readBdoc, bdocFiles, completeReading } = this.props
        let CurrentPage

        if(!Object.keys(bdocFiles).length) {
            CurrentPage = UploadPage
        }
        else if(bdocFiles.isReading) {
            CurrentPage = LoaderPage
            setTimeout(() => {
                completeReading()
            }, 3000)
        }
        else {
            CurrentPage = ResultPage
        }
        return (
            <CurrentPage data={this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    bdocList: state.bdocCreator,
    bdocFiles: state.bdocReader
})

const mapDispatchToProps = dispatch => ({
    filesToBdoc: payload => dispatch(bdocCreator.filesToBdoc(payload)),
    readBdoc: payload => dispatch(bdocReader.readBdoc(payload)),
    completeReading: payload => dispatch(bdocReader.completeReading)
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)