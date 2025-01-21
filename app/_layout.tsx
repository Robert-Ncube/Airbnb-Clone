import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader"; // Adjust the path as needed

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PlusJ: require("../assets/fonts/plusjakarta/PlusJakartaSans-Regular.ttf"),
    "PlusJ-Bold": require("../assets/fonts/plusjakarta/PlusJakartaSans-Bold.ttf"),
    "PlusJ-ExtraBold": require("../assets/fonts/plusjakarta/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJ-SemiBold": require("../assets/fonts/plusjakarta/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            headerShown: true,
            presentation: "modal",
            header: () => (
              <CustomHeader Modalstyle={false} title="Log in or Sign up" />
            ),
          }}
        />
        <Stack.Screen
          name="(listing)/[id]"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: "transparentModal",
            header: () => <CustomHeader Modalstyle={true} title="Booking" />,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}
