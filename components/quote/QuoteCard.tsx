import { Pressable, StyleSheet } from "react-native";
import Card from "react-native-ui-lib/card";
import { BorderRadiuses, Colors } from "react-native-ui-lib/style";
import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";
import { useRouter } from "expo-router";
import { Quote } from "@model/models";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useConfigStore } from "@store/configStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useUpdateQuote } from "@repository/useUpdateQuote";
import { useQuoteStore } from "@store/quoteStore";

interface Props {
  quote: Quote;
  searchText: string;
}

export function QuoteCard({ quote, searchText }: Props) {
  const router = useRouter();
  const collapsed = useConfigStore((state) => state.collapsed);
  const updateQuoteInStore = useQuoteStore((state) => state.updateQuote);
  const { updateQuote } = useUpdateQuote();

  const handleFavoriteQuote = async () => {
    const toggleFavoriteValue = !quote.isFavorite;
    const updatedQuote = await updateQuote({
      ...quote,
      isFavorite: toggleFavoriteValue,
    });
    if (updatedQuote) {
      updateQuoteInStore(updatedQuote);
    }
  };

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
          <Text
            highlightString={searchText}
            highlightStyle={{ backgroundColor: Colors.highlight }}
          >
            {quote.text}
          </Text>
        </FancyFontText>
        <View style={styles.authorContainer}>
          <FancyFontText style={styles.author}>
            {quote?.author?.name}
          </FancyFontText>
          <Pressable onPress={handleFavoriteQuote} hitSlop={15}>
            <FontAwesome5
              name="bookmark"
              solid={quote.isFavorite}
              size={18}
              color={Colors.$iconNeutral}
            />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadiuses.br30,
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
    fontSize: 19,
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
