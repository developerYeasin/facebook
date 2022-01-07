import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from "firebase/auth";
import firebaseConfig from "../../firebase-configc";

initializeApp(firebaseConfig);

const Navbar = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, photoURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        const signedInUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBlur = (e) => {
    console.log(e.target.name)
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    // debugger;
  };
  const handleSubmit = (e) => {
    
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateName(user.name)
          // debugger;
          const newUser = res.user;
        })
        .catch((err) => {
          const code = err.code;
          const message = err.message;
          const newUserInfo = { ...user };
          newUserInfo.error = "this email already use";
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(err);
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log("sign in", res.user)
          const newUser = res.user;
        })
        .catch((err) => {
          const code = err.code;
          const message = err.message;
          const newUserInfo = { ...user };
          newUserInfo.error = "this email already use";
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateName = name => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log("name updated")
    }).catch((error) => {
      console.log("it's not possible", error)
      // An error occurred
      // ...
    });
    
  }
  console.log(user);
  console.log(newUser);
  return (
    <div className="container">
      <h1>this is Navbar</h1>
      <div className="text-center">
        {user.isSignedIn ? (
          <button onClick={handleSignOut} className="btn btn-danger">
            Sign out
          </button>
        ) : (
          <button onClick={handleSignIn} className="btn btn-dark">
            Sign In
          </button>
        )}
        <div className="form row">
          <div className="col-md-4 m-auto m-2">
            <input
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              id="newUser"
            />
            <label htmlFor="newUser">New user sign up</label>
            <form action="#" onSubmit={handleSubmit}>
              {newUser && (
                <input
                  className="form-control m-2"
                  onBlur={handleBlur}
                  type="text"
                  name="name"
                  placeholder="your name"
                />
              )}
              <input
                type="text"
                className="form-control m-2"
                onBlur={handleBlur}
                name="email"
                placeholder="type email"
              />
              <input
                className="form-control m-2"
                onBlur={handleBlur}
                type="password"
                name="password"
                placeholder="type password"
              />
              <input type="submit" className="form-control m-2" />
            </form>
          </div>
        </div>
        {user.success ? (
          <h3 style={{ color: "green" }}>
            you account successfully {newUser ? "created" : "log IN"}
          </h3>
        ) : (
          <h3 style={{ color: "red" }}>{user.error}</h3>
        )}
        {user.isSignedIn && (
          <div className="row">
            <div className="col-md-5 m-auto">
              <h3>welcome {user.name}</h3>
              <h5>to you email {user.email}</h5>
              <img src={user.photo} alt="" className="w-100" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
