import { I18N_MESSAGE } from "@/i18n";
import { useAuthStore, useLanguageStore } from "@/store";
import CookieManager from "@react-native-cookies/cookies";
import { useRouter } from "expo-router";
import { Alert, Button } from "react-native";

export default function LoginButton() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const language = useLanguageStore((state) => state.language);

  const handleLogout = () => {
    Alert.alert(
      I18N_MESSAGE["LOGOUT"][language ?? "en-US"],
      I18N_MESSAGE["DO_YOU_WANT_TO_LOGOUT"][language ?? "en-US"],
      [
        {
          style: "cancel",
          text: I18N_MESSAGE["NO"][language ?? "en-US"],
        },
        {
          style: "destructive",
          text: I18N_MESSAGE["YES"][language ?? "en-US"],
          onPress: async () => {
            const isSuccess = await CookieManager.clearAll(true);
            useAuthStore.setState({ accessToken: null, idToken: null });
            if (isSuccess) {
              Alert.alert(
                I18N_MESSAGE["LOGOUT"][language ?? "en-US"],
                I18N_MESSAGE["LOGOUT_SUCCESS"][language ?? "en-US"],
                [
                  {
                    style: "default",
                    text: I18N_MESSAGE["CONFIRM"][language ?? "en-US"],
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <>
      {accessToken ? (
        <Button title={I18N_MESSAGE["LOGOUT"][language ?? "en-US"]} onPress={handleLogout} />
      ) : (
        <Button title={I18N_MESSAGE["LOGIN"][language ?? "en-US"]} onPress={() => router.push("/login")} />
      )}
    </>
  );
}
