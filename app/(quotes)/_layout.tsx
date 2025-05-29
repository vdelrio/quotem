import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "react-native-ui-lib";

export default function QuotesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Citas",
          headerRight: () => (
            <Link href="/create" asChild>
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
        name="create"
        options={{
          title: "Nueva cita",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "", // Se setea de manera dinámica
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]/edit"
        options={{
          title: "Editar cita",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="camara"
        options={{
          title: "Camara",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="image-generator"
        options={{
          title: "Crear imagen",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
