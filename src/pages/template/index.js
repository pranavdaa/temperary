import React from 'react'
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import feedActions from '../../redux/template/actions'
import { connect } from 'react-redux'
import { getTemplates } from '../../redux/template/actions'

class Template extends React.Component {
  state = { selected: false }
  componentWillMount = () => {
    const { getTemplates } = this.props
    getTemplates()
  }

  render() {
    console.log('May be', this.state.selected)
    const { templates } = this.props
    console.log('olalalalepo', templates)
    var testArr = templates.map(value => value._id)
    console.log('its not a joke', testArr)
    const tableColumns = [
      {
        title: 'Template Name',
        dataIndex: 'name',
        key: 'name',
        render: (name, template) => {
          return (
            <Link
              to={{
                pathname: '/createcertificate',
                state: { template: template },
              }}
            >
              <p>{name}</p>
            </Link>
          )
        },
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
          title="Templates"
          extra={
            <Link to="/landingpage/one">
              <Button type="primary" icon="plus">
                Add New
              </Button>
            </Link>
          }
        >
          <Table
            pagination={false}
            columns={tableColumns}
            dataSource={templates}
            rowKey={templates.map(value => value._id)}
          />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template)
// export default Template
