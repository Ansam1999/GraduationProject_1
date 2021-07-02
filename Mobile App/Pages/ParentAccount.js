import React, { Component, useState } from "react";
import { render } from "react-dom";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import COLORS from "../assets/consts/COLORS";
import { AuthContext } from "./context";
import { width, height, totalSize } from "react-native-dimension";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import { AppString } from "./User";

const ParentAccount = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const cityOptions = [
    "نابلس",
    "رام الله",
    "طولكرم",
    "جنين",
    "طوباس",
    "قلقيلية",
    "الخليل",
    "سلفيت",
    "بيت لحم",
  ];

  const [City, setCity] = useState("");
  const [Email, setEmail] = useState("");

  const onChangeProp = (index, value) => {
    setCity(value);
  };
  async function getName() {
    var SubmitAPIURL = "http://10.0.2.2:80/api/Name.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: Email,
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

  const InsertRecord = () => {
    if (
      Username.length == 0 ||
      Email.length == 0 ||
      City == "" ||
      Password.length == 0 ||
      RePassword.length == 0
    ) {
      alert("Required Field is missing");
    } else {
      async function InsertInFirebase() {
        auth.createUserWithEmailAndPassword(Email, Password).then((value) => {
          var user = value.user;
          AppString.UserID = user.uid;
          console.log(user);
          db.collection("users").doc(AppString.UserID.toString()).set({
            username: Username,
            email: Email,
            createdAt: new Date(),
          });
        });
      }
      var InsertAPIURL = "http://10.0.2.2:80/api/insertParent.php";
      var headars = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      var data = {
        Username: Username,
        Email: Email,
        City: City,
        Password: Password,
        RePassword: RePassword,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headars,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response[0].Message);
          if (response[0].Message == "تم إنشاء حسابك بنجاح") {
            signUp();
            InsertInFirebase();
            AppString.Email = Email;
            getName();
          }
        })
        .catch((error) => {
          alert("Error" + error);
        });
    }
  };
  return (
    <ScrollView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <View style={styles.Container}>
        <View style={styles.firstText}>
          <Text
            style={{
              fontSize: 26,
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
          >
            إنشاء حساب جديد
          </Text>
        </View>
        <View style={styles.sentence}>
          <Text style={{ fontSize: 18, color: "white" }}>
            {" "}
            من فضلك قم بتعبئة معلوماتك لإنشاء حسابك
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, marginTop: height(3) }}>
            الاسم
          </Text>
          <TextInput
            placeholder="  الاسم الشخصي"
            style={[styles.Input, styles.font]}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={{ color: "white", fontSize: 20 }}>
            البريد الإلكتروني
          </Text>
          <TextInput
            placeholder="   البريد الإلكتروني"
            style={styles.Input}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ color: "white", fontSize: 20 }}>المدينة</Text>

          <ModalDropdown
            style={styles.City}
            options={cityOptions}
            onSelect={onChangeProp}
            defaultValue=" اختر مدينتك"
            defaultValueStyle={{ color: "red" }}
            dropdownStyle={styles.cityDrop}
            dropdownTextStyle={{ fontSize: 20 }}
            textStyle={{ fontSize: 18 }}
          />

          <Text style={{ color: "white", fontSize: 20, marginTop: height(2) }}>
            كلمة المرور
          </Text>
          <TextInput
            secureTextEntry={true}
            placeholder=" كلمة المرور"
            style={[styles.InputPass1, styles.font]}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={{ color: "white", fontSize: 20 }}>
            تأكيد كلمة المرور
          </Text>

          <TextInput
            secureTextEntry={true}
            placeholder="تأكيد كلمة المرور"
            style={[styles.InputPass, styles.font]}
            onChangeText={(text) => setRePassword(text)}
          />
          <TouchableOpacity onPress={InsertRecord} style={styles.Button}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              إنشاء حساب
            </Text>
          </TouchableOpacity>
          <View style={styles.Image}>
            <Image source={require("../assets/cartoon.png")} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ParentAccount;
const styles = StyleSheet.create({
  firstText: {
    fontWeight: "bold",
    fontSize: 26,
    backgroundColor: COLORS.primary,
    width: width(100),
    height: height(7),
    justifyContent: "space-around",
    alignItems: "center",
    color: COLORS.secondary,

    paddingTop: height(2),
  },
  sentence: {
    color: "white",
    fontSize: 15,
    backgroundColor: COLORS.secondary,
    width: width(100),
    height: height(7),
    justifyContent: "center",
    alignItems: "center",
  },
  Container: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: COLORS.primary,
  },
  Input: {
    fontSize: 20,
    width: width(85),
    height: height(6.5),
    borderWidth: 1,
    borderColor: "white",
    marginBottom: height(2),
    backgroundColor: "white",
    borderRadius: 9,
    alignItems: "flex-end",
  },
  InputPass: {
    fontSize: 20,
    width: width(85),
    height: height(6.5),
    borderWidth: 1,
    borderColor: "white",
    marginBottom: height(2),
    backgroundColor: "white",
    borderRadius: 9,
    alignItems: "flex-end",
    paddingLeft: width(52),
  },
  InputPass1: {
    fontSize: 20,
    width: width(85),
    height: height(6.5),
    borderWidth: 1,
    borderColor: "white",
    marginBottom: height(2),
    backgroundColor: "white",
    borderRadius: 9,
    alignItems: "flex-end",
    paddingLeft: width(60),
  },
  font: {
    color: "black",
  },
  City: {
    width: width(85),
    fontSize: 20,
    height: height(6.5),
    backgroundColor: "white",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: width(3),
  },
  cityDrop: {
    width: width(85),
    fontSize: 20,
  },

  Button: {
    width: width(70),
    height: 50,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: height(3),
    elevation: 9,
  },
  Image: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 220,
  },
});
