import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuoteStore } from "@store/quoteStore";
import { QuoteForm } from "@components/quote/QuoteForm";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "react-native-ui-lib";
import { useUpdateQuote } from "@repository/useUpdateQuote";

export default function EditQuoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { updateQuote } = useUpdateQuote();

  const findQuoteById = useQuoteStore((state) => state.findQuoteById);
  const updateQuoteInStore = useQuoteStore((state) => state.updateQuote);
  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuote = useQuoteStore((state) => state.setCurrentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );

  useEffect(() => {
    const foundQuote = findQuoteById(parseInt(params.id as string));
    if (foundQuote) {
      setCurrentQuote(foundQuote);
    }
  }, [params.id, findQuoteById, setCurrentQuote]);

  const onSave = async () => {
    if (!currentQuote.text) {
      return;
    }
    const updatedQuote = await updateQuote(currentQuote);
    if (updatedQuote) {
      updateQuoteInStore(updatedQuote);
    }
    router.dismiss(2);
  };

  if (!currentQuote?.id) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          No se ha encontrado la cita de ID {params.id}.
        </Text>
      </View>
    );
  }

  return (
    <QuoteForm
      quote={currentQuote}
      setQuoteField={setCurrentQuoteField}
      onSave={onSave}
      saveBtnLabel="Guardar cambios"
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
