import React from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";

const AllTasksSection = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

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
    console.log(value.docs.length);

    return (
      <section className="flex all-tasks mt">
        {value.docs.map((item) => {
          return (
            <article dir="auto" className="one-task">
              <Link to={"/edit-task"}>
                <h2> {item.data().title} </h2>
                <ul>
                  {item.data().details.map((item, index) => {
                    if (index < 2) {
                      return <li> {item} </li>;
                    } else {
                      return false
                    }
                  })}
                </ul>

                <p className="time">a day ago</p>
              </Link>
            </article>
          );
        })}
      </section>
    );
  }
};

export default AllTasksSection;
