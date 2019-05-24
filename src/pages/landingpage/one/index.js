import React from "react"
import { Steps, Button, message } from 'antd';
import styles from './index.module.scss'
import FormUpload from './form.js';
import { Card } from 'antd';


const Step = Steps.Step;

const steps = [
  {
    title: 'First',
    content: (<div>
      <FormUpload />
    </div>),
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class LandOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {

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
            {current < (steps.length - 1) && (
              <Button type="primary" onClick={() => this.next()}>
                Next
            </Button>
            )}
            {current === (steps.length - 1) && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
            </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
            </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }
}

export default LandOne;
