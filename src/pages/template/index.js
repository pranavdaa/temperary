import React from 'react'
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import feedActions from '../../redux/template/actions'
import { connect } from 'react-redux'
import { getTemplates } from '../../redux/template/actions'
import { sendtemplate } from '../../redux/templatedata/actions'
class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: false }

    this.props = { templates: [] }
  }

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
            <div>
              <p
                onClick={() => {
                  this.props.sendtemplate({ template })
                  this.props.history.push('/createcertificate')
                }}
              >
                {name}
              </p>
            </div>
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
          title="Select Template"
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
  sendtemplate: payload => dispatch(sendtemplate(payload)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template)
// export default Template
