import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import users from "./users.json";

const SearchBar = () => {
  const [value, setValue] = useState("");

  function handleInputChange(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      <div>
        <button type="submit">
          <FontAwesomeIcon icon={solid("magnifying-glass")} />
        </button>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Search for users or songs..."
        />
      </div>
      <div>
        {
          // Songs?.map
        }
        {users?.map((user) => {
          if (
            value.length > 0 &&
            user.name.toLowerCase().includes(value.toLowerCase())
          ) {
            return (
              <Link to={`/home/explore/${user.id}`}>
                <div>
                  <img src={user.avatar} alt="No Avatar" />
                  <p>{user.name}</p>
                  <p>@{user.username}</p>
                </div>
              </Link>
            );
          }
          return null;
        })
        }
      </div>
    </div>
  );
};

export default SearchBar;
