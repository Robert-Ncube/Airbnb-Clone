import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: any[];
  category: string;
  refresh: any;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD TO:", category, "Data:", items?.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category, items]); // Add dependencies here

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image source={{ uri: item?.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: "PlusJ-SemiBold" }}>{item?.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {item?.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "PlusJ",
              borderColor: Colors?.grey,
            }}
          >
            {item?.room_type}
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={{ fontFamily: "PlusJ-Bold" }}>$ {item?.price}</Text>
            <Text style={{ fontFamily: "PlusJ" }}>per night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles?.container}>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 16,
              fontFamily: "PlusJ-Bold",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {items?.length} {category}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    marginVertical: 16,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "gray",
    overflow: "hidden",
    resizeMode: "cover",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Listings;
