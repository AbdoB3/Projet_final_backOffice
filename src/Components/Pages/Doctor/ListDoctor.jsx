import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Avatar, Typography, Flex, Dropdown, Menu, Modal, message, Switch } from 'antd';
import { faEllipsisVertical, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditDoctor from './EditeDoctor';
import axios from 'axios';
import DoctorStatusSwitch from './DoctorStatusSwitch';
DoctorStatusSwitch


const { Title } = Typography;
const { confirm } = Modal;


const deleteHandler = (doctorId) => {
    confirm({
        title: 'Do you want to delete this doctor?',
        icon: <ExclamationCircleFilled />,
        content: 'Click ok to delete it',
        onOk() {
            return new Promise((resolve, reject) => {
                // Simulate a delay before resolving or rejecting the Promise
                setTimeout(() => {
                    // Make an HTTP DELETE request to delete the doctor
                    axios.delete(`http://localhost:3000/doctors/${doctorId}`)
                        .then(response => {
                            if (response.status === 200) {
                                message.success('Doctor information deleted successfully!');
                                //add notif 
                                resolve();
                            } else {
                                reject();

                            }
                        })
                        .catch(error => {
                            message.error('Failed to delete doctor.');
                            console.error('Error deleting doctor:', error);
                            reject();
                        });
                }, 1000); // Adjust the delay time as needed
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() { },
    });
};



const ListDoctor = () => {
    const token = localStorage.getItem('token');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState([]);
    const [selectedDoctorData, setSelectedDoctorData] = useState([]);

    const showModal = (doctorId, doctorData) => {

        setIsModalOpen(true);
        setSelectedDoctorId(doctorId); // Store the selected doctorId in state
        setSelectedDoctorData(doctorData); // Store the selected doctor data in state

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} />
                    {' '}
                    {`${record.firstname} ${record.lastname}`}
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Speciality',
            dataIndex: 'speciality',
        },
        {
            title: 'Sexe',
            dataIndex: 'sexe',
        },
        {
            title: 'Status',
            dataIndex: 'state',
            render: (_, { state }) => {
                if (!state) {
                    return "null"; // or you can return a default tag or message
                }
                let color = state.length > 6 ? 'geekblue' : 'green';
                if (state === 'blocked') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color}>
                        {state.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'operation',
            render: (text, record) => (


                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1">
                                <Button type="text" onClick={() => showModal(record._id, record)} icon={<FontAwesomeIcon icon={faEdit} />}>Edit</Button>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Button type="text" onClick={() => deleteHandler(record._id)} icon={<FontAwesomeIcon icon={faTrashAlt} />}>Delete</Button>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text" icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />
                </Dropdown>
            ),
        },

        {
            title: 'Active',
            key: 'active',
            render: (text, record) => (


                <DoctorStatusSwitch id={record._id} /> // Render DoctorStatusSwitch component
            ),
        },

    ];


    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/doctors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Doctors:', error);
            setLoading(false);
        }
    };

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return (
        <>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper justify-between">
                    <Title level={2} >List Doctors</Title>
                    <Button type="primary" onClick={start} className="mt-1" disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                </Flex>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table
                pagination={{ pageSize: 6 }}
                rowSelection={rowSelection} columns={columns} dataSource={doctors} />
            <Modal title="Edit Doctor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EditDoctor doctorId={selectedDoctorId} doctorData={selectedDoctorData} />
            </Modal>

        </>
    );
};
export default ListDoctor;