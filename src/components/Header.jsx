import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from './Nav'
import Logo from './Logo'
import './Header.scss'

function Header() {
  return (
    <header className='bg-teal-400 z-40 flex-wrap sticky top-0 mx-auto flex w-full items-center justify-between border-b rounded-b-2xl pl-8 pr-8 pt-3 pb-6'>
      <Logo/>
      <Nav/>
    </header>
  )
}

export default Header