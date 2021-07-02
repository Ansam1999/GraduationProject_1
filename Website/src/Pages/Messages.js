import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import { MyContext } from "./Context";
import firebase, { auth, db, storage } from "./firebase";
import { AppString } from "./Const";
import { useRef } from "react";
import { FaBeer } from "react-icons/fa";
/*let mountedRef = null;
async function GetUsers() {
  mountedRef = true;
  const users = [];
  await db
    .collection("AppUsers")
    .where("kinderName", "==", AppString.KinderName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (mountedRef) {
          console.log(doc.id, " => ", doc.data());
          users.push(doc.data());
        }
        AppString.users = users;
        console.log(users);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  return () => (mountedRef = false);
}*/
const Parent = (props) => {
  const { User, onClick } = props;

  return (
    <div onClick={() => onClick(User)} className="displayName">
      <div
        style={{
          margin: "2vh 1vw",
          display: "flex",
          flex: 1,
          justifyContent: "space-around",
          width: "100%",
          height: "5vh",
          alignItems: "center",
          borderColor: "#7840A7",
          backgroundColor: "#f0eef0",
        }}
      >
        <span
          style={{
            textAlign: "right",
            fontSize: 21,
            marginLeft: "4vw",
          }}
        >
          {User.user}
        </span>{" "}
        <div className="displayPic">
          <img
            style={{ marginRight: "-5vw" }}
            src={
              User.parentPic != ""
                ? User.parentPic
                : "https://firebasestorage.googleapis.com/v0/b/gradproj-bb312.appspot.com/o/images%2FCapture.PNG?alt=media&token=f2ce9e5f-5f28-461a-af6c-61a20cd58dc3"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const Messages = (props) => {
  const { rootState } = useContext(MyContext);
  const [threads, setThreads] = useState([]);
  const { theUser, uid } = rootState;
  AppString.KinderName = theUser.KinderName;
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [parentID, setParentID] = useState("");
  const [Messages, setMessages] = useState([]);
  const [Con, setCon] = useState([]);
  // GetUsers();
  console.log(AppString.users);

  {
    /*useEffect(() => {
    const docid =
      AppString.UserID > parentID
        ? parentID + "-" + AppString.UserID
        : AppString.UserID + "-" + parentID;
    console.log("id", docid);
    const messageRef = db
      .collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const allmsg = snapshot.docs.map((docsnap) => {
          const data = docsnap.data();
          if (data.createdAt) {
            return {
              ...docsnap.data(),
              createdAt: docsnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docsnap.data(),
              createdAt: new Date(),
            };
          }
        });
        AppString.Messages = allmsg;
        console.log(AppString.Messages);
      });
  }, []); */
  }
  async function GetMessages(parent) {
    const docid =
      AppString.UserID > parent
        ? parent + "-" + AppString.UserID
        : AppString.UserID + "-" + parent;
    console.log("id", parent);
    const messageRef = await db
      .collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .orderBy("createdAt", "asc");

    messageRef.onSnapshot((snapshot) => {
      const allmsg = snapshot.docs.map((docsnap) => {
        const data = docsnap.data();
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date(),
          };
        }
      });
      AppString.Msg = allmsg;
      console.log(AppString.Msg);
    });
  }
  const initChat = (user) => {
    AppString.Msg = [""];
    setChatStarted(true);
    console.log(user);
    setChatUser(user.user);
    setParentID(user.userID);
    GetMessages(user.userID);
  };
  const submitMessage = (e) => {
    const mymsg = {
      text: message,
      sendBy: AppString.UserID,
      sendTo: parentID,
      kinderName: AppString.KinderName,
      createdAt: new Date(),
    };
    setMessage("");

    const docid =
      AppString.UserID > parentID
        ? parentID + "-" + AppString.UserID
        : AppString.UserID + "-" + parentID;
    db.collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .add({
        ...mymsg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <section className="container">
      <div className="chatArea">
        <div className="chatHeader" style={{ fontSize: 22 }}>
          {" "}
          {chatStarted ? chatUser : ""}{" "}
        </div>
        <div className="messageSections">
          {console.log(AppString.Messages)}
          {chatStarted
            ? AppString.Msg.map((m) => (
                <div style={{ textAlign: "right" }}>
                  {m.sendBy == AppString.UserID ? (
                    <p
                      className="messageStyle"
                      style={{
                        color: "white",
                        fontSize: 17,
                      }}
                    >
                      {console.log("text", m.text)}
                      {m.text}
                    </p>
                  ) : (
                    <p
                      className="responseStyle"
                      style={{ color: "white", fontSize: 17 }}
                    >
                      {m.text}
                    </p>
                  )}
                </div>
              ))
            : null}
          {/*  <div>
            <p
              className="messageStyle"
              style={{ color: "white", fontSize: 17 }}
            >
              مرحبا
            </p>
            <p
              className="responseStyle"
              style={{ color: "white", fontSize: 17 }}
            >
              أهلاً
            </p>
          </div>*/}
        </div>{" "}
        {chatStarted ? (
          <div style={{ marginTop: "6vh", width: "90vw", marginLeft: "1vw" }}>
            <button
              onClick={submitMessage}
              style={{
                fontSize: 21,
                backgroundColor: "#84d4a4",
                width: "15vw",
                height: "7vh",
                position: "absolute",
              }}
            >
              إرسـال
            </button>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "65vw",
                height: "7vh",
                color: "black",
                textAlign: "right",
                fontSize: 16,
                paddingRight: "1vw",
                paddingTop: "2vh",
              }}
              placeholder="قم بكتابة رسـالة"
            />
          </div>
        ) : null}
      </div>
      {/*  <div className="listOfUsers">
        {AppString.users.map((User) => (
          <button className="displayName" borderColor="red">
            <div
              style={{
                margin: "2vh 1vw",
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                width: "100%",
                height: "5vh",
                alignItems: "center",
                borderColor: "#7840A7",
                backgroundColor: "#f0eef0",
              }}
            >
              <span
                style={{
                  textAlign: "right",
                  fontSize: 21,
                }}
              >
                {User.user}
              </span>
              {console.log(User.user)}
            </div>
            <div className="displayPic">
              <img
                src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                alt=""
              />
            </div>
          </button>*/}

      <div className="listOfUsers">
        {AppString.users.map((User) => {
          return <Parent onClick={initChat} key={User.userID} User={User} />;
        })}
      </div>
    </section>
  );
};

export default Messages;
