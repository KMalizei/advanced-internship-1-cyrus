
import SearchBar from '@/app/components/SearchBar'
import SideBar from '@/app/components/SideBar'
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

export default page