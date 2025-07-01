import { StyleSheet } from "react-native";
import Card from "react-native-ui-lib/card";
import { Colors } from "react-native-ui-lib/style";
import View from "react-native-ui-lib/view";
import { useRouter } from "expo-router";
import { Quote } from "@model/models";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useConfigStore } from "@store/configStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function QuoteCard({
  quote,
  applyFavoriteStyle = true,
}: {
  quote: Quote;
  applyFavoriteStyle?: boolean;
}) {
  const router = useRouter();
  const collapsed = useConfigStore((state) => state.collapsed);
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: Colors.white,
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
          <View style={styles.authorContainer}>
            <FancyFontText style={styles.author}>
              {quote.author.name}
            </FancyFontText>
            {quote.isFavorite && applyFavoriteStyle && (
              <MaterialIcons
                name="favorite"
                size={20}
                color={Colors.$iconNeutral}
              />
            )}
          </View>
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
  authorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
