import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import {addUser,getAllUsers,moreInfo } from "../../Services/AppUser";
import { getAllServerAsync } from "../../Services/Servers";
import { getAllClientAsync } from "../../Services/Client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDistanceToNow } from "date-fns";
import { ThreeDots } from "react-loader-spinner";
import Loader from "../../Loader";
const { SHOW_PARENT } = TreeSelect;



const AddAppUser = ({ show, setShow, refresh,totalUsers,activeUsers,blockUsers }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  let nodes = useRef();
  let clients = useRef();
  let client_ids = [];

  const handleCancel = () => {
    setShow(false);

  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onChange = (newValue) => {
    console.log('onChange ', value);
    setValue(newValue);
  };

  useEffect(() => {

    // getAllServerAsync().then((res) => {
    //   let tempNodes = []
    //   for (let i = 0; i < res.data.length; i++) {
    //     let node = {
    //       title: res.data[i].name,
    //       value: res.data[i]._id,
    //       key: Math.random()
    //     }
    //     tempNodes.push(node)
    //   }
    //   nodes.current = tempNodes;
    // });

    // getAllClientAsync().then((res) => {
    //   res.data = Array.from(new Set(res.data));
    //   let tempClients = []
    //   for (let i = 0; i < res.data.length; i++) {
    //     let client = {
    //       title: res.data[i],
    //       value: res.data[i],
    //     }
    //     tempClients.push(client);
    //   }
    //   clients.current = tempClients;
    // });

  }, []);

  const CreateUser = async (values) => {
    try{

       let obj = {
        "personal_info": {
          "name": values.user_name,
          "serviceType": values.serviceType,
          "cnic":values.cnic,
          "phoneNumber": values.phoneNumber,
          "role": "serviceProvider"
        },
        "preferences": {
          "preferred_language": values.preferred_language,
        },
        
        "contact_info": {
          "address": values.address,
          "city": values.city,
        }
      }
      let result = await addUser(obj);

      setShow(false);

      if(result){
        await refreshAllProperties();
        await getMoreInfo();
      }
      setLoading(false);
      form.resetFields();
    }catch(e){

    }

  }

  const refreshAllProperties = () => {
    getAllUsers().then((res) => {
        const filteredData = res.data.map((item) => {
            return {
              id: item._id,
            name: item.personal_info.name,
            email: item.contact_info.email,
            };
        });
        refresh(filteredData);
    });
}

const getMoreInfo = async () => {
  try {
    let result = await moreInfo();
    if (result.data) {
      totalUsers(result.data[0].all_users);
      activeUsers(result.data[0].active_users);
      blockUsers(result.data[0].block_users);
    }
  } catch (err) {}
};

  const tProps = {
    treeData: nodes.current,
    value,
    onChange,
    treeCheckable: false,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    placement: "bottomLeft",
    size: "large",
    style: {
      width: '100%',
    },
  };

  const cProps = {
    treeData: clients.current,
    value,
    onChange,
    treeCheckable: false,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    placement: "bottomLeft",
    size: "large",
    style: {
      width: '100%',
    },
  };

  const handleChange = (value) => {
    client_ids = value;
    console.log(`selected ${value}`);
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
      className='add-user-modal'
        title="Add Service Providers"
        visible={show}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={form.submit}>Submit</Button>,
        ]}
      >
        {contextHolder}
        <Form

          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          onFinish={CreateUser}
          size={componentSize}

          form={form}
        >
         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item label="Full Name" name="user_name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Service Type" name="serviceType">
            <Input />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item label="National ID" name="cnic" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
        <Form.Item label="Preferred Language" name="preferred_language" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="city" name="city">
            <Input />
          </Form.Item>

          </div>
       
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          
          </div>
          
         

        </Form>
      </Modal>

    </>
  );
}
export default AddAppUser;