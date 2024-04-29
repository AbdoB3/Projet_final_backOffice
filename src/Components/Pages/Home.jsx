import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faWallet,faCalendarAlt,faUserMd } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    return (
        <>
        <div className="max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg"> {/* Réduire p-8 à p-4 */}
    {/* Panel */}
    <div className="mb-4 pb-2"> {/* Réduire mb-8 à mb-4 et pb-4 à pb-2 */}
        <div className="flex flex-wrap justify-between items-center mb-2"> {/* Réduire mb-4 à mb-2 */}
            <div className="w-full md:w-1/2">
                <div>
                    <h1 className="mb-0 text-2xl font-bold">Welcome Laila Danguir 👋🏻.</h1>
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

<div className="flex flex-wrap justify-center items-center mt-10">
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
            className="transform transition-transform hover:scale-105 border-4 border-blue-900 border-opacity-50 mx-auto"
        >
            <p className="font-bold text-blue-900 text-4xl text-center">67</p>
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
            className="transform transition-transform hover:scale-105 border-4 border-blue-900 border-opacity-50 mx-auto"
        >
            <p className="font-bold text-blue-900 text-4xl text-center">156</p>
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
            className="transform transition-transform hover:scale-105 border-4 border-blue-900 border-opacity-50 mx-auto"
        >
            <p className="font-bold text-blue-900 text-4xl text-center">77</p>
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
            className="transform transition-transform hover:scale-105 border-4 border-blue-900 border-opacity-50 mx-auto"
        >
            <p className="font-bold text-blue-900 text-4xl text-center"> $ 87</p>
        </Card>
    </div>
</div>

                

      </>
    );  
}

export default Dashboard;
