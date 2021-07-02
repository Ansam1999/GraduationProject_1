import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import { AppString } from "./User";
const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/uniform.jpg"),
    messageTime: "منذ 4 دقائق",
    messageText: "مرحبا, كيفكم؟ الحمدلله",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/uniform.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/uniform.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/uniform.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/uniform.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];
/*
async function GetUsers() {
  mountedRef = true;
  console.log("hello");
  const users = [];
  await db
    .collection("AppUsers")
    .where("user", "==", AppString.userN)
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
const MessagesScreen = ({ navigation }) => {
  const [users, setUsers] = useState([[]]);

  /*useEffect(() => {
    db.collection("AppUsers")
      .where("user", "==", AppString.userName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  */
  //GetUsers();

  return (
    <View style={styles.container}>
      <FlatList
        data={AppString.users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() =>
              navigation.navigate(
                "Chat",
                (AppString.KinderID = item.kinderID),
                (AppString.userName = item.kinderName)
              )
            }
          >
            <View style={styles.UserInfo}>
              <View style={styles.UserImgWrapper}>
                <Image
                  style={styles.UserImg}
                  source={{
                    uri: item.kinderPic,
                  }}
                />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={styles.UserName}>{item.kinderName}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  UserInfo: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  UserInfoText: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  UserName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  PostTime: {
    fontSize: 12,
    color: "#666",
  },
  MessageText: {
    fontSize: 14,
    color: "#333333",
  },
});
