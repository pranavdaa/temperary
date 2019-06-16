import React from 'react'
import { Table, Card, Input, InputNumber, Popconfirm, Form, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'

//Redux
import { connect } from 'react-redux'
import { getAllCertificates, generateCertificates } from '../../redux/certificates/actions'
import { Link } from 'react-router-dom'

const EditableContext = React.createContext()

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
  }
}

class EditableTable extends React.Component {
  state = { rows: [], editingKey: '', searchText: '', columns: [] }

  generateKey = name => name.toLocaleLowerCase().replace(' ', '_')

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  isEditing = record => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.rows]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({ data: newData, editingKey: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
      }
    })
  }

  edit(key) {
    this.setState({ editingKey: key })
  }

  infoPass = () => {
    this.props.generateCertificates(
      this.props.test._id,
      this.props.test.template,
      this.props.pendingCertificates,
    )
  }

  componentWillMount() {
    const { pendingCertificates } = this.props
    var tempColumns = []
    this.infoPass()
    console.log('Pranasv MAhesjwri', this.props.test.template)
    console.log('knoswe mahurat ka otes', this.props.test._id)
    console.log('patmesh', pendingCertificates)

    if (pendingCertificates[0]) {
      tempColumns = Object.keys(pendingCertificates[0]).map(key => {
        console.log('sjbcj ', isNaN(pendingCertificates[0][key]))
        // if (isNaN(pendingCertificates[0][key])) {

        return {
          title: key,
          dataIndex: key,
          sorter: (a, b) => a[key] - b[key],
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps(key),
          editable: true,
        }
        // } else {
        // return {
        //   title: key,
        //   dataIndex: key,
        //   sorter: (a, b) => a[key].length - b[key].length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...this.getColumnSearchProps(key),
        //   editable: true,
        // }
        // }
      })
      console.log('Bossssss', tempColumns)

      //Add 'Edit' & 'preview' columns
      tempColumns.push(
        {
          title: 'Edit',
          dataIndex: 'edit',
          render: (text, record) => {
            const { editingKey } = this.state
            const editable = this.isEditing(record)
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                      className="primary"
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <a
                className="text-primary"
                disabled={editingKey !== ''}
                onClick={() => this.edit(record.key)}
              >
                <Button> Edit </Button>
              </a>
            )
          },
        },
        //Changed just for now will be added later after the dubai demo may be
        // {
        //   title: 'Preview',
        //   dataIndex: 'preview',
        //   key: 'x',

        //   render: () => (
        //     <Link to="/verify" className="text-primary">
        //       Home
        //     </Link>
        //   ),
        // },
      )

      //Set Columns to Local State
      this.setState(prevState => {
        return {
          ...prevState,
          columns: tempColumns,
        }
      })

      //Processing State to Form Rows data

      let rowMapping = {}
      tempColumns.map(column => {
        rowMapping[column.title] = column.dataIndex
      })

      let data = pendingCertificates.map((certificate, index) => {
        let tempRow = {}
        for (var key in certificate) {
          if (certificate.hasOwnProperty(key)) {
            var val = certificate[key]
            tempRow[rowMapping[key]] = val
          }
        }
        tempRow.key = index
        return {
          ...tempRow,
        }
      })

      console.log('DATA: ', data)

      this.setState(prevState => {
        return {
          ...prevState,
          rows: data,
        }
      })
    }
  }

  render() {
    const { generateCertificates } = this.props
    console.log('olalalalalalala', generateCertificates)
    const components = {
      body: {
        cell: EditableCell,
      },
    }
    console.log('Imp Info', this.state.columns)
    console.log('Or this', this.state.columns)
    var formData = new FormData()
    formData.append('templateId', 'TEMPLATE_ID')
    formData.append('certificate', JSON.stringify('TEMPLATE_JSON'))

    /*         formData.append('excel', )
     */
    return (
      <Card>
        <EditableContext.Provider value={this.props.form}>
          <h3 className="text-center mb-3 mt-1 ">Uploaded Excel Sheet Data </h3>
          <Table
            components={components}
            bordered
            dataSource={this.state.rows}
            // dataSource={data}
            columns={this.state.columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </EditableContext.Provider>
        <Button
          className="mt-3"
          type="primary"
          //pass
          onClick={() => {
            this.infoPass()

            this.props.history.push('/certificates')
          }}
        >
          Generate
        </Button>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  pendingCertificates: state.certificates.pending,
  test: state.templateId,
})

const mapDispatchToProps = dispatch => ({
  generateCertificates: (id, template, sheetdata) =>
    dispatch(generateCertificates(id, template, sheetdata)),
})

const EditableFormTable = Form.create()(EditableTable)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableFormTable)
// ReactDOM.render(<EditableFormTable />, mountNode);
