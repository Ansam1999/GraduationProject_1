import React, { Component, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { width, height } from "react-native-dimension";
import { AppString } from "./User";
import Ionicons from "react-native-vector-icons/Ionicons";
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";

async function setViewed() {
  var InsertAPIURL = "http://10.0.2.2:80/api/insertViewed.php";
  var headars = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // setEmail(Email)
  var data = {
    isViewed: "true",
    KinderEmail: AppString.FinalKinder,
    Email: AppString.Email,
    Name: AppString.name,
  };

  fetch(InsertAPIURL, {
    method: "POST",
    headers: headars,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      //  alert(response[0].Message);
      //  if(response[0].Message=="Form has been sent successfully"){
      //     navigation.navigate("KProfile");
      // }
    })
    .catch((error) => {
      // alert("Error" + error);
    });
}

async function getInfo() {
  console.log(AppString.FinalKinder);
  var InsertAPIURL = "http://10.0.2.2:80/api/Kinder.php";
  var headars = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // setEmail(Email)
  var data = {
    KinderEmail: AppString.FinalKinder,
  };

  fetch(InsertAPIURL, {
    method: "POST",
    headers: headars,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      AppString.info = response;
      console.log("inn", response);

      //  alert(response[0].Message);
      //  if(response[0].Message=="Form has been sent successfully"){
      //     navigation.navigate("KProfile");
      // }
    })
    .catch((error) => {
      // alert("Error" + error);
    });
}
const Final = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [progress, setPropgress] = useState(0);
  const a = setViewed();
  const b = getInfo();
  AppString.KinderEmail = AppString.FinalKinder;
  let UploadPhoto = async () => {
    console.log(photoName);
    const response = await fetch(image);
    const blob = await response.blob();
    const uploadTask = storage.ref(`images/${photoName}`).put(blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(photoName)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
          });
      }
    );
  };
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    console.log(pickerResult.uri);
    setImage(pickerResult.uri);
    setPhotoName(
      pickerResult.uri.substring(pickerResult.uri.lastIndexOf("/") + 1)
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginRight: width(10),
          marginTop: height(5),
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: "auto",
          textAlign: "right",
          color: "#000000",
        }}
      >
        {AppString.name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginRight: width(12),
          marginTop: height(2),
          color: "#676666",
        }}
      >
        * لتأكيد انضمامك يرجى زيارة الروضة في أقرب فرصة وإحضار شهادة ميلاد الطفل
        المسجل
      </Text>
      <TouchableOpacity
        style={{
          marginTop: height(7),
          marginRight: width(20),
          flexDirection: "row-reverse",
          justifyContent: "space-around",
        }}
        onFocus={true}
        onPress={() => navigation.navigate("profileK")}
      >
        <Ionicons
          name="return-down-back-sharp"
          size={28}
          color="#7840A7"
          style={{ marginRight: width(10) }}
        />
        <Text
          style={{
            fontSize: 23,
            marginRight: width(3),
            fontWeight: "bold",
            color: "#7840A7",
          }}
        >
          الانتقال إلى صفحة الروضة
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
export default Final;
