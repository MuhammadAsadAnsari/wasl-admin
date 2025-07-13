import AddUser from "./AddAppUser";
import UpdateUser from "./UpdateAppUser";
import Highlighter from "react-highlight-words";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Input,
  Space,
  Table,
  Card,
  Col,
  Row,
  Switch,
  Spin,
  Tag,
  Badge,
  Statistic,
} from "antd";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  addPropety,
  getAllUsers,
  getPropety,
  updateProperty,
  remove,
  moreInfo,
} from "../../Services/AppUser";
import { ToastContainer, toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import CountUp from "react-countup";

const Users = () => {
  const [, setFilteredInfo] = useState({});
  const [, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [AddModal, setAddModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [size] = useState("large");
  const [users, setUsers] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [blockUsers, setBlockUsers] = useState();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const formatter = (value) => <CountUp end={value} separator="," />;

  // datatable search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // datatable reset search
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // open modal for add master account and update master account
  const showAddModal = () => {
    setAddModal(true);
  };

  // for logs
  const showMasterEmailLogs = (value) => {
    console.log(value);
    navigate("logs", { state: value.master_email });
  };

  const pagination = {
    defaultPageSize: 100,
    pageSizeOptions: ["10", "20", "30", "50", "100"], // Optional: Specify available page sizes
  };

  // datatable utilities
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // Methods
  const Users = async () => {
    try {
      let users = await getAllUsers();

      if (users.data) {
        const filteredData = users.data.map((item) => {
          return {
            id: item?._id,
            name: item?.personal_info?.name,
            phoneNumber: item?.personal_info?.phoneNumber,
            serviceType: item?.personal_info?.serviceType,
            cnic: item?.personal_info?.cnic,
            language: item?.preferences?.preferred_language,
            city: item?.contact_info?.city,
            address: item?.contact_info?.address,
          };
        });
        setUsers(filteredData);
        setLoading(false);
      }
    } catch (e) {}
  };

  async function RemoveUser(value) {
    try {
      let result = await remove(value.id);

      if (result.data.message) {
        toast.success(result.data.message);
        await Users();
        await getMoreInfo();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {}
  }

  async function UpdateExistingProperty(value) {
    try {
      let result = await getPropety(value.id);
      if (result.data) {
        let obj = new Object({
          id: result.data._id,
          type: result.data.type,
          location: result.data.location,
          project: result.data.project,
          bedrooms: result.data.bedrooms,
          rent: result.data.rent,
          size: result.data.size,
        });
        setAccount(obj);
        setUpdateModal(true);
      }
    } catch (err) {}
  }

  const getMoreInfo = async () => {
    try {
      let result = await moreInfo();
      if (result.data) {
        setTotalUsers(result.data[0].all_users);
        setActiveUsers(result.data[0].active_users);
        setBlockUsers(result.data[0].block_users);
      }
    } catch (err) {}
  };

  const refreshData = async () => {
    try {
        await getMoreInfo();
        await users();
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(false);
    Users();
    getMoreInfo();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "8%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone No",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "8%",
      ...getColumnSearchProps("phoneNumber"),
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      width: "6%",
      ...getColumnSearchProps("serviceType"),
      sorter: (a, b) => a.serviceType.length - b.serviceType.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "National ID",
      dataIndex: "cnic",
      key: "cnic",
      width: "15%",
      ...getColumnSearchProps("cnic"),
      sorter: (a, b) => a.cnic.length - b.cnic.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: "9%",
      ...getColumnSearchProps("language"),
      sorter: (a, b) => a.language.length - b.language.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "8%",
      ...getColumnSearchProps("city"),
      sorter: (a, b) => a.city.length - b.city.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "8%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "8%",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            type="link"
            size="small"
            onClick={() => UpdateExistingProperty(record)}
          >
            {" "}
            <EditOutlined />{" "}
          </Button> */}
          <Button type="link" size="small" onClick={() => RemoveUser(record)}>
            {" "}
            <DeleteOutlined />{" "}
          </Button>
          {/* <Button type="link" size="small"  > <EyeOutlined /> </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader />}

      <AddUser
        show={AddModal}
        setShow={(bool) => setAddModal(bool)}
        refresh={setUsers}
        totalUsers={setTotalUsers}
        activeUsers={setActiveUsers}
        blockUsers={setBlockUsers}
      />

      <UpdateUser
        show={UpdateModal}
        setShow={(bool) => setUpdateModal(bool)}
        data={account}
        refresh={setUsers}
      />

      <ToastContainer />

      {/* <Badge.Ribbon text={"Total Accounts " + accountsCount} className="mybadge" placement="start"> */}
      <Card title="Users List" bordered={true}>
        <Row justify="center">
          <Col span={3} className="propertydetails">
            <Card
              bordered={true}
              style={{  textAlign: "center",marginRight : '5px' }}
            >
              <Statistic
                className="statics"
                title="All Users"
                value={totalUsers}
                formatter={formatter}
                valueStyle={{
                  color: "black",
                }}
              />
            </Card>
          </Col>
          <Col span={3} className="propertydetails">
            <Card
              bordered={true}
              style={{ textAlign: "center" }}
            >
              <Statistic
                className="statics"
                title="Active Users"
                value={activeUsers}
                formatter={formatter}
                valueStyle={{
                  color: "black",
                }}
              />
            </Card>
          </Col>
          <Col span={3} className="propertydetails">
            <Card
              bordered={true}
              style={{ textAlign: "center" }}
            >
              <Statistic
                className="statics"
                title="InActive Users"
                value={blockUsers}
                formatter={formatter}
                valueStyle={{
                  color: "black",
                }}
              />
            </Card>
          </Col>
        </Row>

        <Row justify="end">
          <Col span={3}>
            <Button
              type="primary"
              size={size}
              onClick={showAddModal}
              className="custombutton"
            >
              + Add New  Providers
            </Button>
          </Col>
          {/* <Col span={2}>
            <Button
              type="primary"
              size={size}
              onClick={refreshData}
              className="custombutton"
            >
              Refresh
            </Button>
          </Col> */}

          {/* <Col span={2}>

                            <Button type="primary" size={size} onClick={() => refreshAllAccounts()} className="custombutton">Refresh</Button>

                        </Col> */}
        </Row>

        <Row justify="space-between" align="stretch">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={users}
              onChange={handleChange}
              pagination={pagination}
            />
          </Col>
        </Row>
      </Card>
      {/* </Badge.Ribbon> */}
    </>
  );
};
export default Users;
