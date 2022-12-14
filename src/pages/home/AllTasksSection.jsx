import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {
  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [value, loading, error] = useCollection(initialData);

  const [isFullOpacity, setisFullOpacity] = useState(false);

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }

  if (value) {
    console.log(value.docs);

    return (
      <div>
        {/* OPIONS (filtered data) */}
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mtt"
        >
          <button
            style={{ opacity: isFullOpacity ? "1" : "0.3" }}
            onClick={(params) => {
              setisFullOpacity(true)
              setinitialData(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );
            }}
          >
            Newest first
          </button>

          <button
          style={{ opacity: isFullOpacity ? "0.3" : "1" }}
            onClick={(params) => {
              setisFullOpacity(false)
              setinitialData(
                query(collection(db, user.uid), orderBy("id", "asc"))
              );
            }}
          >
            Oldest first
          </button>
          <select id="browsers">
            <option value="ddddd"> All Tasks </option>
            <option value="dddddd"> Completed </option>
            <option value="dddddd"> Not Completed </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>Congratulations! You have completed your tasks ♥</h1>
          )}

          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
