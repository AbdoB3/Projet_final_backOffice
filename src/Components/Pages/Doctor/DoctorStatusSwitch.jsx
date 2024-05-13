import React, { useState, useEffect } from 'react';
import { Switch,message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const DoctorStatusSwitch = ({ id }) => {
    const token = localStorage.getItem('token');
    const [status, setStatus] = useState(false); // Default status set to false

    useEffect(() => {
        // Fetch doctor's status when component mounts
        fetchDoctorStatus();
    },[]);

    const fetchDoctorStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/doctors/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Set initial status and active state based on response
            setStatus(response.data.state === 'active');
        } catch (error) {
            console.error('Error fetching doctor status:', error);
        }
    };

    const handleChange = async (checked) => {
        try {
            // Update status in UI optimistically
            setStatus(checked);

            // Make PATCH request to update status
            await axios.patch(`http://localhost:3000/doctors/${id}`, 
                { state: checked ? 'active' : 'pending' }, // Adjusted state values
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            checked?message.success('Doctor is Active now'):message.error('Doctor Desactived!');

        } catch (error) {
            // If error occurs, revert UI state to previous status
            setStatus(!checked);
            console.error('Error updating status:', error);
        }
    };

    return (
        <Switch
            checked={status}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleChange}
        />
    );
};

export default DoctorStatusSwitch;
