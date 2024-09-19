import React from 'react';
import { BiBookAlt, BiHome, BiMessage, BiSolidReport, BiStats, BiTask, BiHelpCircle, BiHardHat  } from 'react-icons/bi';
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className='menu'>
        <div className='logo'>
            <BiBookAlt className='logo-icon' />
            <h2>BEAUTY SALOON</h2>
        </div>

        <div className='menu--list'>
        <a href='/dashboard' className='item active'>
                <BiHome className='icon' />
                Dashboard
            </a>

            <a href='/customer' className='item'>
                <BiTask className='icon' />
                Customer Manage
            </a>


            <a href='/employee' className='item'>
                <BiSolidReport className='icon' />
                Employee Manage
            </a>

            <a href='/service' className='item'>
                <BiStats className='icon' />
                Service Manage
            </a>

            <a href='/appointment' className='item'>
                <BiMessage className='icon' />
                Appointment Manage
            </a>
        </div>

    </div>
  )
}

export default Sidebar