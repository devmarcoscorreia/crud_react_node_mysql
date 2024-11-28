import './Logo.css'
import natal from '../../assets/imgs/NATAL.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='logo'>
        <Link to='/' className='logo'>
            <img src={natal} alt='natal' />
        </Link>
    </aside>