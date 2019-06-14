import React from 'react'
import { Steps, Button, message } from 'antd'
import styles from './index.module.scss'
import FormUpload from './one/form.js'
import { Card } from 'antd'
import Editor from './editor'
import Preview from './preview/index'
import { connect } from 'react-redux'
import setingTemplate from '../../redux/certificateIdPass/actions'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
const Step = Steps.Step

class Download extends React.Component {
  getcolumns = () => {
    return this.props.info.map(impinfo => {
      return <ExcelColumn label={impinfo} value={impinfo} />
    })
  }
  render() {
    console.log('ek balti pani', this.props.info)

    return (
      <ExcelFile
        element={
          <button
            onClick={e => {
              this.props.history.push('/upload/exl')
            }}
            type="button"
            class="btn btn-primary"
          >
            Next
          </button>
        }
      >
        <ExcelSheet data={[]} name="Sheet1">
          {this.getcolumns()}
          <ExcelColumn label="Email" value="email" />
        </ExcelSheet>
      </ExcelFile>
    )
  }
}
class LandOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
    console.log('VAibhav', this.props.temp.certificateData.template)
    props.setingTemplate(this.props.temp.certificateData.template)
  }
  next = () => {
    const current = this.state.current + 1
    this.setState({ current })
  }
  onNextPress = () => {
    if (this.state.current == 1) this.next()
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  componentWillMount() {
    console.log('Component has mounted')
  }

  getColumns = () => {
    var columes = []
    if (this.props.temp.templates.template) {
      this.props.temp.templates.template.components.forEach(function(value) {
        if (value.text) {
          var re = /{(.*?)}/g
          var s = value.text
          var m

          do {
            m = re.exec(s)
            if (m) {
              columes.push(m[0].replace('{', '').replace('}', ''))
            }
          } while (m)
        }
      })
    }
    return columes
  }
  render() {
    // console.log(
    //   'On the Way',
    //   this.props.temp.templates.template.components.map(function(value) {
    //     return value
    //   }),
    // )

    console.log('mehnat', this.getColumns())
    const steps = [
      {
        title: 'First',

        content: (
          <div>
            <FormUpload next={this.next} />
          </div>
        ),
      },
      {
        title: 'Second',
        content: (
          <div>
            <Editor img={{ ...this.props.temp.certificateData.template }} />
          </div>
        ),
      },
      {
        title: 'Third',
        content: (
          <div>
            {console.log('Templatesssssss', this.props.temp.certificateData.template)}
            <Preview img={{ ...this.props.temp.certificateData.template }} />
          </div>
        ),
      },
    ]

    let nextButtonProps =
      this.state.current == 0 ? { form: 'tempForm', key: 'submit', htmlType: 'submit' } : {}

    const { current } = this.state

    return (
      <Card>
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div>
            {current == 0 ? (
              <h3 className="text-center my-5">Enter Certificate Info</h3>
            ) : current == 1 ? (
              <h3 className="text-center my-5">Edit Selected Certificate</h3>
            ) : (
              <h3 className="text-center my-5">Preview Selected Certificate</h3>
            )}
          </div>
          <div className={styles.stepscontent}>{steps[current].content}</div>
          <div className={styles.stepsaction}>
            {current > 0 && (
              <Button className="mr-2" onClick={() => this.prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              //   <Button type="primary" onClick={() => this.onNextPress()}>
              //     Next
              // </Button>
              <Button type="primary" {...nextButtonProps} onClick={this.onNextPress}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              // <Button type="primary">
              <Download history={this.props.history} info={this.getColumns()} />
              // </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  temp: state,
})
const mapDispatchToProps = dispatch => ({
  setingTemplate: payload => dispatch(setingTemplate(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandOne)
