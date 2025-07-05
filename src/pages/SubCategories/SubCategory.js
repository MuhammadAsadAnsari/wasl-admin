import AddUser from "./AddSubCategory";
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
} from "@ant-design/icons";
import {
  getAllSubCategories
  } from "../../Services/RequestCategories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import CountUp from "react-countup";

const SubCategory = () => {
  const [, setFilteredInfo] = useState({});
  const [, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [AddModal, setAddModal] = useState(false);
  const [size] = useState("large");
  const [requestCategories, setRequestCategories] = useState();
  const [totalCategories, setTotalCategories] = useState();
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
  const Categories = async () => {
    try {
      let users = await getAllSubCategories();

      if (users.data) {
        setTotalCategories(users.data.sub_categories.length);
        const filteredData = users.data.sub_categories.map((item) => {
          return {
            id: item._id,
            subcategory_name: item.name,
            category_name : item.category_details.name,
            category_id : item.category_details._id
          };
        });
        setRequestCategories(filteredData);
        setLoading(false);
      }
    } catch (e) {}
  };


  useEffect(() => {
    setLoading(false);
    Categories();
  }, []);

  const columns = [
    {
      title: "Sub Category Id",
      dataIndex: "id",
      key: "id",
      width: "12%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sub Category",
      dataIndex: "subcategory_name",
      key: "subcategory_name",
      width: "16%",
      ...getColumnSearchProps("subcategory_name"),
      sorter: (a, b) => a.subcategory_name.length - b.subcategory_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      width: "16%",
      ...getColumnSearchProps("category_name"),
      sorter: (a, b) => a.category_name.length - b.category_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category Id",
      dataIndex: "category_id",
      key: "category_id",
      width: "16%",
      ...getColumnSearchProps("category_id"),
      sorter: (a, b) => a.category_id.length - b.category_id.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      {loading && <Loader />}

      <AddUser
        show={AddModal}
        setShow={(bool) => setAddModal(bool)}
        refresh={setRequestCategories}
        totalsubCategories={setTotalCategories}
      />

      {/* <UpdateUser
        show={UpdateModal}
        setShow={(bool) => setUpdateModal(bool)}
        data={account}
        refresh={setCategories}
      /> */}

      <ToastContainer />

      {/* <Badge.Ribbon text={"Total Accounts " + accountsCount} className="mybadge" placement="start"> */}
      <Card title="Sub Categories List" bordered={true}>
        <Row justify="center">
          <Col span={3} className="propertydetails">
            <Card
              bordered={true}
              style={{  textAlign: "center",marginRight : '5px' }}
            >
              <Statistic
                className="statics"
                title="Total Sub Categories"
                value={totalCategories}
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
              + Sub Category
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
              dataSource={requestCategories}
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
export default SubCategory;
