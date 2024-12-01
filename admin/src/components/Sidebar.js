import React, { useState } from 'react'

export default function Sidebar({ sidebar }) {

  return (
    <div className={sidebar ? 'sidebar sidebar-open' : 'sidebar'}>
      <div className="sidebar-profile">
        <h3 className='brand-name'>BersaMath CMS</h3>
        
      </div>
    </div>
  )
}
