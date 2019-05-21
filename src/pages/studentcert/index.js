import React from "react"
import { Table, Card, Input, InputNumber, Popconfirm, Form, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

const data = [
    {
        "key": "1",
        "sname": "Pranav Maheshwari",
        "srn": "110",
        "email": "pranavmaheshwari431@gmail.com",
        "cname": "blockchain yatra",
        "mo": "100",
        "result": "Pass",
    },
    {
        "key": "2",
        "sname": "Vaibhav SAini",
        "srn": "211",
        "email": "vasa@gmail.com",
        "cname": "towardsblockchain",
        "mo": "78",
        "result": "Fail",
    }
];


const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

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
        } = this.props;
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
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '', searchText: '' };
        this.columns = [
            {
                title: 'Student Name',
                dataIndex: 'sname',
                sorter: (a, b) => a.sname.length - b.sname.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('sname'),
                editable: true,

            },
            {
                title: 'Student Roll Number',
                dataIndex: 'srn',
                ...this.getColumnSearchProps('srn'),
                editable: true,

            },
            {
                title: 'Email',
                dataIndex: 'email',
                ...this.getColumnSearchProps('email'),
                editable: true,

            },
            {
                title: 'Course Name',
                dataIndex: 'cname',
                filters: [
                    {
                        text: 'Btech',
                        value: 'btech',
                    },
                    {
                        text: 'Mtech',
                        value: 'mtech',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.address.indexOf(value) === 0,
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('cname'),
                editable: true,

            },
            {
                title: 'Marks Obtained',
                dataIndex: 'mo',
                sorter: (a, b) => a.mo.length - b.mo.length,
                sortDirections: ['descend', 'ascend'],
                editable: true,

            },
            {
                title: 'Result',
                dataIndex: 'result',
                editable: true,

            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
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
                                <a>
                                    Cancel
                                </a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a className="text-primary" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                <Button>  Edit </Button>
                            </a>
                        );
                },
            },
            {
                title: 'Preview',
                dataIndex: 'preview',
                key: 'x',
                render: () => <a href="javascript:;">Link</a>,
            }
        ];
    }
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

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: (col.dataIndex === 'mo' || col.dataIndex === 'result') ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Card>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        // dataSource={data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                            // onChange={onChange}
                        }}
                    />
                </EditableContext.Provider>
            </Card>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable
// ReactDOM.render(<EditableFormTable />, mountNode);