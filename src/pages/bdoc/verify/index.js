import React, { Component, Fragment } from 'react'
import UploadPage from './upload'
import LoaderPage from './loader'

//Actions
import bdocReader from '../../../redux/bdoc/read/actions'

import { connect } from 'react-redux'

class Index extends Component {
  render() {
    console.log('early bird', this.props)
    const { filesToBdoc, readBdoc, bdocFiles, completeReading } = this.props
    let CurrentPage

    if (!Object.keys(bdocFiles).length) {
      CurrentPage = UploadPage
    } else {
      CurrentPage = LoaderPage
      if (bdocFiles.isReading)
        setTimeout(() => {
          completeReading()
        }, 3000)
    }

    console.log('test', this.props, CurrentPage)
    return <CurrentPage data={this.props} />
  }
}

const mapStateToProps = state => ({
  bdocList: state.bdocCreator,
  bdocFiles: state.bdocReader,
})

const mapDispatchToProps = dispatch => ({
  filesToBdoc: payload => dispatch(bdocCreator.filesToBdoc(payload)),
  readBdoc: payload => dispatch(bdocReader.readBdoc(payload)),
  completeReading: payload => dispatch(bdocReader.completeReading),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index)
