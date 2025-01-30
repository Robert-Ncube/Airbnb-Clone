import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

type Props = {};

const profile = (props: Props) => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      <Text>profile</Text>
      <Button title="Log Out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default profile;
