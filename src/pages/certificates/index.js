import React from 'react'
import { Button, Card, Table } from 'antd'
import { tableData } from './data.json'
import { Link } from 'react-router-dom'
import { testAddress } from 'web3-utils';
const data = [
    {
        key: '1',
        sname: 'John Brown',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
    },
    {
        key: '2',
        sname: 'Jim Green',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
    },
    {
        key: '3',
        sname: 'Joe Black',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
    },
    {
        key: '4',
        sname: 'Jim Red',
        srnum: 900,
        email: "pranav@testAddress.com",
        cname: "Blockchain Yatra",
        mo: 89,
        result: "Pass",
    },
];

class Cert extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        filteredInfo: null,
        sortedInfo: null,
    };
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
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
    render() {
        let { loading, selectedRowKeys, sortedInfo, filteredInfo } = this.state;
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
            },
            {
                title: 'Student Roll Number',
                dataIndex: 'srnum',
                key: 'srnum',
                sorter: (a, b) => a.srnum - b.srnum,
                sortOrder: sortedInfo.columnKey === 'srnum' && sortedInfo.order,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
                filteredValue: filteredInfo.email || null,
                onFilter: (value, record) => record.email.includes(value),
                sorter: (a, b) => a.email.length - b.email.length,
                sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            },
            {
                title: 'Course Name',
                dataIndex: 'cname',
                key: 'cname',
                filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
                filteredValue: filteredInfo.cname || null,
                onFilter: (value, record) => record.cname.includes(value),
                sorter: (a, b) => a.cname.length - b.cname.length,
                sortOrder: sortedInfo.columnKey === 'cname' && sortedInfo.order,
            },
            {
                title: 'Marks Obtained',
                dataIndex: 'mo',
                key: 'mo',
                sorter: (a, b) => a.mo - b.mo,
                sortOrder: sortedInfo.columnKey === 'mo' && sortedInfo.order,
            },
            {
                title: 'Result',
                dataIndex: 'result',
                key: 'result',
            },
            {
                title: 'University Logo',
                dataIndex: '',
                key: 'x',
                render: () => <a href="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?">Logo</a>,
            },
            {
                title: 'University Stamp',
                dataIndex: '',
                key: 'y',
                render: () => <a href="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?">Logo</a>,
            },
            {
                title: 'Authority Signature',
                dataIndex: '',
                key: 'z',
                render: () => <a href="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?">Logo</a>,
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'p',
                fixed: 'right',
                render: () => <a href="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?">Logo</a>,
            },
        ];
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

                    <div className="table-operations">

                        <Button onClick={this.setAgeSort}>Sort age</Button>
                        <Button onClick={this.clearFilters}>Clear filters</Button>
                        <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                        {/* <div style={{ marginBottom: 16 }}>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                            </span>
                        </div> */}
                    </div>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} onChange={this.handleChange} rowSelection={rowSelection} />
                </Card>
            </div>
        )
    }
}
export default Cert;