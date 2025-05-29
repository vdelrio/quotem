import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import DesignSystem from "@theme/DesignSystem";

export default function Layout() {
  DesignSystem.initializeDesignSystem();
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors.$iconPrimary }}>
        <Tabs.Screen
          name="(quotes)"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="comment-quote-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}
