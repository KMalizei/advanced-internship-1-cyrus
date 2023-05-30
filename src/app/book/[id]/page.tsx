import SearchBar from '@/app/components/UI/SearchBar'
import SideBar from '@/app/components/UI/SideBar'
import React from 'react'

function page() {
  return (
    <div className="wrapper">
        <SearchBar />
        <div className="row">
            <div className="container">
                <SideBar />
            </div>
        </div>
    </div>
  )
}
