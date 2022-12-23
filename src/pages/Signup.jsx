import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Erroe404 from "../pages/erroe404";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import ReactLoading from "react-loading";
 

const Signup = () => {
  const [showLoading, setshowLoading] = useState(false);

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setuserName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)    (done)

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });
  //
  const signUpBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
  await  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          //
          console.log("Email verification sent!");
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/operation-not-allowed":
            setfirebaseError("للأسف لا  يُمكن   إنشاء حساب فى الوقت الحالى");
            break;

          case "auth/user-not-found":
            setfirebaseError("Wrong Email");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong Password");
            break;

          case "auth/too-many-requests":
            setfirebaseError("Too many requests, please try aganin later");
            break;

          default:
            setfirebaseError("Please check your email & password");
            break;
        }
      });

    setshowLoading(false);
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span>🧡</span>{" "}
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder=" UserName : "
              type="text"
            />

            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />

            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              required
              placeholder=" Password : "
              type="password"
            />

            <button
              onClick={(eo) => {
                signUpBTN(eo);
              }}
            >
              {showLoading ? (
                <div style={{ justifyContent: "center" }} className="flex">
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={20}
                    width={20}
                  />
                </div>
              ) : (
                "Sign up"
              )}
            </button>
            <p className="account">
              Already hava an account <Link to="/signin"> Sign-in</Link>
            </p>

            {hasError && <h6 className="mtt">{firebaseError}</h6>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
