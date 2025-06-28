import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DesignSystem from "@theme/DesignSystem";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "react-native-ui-lib/style";

export default function RootLayout() {
  DesignSystem.initializeDesignSystem();
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            // animation: "fade",
          }}
        />
        <Stack.Screen
          name="quotes/create"
          options={{
            title: "Nueva cita",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="quotes/[id]"
          options={{
            title: "", // Se setea de manera dinámica
            // presentation: "modal",
            // headerRight: () => (
            //   <>
            //     <Link href="/quotes/create" asChild>
            //       <Pressable hitSlop={20} style={{ marginRight: 12 }}>
            //         <MaterialIcons
            //           name="edit"
            //           size={24}
            //           color={Colors.$iconNeutral}
            //         />
            //       </Pressable>
            //     </Link>
            //     <Link href="/quotes/create" asChild>
            //       <Pressable hitSlop={20}>
            //         <MaterialIcons
            //           name="delete"
            //           size={24}
            //           color={Colors.$iconNeutral}
            //         />
            //       </Pressable>
            //     </Link>
            //   </>
            // ),
          }}
        />
        <Stack.Screen
          name="quotes/[id]/edit"
          options={{
            title: "Editar cita",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="quotes/camara"
          options={{
            title: "Camara",
            // presentation: "modal",
          }}
        />
        <Stack.Screen
          name="quotes/image-generator"
          options={{
            title: "Compartir cita",
            // presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
