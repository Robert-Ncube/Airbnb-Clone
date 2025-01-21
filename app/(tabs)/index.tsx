import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>booking</Link>
      <Link href={"/listing/4443"} className="flex ">
        Listing Details
      </Link>
    </View>
  );
}
