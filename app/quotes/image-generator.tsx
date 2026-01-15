import { useRef, useState } from "react";
import Button from "react-native-ui-lib/button";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { FancyFontText } from "@components/atoms/FancyFontText";
import { useQuoteStore } from "@store/quoteStore";
import { getElementCyclically } from "@/business/utils";
import { useShareFile } from "@hooks/useShareFile";

const { width } = Dimensions.get("window");
const backgrounds = [
  require("@assets/backgrounds/fondo-1.jpeg"),
  require("@assets/backgrounds/fondo-2.jpeg"),
  require("@assets/backgrounds/fondo-3.webp"),
  require("@assets/backgrounds/fondo-4.jpeg"),
  require("@assets/backgrounds/fondo-5.jpeg"),
  require("@assets/backgrounds/fondo-6.jpeg"),
];

export default function ImageWithTextOverlayScreen() {
  const viewShotRef = useRef<ViewShot>(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const { shareFile } = useShareFile();
  const quote = useQuoteStore((state) => state.currentQuote);

  const captureAndSave = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
      });
      await shareFile(uri, "image/png");
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
          style={[styles.imageBackground, { height: quote.text.length * 2 }]}
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
      <Button
        label="Cambiar fondo"
        link
        marginT-15
        onPress={() => setBackgroundIndex((prevState) => prevState + 1)}
      />
      <Button label="Compartir" onPress={captureAndSave} marginT-30 />
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
    // height: quote.text, // Altura fija o puedes hacerla relativa también
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  textContainer: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo semi-transparente para mejorar legibilidad
    width: "90%", // El texto ocupará el 90% del ancho de la imagen
    alignSelf: "center", // Asegura que el contenedor del texto esté centrado
  },
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
});
