import { useState } from "react";
import * as Sharing from "expo-sharing";

interface ReturnType {
  shareFile: (fileUri: string, mimeType: string) => Promise<void>;
  isSharing: boolean;
  error: string | null;
}

export const useShareFile = (): ReturnType => {
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shareFile = async (fileUri: string, mimeType: string) => {
    setIsSharing(true);
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        setError("Función no disponible");
        setIsSharing(false);
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType,
        // UTI: 'public.png', // Opcional para iOS si necesitas un Uniform Type Identifier específico
      });
    } catch (error: any) {
      setError(`Ocurrió un error al compartir: ${error.message}`);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareFile,
    isSharing,
    error,
  };
};
