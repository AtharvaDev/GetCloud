import { faCloud } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";
import SidebarOption from "./SidebarOption";

function Storage() {
  const { currentUser } = useAuth();
  const [totalSize, setTotalSize] = useState()

  let size = 0
  database.files
    .where("userId", "==", currentUser.uid)
    .get()
    .then((docs) => {
        docs.forEach(doc => {
            // console.log(doc.id, '=>', doc.data().size);
            size = size + doc.data().size  
          });
          
          setTotalSize(((size.toFixed(2))/1000).toFixed(2))

          console.log(totalSize,"ok")
      
    });

  return (
    <div>
      <SidebarOption title="Storage:" icon={faCloud}></SidebarOption>
      <p className="">{totalSize} GB of 20 GB used</p>
    </div>
  );
}

export default Storage;
