import React, { useState, useEffect, useRef, Component } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import { AppString } from "./User";
import { width, height } from "react-native-dimension";
import { Avatar } from "react-native-elements";

class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datsOfNotification: [],
      color: "#d2e3d8",
    };
  }
  componentDidMount() {
    var InsertAPIURL = "http://10.0.2.2:80/api/displayNotification.php";
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
        if (responseJson != "no notification") {
          this.setState({ datsOfNotification: responseJson });
        }
      })
      .catch((error) => {
        //  alert("Error" + error);
      });
  }

  renderItem = ({ item }) => {
    AppString.FinalKinder = item.KinderEmail;
    AppString.name = item.name;
    item.isViewed === "1"
      ? (this.state.color = "white")
      : (this.state.color = "#d2e3d8");
    return (
      <View>
        {item.state != "" ? (
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              width: width(100),
              borderColor: "#E6EAEC",
              borderWidth: 1,
              elevation: 10,
              height: height(13),
              justifyContent: "center",
              backgroundColor: this.state.color,
            }}
            onPress={() =>
              this.props.navigation.navigate(
                "Final",
                ((AppString.name = item.KinderName),
                (AppString.fCity = item.city),
                (AppString.fAddress = item.address),
                (AppString.KinderEmail = item.KinderEmail))
              )
            }
          >
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
                width: width(95),
              }}
            >
              <Avatar rounded size={60} source={{ uri: item.coverfile }} />
              {item.state === "true" ? (
                <Text style={{ fontSize: 22, width: width(75) }}>
                  تم قبول طلبك من قبل{" "}
                  <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                    {item.KinderName}
                  </Text>
                </Text>
              ) : item.state === "false" ? (
                <Text style={{ fontSize: 22, width: width(75) }}>
                  تم رفض طلبك من قبل{" "}
                  <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                    روضة السعادة
                  </Text>
                </Text>
              ) : null}
            </View>
            {/* <Text style={{marginTop:height(2),fontSize:20,color:COLORS.secondary, fontFamily:'Roboto',fontWeight:'bold'}}>{item.KinderEmail} مراجعة طلب من </Text>
 <Text style={{marginTop:height(2),fontSize:20,color:COLORS.secondary, fontFamily:'Roboto'}}>{item.accept ?  "تم قبول طلبك" : "تم رفض طلبك"}</Text>
   */}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  render() {
    {
      console.log(this.state.datsOfNotification);
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#F3F7F9",
        }}
      >
        <FlatList
          style={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#F3F7F9",
          }}
          data={this.state.datsOfNotification}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default NotificationPage;
