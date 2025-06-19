import { useRef, useState } from "react";
import Button from "react-native-ui-lib/button";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useQuoteStore } from "@store/quoteStore";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { getElementCyclically } from "@/business/utils";

const { width } = Dimensions.get("window");
const backgrounds = [
  require("@assets/backgrounds/fondo-1.jpeg"),
  require("@assets/backgrounds/fondo-2.jpeg"),
  require("@assets/backgrounds/fondo-3.jpeg"),
  require("@assets/backgrounds/fondo-4.jpeg"),
  require("@assets/backgrounds/fondo-5.jpg"),
  require("@assets/backgrounds/fondo-6.webp"),
];

export default function ImageWithTextOverlayScreen() {
  const viewShotRef = useRef<ViewShot>(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const quote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );

  const saveImage = async (currentUri: string) => {
    const appDirectory = FileSystem.documentDirectory + "photos/";
    await FileSystem.makeDirectoryAsync(appDirectory, {
      intermediates: true,
    });
    const newUri = `${appDirectory}${Date.now()}.jpg`;

    await FileSystem.moveAsync({
      from: currentUri,
      to: newUri,
    });
    return newUri;
  };

  const captureAndSave = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
      });
      const permanentUri = await saveImage(uri);
      setCurrentQuoteField("imageUri", permanentUri);
      router.back();
    } catch (error) {
      console.error("Error al capturar o guardar la imagen:", error);
      alert("Error al guardar la imagen.");
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef}>
        <ImageBackground
          source={getElementCyclically(backgrounds, backgroundIndex)}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <FancyFontText style={styles.text}>{quote.text}</FancyFontText>
            {quote.author && (
              <FancyFontText marginT-10 style={styles.text}>
                {quote.author.name}
              </FancyFontText>
            )}
          </View>
        </ImageBackground>
      </ViewShot>
      <Button label="Confirmar" onPress={captureAndSave} marginT-20 />
      <Button
        label="Cambiar fondo"
        link
        marginT-20
        onPress={() => setBackgroundIndex((prevState) => prevState + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: width * 0.9, // 90% del ancho de la pantalla
    height: 300, // Altura fija o puedes hacerla relativa también
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  textContainer: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente para mejorar legibilidad
    width: "90%", // El texto ocupará el 90% del ancho de la imagen
    alignSelf: "center", // Asegura que el contenedor del texto esté centrado
  },
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
});
