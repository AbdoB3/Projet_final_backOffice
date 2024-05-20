import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faWallet, faCalendarAlt, faUserMd,
    faStethoscope, faTooth, faBrain, faHeartbeat, faEye
} from '@fortawesome/free-solid-svg-icons';
import Appoint from './Appoint';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Dashboard() {
    const [sum, setSum] = useState({});
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    useEffect(() => {
        fetchSum();
    }, []);

    const fetchSum = async () => {
        const response = await axios.get('http://localhost:3000/patient/sum', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setSum(response.data);
    };

    const departments = [
        { name: "General Physician", percentage: 35, icon: faStethoscope },
        { name: "Dentist", percentage: 24, icon: faTooth },
        { name: "ENT", percentage: 10, icon: faBrain },
        { name: "Cardiologist", percentage: 15, icon: faHeartbeat },
        { name: "Ophthalmology", percentage: 20, icon: faEye }
    ];

    const cards = [
        {
            title: "Appointments",
            value: sum.sumConsultation,
            icon: faCalendarAlt
        },
        {
            title: "New Doctors",
            value: sum.sumDoctor,
            icon: faUserMd
        },
        {
            title: "New Patients",
            value: sum.sumPatient,
            icon: faUser
        },
        {
            title: "Earnings",
            value: `$ ${sum.sumEarnings || 87}`,
            icon: faWallet
        }
    ];

    return (
        <>
            <div className="max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg">
                {/* Panel */}
                <div className="mb-4 pb-2">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                        <div className="w-full md:w-1/2">
                            <div>
                                <h1 className="mb-0 text-2xl font-bold">Welcome {decodedToken ? decodedToken.name : "Guest"} 👋🏻.</h1>
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

            <div className="grid gap-4 mt-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        title={
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded bg-blue-500">
                                    <FontAwesomeIcon icon={card.icon} className="text-white" />
                                </div>
                                <span className="mt-2">{card.title}</span>
                            </div>
                        }
                        className="transform transition-transform hover:scale-105 border-2 border-opacity-50 mx-auto shadow-lg"
                        style={{ minWidth: '270px', minHeight: '150px' }}
                    >
                        <p className="font-bold text-blue-900 text-4xl text-center">{card.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
                <div>
                    <Card className="bg-white shadow-lg h-97">
                        <h3 className="text-xl mtb-3 font-semibold text-center">Top Departments</h3>
                        {departments.map((dept, index) => (
                            <div key={index} className="flex justify-between items-center p-4">
                                <div className="flex items-center">
                                    <div className="w-9 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white mr-3">
                                        <FontAwesomeIcon icon={dept.icon} />
                                    </div>
                                    <span>{dept.name}</span>
                                </div>
                                <span>{`${dept.percentage}%`}</span>
                            </div>
                        ))}
                    </Card>
                </div>
                <div className="col-span-2">
                    <div className="w-full px-5 mb-10 border rounded shadow-lg bg-white" style={{ height: '440px', overflowY: 'auto' }}>
                        <div className="p-6">
                            <Appoint />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
