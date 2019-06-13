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
import axios from '../../utils/cors/axios'
import constants from '../../redux/constants'

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
    templates: {},
    status: 'inprocess',
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
    console.log('Selected Key', selectedKeys)
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  onSelectChange = selectedRowKeys => {
    console.log('Selected Row Key', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  handleChange = (pagination, filters, sorter) => {
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

  getTemplateId = id => {
    axios
      .get(`/template?templateId=${id}`, {
        headers: { Authorization: `Bearer ${constants.JWT}` },
      })
      .then(res => {
        let templateData = res.data.msg[0]
        let imgLinks = {
          orgLogoPath: templateData.orgLogoPath,
          orgStampPath: templateData.orgStampPath,
          authoritySigPath: templateData.authoritySigPath,
        }
        let newTemplates = { ...this.state.templates }
        newTemplates[id] = imgLinks
        this.setState({ templates: { ...newTemplates } })
      })
      .catch(err => {
        console.error('Error while fetching Template from axios ')
      })
  }

  componentWillReceiveProps(newProps) {
    const { allcerts } = newProps
    console.log(allcerts)

    var tempColumns = []
    if (allcerts[0]) {
      tempColumns = Object.keys(newProps.allcerts[0].details).map(key => {
        return {
          title: key,
          dataIndex: key,
          // object a me se key name ka value dhundana hai
          sorter: (a, b) => a[key] - b[key],
          sortDirections: ['descend', 'ascend'],
          // ...this.getColumnSearchProps(this.generateKey(key)),
        }
      })

      tempColumns.push(
        {
          title: 'University Logo',
          dataIndex: 'templateId',
          key: 'x',
          render: (tempId, row) => {
            if (this.state.templates[tempId]) {
              return (
                <input
                  type="image"
                  src={
                    window.SITE_CONFIG.IMG_URL +
                    (this.state.templates[tempId] && this.state.templates[tempId].orgLogoPath)
                  }
                  alt="Submit"
                  className={style.cert_img}
                  height="48"
                  onClick={() => {
                    this.setState({
                      isOpen: true,
                      imageUrl:
                        window.SITE_CONFIG.IMG_URL +
                        (this.state.templates[tempId] && this.state.templates[tempId].orgLogoPath),
                    })
                  }}
                />
              )
            } else {
              return null
            }
          },
        },
        {
          title: 'Authority Signature',
          dataIndex: 'templateId',
          key: 'y',
          render: (tempId, row) => {
            if (this.state.templates[tempId]) {
              return (
                <input
                  type="image"
                  src={
                    window.SITE_CONFIG.IMG_URL +
                    (this.state.templates[tempId] && this.state.templates[tempId].authoritySigPath)
                  }
                  alt="Submit"
                  className={style.cert_img}
                  height="48"
                  onClick={() => {
                    this.setState({
                      isOpen: true,
                      imageUrl:
                        window.SITE_CONFIG.IMG_URL +
                        (this.state.templates[tempId] &&
                          this.state.templates[tempId].authoritySigPath),
                    })
                  }}
                />
              )
            } else {
              return null
            }
          },
        },
        {
          title: 'Authority Signature',
          dataIndex: 'templateId',
          key: 'z',
          render: (tempId, row) => {
            if (this.state.templates[tempId]) {
              return (
                <input
                  type="image"
                  src={
                    window.SITE_CONFIG.IMG_URL +
                    (this.state.templates[tempId] && this.state.templates[tempId].orgStampPath)
                  }
                  alt="Submit"
                  className={style.cert_img}
                  height="48"
                  onClick={() => {
                    this.setState({
                      isOpen: true,
                      imageUrl:
                        window.SITE_CONFIG.IMG_URL +
                        (this.state.templates[tempId] && this.state.templates[tempId].orgStampPath),
                    })
                  }}
                />
              )
            } else {
              return null
            }
          },
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
      let tempIdInfoArr = allcerts.map(value => value.templateId)
      let uniquetempInforArr = [...new Set(tempIdInfoArr)]
      uniquetempInforArr.forEach(tempId => {
        this.getTemplateId(tempId)
      })

      this.setState(prevState => {
        return {
          ...prevState,
          rows: allcerts,
        }
      })
    }
  }

  getRows = () => {
    let newRows = []
    console.log(this.state.status)
    this.state.rows.forEach((certificate, index) => {
      if (certificate.status === this.state.status || this.state.status === 'All') {
        let tempRow = certificate.details

        tempRow.key = index
        tempRow.templateId = certificate.templateId

        newRows.push({
          ...tempRow,
        })
      }
    })
    return newRows
  }

  statusChange = () => {
    const { allcerts } = this.props
    const tempArray = this.state.selectedRowKeys.map(value => allcerts[value]._id)
    const certificateIdString = tempArray.join()

    // TODO:: Make "Issued" text dynamic
    this.props.changeCertificateState(certificateIdString, 'issued')
  }
  render() {
    this.state.rows.map(value => console.log('got it ?', value))
    console.log('this is state', this.state.status)
    const { allcerts } = this.props
    console.log('HI there from allcert', allcerts)

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
    // const columns = [
    //   {
    //     title: 'Student Name',
    //     dataIndex: 'sname',
    //     key: 'sname',
    //     fixed: 'left',
    //     sorter: (a, b) => a.sname.length - b.sname.length,
    //     sortOrder: sortedInfo.columnKey === 'sname' && sortedInfo.order,
    //     ...this.getColumnSearchProps('sname'),
    //   },
    //   {
    //     title: 'Student Roll Number',
    //     dataIndex: 'srnum',
    //     key: 'srnum',
    //     sorter: (a, b) => a.srnum - b.srnum,
    //     sortOrder: sortedInfo.columnKey === 'srnum' && sortedInfo.order,
    //     ...this.getColumnSearchProps('srnum'),
    //   },
    //   {
    //     title: 'Email',
    //     dataIndex: 'email',
    //     key: 'email',
    //     sorter: (a, b) => a.email.length - b.email.length,
    //     sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    //     ...this.getColumnSearchProps('email'),
    //   },
    //   {
    //     title: 'Course Name',
    //     dataIndex: 'cname',
    //     key: 'cname',
    //     sorter: (a, b) => a.cname.length - b.cname.length,
    //     sortOrder: sortedInfo.columnKey === 'cname' && sortedInfo.order,
    //     ...this.getColumnSearchProps('cname'),
    //   },
    //   {
    //     title: 'Marks Obtained',
    //     dataIndex: 'mo',
    //     key: 'mo',
    //     sorter: (a, b) => a.mo - b.mo,
    //     sortOrder: sortedInfo.columnKey === 'mo' && sortedInfo.order,
    //     ...this.getColumnSearchProps('mo'),
    //   },
    //   {
    //     title: 'Result',
    //     dataIndex: 'result',
    //     key: 'result',
    //   },
    //   {
    //     title: 'University Logo',
    //     dataIndex: 'img',
    //     key: 'x',
    //     render: (allcerts, row) => (
    //       <input
    //         type="image"
    //         src={allcerts}
    //         alt="Submit"
    //         className={style.cert_img}
    //         height="48"
    //         onClick={() => {
    //           this.setState({ isOpen: true, imageUrl: allcerts })
    //         }}
    //       />
    //     ),
    //   },
    //   {
    //     title: 'University Stamp',
    //     dataIndex: 'pic',
    //     key: 'y',
    //     render: (allcerts, row) => (
    //       <input
    //         type="image"
    //         src={allcerts}
    //         alt="Submit"
    //         className={style.cert_img}
    //         height="48"
    //         onClick={() => {
    //           this.setState({ isOpen: true, imageUrl: allcerts })
    //         }}
    //       />
    //     ),
    //   },
    //   {
    //     title: 'Authority Signature',
    //     dataIndex: 'sig',
    //     key: 'z',
    //     render: (allcerts, row) => (
    //       <input
    //         type="image"
    //         src={allcerts}
    //         alt="Submit"
    //         className={style.cert_img}
    //         height="48"
    //         onClick={() => {
    //           this.setState({ isOpen: true, imageUrl: allcerts })
    //         }}
    //       />
    //     ),
    //   },
    // ]

    return (
      <div>
        <Card
          title="Certificates"
          extra={
            <Link to="/template">
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
            <Select
              onChange={e => {
                this.setState(preData => {
                  return {
                    ...preData,
                    status: e,
                  }
                })
              }}
              style={{ width: 130 }}
              className="float-right mb-2"
              defaultValue="InProgress"
            >
              <OptGroup label="Status">
                <Option value="All">ALL</Option>
                <Option value="inprocess">InProgress</Option>
                <Option value="issued">Issued</Option>
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

            <Button
              type="primary"
              onClick={this.statusChange}
              disabled={!hasSelected}
              loading={loading}
            >
              ISSUE
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          {console.log('Filteresd ROwsss', this.getRows())}
          <Table
            columns={this.state.columns}
            dataSource={this.getRows()}
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
//is used for dispatching actions to the store.
const mapDispatchToProps = dispatch => ({
  getAllCertificates: () => dispatch(getCertificate.getAllCertificates()),
  changeCertificateState: (certificateId, status) =>
    dispatch(getCertificate.changeCertificateState(certificateId, status)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cert)
