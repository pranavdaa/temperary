import React from 'react'
import { Button, Card, Table } from 'antd'
import { tableData } from './data.json'
import { Link } from 'react-router-dom'

class Template extends React.Component {
  render() {
    const tableColumns = [
      {
        title: 'Certificate Name',
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
          title="Certificates"
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
