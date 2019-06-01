import React from "react"
import { Table, Card, Input, InputNumber, Popconfirm, Form, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

//Redux
import { connect } from 'react-redux'
import { getAllCertificates, generateCertificates } from '../../redux/certificates/actions'


const EditableContext = React.createContext()

class EditableCell extends React.Component {

    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
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
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    
    state = { rows: [], editingKey: '', searchText: '', columns: [] }
    
    generateKey = name => (name.toLocaleLowerCase().replace(' ', '_'))

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
        this.setState({ searchText: '' })
    };

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' })
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.rows];
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

    componentWillMount() {
        const { pendingCertificates } = this.props
        var tempColumns = []

        if(pendingCertificates[0]) {

            //Add Custom Columns from Excel Sheet
            tempColumns = Object.keys(pendingCertificates[0]).map(key => {
                return {
                    'title': key,
                    'dataIndex': this.generateKey(key),
                    sorter: (a, b) => a.sname.length - b.sname.length,
                    sortDirections: ['descend', 'ascend'],
                    ...this.getColumnSearchProps(this.generateKey(key)),
                    editable: true,
                }
            })        

            //Add 'Edit' & 'preview' columns
            tempColumns.push({
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
            })

            //Set Columns to Local State
            this.setState(prevState => {
                return {
                    ...prevState,
                    columns: tempColumns
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
                    ...tempRow
                }
            })

            console.log("DATA: ", data)

            this.setState(prevState => {
                return {
                    ...prevState,
                    rows: data
                }
            })

        }
    }

    render() {

        const { generateCertificates } = this.props 

        const components = {
            body: {
                cell: EditableCell,
            },
        }

        var formData = new FormData()
        formData.append('templateId', 'TEMPLATE_ID')
        formData.append('certificate', JSON.stringify('TEMPLATE_JSON'))

/*         formData.append('excel', )
 */
        return (
            <Card>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.rows}
                        // dataSource={data}
                        columns={this.state.columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                            // onChange={onChange}
                        }}
                    />
                </EditableContext.Provider>
                <Button 
                    type="primary"
                    //pass
                    onClick={generateCertificates()}>
                    Generate
                </Button>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    pendingCertificates: state.certificates.pending
})

const mapDispatchToProps = dispatch => ({
    generateCertificates: payload => dispatch(generateCertificates(payload))
})

const EditableFormTable = Form.create()(EditableTable)
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable)
// ReactDOM.render(<EditableFormTable />, mountNode);