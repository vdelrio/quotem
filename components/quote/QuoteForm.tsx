import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Spacings, Typography } from "react-native-ui-lib/style";
import Picker from "react-native-ui-lib/picker";
import Button from "react-native-ui-lib/button";
import Icon from "react-native-ui-lib/icon";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { Link } from "expo-router";
import { NO_AUTHOR, Quote } from "@model/models";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFetchAuthors } from "@repository/useFetchAuthors";
import { ShareFileBtn } from "@components/molecules/ShareFileBtn";

const dropdownIcon = <Icon source={require("@assets/chevronDown.png")} />;

type Props = {
  quote: Quote;
  setQuoteField: (fieldName: keyof Quote, value: any) => void;
  onSave: () => Promise<void>;
  saveBtnLabel: string;
};

export function QuoteForm({
  quote,
  setQuoteField,
  onSave,
  saveBtnLabel,
}: Props) {
  const { authors, loading } = useFetchAuthors();

  const onChangeAuthor = (authorId: number) => {
    const selectedAuthor = authors.find((author) => author.id === authorId);
    setQuoteField("author", selectedAuthor);
  };

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Cita</Text>
      <TextInput
        value={quote.text}
        onChangeText={(text) => setQuoteField("text", text)}
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
        value={quote.author?.id || NO_AUTHOR.id}
        onChange={(value) => onChangeAuthor(value as number)}
        useSafeArea
        topBarProps={{ title: "Autor" }}
        trailingAccessory={dropdownIcon}
        marginB-s2
      >
        <Picker.Item
          label={NO_AUTHOR.name}
          value={NO_AUTHOR.id}
          key={NO_AUTHOR.id}
        />
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id || "-1"}
              key={author?.id}
            />
          ))}
      </Picker>
      <View style={styles.btnContainer}>
        {quote.imageUri && (
          <>
            <Image
              source={{ uri: quote.imageUri }}
              style={styles.previewImage}
            />
            <ShareFileBtn
              label="Compartir cita"
              fileUri={quote.imageUri as string}
              mimeType="image/png"
              outline
              marginT-20
            />
          </>
        )}
        <Link href="/quotes/image-generator" asChild>
          <Button
            label={quote.imageUri ? "Cambiar imagen" : "Generar imagen"}
            link
            background-accent
            marginT-20
          />
        </Link>
        <Button
          label={saveBtnLabel}
          onPress={onSave}
          disabled={!quote.text}
          marginT-20
        />
      </View>
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
  btnContainer: {
    alignItems: "center",
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
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
});
