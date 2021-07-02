import React, { Component, useState, setState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import ModalDropdown from "react-native-modal-dropdown";
import MultiSelect from "react-native-multiple-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from "@react-native-community/checkbox";
import { AppString } from "./User";
import { withNavigation } from "react-navigation";
import { width, height } from "react-native-dimension";

const items = [
  {
    id: "1",
    name: "اللغة الإنجليزية",
  },
  {
    id: "2",
    name: "اللغة العربية",
  },
  {
    id: "3",
    name: "اللغة الفرنسية",
  },
  {
    id: "4",
    name: "الحساب",
  },
  {
    id: "5",
    name: "تعلّم القرآن",
  },
  {
    id: "6",
    name: "صف اللعب",
  },
  {
    id: "7",
    name: "صف الرسم",
  },
];

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    AppString.isFiltered = false;
    AppString.filterCity = "";
    AppString.filterClasses = [];
    AppString.filterFood = false;
    AppString.filterPrice = false;
    AppString.filterRate = false;
    AppString.isCity = false;
    AppString.isClasses = false;
    AppString.isPrice = false;
    AppString.isBus = false;
    AppString.isFood = false;
    AppString.isRate = false;
  }
  state = {
    selectedItems: [],
    city: "",
    maxPrice: "",
    bus: false,
    food: false,
    dataFilter: [],
    filter: [],
    Classes: [],
    gender: "",
    minRate: "",
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };
  changeC = (index, value) => {
    this.setState({ city: value });
  };

  changeGender = (index, value) => {
    this.setState({ gender: value });
  };

  filtering() {
    if (AppString.isFiltered == true) {
      if (AppString.isCity) {
        const newData = this.state.filter.filter((item) => {
          if (item.City == this.state.city) return item;
        });
        this.state.filter = newData;
        AppString.filterCity = "";
      }
      if (AppString.isGender) {
        const newData = this.state.filter.filter((item) => {
          if (item.gender == this.state.gender) return item;
        });
        this.state.filter = newData;
        AppString.filterGender = "";
      }
      if (AppString.isFood) {
        const newData1 = this.state.filter.filter((item) => {
          if (item.food != 0) return item;
        });
        this.state.filter = newData1;
        AppString.filterFood = false;
      }
      if (AppString.isPrice) {
        const newData2 = this.state.filter.filter((item) => {
          if (
            parseInt(item.k1) <= parseInt(this.state.maxPrice) ||
            parseInt(item.k2) <= parseInt(this.state.maxPrice)
          )
            return item;
        });
        this.state.filter = newData2;
        AppString.filterPrice = "";
      }
      if (AppString.isBus) {
        const newData3 = this.state.filter.filter((item) => {
          if (item.bus != 0) return item;
        });
        this.state.filter = newData3;
        AppString.filterBus = false;
      }
      if (AppString.isRate) {
        const newData4 = this.state.filter.filter((item) => {
          if (parseFloat(item.Rate) >= parseFloat(this.state.minRate))
            return item;
        });
        this.state.filter = newData4;
        AppString.filterRate = false;
      }
      /* if(AppString.isClasses){
      const newData4= this.state.selectedItems.every(val => this.state.filter.includes(val) 
      && this.state.selectedItems.filter(el => el === val).length
         <=
         this.state.filter.filter(el => el === val).length
  );
this.state.filter=newData4;
AppString.isClasses=false;
    }*/
    }
    this.props.navigation.navigate(
      "Home",
      (AppString.filteredData = this.state.filter)
    );
  }

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
        this.setState({ filter: responseJson });
      })
      .catch((error) => {
        //  alert("Error"+error);
      });
    var InsertAPIURL = "http://10.0.2.2:80/api/Classes.php";
    var headars = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      email: AppString.KinderEmail,
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
        // alert("Error"+error);
      });
  }

  render() {
    const { selectedItems } = this.state;
    const { city } = this.state;
    const { maxPrice } = this.state;
    const { bus } = this.state;
    const { food } = this.state;
    const { gender } = this.state;
    const { minRate } = this.state;
    //console.log(city);
    //console.log(selectedItems);
    //console.log(maxPrice);
    //console.log(bus);
    //console.log(food);
    AppString.filterCity = city;

    AppString.filterGender = gender;
    AppString.filterClasses = selectedItems;
    AppString.filterPrice = maxPrice;
    AppString.filterFood = food;
    AppString.filterBus = bus;
    AppString.filterRate = minRate;
    if (city) {
      AppString.isCity = true;
      AppString.isFiltered = true;
    }
    if (gender) {
      AppString.isGender = true;
      AppString.isFiltered = true;
    }
    if (maxPrice) {
      AppString.isPrice = true;
      AppString.isFiltered = true;
    }
    if (bus) {
      AppString.isBus = true;
      AppString.isFiltered = true;
    }
    if (food) {
      AppString.isFood = true;
      AppString.isFiltered = true;
    }
    if (minRate) {
      AppString.isRate = true;
      AppString.isFiltered = true;
    }
    if (selectedItems) {
      AppString.isClasses = true;
      AppString.isFiltered = true;
    }
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 50,
              marginRight: "5%",
              marginLeft: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.grey,
                marginTop: 20,
              }}
            >
              المدينة
            </Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="#aeacac"
              style={{
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
                height: 50,
                marginTop: 10,
                paddingTop: 15,
                marginLeft: -34,
                paddingRight: 28,
                paddingRight: 15,
              }}
            />

            <ModalDropdown
              defaultValue="اختر مدينتك"
              name="city"
              onSelect={this.changeC}
              style={{
                marginTop: 10,
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
                width: "60%",
                height: 50,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 12,
              }}
              options={[
                "رام الله",
                "نابلس",
                "جنين",
                "طوباس",
                "طولكرم",
                "قلقيلية",
                "الخليل",
                "سلفيت",
              ]}
              dropdownStyle={{ width: "70%", marginLeft: -width(17) }}
              dropdownTextStyle={{ fontSize: 22, marginRight: 30 }}
              textStyle={{ fontSize: 22, color: COLORS.grey, marginLeft: 25 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 30,
              marginRight: "5%",
              marginLeft: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.grey,
                marginTop: 20,
              }}
            >
              جنس الأطفال
            </Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="#aeacac"
              style={{
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
                height: 50,
                marginTop: 10,
                paddingTop: 15,
                marginLeft: -15,
                paddingRight: 28,
                paddingRight: 15,
              }}
            />

            <ModalDropdown
              defaultValue="اختر تصنيف"
              name="gender"
              onSelect={this.changeGender}
              style={{
                marginTop: 10,
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
                width: "60%",
                height: 50,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 12,
              }}
              options={["ذكور وإناث", "ذكور فقط", "إناث فقط"]}
              dropdownStyle={{ width: "70%", marginLeft: -width(17) }}
              dropdownTextStyle={{ fontSize: 22, marginRight: 30 }}
              textStyle={{ fontSize: 22, color: COLORS.grey, marginLeft: 25 }}
            />
          </View>

          {/*   <View style={{ paddingTop:40,flexDirection:'row-reverse',justifyContent:'space-around' ,marginRight:'5%',marginLeft:'5%'}}>
              <Text style={{fontSize:22,color:COLORS.grey,fontWeight:'bold',marginTop:15}}  >الصفوف</Text>
              <View style={{width:'70%',marginLeft:10}}>
            <MultiSelect
          hideTags
          style={{width:250,height:60,}}
          items={items}
          uniqueKey="name"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={text => this.setState({selectedItems : text})}
          selectedItems={selectedItems}
          selectText="اختر صف/صفوف"
          fontSize={22}
          color="#CCC"
          textStyle={{fontSize:22}}
          searchInputPlaceholderText=" ..ابحث عن صفوف "
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor={COLORS.secondary}
          selectedItemIconColor="#CCC"
          itemTextColor="black"
          displayKey="name"
          searchInputStyle={{ color: 'black' }}
          submitButtonColor="#CCC"
          submitButtonText="اختر"
        />
         </View>
       </View>
    {console.log(this.state.selectedItems)} */}
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              alignItems: "flex-end",
              marginTop: 30,
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.grey,
                marginBottom: 10,
              }}
            >
              {" "}
              الحد الأعلى للقسط الشهري
            </Text>
            <TextInput
              style={{
                width: "30%",
                height: 50,
                marginLeft: "5%",
                marginRight: "5%",
                paddingRight: 30,
                borderWidth: 1,
                borderColor: "#e3e3e3",
                paddingRight: 20,
                justifyContent: "flex-end",
              }}
              fontSize={18}
              name="maxPrice"
              onChangeText={(text) => this.setState({ maxPrice: text })}
              textStyle={{ fontSize: 22 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: 40,
              marginLeft: "5%",
              marginRight: "5%",
              width: "90%",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: COLORS.grey }}
            >
              توفير حافلة للروضة
            </Text>
            <CheckBox
              size={35}
              style={{
                transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
                position: "absolute",
                left: 280,
              }}
              name="bus"
              value={this.state.bus}
              onChange={() => this.setState({ bus: !this.state.bus })}
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: 40,
              marginLeft: "5%",
              marginRight: "5%",
              width: "90%",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: COLORS.grey }}
            >
              توفير وجبة إفطار
            </Text>
            <CheckBox
              size={35}
              name="food"
              value={this.state.food}
              onChange={() => this.setState({ food: !this.state.food })}
              style={{
                transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
                position: "absolute",
                left: 280,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: 40,
              marginLeft: "5%",
              marginRight: "5%",
              width: "90%",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: COLORS.grey }}
            >
              الحد الأدنى لتقييم الروضة
            </Text>
            <TextInput
              style={{
                width: "20%",
                height: 50,
                marginTop: -height(1),
                marginRight: "5%",
                paddingRight: 30,
                borderWidth: 1,
                borderColor: "#e3e3e3",
                paddingRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              fontSize={20}
              name="maxPrice"
              onChangeText={(text) => this.setState({ minRate: text })}
              textStyle={{ fontSize: 22 }}
            />
            <Text style={{ fontSize: 24 }}>5/</Text>
          </View>

          {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home',AppString.isFiltered=true)}> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.filtering()}
          >
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
              تطبيق
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate(
                "Home",
                (AppString.isFiltered = false)
              )
            }
          >
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
              إلغاء التصفية
            </Text>
          </TouchableOpacity>
          {console.log("hi", AppString.filteredData)}
        </View>
      </ScrollView>
    );
  }
}
export default withNavigation(FilterScreen);
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInput: {
    marginTop: 10,
    width: "80%",

    height: 50,
    backgroundColor: "#e3e3e3",
    borderRadius: 14,
  },
  button: {
    width: "80%",
    height: 60,
    backgroundColor: COLORS.secondary,
    marginTop: 80,
    marginRight: "10%",
    marginLeft: "10%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    marginBottom: 20,
  },
  button2: {
    width: "80%",
    height: 60,
    backgroundColor: COLORS.secondary,
    marginTop: 15,
    marginRight: "10%",
    marginLeft: "10%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    marginBottom: 20,
  },
});
