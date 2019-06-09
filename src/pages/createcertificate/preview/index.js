import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Previewer from '../component/previewer'
import AceEditor from 'react-ace'
import { connect } from 'react-redux'
import { setTemplate } from '../../../redux/createtemplate/actions'
import { loadImage } from 'utils/helpers/'

@connect(
  ({ templates }) => ({ templates }),
  { setTemplate },
)
class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)

    return (
      <Row type="flex" justify={'center'}>
        <Col md={12}>
          <Previewer docJson={this.props.templates.template} images={this.props.img} />
        </Col>
      </Row>
    )
  }
}

export default Index
