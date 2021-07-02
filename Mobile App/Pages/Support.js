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
import Communications from "react-native-communications";

const Support = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        لأي استفسارات أو شكاوي يرجى التواصل عبر البريد الإلكتروني :
      </Text>
      <TouchableOpacity
        onPress={() =>
          Communications.email(
            ["  rawdati2021@gmail.com"],
            null,
            null,
            "استفسار/شكوى",
            "اكتب استفسارك/شكواك"
          )
        }
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginTop: height(3),
            color: "#7840A7",
          }}
        >
          rawdati2021@gmail.com
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginTop: height(10) }}>
        نشكر وجودكم معنا..
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: height(7),
    marginRight: width(5),
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
export default Support;
