import React from 'react';
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import feedActions from '../../redux/template/actions'
import { connect } from 'react-redux'
import getTemplates from '../../redux/template/actions';
class Template extends React.Component {
  componentWillMount = () => {
    const { getTemplates } = this.props
    getTemplates()
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
  getTemplates: () => dispatch(getTemplates()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Template)

