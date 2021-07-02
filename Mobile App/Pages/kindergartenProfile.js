import React, { Component, navigation } from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { Col } from "react-native-table-component";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../assets/consts/COLORS";
import FormScreen from "./FormScreen";
import { AuthContext } from "./context";
import Communications from "react-native-communications";
import ImgToBase64 from "react-native-image-base64";
import { AppString } from "./User";
import { width, height, totalSize } from "react-native-dimension";
import { Rating, AirbnbRating } from "react-native-ratings";
import GridList from "react-native-grid-list";
import { FlatGrid } from "react-native-super-grid";
//import Rating from "react-native-rating";
import { Easing } from "react-native";
import { SafeAreaView } from "react-native";
//import Rating from "react-native-easy-rating";
//import {FontAwesome} from '@expo/vector-icons';
class kindergartenProfile extends Component {
  constructor(props) {
    super(props);
    var val = "no";
    var sum = 0;
    var rate = 0;
    var num = 0;
    this.state = {
      Classes: [],
      Username: AppString.Username,
      KinderEmail: AppString.KinderEmail,
      dataSource: [],
      Activities: [],
      Images: [],
      modalVisible: false,
      Profile: [],
      rate: "",
      NumRate: "",
      RateSum: "",
      rating: "",
      ss: "",
    };
  }
  //let data=route.params;
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  ratingCompleted = (rating) => {
    //console.log("Rating is: " + rating);
    this.sum = parseFloat(this.state.dataSource.RateSum) + parseFloat(rating);
    console.log(this.sum);
    this.rate =
      (parseFloat(this.state.dataSource.RateSum) + parseFloat(rating)) /
      (parseFloat(this.state.dataSource.NumRate) + 1);

    this.num = parseInt(this.state.dataSource.NumRate) + parseInt(1);

    this.InsertRating();
    //this.setState({ NumRate: parseFloat(this.state.dataSource.NumRate)+1 });
  };

  InsertRating = () => {
    //let item=route.params;
    console.log("rate", this.rate);
    console.log("num", this.num);
    console.log("sum", this.sum);
    var InsertAPIURL = "http://10.0.2.2:80/api/InsertRating.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      KinderEmail: AppString.KinderEmail,
      Rate: this.rate,
      NumRate: this.num,
      RateSum: this.sum,
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
  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          height: 50,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginRight: 50,
            fontSize: 22,
            color: COLORS.grey,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };
  renderActivity = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          height: 50,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginRight: 50,
            fontSize: 22,
            color: COLORS.grey,
            fontWeight: "bold",
          }}
        >
          {item.Name}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("activity", item)}
        >
          <Icon
            name="arrow-back-circle-outline"
            size={40}
            style={{ marginLeft: width(12) }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderImage = ({ item, index }) => {
    const { modalVisible } = this.state;
    console.log(item.image);
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //  Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              width: width(100),
              height: height(100),
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Pressable
                //style={[styles.button, styles.buttonClose]}
                style={{ zIndex: 1, position: "absolute", top: 19, left: 7 }}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Icon name="md-close-circle" size={40} />
              </Pressable>
              <Image
                source={{ uri: AppString.PressedImage }}
                style={{
                  width: width(100),
                  height: height(100),
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </Modal>
        <Pressable
          //style={[styles.button, styles.buttonOpen]}
          style={{
            width: width(45),
            height: height(40),
            marginRight: width(3),
            marginTop: -height(17),
            justifyContent: "center",
            paddingTop: height(9),
          }}
          onPress={() => {
            this.setModalVisible(true), (AppString.PressedImage = item.image);
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              flex: 1,
              resizeMode: "contain",
            }}
          />
        </Pressable>
      </View>
    );
  };

  componentDidMount() {
    var InsertAPIURL = "http://10.0.2.2:80/api/Classes.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      KinderEmail: AppString.KinderEmail,
    };
    //console.log(this.state.KinderEmail)
    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Classes: responseJson });
      })
      .catch((error) => {
        alert("Error" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/Kinder.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      KinderEmail: AppString.KinderEmail,
    };
    //console.log(this.state.KinderEmail)
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
    var InsertAPIURL = "http://10.0.2.2:80/api/Activities.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      KinderEmail: AppString.KinderEmail,
    };
    //console.log(this.state.KinderEmail)
    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Activities: responseJson });
      })
      .catch((error) => {
        alert("Error" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/Images.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      KinderEmail: AppString.KinderEmail,
    };
    //console.log(this.state.KinderEmail)
    fetch(InsertAPIURL, {
      method: "POST",
      headers: headars,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Images: responseJson });
      })
      .catch((error) => {
        alert("Error" + error);
      });
    {
      /* 
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
        this.setState({ Profile: responseJson });
        console.log(Profile);
      })
      .catch((error) => {
        alert("Error" + error);
      });*/
    }
  }

  InsertSave = () => {
    //let item=route.params;
    console.log(AppString.KinderEmail);
    var InsertAPIURL = "http://10.0.2.2:80/api/InsertSave.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Email: AppString.Email,
      KinderEmail: AppString.KinderEmail,
      KinderName: AppString.KinderName,
      KinderPhone: AppString.KinderPhone,
      gender: AppString.gender,
      City: AppString.City,
      k1: AppString.k1,
      k2: AppString.k2,
      bus: AppString.bus,
      food: AppString.food,
      coverfile: AppString.coverfile,
      Address: AppString.Address,
      place1: AppString.place1,
      place2: AppString.place2,
    };
    //console.log(this.state.KinderEmail)
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
  render() {
    let data1 = this.state.dataSource;
    //  console.log(this.state.Images);
    return (
      <ScrollView style={styles.top}>
        <SafeAreaView>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: this.state.dataSource.coverfile }}
              style={{
                width: "100%",
                height: height(30),
                resizeMode: "cover",
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 22,
                zIndex: 0,
              }}
            />

            <View
              style={{
                borderBottomColor: COLORS.primary,
                borderBottomWidth: 1,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: width(10),
                }}
              >
                <TouchableOpacity
                  style={{ zIndex: 1, marginTop: height(2) }}
                  onPress={() => {
                    this.InsertSave();
                  }}
                >
                  <Icon
                    name="bookmark-outline"
                    size={30}
                    color={COLORS.secondary}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 24,
                    color: COLORS.secondary,
                    fontWeight: "bold",
                    marginRight: width(10),
                  }}
                >
                  {this.state.dataSource.KinderName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  paddingRight: width(5),
                  alignItems: "center",
                  marginTop: -height(6),
                }}
              >
                <AirbnbRating
                  reviews=""
                  size={28}
                  fractions="1"
                  backgroundColor="#F3F7F9"
                  starContainerStyle={{ marginRight: width(10) }}
                  style={{
                    backgroundColor: "#F3F7F9",
                    paddingRight: width(5),
                  }}
                  defaultRating={this.state.dataSource.Rate}
                  tintColor="#F3F7F9"
                  onFinishRating={this.ratingCompleted}
                />
                <Text
                  style={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: COLORS.grey,
                    marginBottom: -height(6.5),
                    marginRight: width(2),
                  }}
                >
                  {this.state.dataSource.Rate}
                </Text>
              </View>
              {console.log("Rating is: " + this.state.rate)}
              {/*  <FontAwesome name="star" color="#908e8c" size={30} />
               <TouchableOpacity>
                <Icon name="star" size={20} color={'#f5a623'} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="star" size={20} color={'#f5a623'} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="star" size={20} color={'#f5a623'} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="star" size={20} color={'#f5a623'} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="star" size={20} color={'#908e8c'} />
                </TouchableOpacity>
                <Text style={{fontSize:18,marginRight:8,fontWeight:'bold',color:COLORS.secondary}}>4.0</Text>
                */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Form")}
                style={{
                  width: 250,
                  height: 50,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "18%",
                  marginTop: 20,
                  elevation: 15,
                  marginBottom: 20,
                }}
              >
                {/*    <AirbnbRating showRating={2.7} fractions="{1}" />
              <AirbnbRating
                fractions={true}
                count={5}
                reviews={["Bad", "OK", "Good", "Very Good", "Amazing"]}
                size={20}
                showRating
                defaultRating={2.5}
              />*/}

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: COLORS.secondary,
                  }}
                >
                  سجل طفلك
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                borderBottomColor: COLORS.primary,
                borderBottomWidth: 1,
                marginTop: height(2),
              }}
            >
              <View
                style={{
                  flexDirection: "row-reverse",
                  marginLeft: width(8),
                  width: width(90),
                }}
              >
                <Entypo
                  name="location"
                  size={30}
                  style={{ marginTop: height(1), width: 30 }}
                  color={COLORS.secondary}
                />
                <View
                  style={{ flexDirection: "column", marginRight: width(5) }}
                >
                  <Text style={{ fontSize: 20, color: COLORS.grey }}>
                    {this.state.dataSource.City}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.grey,
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.dataSource.Address}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row-reverse",
                  marginTop: height(3),
                  marginBottom: 20,
                  marginLeft: width(10),
                  width: width(90),
                }}
              >
                <FontAwesome
                  name="child"
                  size={30}
                  color={COLORS.secondary}
                  style={{ marginTop: 5, width: 30 }}
                />
                <View
                  style={{ flexDirection: "column", marginRight: width(5) }}
                >
                  <Text style={{ fontSize: 20, color: COLORS.grey }}>
                    جنس الأطفال
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.grey,
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.dataSource.gender}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: width(40),
                    height: height(7),
                    backgroundColor: COLORS.secondary,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: height(3),
                    elevation: 8,
                    marginBottom: height(3),
                  }}
                  onPress={() =>
                    Communications.phonecall(
                      this.state.dataSource.KinderPhone,
                      true
                    )
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      اتصل الآن{" "}
                    </Text>
                    <Icon
                      name="call"
                      size={25}
                      color="white"
                      style={{ marginLeft: 12 }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width(40),
                    height: height(7),
                    backgroundColor: COLORS.secondary,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: height(3),
                    elevation: 8,
                    marginBottom: height(3),
                  }}
                  onPress={() =>
                    this.props.navigation.navigate(
                      "Chat",
                      (AppString.KinderID = this.state.dataSource.KinderID),
                      (AppString.userName = this.state.dataSource.KinderName),
                      (AppString.kinderPic = this.state.dataSource.coverfile)
                    )
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      رسالة
                    </Text>
                    <Entypo
                      name="new-message"
                      color="white"
                      size={25}
                      style={{ marginLeft: 12 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.head}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                  marginRight: width(10),
                }}
              >
                {" "}
                الأقساط الشهرية (غير شاملة الخدمات)
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  width: "100%",
                  height: height(7),
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginRight: width(15),
                  }}
                >
                  مرحلة البستان
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: width(10),
                    color: COLORS.grey,
                  }}
                >
                  {this.state.dataSource.k1}₪
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: height(7),
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginRight: width(15),
                  }}
                >
                  مرحلة التمهيدي
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: width(10),
                    color: COLORS.grey,
                  }}
                >
                  {this.state.dataSource.k2}₪
                </Text>
              </View>
            </View>

            <View style={styles.head}>
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                المقاعد المتاحة
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  width: "100%",
                  height: height(7),
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginRight: width(15),
                  }}
                >
                  مرحلة البستان
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: width(12),
                    color: COLORS.grey,
                  }}
                >
                  {this.state.dataSource.place1}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: height(7),
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginRight: width(15),
                  }}
                >
                  مرحلة التمهيدي
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: width(12),
                    color: COLORS.grey,
                  }}
                >
                  {this.state.dataSource.place2}
                </Text>
              </View>
            </View>

            <View style={styles.head}>
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                الخدمات المدفوعة
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              {AppString.bus == 0 ? null : (
                <View
                  style={{
                    width: "100%",
                    height: height(7),
                    alignContent: "center",
                    alignItems: "center",
                    marginLeft: "10%",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: width(15),
                    }}
                  >
                    باص الروضة
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: width(10),
                      color: COLORS.grey,
                    }}
                  >
                    {" "}
                    {this.state.dataSource.bus}₪
                  </Text>
                </View>
              )}
              {AppString.food == 0 ? null : (
                <View
                  style={{
                    width: "100%",
                    height: height(7),
                    alignContent: "center",
                    alignItems: "center",
                    marginLeft: "10%",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: width(15),
                    }}
                  >
                    وجبة فطور
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: width(10),
                      color: COLORS.grey,
                    }}
                  >
                    {" "}
                    {this.state.dataSource.food}₪
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                height: height(7),
                backgroundColor: "#C8C8C8",
                justifyContent: "center",
                borderTopWidth: 1.5,
                borderColor: COLORS.primary,
              }}
            >
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                الصفوف
              </Text>
            </View>
            {this.state.Classes ? (
              this.state.Classes.map((item, key) => {
                return (
                  <View
                    key={item.name}
                    style={{
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      height: 50,
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 50,
                        fontSize: 22,
                        color: COLORS.grey,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View
                key={item.name}
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  height: 50,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginRight: 50,
                    fontSize: 22,
                    color: COLORS.grey,
                    fontWeight: "bold",
                  }}
                >
                  لا يوجد بيانات لعرضها في الوقت الحالي
                </Text>
              </View>
            )}
            {/*<FlatList
              style={{ flexDirection: "column", width: "100%" }}
              data={this.state.Classes}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
*/}
            <View style={styles.head}>
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                الأنشـطة
              </Text>
            </View>
            {this.state.Activities === "No Activities" ? (
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: width(15),
                  height: height(7),
                  marginTop: height(2),
                }}
              >
                لا يوجد أنشطة في الوقت الحالي
              </Text>
            ) : (
              this.state.Activities.map((item, key) => {
                return (
                  <View
                    key={item.name}
                    style={{
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      height: 50,
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 50,
                        fontSize: 22,
                        color: COLORS.grey,
                        fontWeight: "bold",
                      }}
                    >
                      {item.Name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("activity", item)
                      }
                    >
                      <Icon
                        name="arrow-back-circle-outline"
                        size={40}
                        style={{ marginLeft: width(12) }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
            <View style={styles.head}>
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                الصور
              </Text>
            </View>

            {this.state.Images === "No Images" ? (
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: width(15),
                  height: height(7),
                  marginTop: height(2),
                }}
              >
                لا يوجد صور في الوقت الحالي
              </Text>
            ) : (
              this.state.Images.map((item, key) => {
                const { modalVisible } = this.state;
                console.log(item.image);
                return (
                  <View
                    key={item.image}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: width(10),
                      paddingLeft: width(10),
                      marginTop: height(2),
                    }}
                  >
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        //  Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <View
                        style={{
                          width: width(100),
                          height: height(100),
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Pressable
                            //style={[styles.button, styles.buttonClose]}
                            style={{
                              zIndex: 1,
                              position: "absolute",
                              top: 19,
                              left: 7,
                            }}
                            onPress={() => this.setModalVisible(!modalVisible)}
                          >
                            <Icon name="md-close-circle" size={40} />
                          </Pressable>
                          <Image
                            source={{ uri: AppString.PressedImage }}
                            style={{
                              width: width(100),
                              height: height(100),
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
                    <Pressable
                      //style={[styles.button, styles.buttonOpen]}
                      style={{
                        justifyContent: "space-around",
                      }}
                      onPress={() => {
                        this.setModalVisible(true),
                          (AppString.PressedImage = item.image);
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: width(70),
                          height: height(20),

                          borderBottomWidth: 1,
                          borderBottomColor: "pink",
                          borderRadius: 5,
                        }}
                      />
                    </Pressable>
                  </View>
                );
              })
            )}
            {/*
            <FlatGrid
              itemDimension={140}
              data={this.state.Images}
              // staticDimension={300}
              // fixed
              contentContainerStyle={{
                width: width(100),
                justifyContent: "space-around",
              }}
              spacing={-10}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: height(120),
                    resizeMode: "contain",
                    marginTop: -height(40),
                  }}
                />
              )}
            />*/}

            {/* 
            <View style={{ height: height(80), width: width(70) }}>
              <GridList
                showSeparator
                data={this.state.Images}
                numColumns={3}
                renderItem={this.renderImg}
              />
            </View>*/}

            {/*  <View>
              {this.state.Images.map((item, index) => (
                <ScrollView
                  horizontal={true}
                  style={{
                    width: width(100),
                    height: height(80),
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uir: item.image }}
                    key={index}
                    style={{
                      width: width(60),
                      height: 200,
                      resizeMode: "contain",
                    }}
                  />
                </ScrollView>
              ))}
            </View>*/}

            {/*   <View style={{ flexDirection: "row-reverse" }}>
              <FlatList
              horizontal={true}
            
                data={this.state.Images}
                renderItem={this.renderImage}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>*/}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F3F7F9",
  },
  priceTag: {
    height: 45,
    width: 160,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  head: {
    height: height(7),
    backgroundColor: "#C8C8C8",
    justifyContent: "center",
    borderTopColor: COLORS.primary,
    borderTopWidth: 1.5,
  },
});
export default kindergartenProfile;
