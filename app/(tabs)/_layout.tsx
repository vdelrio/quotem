import { Link, Tabs } from "expo-router";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Colors } from "react-native-ui-lib/style";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabsLayout() {
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
            <Link href="/quotes/create" asChild>
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
