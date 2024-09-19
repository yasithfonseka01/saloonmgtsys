import React from 'react'
import { BiNotification, BiSearch, BiLogOut } from 'react-icons/bi'
import '../styles/contentHeader.css'; // Ensure you have the correct path to your CSS

const ContentHeader = () => {
  const handleLogout = () => {
    
    window.location.href = '/';
  }

  return (
    <div className='content--header'>
        <h1 className='header--title'>Dashboard</h1>
        <div className='header--activity'>
            <div className='search-box'>
                <input type='text' placeholder='Search anything here...' />
                <BiSearch className='icon' />
            </div>
            <button className='logout-btn' onClick={handleLogout}>
                <BiLogOut className='logout-icon' />
                Logout
            </button>
        </div>
    </div>
  )
}

export default ContentHeader
