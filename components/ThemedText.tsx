import { COLOR } from "@/constants";
import { ComponentProps } from "react";
import { Text, useColorScheme } from "react-native";

export default function ThemedText({
  style,
  color,
  ...props
}: ComponentProps<typeof Text> & { color?: keyof typeof COLOR.DARK.GRAY }) {
  const isDark = useColorScheme() === "dark";
  const colorLevel = color ?? 900;

  return (
    <Text style={[{ color: isDark ? COLOR.DARK.GRAY[colorLevel] : COLOR.LIGHT.GRAY[colorLevel] }, style]} {...props} />
  );
}
