import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";

import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Erroe404 from "../pages/erroe404";

const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [array, setarray] = useState(["html", "css", "react"]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Erroe404 />;
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          <Header />
          <main>
            {array.map((item, index) => (
              <div key={item}>
                <h3> {index+1} - {item} </h3>
              </div>
            ))}
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;
