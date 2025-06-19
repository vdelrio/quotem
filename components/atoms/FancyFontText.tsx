import { Platform, StyleSheet } from "react-native";
import Text from "react-native-ui-lib/text";
import { TextProps } from "react-native-ui-lib/src/components/text";

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
