import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../assets/consts/COLORS";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import { AppString } from "./User";

const ChatScreen = ({ route }) => {
  console.log(AppString.pic);
  const userName = AppString.userName;
  const KinderID = AppString.KinderID;
  const [isFirst, setIsFirst] = useState("false");
  const [messages, setMessages] = useState([]);
  const User = AppString.userN;

  useEffect(() => {
    const docid =
      KinderID > AppString.UserID
        ? AppString.UserID + "-" + KinderID
        : KinderID + "-" + AppString.UserID;
    const messageRef = db
      .collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .orderBy("createdAt", "desc");

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
      setMessages(allmsg);
    });
  }, []);

  const onSend = (messages) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sendBy: AppString.UserID,
      sendTo: KinderID,
      parentName: User,
      kinderName: AppString.KinderName,
      createdAt: new Date(),

      lastmessage: msg,
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    );
    const docid =
      KinderID > AppString.UserID
        ? AppString.UserID + "-" + KinderID
        : KinderID + "-" + AppString.UserID;
    db.collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .add({
        ...mymsg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    if (isFirst == "false") {
      db.collection("AppUsers").add({
        user: User,
        kinderName: AppString.KinderName,
        kinderID: KinderID,
        userID: AppString.UserID,
        createdAt: new Date(),
        lastmessage: msg.text,
        parentPic: AppString.pic,
        kinderPic: AppString.kinderPic,
      });
      setIsFirst("true");
    } else {
      let id;
      db.collection("AppUsers")
        .where("user", "==", AppString.userN)
        .where("kinderName", "==", AppString.KinderName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            id = doc.id;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      db.collection("AppUsers").doc(id).update({
        createdAt: new Date(),
        lastmessage: msg.text,
      });
    }
  };
  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={35}
            color={COLORS.secondary}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.secondary,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <FontAwesome name="angle-double-down" size={22} color="#333" />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(text) => onSend(text)}
      user={{
        _id: AppString.UserID,
      }}
      placeholder="...اكتب رسالتك هنا "
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      renderLoading={renderLoading}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  systemMessageWrapper: {
    backgroundColor: "#6646ee",
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
