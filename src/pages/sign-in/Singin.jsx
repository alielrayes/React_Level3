import Header from "../../comp/header";
import Footer from "../../comp/Footer";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import Modal from "shared/Modal";
import ReactLoading from "react-loading";
 

const Signin = () => {
  const [showLoading, setshowLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resetPass, setresetPass] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);

  const signInBTN = async (eo) => {
    setshowLoading(true);
    eo.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        sethasError(true);

        switch (errorCode) {
          case "auth/operation-not-allowed":
            setfirebaseError("للأسف لا  يُمكن   تسجيل الدخول فى الوقت الحالى");
            break;

          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
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

  // LEVEL3
  const [showModal, setshowModal] = useState(false);
  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showModal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log("send email");
                    setshowSendEmail(true);
                  })
                  .catch((error) => {
                    // ..
                  });
              }}
            >
              Reset Password
            </button>
            {showSendEmail && (
              <p className="check-email">
                Please check your email to reset your password.
              </p>
            )}
          </Modal>
        )}

        <form>
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
              signInBTN(eo);
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
              "Sign in"
            )}
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>

          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass mtt"
          >
            Forgot password ?
          </p>

          {hasError && <h6 className="mtt">{firebaseError}</h6>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
