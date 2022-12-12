import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc  } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";

const TitleSection = ({ user, stringId, titleInput }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));



  if (error) {
    return (
      <main>
          <h1>Error : {error.message}</h1>
      </main>
    )
  }
  





if (loading) {
  return (
    <main>
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
    </main>
  )
}








if (value) {
  return (
    <section className="title center">
      <h1>
        <input
        onChange={ async (eo) => {
          titleInput(eo)
        }}
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
