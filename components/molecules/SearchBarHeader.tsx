import React, { useState } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useConfigStore } from "@store/configStore";
import { Colors } from "react-native-ui-lib/style";
// import { useSearch } from "../context/SearchContext"; // Importa tu contexto

interface SearchBarHeaderProps {
  placeholder?: string;
}

export const SearchBarHeader: React.FC<SearchBarHeaderProps> = ({
  placeholder = "Buscar citas",
}) => {
  // const { searchText, setSearchText } = useSearch();
  const [searchText, setSearchText] = useState<string>("");
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
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor={Colors.$iconNeutral}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always" // Solo iOS
      />
      {searchText.length > 0 && (
        <Pressable
          onPress={() => setSearchText("")}
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
};

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
    marginVertical: 8,
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
