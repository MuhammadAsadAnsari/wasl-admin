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
          "emirtates_id": values.emirtates_id,
          "passport_no":values.passport_no,
          "passport_expiry": values.passport_expiry,
          "residence_visa": values.residence_visa,
          "visa_expiry": values.visa_expiry,
          "nationality": values.nationality
        },
        "preferences": {
          "preferred_language": values.preferred_language,
          "contact_mode": values.contact_mode
        },
        "residence_info" : {
          "floor" : values.floor,
          "flat_no" : values.flat_no,
          "building_name" : values.building_name
        },
        "contact_info": {
          "primary_address": values.primary_address,
          "secondary_address": values.secondary_address,
          "city": values.city,
          "po_box": values.po_box,
          "mobile_no": values.mobile_no,
          "email": values.email,
          "home_ph_no": values.home_ph_no,
          "office_ph_no": values.office_ph_no,
          "fax": values.fax,
          "attendent_no": values.attendent_no,
          "attendent_name": values.attendent_name
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
            mobile_no: item.contact_info.mobile_no,
            email: item.contact_info.email,
            home_ph_no: item.contact_info.home_ph_no,
            office_ph_no: item.contact_info.office_ph_no,
            attendent_no: item.contact_info.attendent_no,
            attendent_name: item.contact_info.attendent_name,
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
        title="Add User"
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
          <Form.Item label="Nationality" name="nationality">
            <Input />
          </Form.Item>
          <Form.Item label="Emirtates Id" name="emirtates_id">
            <Input />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item label="Passport No" name="passport_no" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="Passport Expiry" name="passport_expiry"  style={{marginLeft : '5px'}} >
            <Input/>
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'  }}>
          <Form.Item label="Residence Visa" name="residence_visa" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="Visa Expiry" name="visa_expiry" style={{marginLeft : '5px'}} >
            <Input />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item label="Preferred Language" name="preferred_language" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="Contact Mode" name="contact_mode" style={{marginLeft : '5px'}}>
            <Input/>
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item label="Primary Address" name="primary_address">
            <Input />
          </Form.Item>
          <Form.Item label="Secondary Address" name="secondary_address">
            <Input />
          </Form.Item>
          <Form.Item label="city" name="city">
            <Input />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item label="PO Box" name="po_box">
            <Input />
          </Form.Item>
          <Form.Item label="Mobile No" name="mobile_no" >
            <Input/>
          </Form.Item>
          <Form.Item label="Email"  name="email">
            <Input  />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item label="Home Ph No" name="home_ph_no">
            <Input />
          </Form.Item>
          <Form.Item label="Office Ph No" name="office_ph_no">
            <Input />
          </Form.Item>
          <Form.Item label="Fax" name="fax">
            <Input />
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item label="Attendent No" name="attendent_no" style={{marginRight : '5px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="Attendent Name" name="attendent_name" style={{marginLeft : '5px'}} >
            <Input/>
          </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item label="Floor No" name="floor">
            <Input />
          </Form.Item>
          <Form.Item label="Flat No" name="flat_no">
            <Input />
          </Form.Item>
          <Form.Item label="Building Name" name="building_name">
            <Input />
          </Form.Item>
          </div>
          {/* <Form.Item label="App Password" name="password">
            <Input />
          </Form.Item> */}


        </Form>
      </Modal>

    </>
  );
}
export default AddAppUser;