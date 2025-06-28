import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import Button from "react-native-ui-lib/button";
import { Colors, Spacings, Typography } from "react-native-ui-lib/style";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useQuoteStore } from "@store/quoteStore";
import { useDeleteQuote } from "@repository/useDeleteQuote";

export default function QuoteDetailsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { deleteQuote } = useDeleteQuote();

  const quote = useQuoteStore((state) => state.currentQuote);
  const setQuote = useQuoteStore((state) => state.setCurrentQuote);
  const findQuoteById = useQuoteStore((state) => state.findQuoteById);
  const deleteQuoteFromStore = useQuoteStore((store) => store.deleteQuote);

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
      <View style={styles.quoteTextContainer}>
        <FancyFontText style={styles.quoteText}>{quote.text}</FancyFontText>
      </View>
      <Link href="/quotes/image-generator" asChild>
        <Button label="Compartir" />
      </Link>
      <Button
        label="Editar"
        onPress={() => router.navigate(`/quotes/${quote.id}/edit`)}
        outline
        marginT-20
      />
      <Button label="Eliminar" onPress={handleDeleteQuote} link marginT-20 />
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
});
