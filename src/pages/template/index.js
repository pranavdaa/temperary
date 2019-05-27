import React from 'react';
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import feedActions from '../../redux/templeteGet/actions'
import { connect } from 'react-redux'
class Template extends React.Component {
  componentWillMount = () => {
    const { getActivityFeed, getDefaultAssets } = this.props
    getActivityFeed()

  }

  render() {
    console.log(this.props.templates)
    const { templates } = this.props;

    const tableColumns = [
      {
        title: 'Certificate Name',
        dataIndex: 'name',
        key: 'action',
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
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
          <Table pagination={false} columns={tableColumns} dataSource={templates} />

        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  templates: [...state.templates],
})

const mapDispatchToProps = dispatch => ({
  getActivityFeed: () => dispatch(feedActions()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Template)

