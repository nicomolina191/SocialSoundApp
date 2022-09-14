import React from "react";
import SearchBar from "./SearchBar";

const Explore = () => {
  return (
    <div>
      <h1 className="text-xs underline">Explore.</h1>
      <div className="flex">
        <div>
          <SearchBar />
        </div>
        <div>
          <button>Filters</button>
        </div>
      </div>
      <div className="">
        <h3>For you.</h3>
      </div>
    </div>
  );
};

export default Explore;
