import { Tabs, Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { Colors } from "react-native-ui-lib";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.$iconPrimary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Citas",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="comment-quote-outline"
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/new-quote" asChild>
              <Pressable hitSlop={20} style={{ marginRight: 18 }}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={Colors.$iconPrimary}
                />
              </Pressable>
            </Link>
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
