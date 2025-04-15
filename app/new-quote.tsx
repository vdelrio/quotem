import { Text, StyleSheet, TextInput, Image } from "react-native";
import {
  Button,
  Picker,
  Icon,
  Colors,
  Typography,
  Spacings,
} from "react-native-ui-lib";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuoteStore } from "@/store/quoteStore";
import { useAuthorStore } from "@/store/authorStore";
import { useRouter } from "expo-router";
import { Author } from "@/models/models";
import { TakePhotoBtn } from "@/components/TakePhotoBtn";

const dropdownIcon = <Icon source={require("@/assets/chevronDown.png")} />;

export default function NewScreen() {
  const router = useRouter();
  const addQuote = useQuoteStore((state) => state.addQuote);
  const quote = useQuoteStore((state) => state.currentQuote);
  const updateQuote = useQuoteStore((state) => state.updateCurrentQuote);
  const findAuthorById = useAuthorStore((state) => state.findAuthorById);
  const authors: Author[] = useAuthorStore((state) => state.authors);

  const handleSubmit = () => {
    if (!quote.text) {
      return;
    }
    addQuote();
    router.back();
  };

  const onChangeAuthor = (authorId: string) => {
    const selectedAuthor = findAuthorById(authorId);
    updateQuote("author", selectedAuthor);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Cita</Text>
      <TextInput
        value={quote.text}
        onChangeText={(text) => updateQuote("text", text)}
        style={styles.textArea}
        placeholder="Ingrese la cita..."
        multiline
        numberOfLines={12}
      />
      <Picker
        label="Autor"
        labelStyle={styles.label}
        preset="underline"
        text70
        value={quote.author?.id}
        onChange={(value) => onChangeAuthor(value as string)}
        useSafeArea
        topBarProps={{ title: "Autor" }}
        trailingAccessory={dropdownIcon}
        marginB-s2
      >
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id}
              key={author?.id}
            />
          ))}
      </Picker>
      <Image source={{ uri: quote.imageUri }} style={styles.previewImage} />
      <Button
        marginB-20
        label="Agregar"
        onPress={handleSubmit}
        disabled={!quote.text}
      />
      <TakePhotoBtn />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: Spacings.s6,
  },
  label: {
    ...Typography.text65R,
    marginBottom: Spacings.s1,
  },
  textArea: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    paddingVertical: Spacings.s2,
    ...Typography.text70R,
    textAlignVertical: "top",
    marginBottom: Spacings.s6,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});
