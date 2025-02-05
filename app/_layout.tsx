import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomHeader from "@/components/CustomHeader"; // Adjust the path as needed
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import "react-native-gesture-handler";
import { enableFreeze } from "react-native-screens";
import { TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import ModalHeaderText from "@/components/ModalHeaderText";

enableFreeze(true);

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded, isSignedIn]);

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
        <Stack.Screen name="(listing)/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerTransparent: true,
            headerTitle: (props) => <ModalHeaderText />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#fff",
                  borderColor: Colors.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}
//header: () => <CustomHeader Modalstyle={true} title="Booking" />,
