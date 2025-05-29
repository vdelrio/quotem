import { Platform, StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-ui-lib";

export function FancyFontText(props: TextProps) {
  return <Text {...props} style={[styles.fancyFont, props.style]} />;
}

const styles = StyleSheet.create({
  fancyFont: {
    fontFamily: Platform.select({
      ios: "PTSans-Narrow",
      android: "PTSansNarrow_400Regular",
    }),
  },
});
