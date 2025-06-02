import { DocumentPickerAsset } from "expo-document-picker";

export function isJsonFile(file: DocumentPickerAsset) {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return fileExtension === "json" || file.mimeType === "application/json";
}
