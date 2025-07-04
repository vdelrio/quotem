import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native-ui-lib/style";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useConfigStore } from "@store/configStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabsLayout() {
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapsed = useConfigStore((state) => state.toggleCollapsed);

  const headerRight = (
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
  );

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
          headerRight: () => headerRight,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Citas favoritas",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="favorite-outline" size={size} color={color} />
          ),
          headerRight: () => headerRight,
        }}
      />
    </Tabs>
  );
}
