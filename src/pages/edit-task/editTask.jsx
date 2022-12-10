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

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  
  let { stringId } = useParams();


  // 

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
          <TitleSection user={user} stringId={stringId} />

          {/* Sub-tasks section */}
          <SubTasksSection user={user} stringId={stringId} />

          {/* Add-more BTN && Delete BTN */}

          <Btnssection user={user} stringId={stringId} />
        </div>

        <Footer />
      </div>
    );
  }
};

export default EditTask;
