import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useConfigStore } from "@store/configStore";
import { Colors } from "react-native-ui-lib/style";

interface Props {
  value: string;
  onChangeValue: (text: string) => void;
  placeholder?: string;
}

export function SearchBarHeader({
  placeholder = "Buscar citas",
  value,
  onChangeValue,
}: Props) {
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapsed = useConfigStore((state) => state.toggleCollapsed);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={Colors.$iconNeutral}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeValue}
        placeholderTextColor={Colors.$iconNeutral}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always" // Solo iOS
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeValue("")}
          hitSlop={{ top: 10, bottom: 10, left: 4, right: 4 }}
          style={{ marginRight: 8 }}
        >
          <Ionicons name="close-circle" size={20} color={Colors.$iconNeutral} />
        </Pressable>
      )}
      <Pressable
        onPress={toggleCollapsed}
        hitSlop={{ top: 10, bottom: 10, left: 4, right: 4 }}
      >
        <Ionicons
          name={collapsed ? "chevron-expand" : "chevron-collapse"}
          size={20}
          color={Colors.$iconNeutral}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginTop: 45,
    marginBottom: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    color: "#333",
  },
});
