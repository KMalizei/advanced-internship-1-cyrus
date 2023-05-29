import React, { useRef } from "react";
import SearchBar from "../components/UI/SearchBar";
import SideBar from "../components/UI/SideBar";

function userSettings() {
  return (
    <div>
      <SearchBar />
      <SideBar />
      <section></section>
    </div>
  );
}

export default userSettings;
