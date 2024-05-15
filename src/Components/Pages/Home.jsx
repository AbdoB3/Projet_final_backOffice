import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faWallet, faCalendarAlt, faUserMd,
    faStethoscope, faTooth, faBrain, faHeartbeat, faEye
} from '@fortawesome/free-solid-svg-icons';
import Appoint from './Appoint';
import { LoginContext } from '../store/LoginContext';
import axios from 'axios';
import { Specalities } from './Doctor/Specialities';

import { jwtDecode } from 'jwt-decode';
function Dashboard() {
    const [sum, setSum] = useState({});
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    useEffect(() => {
        fetchSum();
    }, []);

    const fetchSum = async () => {
        const response = await axios.get('http://localhost:3000/patient/sum',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        setSum(response.data)
    }
    const departments = [
        { name: "General Physician", percentage: 35, icon: faStethoscope },
        { name: "Dentist", percentage: 24, icon: faTooth },
        { name: "ENT", percentage: 10, icon: faBrain },
        { name: "Cardiologist", percentage: 15, icon: faHeartbeat },
        { name: "Ophthalmology", percentage: 20, icon: faEye }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
        {
            key: '5',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '6',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '7',
            name: 'Abderramane',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '8',
            name: 'Laila Danguir',
            age: 42,
            address: 'London No. 1 Lake Park',
        }
    ];

    const columns = [
        {
            title: 'Appointement ID',
            dataIndex: 'name',
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

    return (
        <>
            <div className="max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg">
                {/* Panel */}
                <div className="mb-4 pb-2">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                        <div className="w-full md:w-1/2">
                            <div>
                                <h1 className="mb-0 text-2xl font-bold">Welcome {decodedToken.name} 👋🏻.</h1>
                                <p className="mb-0">Have a nice day at work ❤️</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-end items-center">
                            <img
                                src="src/assets/images/home.png"
                                alt="Description de l'image"
                                className="h-full w-auto max-h-40 lg:max-h-32 max-w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-start mt-10">
                {/*  cards */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 px-2">
                    <Card
                        title={
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded bg-blue-500">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                                </div>
                                <span className="mt-2">Appointments</span>
                            </div>
                        }
                        style={{ width: '80%' }} // Ajuster la largeur de la carte pour les petits écrans
                        className="transform transition-transform hover:scale-105 border-1 border-opacity-50 mx-auto shadow-lg"
                    >
                        <p className="font-bold text-blue-900 text-4xl text-center">{sum.sumConsultation}</p>
                    </Card>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 px-2">
                    <Card
                        title={
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded bg-blue-500">
                                    <FontAwesomeIcon icon={faUser} className="text-white" />
                                </div>
                                <span className="mt-2">New Patients</span>
                            </div>
                        }
                        style={{ width: '80%' }} // Ajuster la largeur de la carte pour les petits écrans
                        className="transform transition-transform hover:scale-105 border-1 border-opacity-50 mx-auto shadow-lg"
                    >
                        <p className="font-bold text-blue-900 text-4xl text-center">{sum.sumPatient}</p>
                    </Card>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 px-2">

                    <Card
                        title={
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded bg-blue-500">
                                    <FontAwesomeIcon icon={faUserMd} className="text-white" />
                                </div>
                                <span className="mt-2">New Doctors</span>
                            </div>
                        }
                        style={{ width: '80%' }} // Ajuster la largeur de la carte pour les petits écrans
                        className="transform transition-transform hover:scale-105 border-1 border-opacity-50 mx-auto shadow-lg"
                    >
                        <p className="font-bold text-blue-900 text-4xl text-center">{sum.sumDoctor}</p>
                    </Card>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 px-2">
                    <Card
                        title={
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded bg-blue-500">
                                    <FontAwesomeIcon icon={faWallet} className="text-white" />
                                </div>
                                <span className="mt-2">Earnings</span>
                            </div>
                        }
                        style={{ width: '80%' }} // Ajuster la largeur de la carte pour les petits écrans
                        className="transform transition-transform hover:scale-105 border-1 border-opacity-50 mx-auto shadow-lg"
                    >
                        <p className="font-bold text-blue-900 text-4xl text-center"> $ 87</p>
                    </Card>
                </div>

                {/* Cards speciality */}
                <div className="w-full md:w-1/4 px-2 mt-10">
                    <Specalities />
                </div>

                {/* Table */}
                <div className="w-full md:w-3/4 px-2 mt-10 shadow-lg bg-white ">
                    <Appoint />
                </div>


            </div>
        </>
    );
}

export default Dashboard;
