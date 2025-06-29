import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "react-native-ui-lib/style";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useConfigStore } from "@store/configStore";

export default function TabsLayout() {
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapsed = useConfigStore((state) => state.toggleCollapsed);
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
            <Pressable
              onPress={toggleCollapsed}
              hitSlop={20}
              style={{ marginRight: 12 }}
            >
              <Ionicons
                name={collapsed ? "chevron-expand" : "chevron-collapse"}
                size={24}
                color={Colors.$iconNeutral}
              />
            </Pressable>
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
