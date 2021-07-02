import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { width, height } from "react-native-dimension";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppString } from "./User";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
//import ImagePicker from "react-native-image-crop-picker";
import COLORS from "../assets/consts/COLORS";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import * as ImagePicker from "expo-image-picker";

saveImage = async () => {
  console.log("img", AppString.profilePic);
  console.log(AppString.Email);
  var InsertAPIURL = "http://10.0.2.2:80/api/InsertImage.php";
  var headars = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  var data = await {
    Email: AppString.Email,
    profilePic: AppString.profilePic,
  };

  await fetch(InsertAPIURL, {
    method: "POST",
    headers: headars,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      alert(response[0].Message);
    })
    .catch((error) => {
      alert("Error" + error);
    });
};
const EditProfileScreen = (props) => {
  console.log(AppString.parentEmail);
  const [Username, setUsername] = useState("");
  const [City, setCity] = useState("");
  const [Email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [Url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      /* setImage(imageUri);
          this.bs.current.snapTo(1);*/
    });
  };

  let handleUpload = async () => {
    console.log("name", image);
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
        console.log("Hi");
        storage
          .ref("images")
          .child(photoName)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log("helllloooo");
            console.log("url", Url);
            AppString.profilePic = Url;
          });
      }
    );

    saveImage();
  };
  let choosePhotoFromLibrary = async () => {
    console.log("photo");
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

    console.log("pic", pickerResult.uri);
    setImage(pickerResult.uri);
    setPhotoName(
      pickerResult.uri.substring(pickerResult.uri.lastIndexOf("/") + 1)
    );

    handleUpload();
  };

  const UpdateRecord = () => {
    if (Username.length == 0) {
      Username = AppString.editName;
    } else {
      AppString.Username = Username;
    }

    var InsertAPIURL = "http://10.0.2.2:80/api/updateParent.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Username: Username,
      OrgEmail: AppString.Email,
      // City: City,
      //Email: Email,
    };

    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response[0].Message);
      })
      .catch((error) => {
        alert("Error" + error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              // source={{require("../assets/profilePic.jpg")}}
              source={{
                uri:
                  AppString.pic != ""
                    ? AppString.pic
                    : "https://firebasestorage.googleapis.com/v0/b/gradproj-bb312.appspot.com/o/images%2FCapture.PNG?alt=media&token=f2ce9e5f-5f28-461a-af6c-61a20cd58dc3",
              }}
              style={{ height: 100, width: 100, marginBottom: 10 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
      <Button
        title="تحميل صورة شخصية "
        color="#84d4a4"
        style={styles.buttonContainer}
        onPress={choosePhotoFromLibrary}
      />
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          placeholder={AppString.editName}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="#666666"
          /* value={userData ? userData.fname : ''}
            onChangeText={(txt) => setUserData({...userData, fname: txt})}*/
          style={styles.textInput}
        />
      </View>

      <View style={styles.action}>
        <MaterialCommunityIcons
          name="email-edit-outline"
          color="#333333"
          size={20}
        />
        <TextInput
          placeholder={AppString.Email}
          placeholderTextColor="#666666"
          /*  value={userData ? userData.phone : ''}
            onChangeText={(txt) => setUserData({...userData, phone: txt})}*/
          style={styles.textInput}
        />
      </View>

      <View style={styles.action}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color="#333333"
          size={20}
        />
        <TextInput
          placeholder={AppString.editCity}
          editable={true}
          placeholderTextColor="#666666"
          /* value={userData ? userData.city : ''}
            onChangeText={(txt) => setUserData({...userData, city: txt})}*/
          style={styles.textInput}
        />
      </View>
      <Button
        title="تحديث المعلومات"
        color="#84d4a4"
        style={styles.buttonContainer}
        onPress={UpdateRecord}
      />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#84d4a4",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row-reverse",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    justifyContent: "flex-end",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    marginRight: 10,
    color: "#333333",
    fontSize: 18,
    textAlign: "right",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    height: 20,
    color: "#84d4a4",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginBottom: 15,
  },
});
