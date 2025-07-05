import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select, Table } from 'antd';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader";

const RequestDetails = ({ show, setShow, data, refresh }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setShow(false);
  };

  const columns = [
    {
      title: "REQUEST DETAILS",
      children: [
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          render: (text) => <b>{text}</b>,
        },

        {
          title: "Phone No",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
          render: (text) => <b>{text}</b>,
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
          title: "User Avaliblity Date",
          dataIndex: "user_availability_date",
          key: "user_availability_date",
          render: (text) => <b>{text}</b>,
        },
        {
          title: "User Avaliblity Hour",
          dataIndex: "user_availability_slot",
          key: "user_availability_slot",
          render: (text) => <b>{text}</b>,
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (text) => <b>{text}</b>,
        },
      ],
    },
  ];

  useEffect(() => {
    setValue([data]);
  }, [data]);

  return (
    <>
      {loading && <Loader />}
      <Modal
        width={900}
        visible={show}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>
        ]}
      >
        {contextHolder}
        <Table columns={columns} dataSource={value} pagination={false}/>
      </Modal>

    </>
  );
}
export default RequestDetails;