import React from 'react'
import { Card } from 'antd'
import WrappedApp from './payBills'
import WrappedApp2 from './billingHistory.js'
const tabList = [
  {
    key: 'tab1',
    tab: 'Pay Bills',
  },
  {
    key: 'tab2',
    tab: 'Billing History',
  },
]

const contentList = {
  tab1: <WrappedApp />,
  tab2: <WrappedApp2 />,
}

class BillView extends React.Component {
  state = {
    key: 'tab1',
  }

  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }

  render() {
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key')
          }}
        >
          {contentList[this.state.key]}
        </Card>
        <br />
        <br />
      </div>
    )
  }
}

export default BillView
