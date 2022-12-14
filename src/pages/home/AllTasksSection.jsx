import React from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {
  const [value, loading, error] = useCollection(

    query(    collection(db, user.uid), orderBy("id", "asc"),      )
    
    );

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
    );
  }
};

export default AllTasksSection;
