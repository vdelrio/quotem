import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.palette.four }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
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
  );
}
