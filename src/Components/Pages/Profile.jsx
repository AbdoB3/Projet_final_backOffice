import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, TimePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';

const ProfileForm = () => {
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [formm, setFormm] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    sexe: "",
    speciality: "",
    imageUrl: "",
    fromTime: "",
    toTime: ""
  });
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/speciality");
        setSpecialities(response.data);
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    };

    const fetchData = async () => {
      fetchSpecialities();

      axios.get("http://localhost:3000/doctors/profile", { headers: { authorization: `Bearer ${token}` } })
        .then((response) => {
          const data = response.data;
          setFormm(data);
          form.setFieldsValue({
            ...data,
            fromTime: data.fromTime ? moment(data.fromTime, 'HH:mm') : null,
            toTime: data.toTime ? moment(data.toTime, 'HH:mm') : null,
          });
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    };

    fetchData();
  }, [form, token]);

  const onFinish = async (values) => {
    try {
      const id = formm._id;
      const response = await axios.put(`http://localhost:3000/doctors/${id}`, {
        ...values,
        imageUrl: formm.imageUrl,
        fromTime: values.fromTime ? values.fromTime.format('HH:mm') : '',
        toTime: values.toTime ? values.toTime.format('HH:mm') : ''
      }, { headers: { authorization: `Bearer ${token}` } });
      message.success('Doctor information updated successfully!');
      form.setFieldsValue(response.data);
    } catch (error) {
      console.error('Error updating doctor:', error);
      message.error('Failed to update doctor information.');
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const uploadProps = {
    name: 'file',
    action: 'https://api.cloudinary.com/v1_1/doagzivng/image/upload',
    data: {
      upload_preset: 'kj1jodbh',
    },
    listType: 'picture',
    onChange(info) {
      if (info.file.status === 'uploading') {
        console.log('Uploading...');
      }
      if (info.file.status === 'done') {
        console.log('File uploaded:', info.file.response);
        setFormm({ ...formm, imageUrl: info.file.response.secure_url });
      } else if (info.file.status === 'error') {
        console.error('Upload error:', info.file.error, info.file.response);
        message.error('Failed to upload image.');
      }
    }
  };
  const handleCancel = () => {
    form.setFieldsValue({
      ...formm,
      fromTime: formm.fromTime ? moment(formm.fromTime, 'HH:mm') : null,
      toTime: formm.toTime ? moment(formm.toTime, 'HH:mm') : null,
    });
  };
  return (
    
    <div className="p-5 border-2 shadow-lg border-grey-300 rounded">
            <h2 className="text-2xl font-bold mb-3">Welcome To Your Profile:</h2>

      <Form
        form={form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="justify-text"
      >
        {formm.imageUrl && (
          <div className="flex justify-center">
            <img
              src={formm.imageUrl}
              alt="Profile Image"
              className="rounded-full w-[150px] h-[150px] mb-5"
              />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Form.Item label="First Name" name="firstname" rules={[{ required: false, message: 'Please input your first name!' }]}>
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
          <Form.Item label="Sex" name="sexe" rules={[{ required: false, message: 'Please select your sex!' }]}>
            <Select>
              <Select.Option value="homme">Homme</Select.Option>
              <Select.Option value="femme">Femme</Select.Option>
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
            <Select>
              {specialities.map((speciality) => (
                <Select.Option key={speciality._id} value={speciality.nom}>
                  {speciality.nom}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Experience" name="experience" rules={[{ required: false, message: 'Please input your experience!' }]}>
            <Input />
          </Form.Item> 
          <Form.Item label="Fee Per" name="feePer" rules={[{ required: false, message: 'Please input your fee per!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="From Time" name="fromTime" rules={[{ required: false, message: 'Please input your from time!' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="To Time" name="toTime" rules={[{ required: false, message: 'Please input your to time!' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="Image" name="imageUrl">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />}>
            Save
          </Button>
          <Button type="default" htmlType="button" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;
