import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DesignSystem from "@theme/DesignSystem";

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
            title: "Generar imagen",
            // presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
