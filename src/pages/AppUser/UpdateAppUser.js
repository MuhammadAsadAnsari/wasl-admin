import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Modal, Form, TreeSelect, Switch, Select, message } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { addPropety, getAllUsers, updateProperty } from "../../Services/AppUser";
import { getAllServerAsync } from "../../Services/Servers";
import { getAllClientAsync } from "../../Services/Client";
import { toast } from 'react-toastify';
import { formatDistanceToNow } from "date-fns";
import Loader from "../../Loader";

const { SHOW_PARENT } = TreeSelect;

const UpdateAppUser = ({ show, setShow, data, refresh }) => {

    const [componentSize, setComponentSize] = useState('default');
    const [value, setValue] = useState();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    let servers = useRef();
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

    const handleChange = (value) => {
        client_ids = value;
        console.log(`selected ${value}`);
    };


    const update = async (values) => {
        setLoading(true);
        let response;
        try {
            let obj = new Object({
                type: values.type,
                location: values.location,
                project: values.project,
                bedrooms: values.bedrooms,
                rent: values.rent,
                size: values.size,
            });

            response = await updateProperty(values.id, obj);
            form.resetFields();
            
            setShow(false);

            if (response) {
                refreshAllProperties();
            }

            setLoading(false);
            toast.success("updated.");
        }
        catch (err) {
            setLoading(false);
            toast.error(err.response.data.error);
        }
    };

    const refreshAllProperties = () => {
        getAllUsers().then((res) => {
            const filteredData = res.data.map((item) => {
                return {
                    id: item._id,
                        type: item.personal_info.name,
                        location: item.contact_info.email,
                        project: item.contact_info.home_ph_no,
                        bedrooms: item.contact_info.office_ph_no,
                        rent: item.contact_info.attendent_no,
                        size: item.contact_info.attendent_name,
                };
            });
            refresh(filteredData);
        });
    }
    const tProps = {
        treeData: servers.current,
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
    useEffect(() => {
        if (data != null) {
            form.setFieldsValue(data)
        }
    }, [data, form]);

    return (
        <>
            {loading && <Loader />}
            <Modal title="Update Property" open={show} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>  Cancel    </Button>,
                <Button type="primary" onClick={form.submit} > Submit </Button>
            ]}>
                {contextHolder}
                <Form
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    onFinish={update}
                    size={componentSize}
                    style={{
                        maxWidth: 800,
                        marginTop: 25
                    }}
                    form={form}
                >
                    <Form.Item label="Id" name="id" style={{ display: 'none' }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Project" name="project">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Bedrooms" name="bedrooms">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rent" name="rent" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Size" name="size" >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}
export default UpdateAppUser;