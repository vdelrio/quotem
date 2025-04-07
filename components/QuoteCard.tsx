import { StyleSheet, View, Text, Platform } from "react-native";
import { Quote } from "@/models/models";
import { Colors } from "react-native-ui-lib";

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <View style={styles.quoteContainer}>
      <Text style={styles.quote} numberOfLines={4}>
        {quote.text}
      </Text>
      {quote.author && <Text style={styles.author}>{quote.author.name}</Text>}
    </View>
  );
}

const fontFamily = Platform.select({
  ios: "PTSans-Narrow",
  android: "PTSansNarrow_400Regular",
});

const styles = StyleSheet.create({
  quoteContainer: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  quote: {
    fontFamily,
    fontSize: 18,
    marginBottom: 6,
  },
  author: {
    fontFamily,
    fontSize: 16,
    color: Colors.$textNeutralLight,
  },
});
