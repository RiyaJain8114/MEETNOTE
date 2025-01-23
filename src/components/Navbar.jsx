import React from 'react'
import "./navbar.css"
const Navbar = () => {
  return (
    <>
    <nav>
    <img src="/ey_logo.png" height={50} width={100} alt="ey logo" />
  <ul class="list">
    <li><a href="#">Home</a></li>
    <li><a href="#get">MOM</a></li>
    <li><a href="#generate_page">Summary</a></li>
  </ul>
  <button class="search">Search</button>
  <button class="menu">Menu</button>
</nav>
</>
  )
}

export default Navbar