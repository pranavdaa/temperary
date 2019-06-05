import React from 'react'
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import { Select } from 'antd'
import { Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import Lightbox from 'react-image-lightbox'
const { Option, OptGroup } = Select
import 'react-image-lightbox/style.css'
import style from './style.module.scss'
import * as getCertificate from '../../redux/certificates/actions'
import { connect } from 'react-redux'

class Cert extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    filteredInfo: null,
    sortedInfo: null,
    searchText: '',
    isOpen: false,
    isOpen2: false,
    isOpen3: false,
    columns: [],
    rows: [],
  }
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
        textToHighlight={text}
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

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    })
  }

  componentWillMount() {
    this.props.getAllCertificates()
  }

  generateKey = key => {
    return key.replace(/ /g, '_')
  }
  componentWillReceiveProps(newProps) {
    const { allcerts } = newProps
    var tempColumns = []
    console.log('New prop', newProps.allcerts)
    if (allcerts[0]) {
      tempColumns = Object.keys(newProps.allcerts[0].details).map(key => {
        return {
          title: key,
          dataIndex: key,
          sorter: (a, b) => a.sname.length - b.sname.length,
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps(this.generateKey(key)),
        }
      })

      tempColumns.push(
        {
          title: 'University Logo',
          dataIndex: 'img',
          key: 'x',
          render: (allcerts, row) => (
            <input
              type="image"
              src={allcerts}
              alt="Submit"
              className={style.cert_img}
              height="48"
              onClick={() => {
                this.setState({ isOpen: true, imageUrl: allcerts })
              }}
            />
          ),
        },
        {
          title: 'University Stamp',
          dataIndex: 'pic',
          key: 'y',
          render: (allcerts, row) => (
            <input
              type="image"
              src={allcerts}
              alt="Submit"
              className={style.cert_img}
              height="48"
              onClick={() => {
                this.setState({ isOpen: true, imageUrl: allcerts })
              }}
            />
          ),
        },
        {
          title: 'Authority Signature',
          dataIndex: 'sig',
          key: 'z',
          render: (allcerts, row) => (
            <input
              type="image"
              src={allcerts}
              alt="Submit"
              className={style.cert_img}
              height="48"
              onClick={() => {
                this.setState({ isOpen: true, imageUrl: allcerts })
              }}
            />
          ),
        },
      )

      this.setState(prevState => {
        return {
          ...prevState,
          columns: tempColumns,
        }
      })

      let rowMapping = {}
      tempColumns.map(column => {
        rowMapping[column.title] = column.dataIndex
      })
      console.log('allcertsyaaaaaa', newProps.allcerts[0].details)
      let data = allcerts.map((certificate, index) => {
        let tempRow = certificate.details

        tempRow.key = index
        return {
          ...tempRow,
        }
      })
      console.log('this is it from the data ', data)

      this.setState(prevState => {
        return {
          ...prevState,
          rows: data,
        }
      })
    }
  }

  render() {
    const { allcerts } = this.props

    let {
      loading,
      selectedRowKeys,
      sortedInfo,
      filteredInfo,
      isOpen,
      isOpen2,
      isOpen3,
    } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    return (
      <div>
        <Card
          title="Certificates"
          extra={
            <Link to="/template/create">
              <Button type="primary" icon="plus">
                Generate New Certificate
              </Button>
            </Link>
          }
        >
          {isOpen && (
            <Lightbox
              mainSrc={this.state.imageUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          {isOpen2 && (
            <Lightbox
              mainSrc={this.state.imageUrl2}
              onCloseRequest={() => this.setState({ isOpen2: false })}
            />
          )}
          {isOpen3 && (
            <Lightbox
              mainSrc={this.state.imageUrl3}
              onCloseRequest={() => this.setState({ isOpen3: false })}
            />
          )}

          <div className="table-operations ">
            <Select style={{ width: 130 }} className="float-right mb-2" defaultValue="InProgress">
              <OptGroup label="Status">
                <Option value="All">ALL</Option>
                <Option value="InProgress">InProgress</Option>
                <Option value="Issued">Issued</Option>
              </OptGroup>
            </Select>
            <Select
              className="float-right mb-2 mr-2"
              showSearch
              style={{ width: 130 }}
              placeholder="Year"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            >
              <Option value="2019">2019</Option>
              <Option value="2020">2020</Option>
              <Option value="2121">2121</Option>
            </Select>
            <Select
              className="float-right mb-2 mx-2"
              showSearch
              style={{ width: 130 }}
              placeholder="Course Name"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="byc">byc</Option>
              <Option value="xyz">xyz</Option>
              <Option value="pqr">pqr</Option>
            </Select>
            <Select
              className="float-right mb-2"
              showSearch
              style={{ width: 130 }}
              placeholder="Batch Name"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="b11">b11</Option>
              <Option value="b12">b12</Option>
              <Option value="c11">c11</Option>
            </Select>

            <Button type="primary" disabled={!hasSelected} loading={loading}>
              Generate
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          {console.log('From the future', allcerts)}
          <Table
            columns={this.state.columns}
            dataSource={this.state.rows}
            scroll={{ x: 1300 }}
            onChange={this.handleChange}
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  allcerts: state.certificates.generated,
})
const mapDispatchToProps = dispatch => ({
  getAllCertificates: () => dispatch(getCertificate.getAllCertificates()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cert)
