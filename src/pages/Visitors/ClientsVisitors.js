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
  Select
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
import { getAllVisitors,visitorCheckedIn,getAllVisitorsStats } from "../../Services/Visitors";
import UpdateRequest from "./UpdateRequest";
import VisitorsDetails from "./VisitorsDetails";
import moment from "moment";
import { isValid,format } from 'date-fns';

const { Option } = Select;
const ClientsVisitors = () => {
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

  const AllVisitors = async () => {
    try {
      let requests = await getAllVisitors();

      if (requests.data) {
        const filteredData = requests.data.map((item) => {
          return {
            id: item._id,
            status: item.status,
            updated_at:
  item.updated_at && isValid(new Date(item.updated_at))
    ? formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })
    : "---",
            name: item.name,
            mobile_no: item.mobile_no,
            email: item.email,
            building_name: item.address_details.building_name,
            flat_no: item.address_details.flat_no,
            floor: item.address_details.floor,
            passport: item.passport,
            number_of_visitors: item.number_of_visitors,
            start_day: item.start_day,
            end_day: item.end_day,
            city: item.city,
            country: item.country,
            is_checked_in: item.is_checked_in,


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
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1890ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });



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
      {dataIndex === 'status' ? (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder={`Select ${dataIndex}`}
          value={selectedKeys}
          onChange={(values) => setSelectedKeys(values)}
          onBlur={() => handleSearch(selectedKeys, confirm, dataIndex)}
        >
          <Option key="PENDING">PENDING</Option>
          <Option key="APPROVED">APPROVED</Option>
          {/* Add other status options as needed */}
        </Select>
      ) : (
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
            display: 'block',
          }}
        />
      )}
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
          Close
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
    dataIndex === 'status'
      ? value.some((status) =>
          record[dataIndex].toString().toLowerCase().includes(status.toLowerCase())
        )
      : record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

  const handleCheckInToggle = async (recordId, checked) => {
    try {
      // Make a backend API call to update the is_checked_in status

      let obj = {
        is_checked_in : checked
      }
      const response = await visitorCheckedIn(recordId, obj);
      onPageLoad();
      // Handle success or update the local state accordingly
      // (You may need to maintain state for your data)
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
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
      let result = await getAllVisitorsStats();
      if (result.data) {
        setPendingRequests(result.data[0]["isCheckedInTrue"][0]["count"]);
        setInprogressRequests(result.data[0]["statusPending"][0]["count"]);
        // setCompletedRequests(result.data["completed"]);
        // setDelayedRequests(result.data["delayed"]);
      }
    } catch (err) {}
  };

  const onPageLoad = async () => {
    try {
      setLoading(true);
      await AllVisitors();
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
        title: "Start Day",
        dataIndex: "start_day",
        key: "start_day",
        width: "8%",
        ...getColumnSearchProps("start_day"),
        sorter: (a, b) => a.start_day.length - b.start_day.length,
        sortDirections: ["descend", "ascend"],
        render: (startDay) => {
            try {
              // Attempt to create a valid Date object
              const parsedDate = new Date(startDay);
          
              if (isNaN(parsedDate.getTime())) {
                // If parsing fails, display "---"
                return '---';
              }
          
              // If parsing succeeds, format the date
              return format(parsedDate, "do MMMM yyyy");
            } catch (error) {
              console.error("Error in rendering Start Day:", error);
              return '---'; // or handle the error in a way that suits your application
            }
          },
          
      },
    {
      title: "End Day",
      dataIndex: "end_day",
      key: "end_day",
      width: "8%",
      ...getColumnSearchProps("end_day"),
      sorter: (a, b) => a.end_day.length - b.end_day.length,
      sortDirections: ["descend", "ascend"],
    //   render: (endDay) => format(new Date(endDay), "do MMMM yyyy"),
      render: (endDay) => {
        try {
          // Attempt to create a valid Date object
          const parsedDate = new Date(endDay);
      
          if (isNaN(parsedDate.getTime())) {
            // If parsing fails, display "---"
            return '---';
          }
      
          // If parsing succeeds, format the date
          return format(parsedDate, "do MMMM yyyy");
        } catch (error) {
          console.error("Error in rendering Start Day:", error);
          return '---'; // or handle the error in a way that suits your application
        }
      },
      
    },
    {
        title: "Is Checked In",
        dataIndex: "is_checked_in",
        key: "is_checked_in",
        width: "9%",
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={(checked) => handleCheckInToggle(record.id, checked)}
            checkedChildren={<span style={{ color: "#fff" }}>Yes</span>}
            unCheckedChildren={<span style={{ color: "#fff" }}>No</span>}
          />
        ),
      },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "9%",
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
            case "REJECTED":
              color = "#f00";
              break;
            case "ACCEPTED":
              color = "#7cb305";
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
      width: "8%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            onClick={() => showViewDetails(record)}
          >
            {" "}
            <EyeOutlined />{" "}
          </Button>
          <Button
            type="link"
            size="small"
             onClick={() => UpdateExistingRequest(record)}
          >
            {" "}
            <EditOutlined />{" "}
          </Button>
          <Button type="link" size="small">
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
      <VisitorsDetails
        show={viewDetailsModal}
        setShow={(bool) => setViewDetailsModal(bool)}
        data={requestDetails}
      />
      <ToastContainer />

      {/* <Badge.Ribbon text={"Total Accounts " + accountsCount} className="mybadge" placement="start"> */}
      <Card title="Visitors List" bordered={true}>
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
                title="CheckedIn Visitors"
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
                title="Pending Updates"
                value={inprogressRequests}
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
              className="custombutton"
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
export default ClientsVisitors;
