import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, Flex, Dropdown, Menu, Modal, message, Avatar } from 'antd';
import { faEllipsisVertical, faTrashAlt, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPatient from './EditPatient';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const { Title } = Typography;
const { confirm } = Modal;

const deleteHandler = (doctorId) => {
  confirm({
    title: 'Do you want to delete this doctor?',
    icon: <ExclamationCircleFilled />,
    content: 'Click ok to delete it',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios.delete(`http://localhost:3000/patient/${doctorId}`)
            .then(response => {
              if (response.status === 200) {
                message.success('Doctor information deleted successfully!');
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
        }, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() { },
  });
};

const ListPation = () => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState(null);



  useEffect(() => {
    console.log("ed")
    const fetchMedicalRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/medical/${selectedPatientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Assuming response.data is an array with a single object representing the medical record
        if (response.data.length > 0) {
          setMedicalRecord(response.data[0]);
          console.log(response.data[0])
        } else {
          console.log('No medical record found for the selected patient.');
        }
      } catch (error) {
        console.error('Error fetching medical record:', error);
      }
    };

    // Fetch medical record only if selectedPatientId is not null
    if (selectedPatientId) {
      fetchMedicalRecord();
    }
  }, [selectedPatientId, token]);

  
  const showModal = (doctorId, doctorData) => {
    setIsModalOpen(true);
    setSelectedPatientId(doctorId);
    setSelectedPatientData(doctorData);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showViewModal = (patientId, patientData) => {
    setSelectedPatientId(patientId);
    setSelectedPatientData(patientData);
    setIsViewModalOpen(true);
  };

  const handleViewModalOk = () => {
    setIsViewModalOpen(false);
  };

  const handleViewModalCancel = () => {
    setIsViewModalOpen(false);
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
          <span style={{ backgroundColor: generateRandomColor(), color: 'white', marginRight: '10px', fontSize: '19px', fontWeight: 'bold', borderRadius: '50%', width: '35px', height: '35px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
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
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button type="text" onClick={() => showViewModal(record._id, record)} icon={<FontAwesomeIcon icon={faEye} />} />
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
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        let response;
        if (decodedToken.role === "Admin") {
          response = await axios.get('http://localhost:3000/patient', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          response = await axios.get(`http://localhost:3000/consultation/patients/${decodedToken.userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [decodedToken.role, decodedToken.userId, token]);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper justify-between">
          <Title level={2}>List Patient</Title>
          <Button type="primary" onClick={start} className="mt-1" disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
        </Flex>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        pagination={{ pageSize: 6 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={patients}
      />
      <Modal title="Edit Patient" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditPatient patientId={selectedPatientId} patientData={selectedPatientData} />
      </Modal>
      <Modal title="Medical Record" open={isViewModalOpen} onOk={handleViewModalOk} onCancel={handleViewModalCancel}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Avatar style={{ backgroundColor: generateRandomColor(), marginRight: 10 }}>
            {selectedPatientData ? selectedPatientData.firstName.charAt(0) + selectedPatientData.lastName.charAt(0) : 'N/A'}
          </Avatar>
          <div>
            <h3>{selectedPatientData ? `${selectedPatientData.firstName} ${selectedPatientData.lastName}` : 'N/A'}</h3>
          </div>
        </div>

        <div>
  {medicalRecord ? (
    <>
      <p><strong>Allergies:</strong> {medicalRecord.allergies.join(', ')}</p>
      {medicalRecord.allergies.includes('Other') && <p><strong>Other Allergies:</strong> {medicalRecord.other_allergies}</p>}
      <p><strong>Operations:</strong> {medicalRecord.operations.join(', ')}</p>
      {medicalRecord.operations.includes('Other') && <p><strong>Other Operations:</strong> {medicalRecord.other_operations}</p>}
      <p><strong>Medications:</strong> {medicalRecord.medications.join(', ')}</p>
      {medicalRecord.medications.includes('Other') && <p><strong>Other Medications:</strong> {medicalRecord.other_medications}</p>}
      <p><strong>Diseases:</strong> {medicalRecord.diseases.join(', ')}</p>
      {medicalRecord.diseases.includes('Other') && <p><strong>Other Diseases:</strong> {medicalRecord.other_diseases}</p>}
    </>
  ) : (
    <p>No medical record found.</p>
  )}
</div>
      </Modal>
    </div>
  );
};

export default ListPation;
