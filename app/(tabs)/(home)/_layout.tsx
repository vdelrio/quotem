import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "react-native-ui-lib";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Citas",
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
      <Stack.Screen
        name="quotes/[quoteId]"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: Colors.black,
        }}
      />
    </Stack>
  );
}
