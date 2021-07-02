import React from "react";
import { View, Text, ScrollView } from "react-native";
import { height, width } from "react-native-dimension";
import COLORS from "../assets/consts/COLORS";
import { AppString } from "./User";
const Activity = ({ props, route }) => {
  let data = route.params;

  return (
    <ScrollView>
      <View>
        <View
          style={{
            height: height(8),
            backgroundColor: "#C8C8C8",
            justifyContent: "center",
            //borderTopWidth: 1.5,
            //borderColor: COLORS.primary,
            marginTop: height(5),
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginRight: width(7),
              color: COLORS.secondary,
            }}
          >
            {AppString.KinderName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: width(2),
          }}
        >
          <View
            style={{
              height: height(7),
              backgroundColor: "white",
              justifyContent: "center",
              //borderTopWidth: 1.5,
              //borderColor: COLORS.primary,
              marginTop: height(3),
              alignItems: "flex-end",
              direction: "rtl",
              borderBottomWidth: 1,
              borderColor: "#C8C8C8",
              width: width(50),
            }}
          >
            <Text
              style={{
                marginRight: width(10),
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              اسم النشـاط
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            marginRight: width(14),
            marginTop: height(3),
          }}
        >
          {data.Name}
        </Text>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: width(2),
          }}
        >
          <View
            style={{
              height: height(7),
              backgroundColor: "white",
              justifyContent: "center",
              //borderTopWidth: 1.5,
              //borderColor: COLORS.primary,
              marginTop: height(3),
              alignItems: "flex-end",
              direction: "rtl",
              borderBottomWidth: 1,
              width: width(50),
              borderColor: "#C8C8C8",
            }}
          >
            <Text
              style={{
                marginRight: width(10),
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              مكـان النشـاط
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            marginRight: width(14),
            marginTop: height(3),
          }}
        >
          {data.Place}
        </Text>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: width(2),
          }}
        >
          <View
            style={{
              height: height(7),
              backgroundColor: "white",
              justifyContent: "center",
              //borderTopWidth: 1.5,
              //borderColor: COLORS.primary,
              marginTop: height(3),
              alignItems: "flex-end",
              direction: "rtl",
              borderBottomWidth: 1,
              width: width(50),
              borderColor: "#C8C8C8",
            }}
          >
            <Text
              style={{
                marginRight: width(10),
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              تاريـخ النشـاط
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 24,
              marginRight: width(14),
              direction: "rtl",
              marginTop: height(3),
            }}
          >
            {data.Date}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: width(2),
          }}
        >
          <View
            style={{
              height: height(7),
              backgroundColor: "white",
              justifyContent: "center",
              //borderTopWidth: 1.5,
              //borderColor: COLORS.primary,
              marginTop: height(3),
              alignItems: "flex-end",
              direction: "rtl",
              borderBottomWidth: 1,
              width: width(50),
              borderColor: "#C8C8C8",
            }}
          >
            <Text
              style={{
                marginRight: width(10),
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              وقت النشـاط
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row-reverse" }}>
          <Text
            style={{
              fontSize: 24,
              marginRight: width(14),
              marginLeft: width(2),
              marginTop: height(3),
            }}
          >
            {data.Time}
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginLeft: -width(11),
              marginTop: height(3),
            }}
          >
            -
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginRight: width(14),
              marginTop: height(3),
            }}
          >
            {data.Duration}
          </Text>
        </View>

        {data.Note !== "" ? (
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: width(2),
            }}
          >
            <View
              style={{
                height: height(7),
                backgroundColor: "white",
                justifyContent: "center",
                //borderTopWidth: 1.5,
                //borderColor: COLORS.primary,
                marginTop: height(3),
                alignItems: "flex-end",
                direction: "rtl",
                borderBottomWidth: 1,
                width: width(50),
                borderColor: "#C8C8C8",
              }}
            >
              <Text
                style={{
                  marginRight: width(10),
                  fontSize: 22,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                ملاحظـة
              </Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                marginRight: width(14),
                width: width(85),
                marginTop: height(3),
                marginBottom: height(10),
              }}
            >
              {data.Note}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Activity;
