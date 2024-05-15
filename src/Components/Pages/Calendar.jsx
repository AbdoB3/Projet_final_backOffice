import React, { useState } from 'react';
import { Calendar, Modal } from 'antd';

const MyCalendar = () => {
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const events = [
        { dateTime: '2024-05-01T15:00:00', description: 'Consultation Médicale', color: '#FF0000' },
        { dateTime: '2024-05-10T10:30:00', description: 'Les Analyses', color: 'green' },
        { dateTime: '2024-05-14T10:30:00', description: 'Consultation Patient', color: 'blue' },
        { dateTime: '2024-05-14T14:30:00', description: 'Diagnostic', color: 'blue' },
    ];

    const dateCellRender = (value) => {
        const matchingEvents = events.filter(event => value.isSame(new Date(event.dateTime), 'day'));
        return matchingEvents.map((event, index) => (
            <div key={index}>
                <div className="border rounded px-2 py-1 block" style={{ backgroundColor: event.color, color: '#FFFFFF' }}>
                    {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.description}
                </div>
            </div>
        ));
    };

    const handleSelect = (value) => {
        const matchingEvents = events.filter(event => value.isSame(new Date(event.dateTime), 'day'));
        setSelectedEvents(matchingEvents);
        setSelectedDate(value.toDate());
    };

    return (
        <div className="w-full mx-auto mt-1 max-w-screen">
            <h2 className="text-xl font-bold mb-4 text-start">Calendar</h2>
            <div className="border border-gray-300 rounded-lg p-4 shadow-md h-full">
                <Calendar 
                    className="w-full h-full" 
                    style={{ maxWidth: '100%' }}
                    dateCellRender={dateCellRender}
                    fullscreen={true}
                    onSelect={handleSelect} 
                />
            </div>
            <Modal
                title={selectedDate ? `Appointment : ${selectedDate.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : "Rendez-Vous d'aujourd'hui"}
                visible={selectedEvents.length > 0}
                onCancel={() => {
                    setSelectedEvents([]);
                    setSelectedDate(null);
                }}
                footer={null}
            >
                {selectedEvents.map((event, index) => (
                    <div key={index} style={{ backgroundColor: event.color, color: '#FFFFFF', marginBottom: '8px', padding: '8px', borderRadius: '4px' }}>
                        {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.description}
                    </div>
                ))}
            </Modal>
        </div>
    );
}

export default MyCalendar;
