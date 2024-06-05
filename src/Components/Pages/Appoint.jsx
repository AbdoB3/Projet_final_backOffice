import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';




const MyTable = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');
  const decodedUser =  token? jwtDecode(token):""
  const userLoged = decodedUser.userId
  const role = decodedUser.role


  //....................Very Slow..................................
  useEffect(() => {
    const fetchData = async () => {
      decodedUser.role === "Admin" ? (
        async () => {
          try {
            const response = await axios.get('http://localhost:3000/consultation');
            const appointmentData = response.data;
  
            // Fetch doctor names for each appointment
            const updatedAppointments = await Promise.all(appointmentData.map(async (appointment) => {
              try {
                const docPatiResponse = await axios.get(`http://localhost:3000/patient/${appointment.doctor_id}/${appointment.patient_id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                const doctorName = docPatiResponse.data.docName;
                const patientName = docPatiResponse.data.patName;
                return { ...appointment, doctorName, patientName };
              } catch (error) {
                console.error('Error fetching doctor and patient data:', error);
                return { ...appointment, doctorName: '', patientName: '' };
              }
            }));
            // Update state with combined data
            setAppointments(updatedAppointments);
            console.log("it's Admin")
  
          } catch (error) {
            console.error('Error fetching appointment data:', error);
          }
        }
      )() : (
        async () => {
          try {
            const responseDoc = await axios.get(`http://localhost:3000/consultation/doctor/${userLoged}`);
            const docConsultations = responseDoc.data;

            const updatedAppointments = await Promise.all(docConsultations.map(async (appointment) => {
              try {
                const docPatiResponse = await axios.get(`http://localhost:3000/patient/${appointment.patient_id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                const patientName = docPatiResponse.data.firstName + " " + docPatiResponse.data.lastName;
                return { ...appointment, patientName };
              } catch (error) {
                console.error('Error fetching doctor and patient data:', error);
                return { ...appointment, patientName: '' };
              }
            }));
            setAppointments(updatedAppointments)
          } catch (error) {
            console.error('Error fetching doctor consultations:', error);
          }
        }
      )();
    };
  
    fetchData();
  }, [decodedUser.role, userLoged, token]);
  

  const columns = [
    {
      title: 'Appointment ID',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Motif',
      dataIndex: 'motif_consultation',
      key: 'motif_consultation',
      width: '20%',
      align: 'center',
      render: motifs => motifs.join(', ')
    }, // Join array elements into a single string
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patient_id',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Time',
      dataIndex: 'date_consultation',
      key: 'date_consultation',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'consultation_type',
      key: 'consultation_type',
      width: '20%',
      align: 'center',
    },
  ];

  if (role === 'Admin') {
    columns.splice(1, 0, {
      title: 'Doctor Name',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: '20%',
      align: 'center',
    });
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-start">Appointments</h1>
      <Table
        dataSource={appointments}
        columns={columns}
        bordered
        size="middle"
        pagination={{ pageSize: 9 }}
        style={{ backgroundColor: 'white' }}
      />
    </>
  );
};

export default MyTable;
