import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";


const SubTasksSection = ({user}) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  return (
    <section className="sub-task mtt">
      <div className="parent-time">
        <p className="time">Created: 6 days ago</p>
        <div>
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">Completed </label>
        </div>
      </div>

      <ul>
        <li className="card-task flex">
          <p> Sub taskk </p>
          <i className="fa-solid fa-trash"></i>
        </li>

        <li className="card-task flex">
          <p> Sub taskk </p>
          <i className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </section>
  );
};

export default SubTasksSection;
