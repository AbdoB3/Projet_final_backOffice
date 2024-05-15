import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Form, Input, Modal, Card } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const SpecialityDashboard = () => {
    const [specialities, setSpecialities] = useState([]);
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentSpeciality, setCurrentSpeciality] = useState(null);
    const token = localStorage.getItem('token');

    const fetchSpecialities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/speciality', { headers: { authorization: `Bearer ${token}` } });
            setSpecialities(response.data);
        } catch (error) {
            message.error('Failed to fetch specialities.');
        }
    };

    useEffect(() => {
        fetchSpecialities();
    }, []);

    const handleDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this speciality?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteSpeciality(id);
            }
        });
    };

    const deleteSpeciality = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/speciality/${id}`, { headers: { authorization: `Bearer ${token}` } });
            message.success('Speciality deleted successfully');
            fetchSpecialities();
        } catch (error) {
            message.error('Failed to delete speciality.');
        }
    };

    const handleAddNew = async (values) => {
        const existingSpeciality = specialities.find(speciality => speciality.nom.toLowerCase() === values.nom.toLowerCase());
        if (existingSpeciality) {
            message.error('Speciality with the same name already exists.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/speciality', values, { headers: { authorization: `Bearer ${token}` } });
            setSpecialities([...specialities, response.data]);
            message.success('Speciality added successfully');
            addForm.resetFields();
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(`Failed to add speciality: ${error.response.data.message}`);
            } else {
                message.error('Failed to add speciality.');
            }
        }
    };

    const handleEdit = (record) => {
        setCurrentSpeciality(record);
        editForm.setFieldsValue(record);
        setIsEditModalVisible(true);
    };

    const handleEditSave = async (values) => {
        // Check if the speciality name already exists in the list excluding the current speciality
        const isDuplicate = specialities.some(speciality => 
            speciality._id !== currentSpeciality._id && 
            speciality.nom.toLowerCase() === values.nom.toLowerCase()
        );
    
        if (isDuplicate) {
            message.error('A speciality with this name already exists.');
            return;
        }
    
        try {
            await axios.put(`http://localhost:3000/speciality/${currentSpeciality._id}`, values, { headers: { authorization: `Bearer ${token}` } });
            message.success('Speciality updated successfully');
            setIsEditModalVisible(false);
            fetchSpecialities();  // Refresh the list to show updated data
        } catch (error) {
            message.error('Failed to update speciality.');
        }
    };
    

  
    
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'nom',
            key: 'nom',
            render: text => <span className={`font-bold`}>{text}</span>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space size="middle" className="flex justify-center">
                    <Button icon={<EditOutlined style={{ color: 'green' }}/> } onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined style={{ color: 'red' }} />} onClick={() => handleDelete(record._id)} />
                </Space>
            )
        }
    ];

    return (
<>
<h2 className="text-2xl font-bold">Specialities  :</h2>

        <div className="p-7 flex flex-wrap justify-between mt-4 md:mt-8 lg:mt-5">

    <Table
        className="w-full lg:w-7/12 border rounded shadow-lg lg:mr-4" // Ajustement de la largeur du tableau
        columns={columns}
        dataSource={specialities}
        rowKey="_id"
        pagination={{ pageSize: 4 }}
    />
    <Card className="p-7 w-full lg:w-2/5 border-2 rounded shadow-lg"> {/* Ajusté pour les grands écrans */}
        <h2 className="text-2xl font-bold mb-3">Add New Speciality</h2>
        <Form
            form={addForm}
            onFinish={handleAddNew}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                label="Name"
                name="nom"
                rules={[{ required: true, message: 'Please input the speciality name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Add Speciality
                </Button>
            </Form.Item>
        </Form>
    </Card>
</div>
<div className="w-full md:w-1/3">

            <Modal
                title="Edit Speciality"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form
                    form={editForm}
                    onFinish={handleEditSave}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Name"
                        name="nom"
                        rules={[{ required: true, message: 'Please input the speciality name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
</>

    );
};

export default SpecialityDashboard;
