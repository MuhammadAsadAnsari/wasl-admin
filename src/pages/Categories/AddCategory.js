import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import {addUser,getAllUsers,moreInfo } from "../../Services/AppUser";
import { createCategory,getAllCategories } from "../../Services/RequestCategories";
import { getAllClientAsync } from "../../Services/Client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader";
const { SHOW_PARENT } = TreeSelect;



const AddCategory = ({ show, setShow, refresh,totalCategories}) => {
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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

  }, []);

  const CreateCategory = async (values) => {

    try{
      let result = await createCategory(values);

      setShow(false);

      if(result){
        await refreshData();
      }

      setLoading(false);
      form.resetFields();
    }catch(e){

    }

  }

  const refreshData = () => {
    getAllCategories().then((res) => {
        totalCategories(res.data.categories.length);
        const filteredData = res.data.categories.map((item) => {
            return {
              id: item._id,
            name: item.name,
            };
        });
        refresh(filteredData);
        
    });
}

  return (
    <>
      {loading && <Loader />}
      <Modal
      className='add-user-modal'
        title="Add Category"
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
          onFinish={CreateCategory}
          size={componentSize}

          form={form}
        >
          <Form.Item  name="name">
            <Input placeholder="Category Name"/>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
}
export default AddCategory;