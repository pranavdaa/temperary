import React from 'react'
import { Button, Card, Table } from 'antd'
import { tableData } from './data.json'
import { Link } from 'react-router-dom'

class Template extends React.Component {
  render() {
    const tableColumns = [
      {
        title: 'Template Name',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
    ]
    return (
      <div>
        <Card
          title="Templates"
          extra={
            <Link to="/template/create">
              <Button type="primary" icon="plus">
                Add New
              </Button>
            </Link>
          }
        >
          <Table pagination={false} columns={tableColumns} dataSource={tableData} />
        </Card>
      </div>
    )
  }
}

export default Template
