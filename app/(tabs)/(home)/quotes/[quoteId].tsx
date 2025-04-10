import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useQuoteStore } from "@/store/quoteStore";
import { Button, Colors } from "react-native-ui-lib";
import { FancyFontText } from "@/components/FancyFontText";

export default function QuoteDetails() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const quoteId = params.quoteId as string;

  const removeQuote = useQuoteStore((store) => store.removeQuote);
  const findQuoteById = useQuoteStore((state) => state.findQuoteById);
  const quote = findQuoteById(quoteId);
  const navigation = useNavigation();

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
      {
        text: "Si",
        onPress: () => {
          removeQuote(quote.id);
          router.navigate("/");
        },
        style: "destructive",
      },
      { text: "Cancelar", style: "cancel" },
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
      <Button label="Eliminar" onPress={handleDeleteQuote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 18,
  },
  quoteTextContainer: {
    marginBottom: 24,
  },
  quoteText: {
    fontSize: 20,
    textAlign: "justify",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  notFoundText: {
    fontSize: 18,
  },
});
