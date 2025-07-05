import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import {addUser,getAllUsers,moreInfo } from "../../Services/AppUser";
import { createCategory,getAllCategories,createSubCategory,getAllSubCategories } from "../../Services/RequestCategories";
import { getAllClientAsync } from "../../Services/Client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader";
const { SHOW_PARENT } = TreeSelect;



const AddSubCategory = ({ show, setShow, refresh,totalsubCategories}) => {
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cat, setCat] = useState();
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

  const loadCategories = async () => {
    try {
      let cat = await getAllCategories();
      console.log('Categories:', cat.data.categories);

      let tempcat = cat.data.categories.map((category) => ({
        value: category.name,
        title:category._id,
      }));

      setCat(tempcat);
    } catch (err) {
      console.error(err);
    }
  };



  const CreateSubCategory = async (values) => {
    try{

      const found = cat.find((element) => element.value == values.category );

      if(found != null && found != undefined){

        let result = await createSubCategory(found.title,values.name);

        //setShow(false);

        if(result.data){
          await refreshData();
          setLoading(false);
          //form.resetFields();
          toast.success(result.data.message);
        }else{
          toast.error("something went wrong.");
        }


      }


    }catch(e){

    }

  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const refreshData = async () => {
    let users = await getAllSubCategories();

      if (users.data) {
        totalsubCategories(users.data.sub_categories.length);
        const filteredData = users.data.sub_categories.map((item) => {
          return {
            id: item._id,
            subcategory_name: item.name,
            category_name : item.category_details.name,
            category_id : item.category_details._id
          };
        });
        refresh(filteredData);
      }
}
useEffect(() => {
  loadCategories();

}, []);
  return (
    <>
      {loading && <Loader />}
      <Modal
      className='add-user-modal'
        title="Add Sub Category"
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
          onFinish={CreateSubCategory}
          size={componentSize}

          form={form}
        >
             <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item  name="category">
          <Select
          placeholder="select category"
      style={{ width: 180 }}
      onChange={handleChange}
      options={cat}
    />
          </Form.Item>
          <Form.Item  name="name">
            <Input placeholder="Sub Category Name"/>
          </Form.Item>
          </div>
        </Form>
      </Modal>

    </>
  );
}
export default AddSubCategory;