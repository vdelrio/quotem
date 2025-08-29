import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native-ui-lib/style";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors.$iconPrimary }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Citas",
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
          name="favorites"
          options={{
            title: "Citas favoritas",
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="bookmark-multiple-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" backgroundColor={Colors.secondary} />
    </>
  );
}
