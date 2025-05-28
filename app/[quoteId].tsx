import { useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { Button, Colors, Spacings, Typography } from "react-native-ui-lib";
import { FancyFontText } from "@components/FancyFontText";
import { useQuoteRepository } from "@repository/quoteRepository";
import { useQuoteStore } from "@store/quoteStore";

export default function QuoteDetails() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const findQuoteById = useQuoteRepository((state) => state.findQuoteById);
  const deleteQuote = useQuoteRepository((store) => store.deleteQuote);
  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuote = useQuoteStore((state) => state.setCurrentQuote);

  useEffect(() => {
    const found = findQuoteById(params.quoteId as string);
    if (found) {
      setCurrentQuote(found);
      navigation.setOptions({
        title: found.author ? `Cita de ${found.author.name}` : "Cita sin autor",
      });
    }
  }, [params.quoteId, findQuoteById, setCurrentQuote, navigation]);

  const handleDeleteQuote = () => {
    if (!currentQuote?.id) {
      return;
    }

    Alert.alert("Eliminar cita", "¿Estas seguro de eliminar la cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          // @ts-ignore
          deleteQuote(currentQuote?.id);
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  if (!currentQuote?.id) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          No se ha encontrado la cita de ID {params.quoteId}.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.quoteTextContainer}>
        <FancyFontText style={styles.quoteText}>
          {currentQuote.text}
        </FancyFontText>
      </View>
      {currentQuote.imageUri ? (
        <Image
          source={{ uri: currentQuote.imageUri }}
          style={styles.previewImage}
        />
      ) : (
        <Link href="/image-generator" asChild>
          <Button label="Generar imagen" background-accent marginB-10 />
        </Link>
      )}
      <Button label="Eliminar" onPress={handleDeleteQuote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacings.s5,
  },
  quoteTextContainer: {
    marginBottom: Spacings.s6,
  },
  quoteText: {
    fontSize: Typography.text60?.fontSize,
    textAlign: "justify",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  notFoundText: {
    fontSize: Typography.text70?.fontSize,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
});
