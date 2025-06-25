import {
  default as Button,
  ButtonProps,
} from "react-native-ui-lib/src/components/button";
import { router } from "expo-router";
// import Entypo from "@expo/vector-icons/Entypo";
import {
  useCameraPermission,
  useCameraDevice,
} from "react-native-vision-camera";

const CAMARA_SCREEN_ROUTE = "/quotes/camara";

export function ScanTextBtn(props: ButtonProps) {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  const checkPermission = async () => {
    if (hasPermission && device) {
      router.navigate(CAMARA_SCREEN_ROUTE);
    } else {
      const allowed = await requestPermission();
      if (allowed) {
        router.navigate(CAMARA_SCREEN_ROUTE);
      }
    }
  };

  return (
    <Button
      {...props}
      // iconSource={() => <Entypo name="camera" size={24} color="white" />}
      // labelStyle={{ marginLeft: 8 }}
      onPress={checkPermission}
    />
  );
}
