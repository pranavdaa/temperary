import React from 'react'
import { Steps, Button, message } from 'antd'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import FormUpload from './one/form.js'
import { Card, notification } from 'antd'
import Editor from './editor'
import Preview from './preview/index'
import { connect } from 'react-redux'
import { createTemplate } from '../../redux/template/actions'
const Step = Steps.Step

class LandOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
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
  openNotification = () => {
    notification.success({
      message: 'Certificate Created',
      description: 'You can click on generate certificate to view your created template',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  render() {
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
            <Editor />
          </div>
        ),
      },
      {
        title: 'Last',
        content: (
          <div>
            <Preview />
          </div>
        ),
      },
    ]

    let nextButtonProps =
      this.state.current == 0 ? { form: 'tempForm', key: 'submit', htmlType: 'submit' } : {}

    const { current } = this.state

    return (
      <Card
        title="Create Certificates Template"
        extra={
          <Link to="/dashboard">
            <Button type="primary">Skip</Button>
          </Link>
        }
        bordered={false}
      >
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
              <Button
                type="primary"
                onClick={() => {
                  console.log('bhole', this.props.templateData)
                  this.props.createTemplate('never', this.props.templateData)
                  this.openNotification()
                }}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  componentWillReceiveProps(newProps) {
    if (newProps.templateData.templateId) {
      this.props.history.push('/dashboard')
    }
  }
}

const mapStateToProps = state => ({
  templateData: state.templates,
})

const mapDispatchToProps = dispatch => ({
  createTemplate: (assetType, params) => dispatch(createTemplate(assetType, params)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandOne)
