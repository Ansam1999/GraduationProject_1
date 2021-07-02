import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import Icon from "react-native-vector-icons/Ionicons";
import { AppString } from "./User";
import { width, height, totalSize } from "react-native-dimension";

class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      Email: AppString.Email,
      // KinderEmail:AppString.KinderEmail
    };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row-reverse",
          justifyContent: "flex-start",
          width: width(100),
          backgroundColor: "white",
          borderColor: "#E6EAEC",
          borderWidth: 1,
          marginTop: 15,
          elevation: 12,
          height: height(25),
        }}
        onPress={() =>
          this.props.navigation.navigate(
            "profile",
            (AppString.KinderName = item.KinderName),
            (AppString.KinderEmail = item.KinderEmail),
            (AppString.KinderPhone = item.KinderPhone),
            (AppString.City = item.City),
            (AppString.bus = item.bus),
            (AppString.food = item.food),
            (AppString.gender = item.gender),
            (AppString.coverfile = item.coverfile),
            (AppString.Address = item.Address),
            (AppString.k1 = item.k1),
            (AppString.k2 = item.k2),
            (AppString.place1 = item.place1),
            (AppString.place2 = item.place2)
          )
        }
      >
        <View
          style={{
            height: height(15),
            width: width(35),
            borderRadius: 15,
            marginTop: "7%",
            position: "relative",
            marginRight: width(3),
          }}
        >
          <Image
            source={{ uri: item.coverfile }}
            style={{
              height: height(15),
              width: width(35),
              resizeMode: "cover",
              borderRadius: 13,
              borderColor: "#E6EAEC",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginRight: "5%",
            marginTop: "8%",
            marginRight: width(8),
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {item.KinderName}
          </Text>
          {item.state === "" ? (
            <View
              style={{
                width: width(17),
                height: height(7),
                flexDirection: "row-reverse",
                marginRight: width(12),
                marginTop: height(2),
              }}
            >
              <Text style={{ fontSize: 22 }}>طلبك</Text>

              <Text style={{ fontSize: 22 }}> معلّق</Text>
            </View>
          ) : item.state === "true" ? (
            <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
              <View
                style={{
                  width: width(17),
                  height: height(7),
                  flexDirection: "row-reverse",
                  marginTop: height(2),
                }}
              >
                <Text style={{ fontSize: 22 }}>طلبك</Text>
                <Text style={{ fontSize: 22 }}> مقبول</Text>
              </View>
              <TouchableOpacity
                style={{ width: width(50), marginRight: -width(5) }}
                onPress={() =>
                  this.props.navigation.navigate(
                    "final",
                    (AppString.Kinder = item.KinderName)
                  )
                }
              >
                <Text
                  style={{ width: width(45), fontSize: 20, color: "#676666" }}
                >
                  الانتقال لتأكيد الانضمام
                </Text>
                <Icon
                  name="chevron-back-outline"
                  size={23}
                  color="#676666"
                  style={{
                    position: "absolute",
                    left: -width(2),
                    top: height(0.3),
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : item.state === "false" ? (
            <View
              style={{
                width: width(17),
                height: height(7),
                flexDirection: "row-reverse",
                marginRight: width(12),
                marginTop: height(2),
              }}
            >
              <Text style={{ fontSize: 22 }}>طلبك</Text>
              <Text style={{ fontSize: 22 }}> مرفوض</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    var InsertAPIURL = "http://10.0.2.2:80/api/displaySent.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: this.state.Email,
    };

    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson });
      })
      .catch((error) => {
        alert("Error" + error);
      });
  }
  render() {
    return (
      <ScrollView>
        <View
          style={styles.container}
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#F3F7F9",
            marginBottom: 30,
          }}
        >
          {this.state.dataSource == "لا يوجد عناصر محفوظة"
            ? null
            : this.state.dataSource.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={item.KinderEmail}
                    style={{
                      flexDirection: "row-reverse",
                      justifyContent: "flex-start",
                      width: width(100),
                      backgroundColor: "white",
                      borderColor: "#E6EAEC",
                      borderWidth: 1,
                      marginTop: 15,
                      elevation: 12,
                      height: height(25),
                    }}
                    onPress={() =>
                      this.props.navigation.navigate(
                        "profile",
                        (AppString.KinderName = item.KinderName),
                        (AppString.KinderEmail = item.KinderEmail),
                        (AppString.KinderPhone = item.KinderPhone),
                        (AppString.City = item.City),
                        (AppString.bus = item.bus),
                        (AppString.food = item.food),
                        (AppString.gender = item.gender),
                        (AppString.coverfile = item.coverfile),
                        (AppString.Address = item.Address),
                        (AppString.k1 = item.k1),
                        (AppString.k2 = item.k2),
                        (AppString.place1 = item.place1),
                        (AppString.place2 = item.place2)
                      )
                    }
                  >
                    <View
                      style={{
                        height: height(15),
                        width: width(35),
                        borderRadius: 15,
                        marginTop: "7%",
                        position: "relative",
                        marginRight: width(3),
                      }}
                    >
                      <Image
                        source={{ uri: item.coverfile }}
                        style={{
                          height: height(15),
                          width: width(35),
                          resizeMode: "cover",
                          borderRadius: 13,
                          borderColor: "#E6EAEC",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        marginRight: "5%",
                        marginTop: "8%",
                        marginRight: width(8),
                      }}
                    >
                      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                        {item.KinderName}
                      </Text>
                      {item.state === "" ? (
                        <View
                          style={{
                            width: width(17),
                            height: height(7),
                            flexDirection: "row-reverse",
                            marginRight: width(12),
                            marginTop: height(2),
                          }}
                        >
                          <Text style={{ fontSize: 22 }}>طلبك</Text>

                          <Text style={{ fontSize: 22 }}> معلّق</Text>
                        </View>
                      ) : item.state === "true" ? (
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <View
                            style={{
                              width: width(17),
                              height: height(7),
                              flexDirection: "row-reverse",
                              marginTop: height(2),
                            }}
                          >
                            <Text style={{ fontSize: 22 }}>طلبك</Text>
                            <Text style={{ fontSize: 22 }}> مقبول</Text>
                          </View>
                          <TouchableOpacity
                            style={{ width: width(50), marginRight: -width(5) }}
                            onPress={() =>
                              this.props.navigation.navigate(
                                "final",
                                (AppString.Kinder = item.KinderName)
                              )
                            }
                          >
                            <Text
                              style={{
                                width: width(45),
                                fontSize: 20,
                                color: "#676666",
                              }}
                            >
                              الانتقال لتأكيد الانضمام
                            </Text>
                            <Icon
                              name="chevron-back-outline"
                              size={23}
                              color="#676666"
                              style={{
                                position: "absolute",
                                left: -width(2),
                                top: height(0.3),
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : item.state === "false" ? (
                        <View
                          style={{
                            width: width(17),
                            height: height(7),
                            flexDirection: "row-reverse",
                            marginRight: width(12),
                            marginTop: height(2),
                          }}
                        >
                          <Text style={{ fontSize: 22 }}>طلبك</Text>
                          <Text style={{ fontSize: 22 }}> مرفوض</Text>
                        </View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around",
    backgroundColor: "#F3F7F9",
  },
  view: {
    width: "90%",
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginLeft: "3%",
    marginBottom: 15,
  },
  Image: {
    width: 150,
    height: 160,
    resizeMode: "contain",
    marginTop: 10,
    borderRadius: 12,
    marginRight: 10,
  },
});

export default SavedScreen;
