import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaFileAlt, FaCog, FaUser } from 'react-icons/fa'; // Import FontAwesome icons

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
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

    // Chart data
    const chartData = {
        labels: ['Appointments', 'Services', 'Customers'],
        datasets: [
            {
                label: 'Total Counts',
                data: [totalAppointments, totalServices, totalCustomers],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            {/* Chart */}
            <div className="chart--container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default Chart;
