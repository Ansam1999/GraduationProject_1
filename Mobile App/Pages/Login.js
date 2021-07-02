import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import ParentAccount from "./ParentAccount";
import { AuthContext } from "./context";
import { Col } from "react-native-table-component";
import { AppString } from "./User";
import { width, height, totalSize } from "react-native-dimension";
import * as Animatable from "react-native-animatable";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
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
}
const Login = ({ navigation }) => {
  const { logIn } = React.useContext(AuthContext);
  //width: ${(Dimensions.get('window').width)}px;
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [City, setCity] = useState("");
  const [Email, setEmail] = useState("");
  const [id, setID] = useState("");
  async function LoginInFirebase() {
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((userCredential) => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          AppString.UserID = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          console.log(AppString.UserID);
        }
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
  async function getName() {
    var SubmitAPIURL = "http://10.0.2.2:80/api/Name.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: AppString.Email,
    };

    fetch(SubmitAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        AppString.userN = responseJson;
        console.log("log", AppString.userN);
      })

      .then((response) => {
        alert(response[0].Message);
      })
      .catch((error) => {
        //      alert("Error"+error);
      });
  }
  const submit = () => {
    var SubmitAPIURL = "http://10.0.2.2:80/api/ParentLogin.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: Email,
      Password: Password,
    };

    fetch(SubmitAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //   alert(responseJson);console.log('hi1');
        if (responseJson == "Data Matched") {
          console.log("yes");
          logIn();
          // AppString.Username = Username;
          AppString.Email = Email;
          LoginInFirebase();
          getName();
          GetUsers();
        }
      })

      .then((response) => {
        alert(response[0].Message);
        setCity(response[0].City);
        console.log(response[0].City);
        setEmail(response[0].Email);
        setID(response[0].ID);
      })
      .catch((error) => {
        //      alert("Error"+error);
      });
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        flex: 1,
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        style={{
          backgroundColor: COLORS.primary,
          width: "100%",
          resizeMode: "cover",
          height: "70%",
        }}
        source={require("../assets/background.png")}
      />
      <View style={styles.Container}>
        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderTextColor={COLORS.grey}
          style={styles.Input1}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="كلمة المرور"
          placeholderTextColor={COLORS.grey}
          style={[styles.Input, styles.font]}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text
            style={{
              fontSize: 23,
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
          >
            تسجيل الدخول{" "}
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, fontSize: 18, color: "white" }}>
          -أو-
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ParentAccount")}
        >
          <Text
            style={{
              fontSize: 23,
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
          >
            إنشاء حساب
          </Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1200"
            source={require("../assets/R.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    top: "37%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Input: {
    fontSize: 20,
    width: width(65),
    // width:'60%'*windowWidth,
    height: height(6),
    borderWidth: 1,
    borderColor: "#F2D7D5",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "white",
    opacity: 0.65,
    color: "black",
    justifyContent: "flex-start",
    alignContent: "flex-end",
    textAlign: "right",
    paddingRight: width(1),
  },
  Input1: {
    fontSize: 20,
    width: width(65),
    // width:'60%'*windowWidth,
    height: height(6),
    borderWidth: 1,
    borderColor: "#F2D7D5",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "white",
    opacity: 0.65,
    color: "black",
    justifyContent: "flex-start",
    alignContent: "flex-end",
    paddingRight: width(5),
  },
  font: {
    color: "black",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: height(43),
  },
  logo: {
    width: height(28),
    height: height(28),
  },
  button: {
    width: width(65),
    height: height(6),
    backgroundColor: "white",
    fontSize: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    elevation: 10,
    opacity: 0.95,
  },
});
export default Login;
