import React, { useState, useEffect } from 'react';
import { Switch, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const DoctorStatusSwitch = ({ id, onStatusChange }) => {
    const token = localStorage.getItem('token');
    const [status, setStatus] = useState(false); // Default status set to false
    const [statusText, setStatusText] = useState('pending'); // Default text set to pending

    useEffect(() => {
        // Fetch doctor's status when component mounts
        fetchDoctorStatus();
    }, []);

    const fetchDoctorStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/doctors/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const currentState = response.data.state === 'active';
            // Set initial status and active state based on response
            setStatus(currentState);
            setStatusText(currentState ? 'active' : 'pending');
        } catch (error) {
            console.error('Error fetching doctor status:', error);
        }
    };

    const handleChange = async (checked) => {
        const newStatus = checked ? 'active' : 'pending';
        // Optimistically update the status and status text
        setStatus(checked);
        setStatusText(newStatus);

        try {
            // Make PATCH request to update status
            await axios.patch(`http://localhost:3000/doctors/${id}`, 
                { state: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (checked) {
                message.success('Doctor is now active');
            } else {
                message.error('Doctor is now pending');
            }
            // Call the callback function to update the status in the parent component
            onStatusChange(id, newStatus);
        } catch (error) {
            // If error occurs, revert UI state to previous status
            setStatus(!checked);
            setStatusText(!checked ? 'active' : 'pending');
            console.error('Error updating status:', error);
            message.error('Failed to update status');
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
