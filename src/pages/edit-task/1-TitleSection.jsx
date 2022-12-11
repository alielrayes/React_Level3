import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const TitleSection = ({ user, stringId }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

if (value) {
  console.log(value.data());
}

if (value) {
  return (
    <section className="title center">
      <h1>
        <input
          defaultValue={value.data().title}
          className="title-input center"
          type="text"
        />
        <i className="fa-regular fa-pen-to-square"></i>
      </h1>
    </section>
  );
}
};

export default TitleSection;
