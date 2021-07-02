import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "./context";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { Col } from "react-native-table-component";
import { color } from "react-native-reanimated";
import COLORS from "../assets/consts/COLORS";
import { AppString } from "./User";
export function DrawerContent(props) {
  const { signOut } = React.useContext(AuthContext);
  const paperTheme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row-reverse",
                marginTop: 15,
                marginRight: 60,
              }}
            >
              <Avatar.Image
                style={{ marginRight: 50 }}
                source={{
                  uri:
                    AppString.pic != ""
                      ? AppString.pic
                      : "https://firebasestorage.googleapis.com/v0/b/gradproj-bb312.appspot.com/o/images%2FCapture.PNG?alt=media&token=f2ce9e5f-5f28-461a-af6c-61a20cd58dc3",
                }}
                size={70}
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: "column",
                  marginTop: 17,
                }}
              >
                <Title style={styles.title}>{AppString.Username}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              style={{ position: "relative", right: 40 }}
              label="الصفحة الرئيسية"
              labelStyle={{ color: COLORS.grey }}
              onPress={() => {
                props.navigation.navigate(
                  "Home",
                  (AppString.isFiltered = "False")
                );
              }}
              icon={({ color, size }) => (
                <Icon
                  style={{ position: "absolute", left: 230 }}
                  name="home-outline"
                  color={COLORS.primary}
                  size={size}
                />
              )}
            />
            <DrawerItem
              style={{ position: "relative", right: 40 }}
              icon={({ color, size }) => (
                <Icon
                  style={{ position: "absolute", left: 230 }}
                  name="ios-person"
                  color={COLORS.primary}
                  size={size}
                />
              )}
              label="الصفحة الشخصية"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              style={{ position: "relative", right: 40 }}
              icon={({ color, size }) => (
                <Icon
                  style={{ position: "absolute", left: 230 }}
                  name="chatbubble-ellipses-outline"
                  color={COLORS.primary}
                  size={size}
                />
              )}
              label="الرسائل"
              onPress={() => {
                props.navigation.navigate("Message");
              }}
            />
          </Drawer.Section>
          {/*  <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                            </Drawer.Section>*/}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="تسجيل الخروج"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    marginRight: 10,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    marginRight: -10,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
