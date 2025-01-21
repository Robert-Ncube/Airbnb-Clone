import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const CustomHeader = ({
  title,
  Modalstyle,
}: {
  title: string;
  Modalstyle: boolean;
}) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: Colors?.background,
        borderTopRightRadius: Modalstyle ? 0 : 20,
        borderTopLeftRadius: Modalstyle ? 0 : 20,
        marginHorizontal: Modalstyle ? 0 : 10,
        marginTop: Modalstyle ? 0 : 10,
        justifyContent: "space-between",
        borderTopWidth: Modalstyle ? 0 : 1,
        borderLeftWidth: Modalstyle ? 0 : 1,
        borderRightWidth: Modalstyle ? 0 : 1,
        borderColor: "#E6E6E6",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", left: 10 }}
      >
        <Ionicons name="close-outline" size={28} color="black" />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontFamily: "PlusJ-SemiBold", fontSize: 18 }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
