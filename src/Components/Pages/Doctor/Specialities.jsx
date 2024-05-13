import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Specalities = () => {
    const token = localStorage.getItem('token')
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await axios.get('http://localhost:3000/speciality',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        setDepartments(response.data)
    }
    return (
        <Card className="bg-white shadow-lg h-97">
            <h3 className="text-xl font-semibold text-center">Top Departments</h3>
            {departments.map((dept, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                    <div className="flex items-center">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white mr-3">
                            <FontAwesomeIcon icon={dept.icon} />
                        </div>
                        <span>{dept.nom}</span>
                    </div>
                </div>
            ))}
        </Card>
    )
}

