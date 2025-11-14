import { COLOR } from "@/constants";
import { ComponentProps } from "react";
import { useColorScheme, View } from "react-native";

export default function ThemedView({
  style,
  backgroundColor,
  ...props
}: ComponentProps<typeof View> & { backgroundColor?: keyof typeof COLOR.DARK.GRAY }) {
  const isDark = useColorScheme() === "dark";
  const colorLevel = backgroundColor ?? 100;

  return (
    <View
      style={[{ backgroundColor: isDark ? COLOR.DARK.GRAY[colorLevel] : COLOR.LIGHT.GRAY[colorLevel] }, style]}
      {...props}
    />
  );
}
