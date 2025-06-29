import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors, Spacings, Typography } from "react-native-ui-lib/style";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useQuoteStore } from "@store/quoteStore";

export default function QuoteDetailsScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const quote = useQuoteStore((state) => state.currentQuote);
  const setQuote = useQuoteStore((state) => state.setCurrentQuote);
  const findQuoteById = useQuoteStore((state) => state.findQuoteById);

  useEffect(() => {
    const foundQuote = findQuoteById(parseInt(params.id as string));
    if (foundQuote) {
      navigation.setOptions({
        title: foundQuote.author
          ? `Cita de ${foundQuote.author.name}`
          : "Cita sin autor",
      });
      setQuote(foundQuote);
    }
  }, [params.id, findQuoteById, setQuote, navigation]);

  if (!quote?.id) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          No se ha encontrado la cita de ID {params.id}.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FancyFontText style={styles.quoteText}>{quote.text}</FancyFontText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: Spacings.s5,
  },
  quoteText: {
    fontSize: Typography.text50?.fontSize,
    lineHeight: Typography.text50?.lineHeight,
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
});
