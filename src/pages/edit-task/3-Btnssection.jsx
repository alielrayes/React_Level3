import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Btnssection = ({ user, stringId }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  return (
    <section className="center mtt">
      <button className="add-more-btn">
        Add more <i className="fa-solid fa-plus"></i>
      </button>

      <div>
        <button className="delete">Delete task</button>
      </div>
    </section>
  );
};

export default Btnssection;
