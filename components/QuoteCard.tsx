import { StyleSheet, View, Text } from "react-native";
import { theme } from "@/theme";
import { Quote } from "@/store/quoteStore";

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <View style={styles.quoteContainer}>
      <Text style={styles.quote}>{quote.text}</Text>
      {quote.author && <Text style={styles.author}>{quote.author.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    padding: 12,
    // marginBottom: 12,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  quote: {
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    color: theme.colors.grey,
  },
});
