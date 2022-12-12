import "./editTask.css";

import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "comp/header";
import Footer from "comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Loading from "comp/Loading";
import TitleSection from "./1-TitleSection";
import SubTasksSection from "./2-SubTasksSection";
import Btnssection from "./3-Btnssection";
import { useParams } from "react-router-dom";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  let { stringId } = useParams();

  // ======================
  // 1- Title Section
  // ======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      // @ts-ignore
      title: eo.target.value,
    });
  };

  // ======================
  // 2- Sub-Task Section
  // ======================
  const completedCheckbox =  async(eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true
      });
      
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false
      });
    }
  };

  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
   });
  };



  // ======================
  // 3- BTNs Section
  // ======================


  const deleteBTN = (eo) => {
    eo.preventDefault();
  };

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
        <div className="edit-task">
          {/* Title */}
          <TitleSection
            user={user}
            stringId={stringId}
            titleInput={titleInput}
          />

          {/* Sub-tasks section */}
          <SubTasksSection user={user} stringId={stringId} completedCheckbox={completedCheckbox} trashIcon={trashIcon} />

          {/* Add-more BTN && Delete BTN */}

          <Btnssection user={user} stringId={stringId} />
        </div>

        <Footer />
      </div>
    );
  }
};

export default EditTask;
