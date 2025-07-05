import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select, Table } from 'antd';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader";

const VisitorsDetails = ({ show, setShow, data, refresh }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setShow(false);
  };

  const columns = [
    {
      title: 'REQUEST DETAILS',
      children: [
        {
          title: 'Building Name',
          dataIndex: 'building_name',
          key: 'building_name',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Flat Number',
          dataIndex: 'flat_no',
          key: 'flat_no',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Floor',
          dataIndex: 'floor',
          key: 'floor',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Passport No',
          dataIndex: 'passport',
          key: 'passport',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'No Of Visitors',
          dataIndex: 'number_of_visitors',
          key: 'number_of_visitors',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Passport',
          dataIndex: 'passport',
          key: 'passport',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Mobile No',
          dataIndex: 'mobile_no',
          key: 'mobile_no',
          render: (text) => <b>{text}</b>
        }
      ]
    }
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
export default VisitorsDetails;