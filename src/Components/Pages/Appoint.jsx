import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },
  {
    ID: 'Apooint1456789',
    Doctor: 'Bennis Ali',
    Patient: 'Laila Danguir',
    Time : "21/10/2024",
    Disease: 'Fever',
  },

];

const columns = [
  {
    title: 'Appointement ID',
    dataIndex: 'ID',
    key: 'name',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Doctor Name',
    dataIndex: 'Doctor',
    key: 'Doctor',
    width: '10%',
    align: 'center',
  },
  {
  title: 'Patient Name',
  dataIndex: 'Patient',
  key: 'Patient',
  width: '10%',
  align: 'center',
},
{
    title: 'Time',
    dataIndex: 'Time',
    key: 'Time',
    width: '10%',
    align: 'center',
  },
{
    title: 'Disease',
    dataIndex: 'Disease',
    key: 'Disease',
    width: '10%',
    align: 'center',
  },
];

const MyTable = () => {
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-start">Appointment Schedule</h1>

    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      size="middle"
      pagination={{ pageSize: 9 }}
      style={{ backgroundColor: '#f7f7f7' }}
    />
    </>
  );
}

export default MyTable;


