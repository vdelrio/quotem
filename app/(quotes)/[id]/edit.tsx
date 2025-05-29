import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuoteRepository } from "@repository/quoteRepository";
import { useQuoteStore } from "@store/quoteStore";
import { QuoteForm } from "@components/quote/QuoteForm";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "react-native-ui-lib";

export default function EditQuoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const findQuoteById = useQuoteRepository((state) => state.findQuoteById);
  const updateQuote = useQuoteRepository((state) => state.updateQuote);
  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuote = useQuoteStore((state) => state.setCurrentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );

  useEffect(() => {
    const found = findQuoteById(params.quoteId as string);
    if (found) {
      setCurrentQuote(found);
    }
  }, [params.quoteId, findQuoteById, setCurrentQuote]);

  const onSave = () => {
    if (!currentQuote.text) {
      return;
    }
    updateQuote(currentQuote);
    router.back();
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
    <QuoteForm
      quote={currentQuote}
      setQuoteField={setCurrentQuoteField}
      onSave={onSave}
    />
  );
}

const styles = StyleSheet.create({
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
