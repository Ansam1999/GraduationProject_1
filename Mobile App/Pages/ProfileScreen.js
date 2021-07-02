import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../assets/consts/COLORS";
import { NavigationContainer } from "@react-navigation/native";
import { AppString } from "./User";
import { TouchableOpacity } from "react-native-gesture-handler";
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    AppString.filterCity = "";
    AppString.filterBus = false;
    this.state = {
      dataSource: [],
      Email: AppString.parentEmail,
      City: AppString.parentCity,
    };
  }
  componentDidMount() {
    var InsertAPIURL = "http://10.0.2.2:80/api/Profile.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: AppString.Email,
    };

    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson });
        AppString.profile = responseJson;
        console.log(this.state.dataSource);
        console.log("hi"); //console.log(this.state.dataSource.Email);
        // AppString.parentCity=this.state.dataSource.City;
        //AppString.parentEmail=this.state.dataSource.Email;
        // console.log(AppString.parentEmail);
      })
      .catch((error) => {
        alert("Error" + error);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View key={AppString.Username}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row-reverse", marginTop: 40 }}>
              <Avatar.Image
                source={{
                  uri:
                    AppString.pic !== ""
                      ? AppString.pic
                      : "https://firebasestorage.googleapis.com/v0/b/gradproj-bb312.appspot.com/o/images%2FCapture.PNG?alt=media&token=f2ce9e5f-5f28-461a-af6c-61a20cd58dc3",
                }}
                size={80}
              />
              <View style={{ marginRight: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {AppString.Username}
                </Title>
                <Text style={{ fontSize: 1, color: "white" }}>
                  {" "}
                  {(AppString.editName = AppString.Username)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#84d4a4" size={20} />
              <Text style={{ color: "#777777", marginRight: 20, fontSize: 20 }}>
                {(AppString.editCity = AppString.City)}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#84d4a4" size={20} />
              <Text style={{ color: "#777777", marginRight: 20, fontSize: 20 }}>
                {AppString.Email}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <Ionicons
                name="ios-clipboard-outline"
                color="#84d4a4"
                size={20}
              />
              <Text style={{ color: "#777777", marginRight: 20, fontSize: 20 }}>
                المعلومات الشخصية
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() => this.props.navigation.navigate("Saved")}
            >
              <View style={styles.menuItem}>
                <Icon
                  name="bookmark-outline"
                  size={25}
                  color={COLORS.secondary}
                  color="#84d4a4"
                />

                <Text style={styles.menuItemText}>العناصر المحفوظة</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => this.props.navigation.navigate("forms")}
            >
              <View style={styles.menuItem}>
                <FontAwesome
                  name="wpforms"
                  size={20}
                  color={COLORS.secondary}
                  color="#84d4a4"
                />

                <Text style={styles.menuItemText}>الطلبات المرسلة</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => this.props.navigation.navigate("support")}
            >
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#84d4a4" size={25} />
                <Text style={styles.menuItemText}>الدعم</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row-reverse",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginRight: 20,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 26,
  },
});
