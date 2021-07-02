import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import MessagesScreen from "./MessagesScreen";
import ChatScreen from "./ChatScreen";
import kindergartenProfile from "./kindergartenProfile";
import { useTheme, Avatar } from "react-native-paper";
import { View, Text } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../assets/consts/COLORS";
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MessageStack = createStackNavigator();
const NotificationStack = createStackNavigator();
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import FilterScreen from "./FilterScreen";
import FormScreen from "./FormScreen";
import SavedScreen from "./SavedScreen";
import { AppString } from "./User";
import SentForms from "./SentForms";
import Final from "./Final";
import NotificationPage from "./NotificationPage";
import Activity from "./Activity";
import Support from "./Support";

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor={COLORS.primary}
    barStyle={{ backgroundColor: "white" }}
  >
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "الصفحة الشخصية",
        tabBarColor: COLORS.primary,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: "الإشعارات",
        tabBarColor: COLORS.primary,
        tabBarIcon: ({ color }) => (
          <Icon name="notifications" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Message"
      component={MessageStackScreen}
      options={() => ({
        tabBarLabel: "الرسائل",

        tabBarColor: "#84d4a4",
        tabBarIcon: ({ color }) => (
          <Icon name="chatbubble-ellipses-outline" color={color} size={26} />
        ),
      })}
    />

    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "الصفحة الرئيسية",
        tabBarColor: COLORS.primary,
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{ marginLeft: 30 }}>
              <Feather.Button
                name="filter"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.navigate("FilterScreen")}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="FilterScreen"
        options={{
          title: "تصفية",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "50%",
          },
        }}
        component={FilterScreen}
      />
      <HomeStack.Screen
        name="KProfile"
        options={{
          title: "",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "40%",
          },
        }}
        component={kindergartenProfile}
      />
      <HomeStack.Screen
        name="activity"
        options={{
          title: "",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "40%",
          },
        }}
        component={Activity}
      />
      <HomeStack.Screen
        name="Form"
        options={{
          title: "تقديم طلب",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "40%",
          },
        }}
        component={FormScreen}
      />
      <HomeStack.Screen
        name="Chat"
        options={() => ({
          title: AppString.userName,
          tabBarVisible: false,
        })}
        component={ChatScreen}
      />
    </HomeStack.Navigator>
  );
};
const NotificationStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <NotificationStack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <NotificationStack.Screen
        name="Final"
        options={{
          title: "مراجعة طلب",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "40%",
          },
        }}
        component={Final}
      />
      <NotificationStack.Screen
        name="profileK"
        options={{
          title: "",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "40%",
          },
        }}
        component={kindergartenProfile}
      />
    </NotificationStack.Navigator>
  );
};

const MessageStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <MessageStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <MessageStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <MessageStack.Screen
        name="Chat"
        options={() => ({
          title: AppString.userName,
          tabBarVisible: false,
        })}
        component={ChatScreen}
      />
    </MessageStack.Navigator>
  );
};
const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "",
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{ marginLeft: 30 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={COLORS.primary}
                color={colors.text}
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
          style: { marginRight: 30 },
        }}
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        name="Saved"
        options={{
          title: "العناصر المحفوظة",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={SavedScreen}
      />
      <ProfileStack.Screen
        name="forms"
        options={{
          title: "الطلبات المرسلة",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={SentForms}
      />
      <ProfileStack.Screen
        name="final"
        options={{
          title: "تأكيد الانضمام",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={Final}
      />
      <ProfileStack.Screen
        name="profile"
        options={{
          title: "",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={kindergartenProfile}
      />
      <ProfileStack.Screen
        name="activity"
        options={{
          title: "",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={Activity}
      />
      <ProfileStack.Screen
        name="support"
        options={{
          title: "الدعـم",
          style: { marginRight: 30 },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.secondary,
            marginRight: "35%",
          },
        }}
        component={Support}
      />
    </ProfileStack.Navigator>
  );
};
