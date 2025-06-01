import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

// Define a type for your parsed JSON data, if you know its structure.
// For a generic JSON array of objects, `Array<Record<string, any>>` is a good starting point.
// If your JSON is, for example, [{ id: number, name: string }], you'd define that type.
type ParsedJsonData = Record<string, any>[];

export default function JsonFilePicker(): JSX.Element {
  const [pickedJsonData, setPickedJsonData] = useState<ParsedJsonData | null>(
    null,
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickAndParseJson = async (): Promise<void> => {
    try {
      // Reset previous state
      setPickedJsonData(null);
      setFileName(null);
      setError(null);
      setIsLoading(true);

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json", // Specifically request JSON files
        copyToCacheDirectory: true, // We need to read its content, so copy to cache
      });

      // Check if the user cancelled the picker
      if (result.canceled) {
        setError("JSON file picking cancelled.");
        setIsLoading(false);
        return;
      }

      // If a document was picked successfully
      if (result.assets && result.assets.length > 0) {
        const doc = result.assets[0];
        setFileName(doc.name);

        // --- Validate File Type (important for robustness, even if picker suggests JSON) ---
        const fileExtension = doc.name.split(".").pop()?.toLowerCase();
        // doc.mimeType is available on Android. On iOS/Web, you often rely on extension.
        const isJson =
          fileExtension === "json" || doc.mimeType === "application/json";

        if (!isJson) {
          setError("Please select a valid JSON file (.json).");
          setIsLoading(false);
          return;
        }

        // --- Read the file content ---
        const fileContent = await FileSystem.readAsStringAsync(doc.uri);
        console.log(
          "File Content (first 200 chars):",
          fileContent.substring(0, 200) + "...",
        );

        // --- Parse JSON content ---
        try {
          const parsedData: unknown = JSON.parse(fileContent); // Use 'unknown' first for safety
          console.log("Parsed Data:", parsedData);

          // Optional: Basic validation if it's an array of objects
          if (
            Array.isArray(parsedData) &&
            parsedData.every(
              (item) => typeof item === "object" && item !== null,
            )
          ) {
            setPickedJsonData(parsedData as ParsedJsonData); // Type assertion after validation
            Alert.alert(
              "Success",
              `Successfully parsed JSON file: ${doc.name}`,
            );
          } else {
            setError(
              "The selected JSON file does not contain an array of objects.",
            );
          }
        } catch (parseError: any) {
          // Catch the parsing error
          setError(
            `Invalid JSON file content: ${parseError.message || "Unknown parsing error"}`,
          );
        }
      } else {
        // This case should ideally not happen if result.canceled is false
        setError("No JSON file was selected.");
      }
    } catch (err: any) {
      // Catch any errors from DocumentPicker or FileSystem
      console.error("Unexpected error during file picking or parsing:", err);
      setError(
        `An unexpected error occurred: ${err.message || "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick and Parse JSON File</Text>

      <Button
        title={isLoading ? "Loading..." : "Select JSON File"}
        onPress={pickAndParseJson}
        disabled={isLoading}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {pickedJsonData && (
        <View style={styles.jsonInfo}>
          <Text style={styles.infoTitle}>File: {fileName}</Text>
          <Text style={styles.infoText}>
            **Parsed Data Preview ({pickedJsonData.length} items):**
          </Text>
          {pickedJsonData.slice(0, 3).map(
            (
              item,
              index, // Show first 3 items
            ) => (
              <Text key={index} style={styles.itemText}>
                {JSON.stringify(item, null, 2)}
              </Text>
            ),
          )}
          {pickedJsonData.length > 3 && (
            <Text style={styles.itemText}>...</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  jsonInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    maxWidth: 400,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  itemText: {
    fontSize: 14,
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", // For better JSON formatting
  },
  errorText: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
