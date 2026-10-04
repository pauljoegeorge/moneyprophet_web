import { useState } from "react";
import { post } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useOcr() {
  const [ocrResult, setOcrResult] = useState(null);

  const readReceipt = async (imageSrc) => {
    try {
      const byteCharacters = atob(imageSrc.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const imageFile = new File([blob], "captured_image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("apikey", "TEST");
      formData.append("recognizer", "auto");
      formData.append("ref_no", "ocr_react_123");

      const response = await post(
        "https://ocr.asprise.com/api/v1/receipt",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.success) {
        setOcrResult(response.receipts[0]);
        Notify.success("Ready for review!");
      } else {
        Notify.error("Running out of quota. Please try again after 3 hours.");
      }
    } catch {
      Notify.error("Running out of quota. Please try again after 3 hours.");
    }
  };

  return {
    ocrResult,
    actions: {
      readReceipt,
    },
  };
}

export { useOcr };
