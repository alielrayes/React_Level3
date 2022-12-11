import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";

const SubTasksSection = ({ user, stringId }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
          <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox">Completed </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li className="card-task flex">
                <p> {item} </p>
                <i className="fa-solid fa-trash"></i>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default SubTasksSection;
