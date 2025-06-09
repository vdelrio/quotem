import { Button, ButtonProps } from "react-native-ui-lib";
import { useShareFile } from "@hooks/useShareFile";

type Props = {
  label: string;
  fileUri: string;
  mimeType: string;
};

// TODO: manejar errores y el loading
export function ShareFileBtn({
  label,
  fileUri,
  mimeType,
  ...btnProps
}: Props & ButtonProps) {
  const { shareFile } = useShareFile();

  return (
    <Button
      {...btnProps}
      label={label}
      onPress={() => shareFile(fileUri, mimeType)}
    />
  );
}
