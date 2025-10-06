import { Pressable, StyleSheet, View } from "react-native";
import { Colors, Spacings, Typography } from "react-native-ui-lib/style";
import { Author } from "@model/models";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FancyFontText } from "@components/atoms/FancyFontText";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function AuthorCRUDItem({ author }: { author: Author }) {
  return (
    <View style={styles.container}>
      <FontAwesome name="book" size={22} color={Colors.$iconNeutral} />
      <FancyFontText style={[styles.authorName, { color: Colors.darkGray }]}>
        {author.name}
      </FancyFontText>
      <Pressable hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}>
        <MaterialIcons
          name="edit"
          size={22}
          color={Colors.$iconNeutral}
          style={styles.editIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: Spacings.s2,
  },
  authorName: {
    fontSize: Typography.text65?.fontSize,
    marginLeft: Spacings.s5,
    flexGrow: 2,
  },
  editIcon: {},
});
