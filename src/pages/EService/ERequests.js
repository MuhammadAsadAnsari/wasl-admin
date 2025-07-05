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
  removeProperty,
  moreInfo,
} from "../../Services/AppUser";
import { ToastContainer, toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import CountUp from "react-countup";
import { getAllRequests, getAllRequestsStats } from "../../Services/Requests";
import UpdateRequest from "./UpdateRequest";
import RequestDetails from "./RequestDetails";
import moment from "moment";

const ERequests = () => {
  const [, setFilteredInfo] = useState({});
  const [, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [AddModal, setAddModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [size] = useState("large");
  const [requests, setRequests] = useState();
  const [pendingRequests, setPendingRequests] = useState();
  const [inprogressRequests, setInprogressRequests] = useState();
  const [completedRequests, setCompletedRequests] = useState();
  const [delayedRequests, setDelayedRequests] = useState();
  const [rented, setRented] = useState();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(true);
  const [requestDetails, setRequestDetails] = useState();
  const [viewDetailsModal, setViewDetailsModal] = useState();
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const formatter = (value) => <CountUp end={value} separator="," />;

  // datatable search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const showViewDetails = (request) => {
    setRequestDetails(request);
    setViewDetailsModal(true);
  };

  // datatable reset search
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const AllRequests = async () => {
    try {
      let requests = await getAllRequests();

      if (requests.data) {
        const filteredData = requests.data.map((item) => {
          return {
            id: item._id,
            status: item.status,
            updated_at: formatDistanceToNow(new Date(item.updated_at), {
              addSuffix: true,
            }),
            name: item.user_details
              ? item.user_details.personal_info.name
              : "---",

            email: item.user_details
              ? item.user_details.personal_info.email
              : "---",
            category: item.category_details
              ? item.category_details.name
              : "---",
            sub_category: item.sub_category_details
              ? item.sub_category_details.name
              : "---",
            address: item?.address,
            phoneNumber: item?.phoneNumber,
            user_availability_date:
              item.user_availability &&
              item.user_availability.date &&
              moment(item.user_availability.date, moment.ISO_8601).isValid()
                ? moment(item.user_availability.date).format("MMMM Do YYYY")
                : " ---- ",
            user_availability_slot: item.user_availability
              ? item.user_availability.slot
              : " ---- ",
            description: item.description ? item.description : "---",
          };
        });
        setRequests(filteredData);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
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

  async function UpdateExistingRequest(value) {
    try {
      // let result = await getAccountAsync(value.id);
      // if (result.data) {
      //     let obj = new Object({
      //         id: result.data._id,
      //         client_name: result.data.client_name,
      //         client_ids: result.data.client_ids,
      //         master_email: result.data.master_email,
      //         app_password: result.data.app_password,
      //         imap_address: result.data.imap_address,
      //         imap_port: result.data.imap_port,
      //         node_id: result.data.server._id,
      //         node_name: result.data.server.name
      //     });
      setAccount(value);
      setUpdateModal(true);
      //}
    } catch (err) {}
  }
  // datatable sorting
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // open modal for add master account and update master account
  const showAddModal = () => {
    setUpdateModal(true);
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

  const getMoreInfo = async () => {
    try {
      let result = await getAllRequestsStats();
      if (result.data) {
        setPendingRequests(result.data["pending"]);
        setInprogressRequests(result.data["inprogress"]);
        setCompletedRequests(result.data["completed"]);
        setDelayedRequests(result.data["delayed"]);
      }
    } catch (err) {}
  };

  const onPageLoad = async () => {
    try {
      setLoading(true);
      await AllRequests();
      await getMoreInfo();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onPageLoad();
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "6%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Mobile No",
    //   dataIndex: "mobile_no",
    //   key: "mobile_no",
    //   width: "8%",
    //   ...getColumnSearchProps("mobile_no"),
    //   sorter: (a, b) => a.mobile_no.length - b.mobile_no.length,
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "8%",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "sub_category",
      width: "8%",
      ...getColumnSearchProps("sub_category"),
      sorter: (a, b) => a.sub_category.length - b.sub_category.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Requested At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "13%",
      ...getColumnSearchProps("updated_at"),
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        const isMoreThanOneDay =
          new Date() - record.rawStatus > 24 * 60 * 60 * 1000;
        return (
          <span
            style={{
              borderRadius: "5px",
              color: "white",
              padding: "4px 10px",
              background: isMoreThanOneDay ? "#f50" : "#7cb305",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "9%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        let color = "";
        switch (text) {
          case "PENDING":
            color = "#f50";
            break;
          case "INPROGRESS":
            color = "#e99800";
            break;
          case "COMPLETED":
            color = "#7cb305";
            break;
          case "DELAYED":
            color = "#00a2e8";
            break;
          default:
            color = "white"; // Default color or handle other cases
        }

        return {
          children: (
            <span
              style={{
                borderRadius: "5px",
                color: "white",
                padding: "4px 10px",
                backgroundColor: color,
              }}
            >
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: "Action",
      key: "action",
      width: "2%",
      render: (_, record) => (
        <Space size="small">
          <Button
          className="dt_action_btns"
            type="link"
            size="small"
            onClick={() => showViewDetails(record)}
          >
            {" "}
            <EyeOutlined />{" "}
          </Button>
          <Button
           className="dt_action_btns"
            type="link"
            size="small"
            onClick={() => UpdateExistingRequest(record)}
          >
            {" "}
            <EditOutlined />{" "}
          </Button>
          <Button disabled type="link" size="small"  className="dt_action_btns">
            {" "}
            <DeleteOutlined />{" "}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <UpdateRequest
        show={UpdateModal}
        setShow={(bool) => setUpdateModal(bool)}
        data={account}
        refresh={setRequests}
        pRequests={setPendingRequests}
        iRequests={setInprogressRequests}
        crequests={setCompletedRequests}
        drequests={setDelayedRequests}
      />
      <RequestDetails
        show={viewDetailsModal}
        setShow={(bool) => setViewDetailsModal(bool)}
        data={requestDetails}
      />
      <ToastContainer />

      {/* <Badge.Ribbon text={"Total Accounts " + accountsCount} className="mybadge" placement="start"> */}
      <Card title="Requests List" bordered={true}>
        <Row justify="center">
          {/* <Col span={3} className="propertydetails">
                        <Card bordered={true} style={{background:'#ff6361',textAlign:'center'}}>
                            <Statistic
                            className="statics"
                                title="All </br>Requests"
                                value={totalProperties}
                                formatter={formatter}
                                valueStyle={{
                                    color: 'white',
                                }}
                            />
                        </Card>
                    </Col> */}
          <Col
            span={3}
            className="propertydetails"
            style={{ paddingRight: "5px" }}
          >
            <Card bordered={true} style={{ textAlign: "center" }}>
              <Statistic
                className="statics"
                title="Pending Requests"
                value={pendingRequests}
                formatter={formatter}
                valueStyle={{
                  color: "#4d4141",
                }}
              />
            </Card>
          </Col>
          <Col
            span={3}
            className="propertydetails"
            style={{ paddingRight: "5px" }}
          >
            <Card bordered={true} style={{ textAlign: "center" }}>
              <Statistic
                className="statics"
                title="InProgress Requests"
                value={inprogressRequests}
                formatter={formatter}
                valueStyle={{
                  color: "#4d4141",
                }}
              />
            </Card>
          </Col>
          <Col
            span={3}
            className="propertydetails"
            style={{ paddingRight: "5px" }}
          >
            <Card bordered={true} style={{ textAlign: "center" }}>
              <Statistic
                className="statics"
                title="Completed Requests"
                value={completedRequests}
                formatter={formatter}
                valueStyle={{
                  color: "#4d4141",
                }}
              />
            </Card>
          </Col>
          <Col
            span={3}
            className="propertydetails"
            style={{ paddingRight: "5px" }}
          >
            <Card bordered={true} style={{ textAlign: "center" }}>
              <Statistic
                className="statics"
                title="Delayed Requests"
                value={delayedRequests}
                formatter={formatter}
                valueStyle={{
                  color: "#4d4141",
                }}
              />
            </Card>
          </Col>
        </Row>

        <Row justify="end">
          <Col span={2}>
            <Button
              type="primary"
              size={size}
              onClick={onPageLoad}
              className="custombutton refresh_btn"
            >
              Refresh
            </Button>
          </Col>

          {/* <Col span={2}>

                            <Button type="primary" size={size} onClick={() => refreshAllAccounts()} className="custombutton">Refresh</Button>

                        </Col> */}
        </Row>

        <Row justify="space-between" align="stretch">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={requests}
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
export default ERequests;
