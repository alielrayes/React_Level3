import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";


const TitleSection = ({user}) => {

  const [value, loading, error] = useCollection(collection(db, user.uid));
  console.log(value);
  return (
    <section className="title center">
      <h1>
        <input
          value={"ali hassan"}
          className="title-input center"
          type="text"
        />
        <i className="fa-regular fa-pen-to-square"></i>
      </h1>
    </section>
  );
};

export default TitleSection;
