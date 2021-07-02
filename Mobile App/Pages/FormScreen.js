import React, { useState, setState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import COLORS from "../assets/consts/COLORS";
import { RadioButton } from "react-native-paper";
import { render } from "react-dom";
import ModalDropdown from "react-native-modal-dropdown";
import { Caption } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import DatePicker from "react-native-datepicker";
import { AppString } from "./User";
import { cos } from "react-native-reanimated";
import { width, height, totalSize } from "react-native-dimension";
const window = Dimensions.get("window");

const FormScreen = ({ navigation, route }) => {
  //let data=route.params;
  //const [KinderEmail , setEmail] = useState('');

  let KinderEmail = AppString.KinderEmail;
  let coverfile = AppString.coverfile;
  let KinderName = AppString.KinderName;
  let Email = AppString.Email;
  const [Name, setName] = useState("");
  const [checked, setChecked] = React.useState("");
  const [gender, setGenderChecked] = React.useState("");
  const cityOptions = [
    "نابلس",
    "رام الله",
    "طولكرم",
    "طوباس",
    "جنين",
    "قلقيلية",
  ];
  const [city, setCity] = useState("");
  const onChangeProp = (index, value) => {
    setCity(value);
  };
  const [bus, setBusCheckBox] = useState(false);
  const [food, setFoodCheckBox] = useState(false);
  const [parentPhone, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  var cost = 0;

  const InsertForm = () => {
    if (
      Name.length == 0 ||
      checked.length == 0 ||
      city == "" ||
      gender.length == 0 ||
      parentPhone.length == 0
    ) {
      alert("Required Field is missing");
    } else {
      var InsertAPIURL = "http://10.0.2.2:80/api/insertForm.php";
      var headars = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      // setEmail(Email)
      var data = {
        Name: Name,
        KinderEmail: KinderEmail,
        city: city,
        parentPhone: parentPhone,
        gender: gender,
        address: address,
        bus: bus,
        food: food,
        stage: checked,
        cost: cost,
        coverfile: coverfile,
        KinderName: KinderName,
        Email: Email,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headars,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response[0].Message);
          if (response[0].Message == "تم ارسال طلبك بنجاح") {
            navigation.navigate("KProfile");
          }
        })
        .catch((error) => {
          alert("Error" + error);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{ flexDirection: "column", marginLeft: 20, marginRight: 20 }}
        >
          <View>
            <Text style={styles.text}>اسم الطفل</Text>
          </View>

          <TextInput
            placeholder="الاسم الرباعي"
            onChangeText={(text) => setName(text)}
            style={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              borderColor: "#C6C6C6",
              paddingRight: 15,
              fontSize: 24,
              borderRadius: 8,
            }}
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>المرحلة الدراسية</Text>
          </View>

          <View style={styles.row}>
            <RadioButton
              color={COLORS.primary}
              value="بستان"
              status={checked === "بستان" ? "checked" : "unchecked"}
              onPress={() => setChecked("بستان")}
            />
            <Text style={styles.radio}>البستان</Text>
            <RadioButton
              color={COLORS.primary}
              value="تمهيدي"
              status={checked === "تمهيدي" ? "checked" : "unchecked"}
              onPress={() => setChecked("تمهيدي")}
            />
            <Text style={styles.radio}>التمهيدي</Text>
          </View>

          {checked == "بستان" ? (
            <Text style={{ color: "red", fontSize: 22 }}>
              {" "}
              القسط الشهري لمرحلة البستان {AppString.k1}₪
            </Text>
          ) : null}

          {checked == "تمهيدي" ? (
            <Text style={{ color: "red", fontSize: 22 }}>
              {" "}
              القسط الشهري لمرحلة التمهيدي {AppString.k2}₪
            </Text>
          ) : null}
          {checked === "بستان" ? (
            <Text
              style={{
                top: window.height,
                bottom: -window.height,
                color: "white",
              }}
            >
              {" "}
              {(cost = parseInt(AppString.k1))}
            </Text>
          ) : null}
          {checked === "تمهيدي" ? (
            <Text style={{ top: window.height, bottom: -window.height }}>
              {" "}
              {(cost = parseInt(AppString.k2))}
            </Text>
          ) : null}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}> الجنس</Text>
          </View>
          <View style={styles.row}>
            <RadioButton
              color={COLORS.primary}
              value="`ذكر`"
              status={gender === "ذكر" ? "checked" : "unchecked"}
              onPress={() => setGenderChecked("ذكر")}
            />
            <Text style={styles.radioGender}>ذكر</Text>
            <RadioButton
              color={COLORS.primary}
              value="أنثى"
              status={gender === "أنثى" ? "checked" : "unchecked"}
              onPress={() => setGenderChecked("أنثى")}
            />
            <Text style={styles.radioGender}>أنثى</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>المدينة</Text>
          </View>
          <ModalDropdown
            style={styles.City}
            options={cityOptions}
            onSelect={onChangeProp}
            defaultValue=" اختر مدينتك"
            dropdownStyle={styles.cityDrop}
            dropdownTextStyle={{ fontSize: 24 }}
            textStyle={{ fontSize: 22 }}
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>رقم الهاتف</Text>
          </View>

          <TextInput
            placeholder="رقم هاتف ولي الأمر"
            onChangeText={(text) => setPhoneNum(text)}
            style={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              borderColor: "#C6C6C6",
              paddingRight: 15,
              fontSize: 24,
              borderRadius: 8,
            }}
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>الخدمات المدفوعة</Text>
            <Text style={{ color: COLORS.grey, fontSize: 19 }}>
              * قم باختيار الخدمات التي ترغب بتوفرها
            </Text>
          </View>
          {AppString.bus != 0 ? (
            <View
              style={{
                marginTop: 15,
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-start",
                  marginRight: -10,
                }}
              >
                <CheckBox
                  disabled={false}
                  value={bus}
                  onValueChange={(newValue) => setBusCheckBox(newValue)}
                />
                <Text style={{ color: "#000", fontSize: 24, marginRight: 15 }}>
                  باص المدرسة
                </Text>
              </View>
              <View
                style={{
                  width: 90,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginRight: 80,
                }}
              >
                <Text style={{ fontSize: 22 }}>+{AppString.bus}₪</Text>
              </View>
            </View>
          ) : null}
          {bus ? (
            <View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>العنوان</Text>
              </View>

              <TextInput
                placeholder="عنوان المنزل"
                onChangeText={(text) => setAddress(text)}
                style={{
                  width: "100%",
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#C6C6C6",
                  paddingRight: 15,
                  fontSize: 24,
                  borderRadius: 8,
                }}
              />
            </View>
          ) : null}

          {bus === true ? (
            <Text
              style={{
                top: window.height,
                bottom: -window.height,
              }}
            >
              {" "}
              {(cost = parseInt(cost) + parseInt(AppString.bus))}
            </Text>
          ) : null}
          {AppString.food != 0 ? (
            <View
              style={{
                marginTop: 15,
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-start",
                }}
              >
                <CheckBox
                  disabled={false}
                  value={food}
                  onValueChange={(newValue) => setFoodCheckBox(newValue)}
                />

                <Text style={{ color: "#000", fontSize: 24, marginRight: 15 }}>
                  وجبة إفطار
                </Text>
              </View>
              <View
                style={{
                  width: 90,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginRight: 80,
                }}
              >
                <Text style={{ fontSize: 22 }}>+{AppString.food}₪</Text>
              </View>
            </View>
          ) : null}
          {food === true ? (
            <Text style={{ top: window.height, bottom: -window.height }}>
              {(cost = parseInt(cost) + parseInt(AppString.food))}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            width: width(100),
            marginTop: height(3),
            marginRight: width(12),
          }}
        >
          <Text style={{ fontSize: 22, marginRight: width(10) }}>
            {" "}
            القسط الكلي المطلوب ₪{cost}{" "}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: height(2),
          }}
        >
          <TouchableOpacity style={styles.button} onPress={InsertForm}>
            <Text style={{ fontSize: 24, color: "#000", fontWeight: "bold" }}>
              إرسال الطلب
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    marginBottom: 30,
  },
  text: {
    fontSize: 26,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  radio: {
    fontSize: 24,
    color: "#000",
    marginLeft: 60,
  },
  radioGender: {
    fontSize: 24,
    color: "#000",
    marginLeft: 80,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    marginLeft: 90,
  },
  City: {
    width: "100%",
    fontSize: 24,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "flex-end",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    paddingRight: 15,
  },
  cityDrop: {
    width: "90%",
    marginRight: -20,
    fontSize: 24,
    marginTop: -30,
    paddingRight: 15,
    borderColor: "#C6C6C6",
    borderWidth: 1,
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: COLORS.primary,
    fontSize: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    elevation: 10,
  },
});
export default FormScreen;
