import React from 'react';
import { Calendar } from 'antd';

const MyCalendar = () => {
    // Fonction pour rendre le contenu de la cellule de date
    const dateCellRender = (value) => {
        // Définition des événements
        const events = [
            { dateTime: '2024-04-01T15:00:00', description: 'Événement spécial 1', color: '#FF0000' },
            { dateTime: '2024-04-10T10:30:00', description: 'Événement spécial 2', color: 'green' },
            { dateTime: '2024-04-14T10:30:00', description: 'Événement spécial 2', color: 'Blue' },
            { dateTime: '2024-04-14T10:30:00', description: 'Événement spécial 2', color: 'Blue' },

        ];

        // Vérifier si la date actuelle correspond à l'une des dates des événements
        const matchingEvents = events.filter(event => value.isSame(new Date(event.dateTime), 'day'));

        // Rendu des événements avec l'heure et la couleur associée
        return matchingEvents.map((event, index) => (
            <div key={index}>
                <span className="border rounded px-2 py-1 block" style={{ backgroundColor: event.color, color: '#FFFFFF' }}>
                    {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.description}
                </span>
            </div>
        ));
    };

    return (
        <div className="w-full mx-auto mt-1 max-w-screen">
            <h2 className="text-lg font-bold mb-4 text-center">Calendar</h2>
            <div className="border border-gray-300 rounded-lg p-4 shadow-md h-full">
                <Calendar 
                    className="w-full h-full" 
                    style={{ maxWidth: '100%' }}
                    dateCellRender={dateCellRender}
                    fullscreen={true}
                />
            </div>
        </div>
    );
}

export default MyCalendar;
