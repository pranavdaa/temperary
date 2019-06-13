import React, { Component, Fragment } from 'react'
import UploadPage from './upload'
import LoaderPage from './view'

//Actions
import bdocReader from '../../redux/bdoc/read/actions'
import { connect } from 'react-redux'

class Index extends Component {
  render() {
    const { bdocFiles, readBdoc } = this.props
    let CurrentPage
    console.log('shhhhhhhh', bdocFiles)
    if (!Object.keys(bdocFiles).length) {
      CurrentPage = UploadPage
    } else {
      CurrentPage = LoaderPage
    }

    return <CurrentPage data={this.props} />
  }
}

const mapStateToProps = state => ({
  bdocFiles: state.bdocReader,
})

const mapDispatchToProps = dispatch => ({
  readBdoc: payload => dispatch(bdocReader.readBdoc(payload)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index)
