import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [sidebar, setSidebar] = useState(true)

  const sidebarClick = () => {
    setSidebar(!sidebar)
  }

  useEffect(() => {
    if(window.innerWidth < 784) {
      setSidebar(!sidebar)
    }
  }, [])

  return (
    <div className='body'>
        <Sidebar sidebar={sidebar}/>
        <div className={sidebar ? 'main main-sidebar' : 'main'}>
          <Navbar sidebarClick={sidebarClick} sidebar={sidebar}/>
          <div className="container-fluid outlet">
            <Outlet/>
          </div>
        </div>
    </div>
  )
}
