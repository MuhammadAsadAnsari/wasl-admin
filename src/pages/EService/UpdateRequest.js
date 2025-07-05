/// ***************************<Imports>********************************* ///

import 'react-toastify/dist/ReactToastify.css'
import { Input, Modal, Form, Button ,Select} from 'antd';
import { useState, useEffect } from 'react';
import { updateRequestStatus,getAllRequests,getAllRequestsStats } from "../../Services/Requests";
import Loader from "../../Loader";
import { toast } from 'react-toastify';
import { formatDistanceToNow } from "date-fns";
import moment from 'moment';
/// ***************************</Imports>********************************* ///
const UpdateRequest = ({ show, setShow, data, refresh,pRequests,iRequests,crequests,drequests }) => {

    /// ***************************<Hooks>********************************* ///

    const [componentSize, setComponentSize] = useState('default');
    const [name] = useState('');
    const [ipAddress] = useState('');
    const [port] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    /// ***************************</Hooks>********************************* ///

    /// ***************************<Functions>********************************* ///

    const handleCancel = () => {
        setShow(false);
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const UpdateStatus = async (values) => {

        setLoading(true);

        try {
            let response = await updateRequestStatus(data.id, values);

            setShow(false);

            if (response.data) {
                form.resetFields();
                await getRequests();
                await getMoreInfo();
                toast.success(response.data.message);
            }



            setLoading(false);
        } catch (error) {

            setLoading(false);
            toast.warn(error);
        }
    };

    const getMoreInfo = async () => {
        try {

            let result = await getAllRequestsStats();
            if (result.data) {
                pRequests(result.data["pending"]);
                iRequests(result.data["inprogress"]);
                crequests(result.data["completed"]);
                drequests(result.data["delayed"]);
            }
        } catch (err) {

        }
    }

    // get all servers after api calls
    async function getRequests() {
        try {
            
            let requests = await getAllRequests();

            if (requests.data) {
                const filteredData = requests.data.map((item) => {
                    return {
                        id: item._id,
                        status: item.status,
                        updated_at: formatDistanceToNow(new Date(item.updated_at), { addSuffix: true }),
                        name: item.user_details.personal_info.name,
                        mobile_no: item.user_details.contact_info.mobile_no,
                        email: item.user_details.contact_info.email,
                        category : item.category_details.name,
                        sub_category :  item.sub_category_details ? item.sub_category_details.name : "---",
                        building_name :  item.address_details.building_name,
                        flat_no : item.address_details.flat_no,
                        floor : item.address_details.floor,
                        user_availability_date : moment(item.user_availability.date).format('MMMM Do YYYY'),
                        user_availability_slot: item.user_availability.slot,
                        message : item.message ? item.sub_category_details.name : "---",
                    };
                })
                refresh(filteredData)
            }

        } catch (error) {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (data != null) {
            //form.setFieldsValue(data)
        }
    }, [data, form]);
    /// ***************************</Function>********************************* ///

    /// ***************************<View>********************************* ///

    return (
        <>
        {loading && <Loader />}
        <Modal title="Update Request" open={show} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>  Cancel    </Button>,
                <Button type="primary" onClick={form.submit} > Submit </Button>
            ]}>
                {/* //{contextHolder} */}
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
                    onFinish={UpdateStatus}
                    size={componentSize}
                    style={{
                        maxWidth: 800,
                        marginTop: 25
                    }}
                    form={form}
                >

                    <Form.Item label="Status" name="status">
                        <Select>
                            <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                            <Select.Option value="INPROGRESS">INPROGRESS</Select.Option>
                            <Select.Option value="DELAYED">DELAYED</Select.Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );

    /// ***************************</View>********************************* ///
}
export default UpdateRequest;


