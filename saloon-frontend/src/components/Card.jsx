import React, { useEffect, useState } from "react";
import { FaFileAlt, FaCog, FaUser } from 'react-icons/fa'; // Import FontAwesome icons

const Card = () => {
    const [totalAppointments, setTotalAppointments] = useState(0); // State initialized to 0 for appointments
    const [totalServices, setTotalServices] = useState(0); // State initialized to 0 for services
    const [totalCustomers, setTotalCustomers] = useState(0); // State initialized to 0 for customers

    useEffect(() => {
        // Function to fetch the total appointment count from the API
        const fetchAppointmentCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/appointments/count', {
                    method: "GET",
                });

                const data = await response.json();
                
                if (data && typeof data.count === 'number') {
                    // Set the total appointment count from the API response
                    setTotalAppointments(data.count);
                } else {
                    console.error("Invalid response data:", data);
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Function to fetch the total services count from the API
        const fetchServiceCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/services/count', {
                    method: "GET",
                });

                const data = await response.json();
                
                if (data && typeof data.count === 'number') {
                    // Set the total services count from the API response
                    setTotalServices(data.count);
                } else {
                    console.error("Invalid response data:", data);
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Function to fetch the total customer count from the API
        const fetchCustomerCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/customers/count', {
                    method: "GET",
                });

                const data = await response.json();
                
                if (data && typeof data.count === 'number') {
                    // Set the total customer count from the API response
                    setTotalCustomers(data.count);
                } else {
                    console.error("Invalid response data:", data);
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Fetch all counts on component mount
        fetchAppointmentCount();
        fetchServiceCount();
        fetchCustomerCount();

    }, []); // Empty dependency array so it runs only on mount

    return (
        <div className="card--container">
            <div className='card'>
                <div className="card--cover">
                    <FaFileAlt /> {/* FaFileAlt icon for appointments */}
                </div>
                <div className='card--title'>
                    <h2>Appointments</h2>
                    <p>{totalAppointments}</p> {/* Display the total appointment count */}
                </div>
            </div>

            <div className='card'>
                <div className="card--cover">
                    <FaCog /> {/* FaCog icon for services */}
                </div>
                <div className='card--title'>
                    <h2>Services</h2>
                    <p>{totalServices}</p> {/* Display the total services count */}
                </div>
            </div>

            <div className='card'>
                <div className="card--cover">
                    <FaUser /> {/* FaUser icon for customers */}
                </div>
                <div className='card--title'>
                    <h2>Customers</h2>
                    <p>{totalCustomers}</p> {/* Display the total customer count */}
                </div>
            </div>
        </div>
    );
}

export default Card;
