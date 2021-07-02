import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";
import { Col } from "react-native-table-component";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../assets/consts/COLORS";
import { caption } from "react-native-paper";
import { withNavigation } from "react-navigation";
import * as FileSystem from "expo-file-system";
//import RNFetchBlob from 'react-native-fetch-blob'
import { AppString } from "./User";
import { width, height, totalSize } from "react-native-dimension";
import { Rating, AirbnbRating } from "react-native-ratings";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      Username: AppString.Username,
      KinderEmail: AppString.KinderEmail,
      dataFilter: [],
      filtered: [],
      Profile: [],
      User: "",
    };
  }
  InsertSave = () => {
    //let item=route.params;
    console.log(this.state.KinderEmail);
    var InsertAPIURL = "http://10.0.2.2:80/api/InsertSave.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      Username: this.state.Username,
      KinderEmail: this.state.KinderEmail,
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

  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            width: width(87),
            backgroundColor: "white",
            borderRadius: 15,
            borderColor: "#E6EAEC",
            borderWidth: 1,
            marginTop: 15,
            elevation: 10,
          }}
          onPress={() =>
            this.props.navigation.navigate(
              "KProfile",
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
          <View style={{ width: "100%", height: height(25), borderRadius: 15 }}>
            <Image
              source={{ uri: item.coverfile }}
              style={{
                width: "100%",
                height: height(25),
                resizeMode: "cover",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderColor: "#E6EAEC",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              width: "95%",
            }}
          >
            <Text
              style={{
                marginTop: height(2),
                fontSize: 22,
                color: COLORS.secondary,
                fontFamily: "Roboto",
                fontWeight: "bold",
                marginLeft: -width(2),
                marginRight: width(2),
              }}
            >
              {item.KinderName}
            </Text>
            <AirbnbRating
              reviews=""
              size={24}
              fractions="1"
              backgroundColor="#F3F7F9"
              starContainerStyle={{
                marginRight: width(10),
                marginTop: -height(5),
              }}
              style={{
                backgroundColor: "#F3F7F9",
              }}
              defaultRating={item.Rate}
              tintColor="#F3F7F9"
              isDisabled
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: height(2),
              marginBottom: 25,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Icon
              name="location-outline"
              size={23}
              style={{}}
              color={COLORS.grey}
            />

            <Text style={{ fontSize: 20, color: "#8D9092" }}>{item.City}</Text>
          </View>
          <Text
            style={{
              fontSize: 17.5,
              color: "#8D9092",
              marginTop: -20,
              marginBottom: 18,
            }}
          >
            {" "}
            {item.Address}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    var InsertAPIURL = "http://10.0.2.2:80/api/displayHome.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(InsertAPIURL, {
      method: "GET",
      headers: headars,
      // body : JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson });
      })
      .catch((error) => {
        alert("Error" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/getImage.php";
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
        AppString.pic = responseJson;
      })
      .catch((error) => {
        alert("Error" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/getName.php";
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
        AppString.Username = responseJson;
      })
      .catch((error) => {
        alert("Error" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/getCity.php";
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
        AppString.City = responseJson;
      })
      .catch((error) => {
        alert("Error1" + error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/getImage.php";
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
        AppString.pic = responseJson;
      })
      .catch((error) => {
        alert("Error2" + error);
      });
  }
  /*     
 filtering(){
    if(AppString.isCity){
        const newData= this.state.dataFilter.filter((item)=>{if(item.City == AppString.filterCity) return item;})
       this.setState({dataFilter : newData});
         AppString.filterCity='';
       // console.log("new",this.state.dataFilter);
    }
    if(AppString.isFood){
        const newData1 = this.state.dataFilter.filter((item)=>{if(item.food !==0) return item;})
        this.setState({dataFilter : newData1});
        AppString.filterFood=false;
    }
    if(AppString.isPrice){
        const newData2 = this.state.dataFilter.filter((item)=>{if(parseInt(item.k1) <= parseInt(AppString.filterPrice) || parseInt(item.k2) <=parseInt( AppString.filterPrice)) return item;})
        this.setState({dataFilter : newData2});
        AppString.filterPrice='';
    }
    if(AppString.isBus){
        const newData3 = this.state.dataFilter.filter((item)=>{if(item.bus !== 0) return item;})
        this.setState({dataFilter : newData3});
        AppString.filterBus=false;
    }
   
 } */

  render() {
    console.log(this.state.dataSource);
    //console.log('filtered',this.state.dataFilter);
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
            marginLeft: width(12),
          }}
          data={
            AppString.isFiltered === true
              ? AppString.filteredData
              : this.state.dataSource
          }
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default withNavigation(HomeScreen);
