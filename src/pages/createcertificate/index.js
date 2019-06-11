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
            Download Data
          </button>
        }
      >
        <ExcelSheet data={[]} name="Employees">
          {this.getcolumns()}
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
    console.log('VAibhav', props.location.state)
    props.setingTemplate(props.location.state.template)
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
            <Editor img={this.props.location.state.template} />
          </div>
        ),
      },
      {
        title: 'Last',
        content: (
          <div>
            <Preview img={this.props.location.state.template} />
          </div>
        ),
      },
    ]

    let nextButtonProps =
      this.state.current == 0 ? { form: 'tempForm', key: 'submit', htmlType: 'submit' } : {}

    const { current } = this.state

    return (
      <Card>
        <h3 className="text-center mb-5">Edit and Preview Selected Certificate</h3>
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
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
