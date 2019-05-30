import React from 'react'
import { Button, Card, Table } from 'antd'
import { Link } from 'react-router-dom'
import { Select } from 'antd';
import { Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import Lightbox from "react-image-lightbox";
const { Option, OptGroup } = Select;
import "react-image-lightbox/style.css";
import style from './style.module.scss';

const data = [
    {
        key: '1',
        sname: 'John Brown',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
        img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
        pic: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681",
        sig: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
    },
    {
        key: '2',
        sname: 'Jim Green',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
        img: "https://www.w3schools.com/w3css/img_lights.jpg",
        pic: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681",
        sig: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
    },
    {
        key: '3',
        sname: 'Joe Black',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
        img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
        pic: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681",
        sig: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
    },
    {
        key: '4',
        sname: 'Jim Red',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
        img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
        pic: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681",
        sig: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?",
    },
];

class Cert extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        filteredInfo: null,
        sortedInfo: null,
        searchText: '',
        isOpen: false,
        isOpen2: false,
        isOpen3: false

    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
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
                setTimeout(() => this.searchInput.select());
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
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    start = () => {
        // this.setState({ loading: true });
        console.log("HIt");
    };
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    //     function onChange(value) {
    //     console.log(`selected ${value}`);
    // }


    // function onFocus() {
    //     console.log('focus');
    // }

    // function onSearch(val) {
    //     console.log('search:', val);
    // }
    render() {
        let { loading, selectedRowKeys, sortedInfo, filteredInfo, photoIndex, isOpen, isOpen2, isOpen3 } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Student Name',
                dataIndex: 'sname',
                key: 'sname',
                fixed: 'left',
                sorter: (a, b) => a.sname.length - b.sname.length,
                sortOrder: sortedInfo.columnKey === 'sname' && sortedInfo.order,
                ...this.getColumnSearchProps('sname'),

            },
            {
                title: 'Student Roll Number',
                dataIndex: 'srnum',
                key: 'srnum',
                sorter: (a, b) => a.srnum - b.srnum,
                sortOrder: sortedInfo.columnKey === 'srnum' && sortedInfo.order,
                ...this.getColumnSearchProps('srnum'),

            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) => a.email.length - b.email.length,
                sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
                ...this.getColumnSearchProps('email'),

            },
            {
                title: 'Course Name',
                dataIndex: 'cname',
                key: 'cname',
                sorter: (a, b) => a.cname.length - b.cname.length,
                sortOrder: sortedInfo.columnKey === 'cname' && sortedInfo.order,
                ...this.getColumnSearchProps('cname'),

            },
            {
                title: 'Marks Obtained',
                dataIndex: 'mo',
                key: 'mo',
                sorter: (a, b) => a.mo - b.mo,
                sortOrder: sortedInfo.columnKey === 'mo' && sortedInfo.order,
                ...this.getColumnSearchProps('mo'),

            },
            {
                title: 'Result',
                dataIndex: 'result',
                key: 'result',
            },
            {
                title: 'University Logo',
                dataIndex: 'img',
                key: 'x',
                render: (data, row) => <input type="image" src={data} alt="Submit" className={style.cert_img} height="48" onClick={() => { this.setState({ isOpen: true, imageUrl: data }) }} />

            },
            {
                title: 'University Stamp',
                dataIndex: 'pic',
                key: 'y',
                render: (data, row) => <input type="image" src={data} alt="Submit" className={style.cert_img} height="48" onClick={() => { this.setState({ isOpen: true, imageUrl: data }) }} />
            },
            {
                title: 'Authority Signature',
                dataIndex: 'sig',
                key: 'z',
                render: (data, row) => <input type="image" src={data} alt="Submit" className={style.cert_img} height="48" onClick={() => { this.setState({ isOpen: true, imageUrl: data }) }} />
            },
        ];
        console.log(selectedRowKeys)

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
                        />)}
                    {isOpen2 && (
                        <Lightbox
                            mainSrc={this.state.imageUrl2}
                            onCloseRequest={() => this.setState({ isOpen2: false })}
                        />)}
                    {isOpen3 && (
                        <Lightbox
                            mainSrc={this.state.imageUrl3}
                            onCloseRequest={() => this.setState({ isOpen3: false })}
                        />)}

                    <div className="table-operations ">
                        <Select style={{ width: 130 }} className="float-right mb-2" defaultValue="InProgress" >
                            <OptGroup label="Status">
                                <Option value="All">ALL</Option>
                                <Option value="InProgress">InProgress</Option>
                                <Option value="Issued">Issued</Option>
                            </OptGroup>
                        </Select>
                        <Select className="float-right mb-2 mr-2"
                            showSearch
                            style={{ width: 130 }}
                            placeholder="Year"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                                console.log("options", option)
                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            }
                        >
                            <Option value="2019">2019</Option>
                            <Option value="2020">2020</Option>
                            <Option value="2121">2121</Option>
                        </Select>
                        <Select className="float-right mb-2 mx-2"
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
                        <Select className="float-right mb-2"
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

                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                            Generate
          </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} onChange={this.handleChange} rowSelection={rowSelection} />
                </Card>
            </div >
        )
    }
}
export default Cert;