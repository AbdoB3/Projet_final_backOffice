import React,{useEffect,useState} from 'react';
import { Form, Input, Button, Select, Upload, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProfileForm = () => {
    
  const [form] = Form.useForm();

  const [formm,setFormm] = useState({
    firstname: "",
    lastname: "",
    email:"",
    password:"",
    sexe:"",
    speciality:"",
    imageurl:""
});
useEffect(()=>{
    axios.get("http://localhost:3000/doctors/${doctorId}").then((response)=>{
       console.log(response.data);
       setFormm({...formm,firstname: response.data})
    })
   
},[])
  
useEffect(()=>{
    
    console.log(formm)
 },[formm])
 
   const onFinish = (values) => {
     console.log('Received values:', values);
   };
  

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const uploadProps = {
    name: 'file', // Cloudinary expects the file data under the 'file' key
    action: 'https://api.cloudinary.com/v1_1/doagzivng/image/upload', 
    data: {
      upload_preset: 'kj1jodbh', // Use the preset you created at the Cloudinary dashboard
    },
    listType: 'picture',
    onChange(info) {
        if (info.file.status === 'uploading') {
          console.log('Uploading...');
        }
        if (info.file.status === 'done') {
          console.log('File uploaded:', info.file.response); // Success
        } else if (info.file.status === 'error') {
          console.error('Upload error:', info.file.error, info.file.response); // Handle errors
        }
      }
  };
  return (
    <div className="p-7">
      <h2 className="text-2xl font-bold mb-10" >Welcome To Your  Profile : </h2>
      <Form 
        form={form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="justify-text"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <Form.Item label="First Name" name="firstname" initialValue={formm.firstname} onChange={(e)=>setFormm({...formm,firstname:e.target.value})} rules={[{ required: false, message: 'Please input your first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" rules={[{ required: false, message: 'Please input your last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: false, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: false, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: false, message: 'Please input your phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sex" name="sex" rules={[{ required: false, message: 'Please select your sex!' }]}>
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="City" name={['address', 'city']} rules={[{ required: false, message: 'Please input your city!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" name={['address', 'state']} rules={[{ required: false, message: 'Please input your state!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" name={['address', 'country']} rules={[{ required: false, message: 'Please input your country!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Speciality" name="speciality" rules={[{ required: false, message: 'Please input your speciality!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Experience" name="experience" rules={[{ required: false, message: 'Please input your experience!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fee Per" name="feePer" rules={[{ required: false, message: 'Please input your fee per!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="From Time" name="fromTime" rules={[{ required: false, message: 'Please input your from time!' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="To Time" name="toTime" rules={[{ required: false, message: 'Please input your to time!' }]}>
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