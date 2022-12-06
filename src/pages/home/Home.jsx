import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import Modal from "shared/Modal";
import { useState } from "react";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  // LEVEL3
  const [showModal, setshowModal] = useState(false);
  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
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
              <Modal closeModal={closeModal}>
                <div style={{ textAlign: "left" }}>
                  <input
                    onChange={(eo) => {}}
                    required
                    placeholder=" Add title : "
                    type="text"
                  />

                  <div>
                    <input
                      onChange={(eo) => {}}
                      placeholder=" details "
                      type="email"
                    />

                    <button
                      onClick={(eo) => {
                        eo.preventDefault();
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <button
                    onClick={(eo) => {
                      eo.preventDefault();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Modal>
            )}
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
