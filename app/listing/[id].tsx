import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

type Props = {};

const Page = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("Page-ID:", id);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
