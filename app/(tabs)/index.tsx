import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/CustomBottomSheetModal";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [category, setCategory] = useState("Tiny homes");
  const [isSheetVisible, setIsSheetVisible] = useState(true);
  const items = useMemo(() => listingsData as any, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            header: () => <ExploreHeader onCategoryChanged={setCategory} />,
          }}
        >
          {() => (
            <CustomBottomSheet
              isVisible={isSheetVisible}
              onClose={() => setIsSheetVisible(false)}
            >
              <Listings listings={items} category={category} refresh={null} />
            </CustomBottomSheet>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
