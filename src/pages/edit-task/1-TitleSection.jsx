import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";


const TitleSection = ({user, stringId}) => {

  const [value, loading, error] = useCollection(collection(db, user.uid));

 
  console.log(stringId);



  return (
    <section className="title center">
      <h1>
        <input
          defaultValue={"ali hassan"}
          className="title-input center"
          type="text"
        />
        <i className="fa-regular fa-pen-to-square"></i>
      </h1>
    </section>
  );
};

export default TitleSection;
