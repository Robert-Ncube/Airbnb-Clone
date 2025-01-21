import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

type Props = {};

const Login = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: Colors?.background,
        marginHorizontal: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderColor: "#E6E6E6",
        padding: 10,
      }}
    >
      <Text>Login</Text>
    </View>
  );
};

export default Login;
