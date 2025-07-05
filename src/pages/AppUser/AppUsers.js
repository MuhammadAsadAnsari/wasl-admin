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
            id: item._id,
            name: item.personal_info.name,
            mobile_no: item.contact_info.mobile_no,
            email: item.contact_info.email,
            home_ph_no: item.contact_info.home_ph_no,
            office_ph_no: item.contact_info.office_ph_no,
            attendent_no: item.contact_info.attendent_no,
            attendent_name: item.contact_info.attendent_name,
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
      title: "Mobile No",
      dataIndex: "mobile_no",
      key: "mobile_no",
      width: "8%",
      ...getColumnSearchProps("mobile_no"),
      sorter: (a, b) => a.mobile_no.length - b.mobile_no.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "6%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Home Ph No",
      dataIndex: "home_ph_no",
      key: "home_ph_no",
      width: "9%",
      ...getColumnSearchProps("home_ph_no"),
      sorter: (a, b) => a.home_ph_no.length - b.home_ph_no.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Office Ph No",
      dataIndex: "office_ph_no",
      key: "office_ph_no",
      width: "9%",
      ...getColumnSearchProps("office_ph_no"),
      sorter: (a, b) => a.office_ph_no.length - b.office_ph_no.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Attendent No",
      dataIndex: "attendent_no",
      key: "attendent_no",
      width: "8%",
      ...getColumnSearchProps("attendent_no"),
      sorter: (a, b) => a.attendent_no.length - b.attendent_no.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Attendent Name",
      dataIndex: "attendent_name",
      key: "attendent_name",
      width: "8%",
      ...getColumnSearchProps("attendent_name"),
      sorter: (a, b) => a.attendent_name.length - b.attendent_name.length,
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
              + Add New User
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
