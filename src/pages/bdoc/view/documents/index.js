import React, { Component, Fragment } from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs

//Antd
import { Empty } from 'antd'

class Index extends Component {
  render() {
    let documents

    const { pages } = this.props
    if (pages) {
      documents = pages.map((page, index) => {
        if (page.name.split('.')[1] === 'pdf') {
          return (
            <TabPane
              tab={
                <span>
                  <img
                    src={
                      'https://www.wkkf.org/-/media/images/resource-directory/pdf-placeholder.png'
                    }
                    width="60"
                    height="78"
                  />
                </span>
              }
              key={index + 1}
            >
              <embed
                src={`data:application/pdf;base64,${page.data}`}
                type="application/pdf"
                height="300px"
                width="100%"
              />
            </TabPane>
          )
        } else {
          return (
            <TabPane
              tab={
                <span>
                  <img src={`data:application/jpeg;base64,${page.data}`} width="60" height="78" />
                </span>
              }
              key={index + 1}
            >
              <img src={`data:image/jpeg;base64,${page.data}`} width="60" height="78" />
            </TabPane>
          )
        }
      })
    }

    return (
      <Fragment>
        {' '}
        <Tabs defaultActiveKey="1" tabPosition={'right'}>
          {documents || <Empty />}
        </Tabs>
      </Fragment>
    )
  }
}

export default Index
