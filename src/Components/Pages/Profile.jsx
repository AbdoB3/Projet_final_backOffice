

import React from 'react';
import { Form, Input, Button, Select, Upload, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


const ProfileForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const uploadProps = {
    name: 'image',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // URL pour téléverser l'image
    listType: 'picture',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Please input your first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: 'Please input your last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sex" name="sex" rules={[{ required: true, message: 'Please select your sex!' }]}>
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="City" name={['address', 'city']} rules={[{ required: true, message: 'Please input your city!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" name={['address', 'state']} rules={[{ required: true, message: 'Please input your state!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" name={['address', 'country']} rules={[{ required: true, message: 'Please input your country!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Speciality" name="speciality" rules={[{ required: true, message: 'Please input your speciality!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Experience" name="experience" rules={[{ required: true, message: 'Please input your experience!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fee Per" name="feePer" rules={[{ required: true, message: 'Please input your fee per!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="From Time" name="fromTime" rules={[{ required: true, message: 'Please input your from time!' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="To Time" name="toTime" rules={[{ required: true, message: 'Please input your to time!' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;