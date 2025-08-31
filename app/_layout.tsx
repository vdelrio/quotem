import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DesignSystem from "@theme/DesignSystem";
import { Alert, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "react-native-ui-lib/style";
import { useQuoteStore } from "@store/quoteStore";
import { useDeleteQuote } from "@repository/useDeleteQuote";
import { useUpdateQuote } from "@repository/useUpdateQuote";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function RootLayout() {
  DesignSystem.initializeDesignSystem();

  const router = useRouter();
  const { deleteQuote } = useDeleteQuote();
  const { updateQuote } = useUpdateQuote();
  const quote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );
  const updateQuoteInStore = useQuoteStore((state) => state.updateQuote);
  const deleteQuoteFromStore = useQuoteStore((store) => store.deleteQuote);

  const handleDeleteQuote = () => {
    if (!quote?.id) {
      return;
    }

    Alert.alert("Eliminar cita", "¿Estas seguro de eliminar la cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          if (quote.id) {
            await deleteQuote(quote.id);
            deleteQuoteFromStore(quote.id);
          }
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  const handleFavoriteQuote = async () => {
    if (quote.id) {
      const toggleFavoriteValue = !quote.isFavorite;
      setCurrentQuoteField("isFavorite", toggleFavoriteValue);
      const updatedQuote = await updateQuote({
        ...quote,
        isFavorite: toggleFavoriteValue,
      });
      if (updatedQuote) {
        updateQuoteInStore(updatedQuote);
      }
    }
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(drawer)"
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
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.sepia,
            },
            headerRight: () => (
              <>
                <Link href="/quotes/image-generator" asChild>
                  <Pressable
                    hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
                    style={{ marginRight: 16 }}
                  >
                    <MaterialIcons
                      name="share"
                      size={24}
                      color={Colors.$iconNeutral}
                    />
                  </Pressable>
                </Link>
                <Pressable
                  onPress={handleFavoriteQuote}
                  hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
                  style={{ marginRight: 16 }}
                >
                  <FontAwesome5
                    name="bookmark"
                    solid={quote.isFavorite}
                    size={20}
                    color={Colors.$iconNeutral}
                  />
                </Pressable>
                <Link href="/quotes/edit" asChild>
                  <Pressable
                    hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
                    style={{ marginRight: 16 }}
                  >
                    <MaterialIcons
                      name="edit"
                      size={24}
                      color={Colors.$iconNeutral}
                    />
                  </Pressable>
                </Link>
                <Pressable
                  onPress={handleDeleteQuote}
                  hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
                >
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color={Colors.$iconNeutral}
                  />
                </Pressable>
              </>
            ),
          }}
        />
        <Stack.Screen
          name="quotes/edit"
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
