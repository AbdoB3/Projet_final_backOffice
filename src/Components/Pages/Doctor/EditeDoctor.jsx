import React,{useEffect} from 'react';
import { Form, Input, Button, Select, message,Upload, TimePicker } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const EditDoctor = ({doctorId,doctorData}) => {
  const [form] = Form.useForm();

useEffect(()=>{
  form.resetFields();
}
,[doctorData])

 const onFinish = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/doctors/${doctorId}`, values);
      console.log("response",response.data);
      // Assuming the response contains the updated doctor object
      message.success('Doctor information updated successfully!');
      // You can update the doctor state in the parent component here
    } catch (error) {
      console.error('Error updating doctor:', error);
      message.error('Failed to update doctor information.');
    }
  };


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-10" >Welcome To Your  Profile : </h2>
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="justify-text"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Form.Item label="First Name" name="firstname" initialValue={doctorData.firstname} rules={[{ required: true, message: 'Please input your first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" initialValue={doctorData.lastname} rules={[{ required: true, message: 'Please input your last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={doctorData.email} rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" initialValue={doctorData.phone} rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sex" name="sexe"  initialValue={doctorData.sexe}rules={[{ required: true, message: 'Please select your sex!' }]}>
            <Select>
              <Select.Option value="homme">Male</Select.Option>
              <Select.Option value="femme">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="City" name={['address', 'city']} initialValue={doctorData.address.city} rules={[{ required: true, message: 'Please input your city!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" initialValue={doctorData.address.city} name={['address', 'state']} rules={[{ required: true, message: 'Please input your state!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" initialValue={doctorData.address.country} name={['address', 'country']} rules={[{ required: true, message: 'Please input your country!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Speciality" initialValue={doctorData.speciality} name="speciality" rules={[{ required: true, message: 'Please input your speciality!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Experience" initialValue={doctorData.experience} name="experience" rules={[{ required: true, message: 'Please input your experience!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fee Per" name="feePer" initialValue={doctorData.feePer} rules={[{ required: true, message: 'Please input your fee per!'}]}>
            <Input />
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />}>
            Save
          </Button>
          <Button type="primary" onClick={()=>{form.resetFields()}} icon={<FontAwesomeIcon icon={faSave} />}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDoctor;