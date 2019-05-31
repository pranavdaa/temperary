import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Previewer from '../component/previewer'
import AceEditor from 'react-ace'
import { connect } from 'react-redux'
import { setTemplate } from 'redux/template/actions'
import { loadImage } from 'utils/helpers/'

@connect(
  ({ templates }) => ({ templates }),
  { setTemplate },
)
class Index extends Component {
  constructor(props) {
    super(props)

    this.fetchImage()
    this.state = {}
  }

  fetchImage = async () => {
    this.setState({
      pageComponents: this.props.templates.template,
      images: {
        orgLogo: await loadImage(this.props.templates.orgLogo),
        authoritySig: await loadImage(this.props.templates.authoritySig),
        orgStamp: await loadImage(this.props.templates.orgStamp),
        background: await loadImage(this.props.templates.background),
      },
    })
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    let editorValue = this.state.pageComponents
    let pageComponents = this.state.pageComponents
    try {
      editorValue = JSON.stringify(editorValue, null, '\t')
    } catch (e) {}
    return (
      <Row type="flex" justify={'center'}>
        <Col md={12}>
          {this.state.pageComponents && (
            <Previewer docJson={pageComponents} images={this.state.images} />
          )}
        </Col>
      </Row>
    )
  }
}

export default Index
