import { StyleSheet } from "react-native";
import { useCameraDevice } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera-text-recognition";
import { useState } from "react";
import { Text } from "react-native-vision-camera-text-recognition/lib/typescript/src/types";

export default function RecognitionScreen() {
  const [data, setData] = useState<string | Text[] | null>(null);
  const device = useCameraDevice("back");
  console.log(data);
  return (
    <>
      {!!device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          options={{
            language: "latin",
          }}
          mode={"recognize"}
          callback={(d) => setData(d)}
        />
      )}
    </>
  );
}
