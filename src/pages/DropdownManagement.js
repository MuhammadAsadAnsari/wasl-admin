import { Button, Input, Space, Table, Card, Col, Row, Modal, Radio, Form, Switch, InputNumber, DatePicker, Cascader, TreeSelect, Select } from 'antd';
import { useState, useRef } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const { Option } = Select;
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '6',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '8',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '9',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '10',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '12',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const Dropdowns = () => {

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [size, setSize] = useState('large');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Standard',
            dataIndex: 'standard',
            key: 'standard',
            width: '20%',
            ...getColumnSearchProps('age'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">

                    <Button type="link" size="small" onClick={showModal}>
                        <EditOutlined />
                    </Button>
                    <a href="#"><DeleteOutlined /></a>
                </Space>
            )

        },
        {
            title: "Activate",
            key: "activate",
            render: (_, record) => (
                <Space size="middle">
 <Switch defaultChecked onChange={onChange} />
                  
                </Space>
            )

        },
    ];
    // const columns = [
    //   {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     filters: [
    //       {
    //         text: 'Joe',
    //         value: 'Joe',
    //       },
    //       {
    //         text: 'Jim',
    //         value: 'Jim',
    //       },
    //     ],
    //     filteredValue: filteredInfo.name || null,
    //     onFilter: (value, record) => record.name.includes(value),
    //     sorter: (a, b) => a.name.length - b.name.length,
    //     sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    //     ellipsis: true,
    //     ...getColumnSearchProps('name'),
    //   },
    //   {
    //     title: 'Age',
    //     dataIndex: 'age',
    //     key: 'age',
    //     sorter: (a, b) => a.age - b.age,
    //     sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
    //     ellipsis: true,
    //   },
    //   {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    //     filters: [
    //       {
    //         text: 'London',
    //         value: 'London',
    //       },
    //       {
    //         text: 'New York',
    //         value: 'New York',
    //       },
    //     ],
    //     filteredValue: filteredInfo.address || null,
    //     onFilter: (value, record) => record.address.includes(value),
    //     sorter: (a, b) => a.address.length - b.address.length,
    //     sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
    //     ellipsis: true,
    //   },
    // ];
    return (
        <>
            <Modal title="Create Dropdown" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Type">
                        <Select>
                            <Select.Option value="single">Single</Select.Option>
                            <Select.Option value="multiline">Multiline</Select.Option>
                        </Select>
                    </Form.Item>
                    <Row>
                        <Col span={3} offset={2}>
                            <p>Value : </p>
                        </Col>
                        <Col span={14} offset={1}>

                            <Form.List name="dropdownValues">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ marginBottom: 2 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <Input placeholder="First Name" />
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Card

                bordered={true}
                // style={{ width: 1600, height: 768 }}
                >


                <Row justify="start">
                    <Col span={10}>
                        <h4>Dropdown Management</h4>

                    </Col>
                    <Col span={2} offset={12}>
                        <Button type="primary" size={size} onClick={showModal}>
                            + Add
                        </Button>
                    </Col>
                </Row>

                {/* <Row justify="end">
          <Col span={2}>
            <Button type="primary" size={size} onClick={showModal}>
              + Add
            </Button>
          </Col>
        </Row> */}

                <Row justify="space-between" align="bottom">
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} onChange={handleChange} />
                    </Col>
                </Row >

            </Card>

        </>
    );
};
export default Dropdowns;