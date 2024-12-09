import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [width, setWidth] = useState(0)
  const [sidebar, setSidebar] = useState(true)

  const sidebarClick = () => {
    setSidebar(!sidebar)
  }

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className='body'>
        <Sidebar sidebar={sidebar}/>
        <div className={sidebar && width > 1080 ? 'main main-sidebar' : 'main'}>
          <Navbar sidebarClick={sidebarClick} sidebar={sidebar}/>
          <div className="container-fluid outlet">
            <Outlet/>
          </div>
        </div>
    </div>
  )
}
