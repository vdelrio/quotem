import { useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useQuoteStore } from "@/store/quoteStore";
import { Button, Colors, Spacings, Typography } from "react-native-ui-lib";
import { FancyFontText } from "@/components/FancyFontText";

export default function QuoteDetails() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const findQuoteById = useQuoteStore((state) => state.findQuoteById);
  const removeQuote = useQuoteStore((store) => store.removeQuote);

  const quoteId = params.quoteId as string;
  const quote = findQuoteById(quoteId);

  useEffect(() => {
    navigation.setOptions({
      title: quote?.author?.name,
    });
  }, [quote?.author?.name, navigation]);

  const handleDeleteQuote = () => {
    if (!quote?.id) {
      return;
    }

    Alert.alert("Eliminar cita", "¿Estas seguro de eliminar la cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          removeQuote(quote.id);
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  if (!quote) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          No se ha encontrado la cita de ID {quoteId}.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.quoteTextContainer}>
        <FancyFontText style={styles.quoteText}>{quote.text}</FancyFontText>
      </View>
      {quote.imageUri && (
        <Image source={{ uri: quote.imageUri }} style={styles.previewImage} />
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
