import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Colors, View } from "react-native-ui-lib";
import { Quote } from "@/models/models";
import { FancyFontText } from "@/components/FancyFontText";

export function RNUICard({ quote }: { quote: Quote }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Card
      style={styles.card}
      onPress={() => setExpanded((prevState) => !prevState)}
    >
      <View>
        <FancyFontText
          numberOfLines={expanded ? undefined : 4}
          style={styles.quoteText}
        >
          {quote.text}
        </FancyFontText>
        {quote.author && (
          <FancyFontText style={styles.author}>
            {quote.author.name}
          </FancyFontText>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
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
  quoteText: {
    fontSize: 18,
    marginBottom: 6,
  },
  author: {
    fontSize: 16,
    color: Colors.$textNeutralLight,
  },
});
