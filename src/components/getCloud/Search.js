import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function Search() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { globalDarkTheme } = useAuth();


  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {}, []);
  let loadOptionss = async (inputValue) => {
    inputValue = inputValue.toLowerCase().replace(/\W/g, "");
    // console.log(inputValue)
    return new Promise((resolve) => {
      let recommendedTags = [];

      database.folders
        .where("userId", "==", currentUser.uid)
        .orderBy("name")
        .startAt(inputValue)
        .endAt(inputValue + "\uf8ff")
        .get()
        .then((docs) => {
          if (!docs.empty) {
            // let recommendedTags = [];
            docs.forEach(function (doc) {
              const tag = {
                value: doc.id,
                label: doc.data().name,
              };
              recommendedTags.push(tag);
              // console.log(recommendedTags);
            });
            return resolve(recommendedTags);
          } else {
            return resolve([]);
          }
        });
    });
    // return [];
  };

  let handleOnChange = (tags) => {
    // console.log(tags);
    if (tags) {
      history.push(`/folder/${tags.value}`);
    }
    setSelectedTag([tags]);
  };

  return (
    <>
      <AsyncSelect
        className={   globalDarkTheme
          ? "mobile__search w-50 text-dark"
          : "mobile__search w-50 text-dark"}
        loadOptions={loadOptionss}
        onChange={handleOnChange}
        placeholder="Search..."
        isClearable
        isSearchable
        
      />
    </>
  );
}

export default Search;
