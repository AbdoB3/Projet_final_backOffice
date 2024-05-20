import React, { useState, useEffect } from 'react';
import { Button, Table, Avatar, Typography, Flex, Dropdown, Menu, Modal } from 'antd';
import { faEllipsisVertical, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPatient from './EditPatient';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';


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
                  axios.delete(`http://localhost:3000/patient/${doctorId}`)
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


/*const data = [];
for (let i = 0; i < 44; i++) {
  data.push({
    key: i,
    name: (
      <>
        <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} />
        {' '}
        Edward King
        {' '}
        {i}
      </>
    ),
    age: 32,
    email: `Edward.King${i}@gmail.com`,
    phone: `06${i + i}4567890`
  });
}*/

const ListPation = () => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState([]);

  const showModal = (doctorId, doctorData) => {
      
      setIsModalOpen(true);
      setSelectedPatientId(doctorId); // Store the selected doctorId in state
      setSelectedPatientData(doctorData); // Store the selected doctor data in state
  
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
        <span style={{ backgroundColor: generateRandomColor(), color: 'white', marginRight: '10px',fontSize: '19px', fontWeight: 'bold', borderRadius: '50%', width: '35px', height: '35px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {record.firstName.charAt(0)}{record.lastName.charAt(0)}
        </span>
        {`${record.firstName} ${record.lastName}`}
      </span>
      ),
    },
    {
      title: 'City',
      dataIndex: ['location', 'city'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (text,record) => (

        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button type="text" onClick={() => showModal(record._id, record)} icon={<FontAwesomeIcon icon={faEdit} />}>Edit</Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button type="text" onClick={() => deleteHandler(record._id)}  icon={<FontAwesomeIcon icon={faTrashAlt} />}>Delete</Button>
              </Menu.Item>

            </Menu>
          }
        >
          <Button type="text" icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />
        </Dropdown>
      ),
    },
  ];


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/patient',{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      setPatients(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
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
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper justify-between">
          <Title level={2} >List Patient</Title>
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
        rowSelection={rowSelection} columns={columns} dataSource={patients} />
      <Modal title="Edit Patient" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditPatient  patientId={selectedPatientId} patientData={selectedPatientData}/>
      </Modal>
    </div>
  );
};
export default ListPation;