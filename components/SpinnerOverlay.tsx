import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function SpinnerOverlay() {
  return (
    <View style={styles.spinnerWrapper}>
      <LottieView
        autoPlay
        style={styles.spinner}
        source={require("@/assets/spinner.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  spinner: {
    width: 150,
    height: 150,
  }
});
