import React from 'react';
import { Button, Form, Input, InputNumber,message } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
};
/* eslint-enable no-template-curly-in-string */



const EditPatient = ({patientId,patientData}) => {

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/patient/${patientId}`, values);
      // Assuming the response contains the updated doctor object
      message.success('Patient information updated successfully!');

      // You can update the doctor state in the parent component here
    } catch (error) {
      console.error('Error updating patient:', error);
      message.error('Failed to update patient information.');
    }
  };



return(
    
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name='firstName'
      label="First Name"
      initialValue={patientData.firstName}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name='lastName'
      label="Last Name"
      initialValue={patientData.lastName} 
    >
      <Input />
    </Form.Item>
    <Form.Item
      name='phone'
      label="Phone"
      initialValue={patientData.phone}
      
    >
      <InputNumber />
    </Form.Item>
    <Form.Item name='email' label="Email"
    initialValue={patientData.email}
    rules={[
      {
        type: 'email',
      },
    ]}
    >
      <Input />
    </Form.Item>
    <Form.Item name='sexe' label="Sexe" initialValue={patientData.sexe}>
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)
};
export default EditPatient;