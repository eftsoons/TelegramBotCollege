import { useEffect } from "react";
import { initBackButton } from "@telegram-apps/sdk";

const useBackButton = (customCallback: () => void) => {
  const [backButton] = initBackButton();

  useEffect(() => {
    backButton.show();
    return () => {
      backButton.hide();
    };
  }, []);

  useEffect(() => {
    backButton.on("click", customCallback);

    return () => {
      backButton.off("click", customCallback);
    };
  }, [customCallback]);
};

export default useBackButton;
