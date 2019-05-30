
import React from 'react'
import { Steps, Button, message } from 'antd'


import styles from './index.module.scss'
import FormUpload from './form.js'
import { Card } from 'antd'
import Editor from '../editor/'

const Step = Steps.Step


class LandOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  next() {
    const current = this.state.current + 1
    this.setState({ current })
  }
  onNextPress = () => {
    console.log(this.tempForm.refs)
    if (this.state.current == 0) {
      this.tempForm.dispatch(new Event('submit'))
    } else
      this.next()
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {

    const steps = [
      {
        title: 'First',

        content: (
          <div>
            <FormUpload formref={(e) => { this.tempForm = e }} />
          </div>
        ),

      },
      {
        title: 'Second',
        content: (
          <div>
            <Editor />
          </div>
        ),
      },
      {
        title: 'Last',
        content: 'Last-content',
      },
    ]

    const { current } = this.state;

    return (
      <Card>
        <h3 className="text-center mb-5">Create Certificates Template</h3>
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
            {current < (steps.length - 1) && (
              //   <Button type="primary" onClick={() => this.onNextPress()}>
              //     Next
              // </Button>
              <Button type="primary" form="tempForm" key="submit" htmlType="submit">
                Next
        </Button>
            )}
            {current === (steps.length - 1) && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
            </Button>

            )}

          </div>
        </div>
      </Card>
    )
  }
}

export default LandOne
