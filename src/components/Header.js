import logo from '../images/header-logo.svg'
import React from 'react'

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
    </header>
  )
}

export default Header
