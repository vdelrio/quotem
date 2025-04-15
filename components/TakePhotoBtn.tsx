import { Button, ButtonProps } from "react-native-ui-lib";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import {
  useCameraPermission,
  useCameraDevice,
} from "react-native-vision-camera";

export function TakePhotoBtn(props: ButtonProps) {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  const checkPermission = async () => {
    if (hasPermission && device) {
      router.navigate("/camara");
    } else {
      const allowed = await requestPermission();
      if (allowed) {
        router.navigate("/camara");
      }
    }
  };

  return (
    <Button
      {...props}
      background-accent
      iconSource={() => <Entypo name="camera" size={24} color="white" />}
      labelStyle={{ marginLeft: 8 }}
      onPress={checkPermission}
    />
  );
}
