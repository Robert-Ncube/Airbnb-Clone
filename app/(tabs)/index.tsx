import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (newCategory: string) => {
    console.log("HomeScreen: onDataChanged", newCategory);
    setCategory(newCategory);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      >
        {() => (
          <View style={{ flex: 1 }}>
            <Listings listings={items} category={category} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
