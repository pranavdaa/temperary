import React from 'react'
import { Steps, Button, message } from 'antd'
import styles from './index.module.scss'
import FormUpload from './one/form.js'
import { Card } from 'antd'
import Editor from './editor'
import Preview from './preview/index'
import ReactExport from 'react-data-export'
const Step = Steps.Step

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

class Download extends React.Component {
  render() {
    return (
      <ExcelFile element={<button>Download Data</button>}>
        <ExcelSheet name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
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

<<<<<<< HEAD
  componentWillMount() {
    console.log('Component has mounted')
  }
=======
  // download = () => {
  //   return (
  //     <ExcelFile element={<button>Download Data</button>}>
  //       <ExcelSheet name="Employees">
  //         <ExcelColumn label="Name" value="name" />
  //         <ExcelColumn label="Wallet Money" value="amount" />
  //         <ExcelColumn label="Gender" value="sex" />
  //       </ExcelSheet>
  //     </ExcelFile>
  //   )
  // }
>>>>>>> 10a24c272e86ad6be98a7889628427236a8bf552
  render() {
    console.log('Have i reached', this.props.location.state.template)

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
<<<<<<< HEAD
              <Button onClick={() => this.props.history.push('/upload/exl')} type="primary">
                Save
              </Button>
=======
              // <Button
              //   onClick={() => {
              //     this.props.history.push('/upload/exl')
              //   }}
              //   type="primary"
              // >
              //   Save
              // </Button>
              <Download />
>>>>>>> 10a24c272e86ad6be98a7889628427236a8bf552
            )}
          </div>
        </div>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setingTemplate: payload => dispatch(setingTemplate(payload)),
})

export default connect(
  null,
  mapDispatchToProps,
)(LandOne)
