import React, { Component } from 'react'

//Antd
import { Tabs, Card } from 'antd'
const TabPane = Tabs.TabPane

//React-Redux
import { connect } from 'react-redux'

import Documents from './documents'
import Details from './details'

//Assets
import './styles.css'
import 'antd/dist/antd.css'

const tabListNoTitle = [
  {
    key: 'Document',
    tab: 'Document',
  },
  {
    key: 'Details',
    tab: 'Details',
  },
]

class Index extends Component {
  state = {
    noTitleKey: 'Document',
  }

  tableChangeHandler = () => {}
  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }

  render() {
    const { bdocDetails } = this.props
    const contentListNoTitle = {
      Document: <Documents pages={bdocDetails.pages} />,
      Details: <Details metadata={bdocDetails.metadata} />,
    }
    return (
      <div>
        <Card
          title="Document View"
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey')
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bdocDetails: state.bdocReader,
})

export default connect(
  mapStateToProps,
  null,
)(Index)
