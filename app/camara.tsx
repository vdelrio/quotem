import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useQuoteStore } from "@/store/quoteStore";
import { router } from "expo-router";

export default function CamaraPage() {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const updateCurrentQuote = useQuoteStore((state) => state.updateCurrentQuote);

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      if (photo) {
        console.log("Photo taken!", photo?.path);

        const appDirectory = FileSystem.documentDirectory + "photos/";
        await FileSystem.makeDirectoryAsync(appDirectory, {
          intermediates: true,
        });
        const newUri = `${appDirectory}${Date.now()}.jpg`;
        console.log({ newUri });

        await FileSystem.moveAsync({
          from: `file://${photo.path}`,
          to: newUri,
        });
        console.log("Photo moved to app directory:", newUri);
        setPhotoUri(newUri);
        updateCurrentQuote("imageUri", newUri);
      }
    } catch (error) {
      console.error("Failed to take photo:", error);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>No se encontró la cámara trasera!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>

      {photoUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.closePreviewButton}
            onPress={() => {
              setPhotoUri(null);
              router.back();
            }}
          >
            <Text style={styles.closeButtonText}>Confirmar</Text>
          </TouchableOpacity>
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
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
  previewContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  closePreviewButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});
