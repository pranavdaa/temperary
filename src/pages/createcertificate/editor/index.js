import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Previewer from '../component/previewer'
import AceEditor from 'react-ace'
import { connect } from 'react-redux'
import { setTemplate } from '../../../redux/createtemplate/actions'
import { loadImage } from 'utils/helpers/'
import 'brace/mode/json'
import 'brace/theme/monokai'

@connect(
  ({ templates }) => ({ templates }),
  { setTemplate },
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.pageComponents = {
      page: {
        height: '100%',
        width: '100%',
      },
      components: [
        {
          type: 'img',
          src: '{background}',
          style: {
            width: '100%',
            height: '100%',
          },
        },
        {
          type: 'text',
          text: '{First Name}',
          style: {
            fontWeight: 700,
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            top: '25%',
          },
        },
        {
          type: 'text',
          text: '{year}',
          style: {
            fontWeight: 700,
            left: '38.5%',
            width: '100%',
            height: 'auto',
            top: '58.2%',
          },
        },
        {
          type: 'img',
          src: '{orgStamp}',
          style: {
            width: '180px',
            height: '180px',
            top: '70%',
            left: '60%',
          },
        },
        {
          type: 'img',
          src: '{authoritySig}',
          style: {
            height: '50px',
            top: '70%',
            left: '40%',
          },
        },
        {
          type: 'text',
          text: '({Eng})',
          style: {
            height: '180px',
            top: '38%',
            left: '80%',
            fontWeight: 700,
          },
        },
        {
          type: 'text',
          text: '({Math})',
          style: {
            height: '180px',
            fontWeight: 700,
            top: '41%',
            left: '67%',
          },
        },
      ],
    }
    this.state = {
      pageComponents: this.pageComponents,
    }
    this.props.setTemplate({ template: this.pageComponents })
  }

  render() {
    console.log('tor bsbbsbsbs', this.props.img)
    console.log(this.state)
    let editorValue = this.state.pageComponents
    let pageComponents = this.state.pageComponents
    try {
      editorValue = JSON.stringify(editorValue, null, '\t')
    } catch (e) {}
    return (
      <Row type="flex" gutter={16}>
        <Col md={12}>
          <div>
            <AceEditor
              placeholder="Placeholder Text"
              mode="json"
              theme="monokai"
              name="blah2"
              height="700px"
              width="100%"
              minLines={40}
              onLoad={this.onLoad}
              onChange={value => {
                try {
                  let jsonDoc = JSON.parse(value)
                  this.setState({ ...this.state, pageComponents: jsonDoc })
                  this.props.setTemplate({ template: jsonDoc })
                } catch (error) {}
              }}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={editorValue}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        </Col>
        <Col md={12}>
          <Previewer docJson={pageComponents} images={this.props.img} />
        </Col>
      </Row>
    )
  }
}

export default Index
