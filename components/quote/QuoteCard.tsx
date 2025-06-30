import { StyleSheet } from "react-native";
import Card from "react-native-ui-lib/card";
import { Colors } from "react-native-ui-lib/style";
import View from "react-native-ui-lib/view";
import { useRouter } from "expo-router";
import { Quote } from "@model/models";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useConfigStore } from "@store/configStore";

export function QuoteCard({
  quote,
  applyFavoriteStyle = true,
}: {
  quote: Quote;
  applyFavoriteStyle: boolean;
}) {
  const router = useRouter();
  const collapsed = useConfigStore((state) => state.collapsed);
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor:
            quote.isFavorite && applyFavoriteStyle
              ? Colors.yellow70
              : Colors.white,
        },
      ]}
      onPress={() => router.navigate(`/quotes/${quote.id}`)}
    >
      <View>
        <FancyFontText
          numberOfLines={collapsed ? 4 : undefined}
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
