import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import HomeModal from "./modal";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  // ===============================
  //    FUNCTIONS of Modal
  // ===============================
  const [showModal, setshowModal] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [taskTitle, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");

  const closeModal = () => {
    setshowModal(false);
    settitle("")
    setarray([])

  };

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }

    console.log(array);
    setsubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false

    });
    setshowLoading(false);
    settitle("");
    setarray([]);

    setshowModal(false);
    setshowMessage(true);

    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome to React Level 2 🔥🔥🔥</span>{" "}
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* OPIONS (filtered data) */}
            <section className="parent-of-btns flex mtt">
              <button>Newest first</button>

              <button>Oldest first</button>
              <select id="browsers">
                <option value="ddddd"> All Tasks </option>
                <option value="dddddd"> Completed </option>
                <option value="dddddd"> Not Completed </option>
              </select>
            </section>

            {/* SHOW all tasks */}
            <section className="flex all-tasks mt">
              <article dir="auto" className="one-task">
                <Link to={"/edit-task"}>
                  <h2> New Task </h2>
                  <ul>
                    <li>Sub task 1 </li>
                    <li> Sub task 2</li>
                  </ul>

                  <p className="time">a day ago</p>
                </Link>
              </article>
            </section>

            {/* Add new task BTN */}
            <section className="mt">
              <button
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
              >
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}

            <p
              style={{
                right: showMessage ? "20px" : "-100vw",
              }}
              className="show-message"
            >
              Task added successfully{" "}
              <i className="fa-regular fa-circle-check"></i>
            </p>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
