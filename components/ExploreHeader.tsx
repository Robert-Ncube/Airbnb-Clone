import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (cartegory: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const itemsRef = useRef<
    Array<React.ElementRef<typeof TouchableOpacity> | null>
  >([]);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryPress = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    // Haptic feedback for touch
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionRow}>
        <Link href={"/(modals)/booking"} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={24} color="black" />
            <View>
              <Text style={{ fontFamily: "PlusJ-Bold" }}>Where to?</Text>
              <Text style={{ fontFamily: "PlusJ", color: Colors?.grey }}>
                Anywhere - Anytime
              </Text>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 30,
          paddingHorizontal: 16,
        }}
      >
        {categories.map((category, idx) => (
          <TouchableOpacity
            key={idx}
            ref={(ref) => (itemsRef.current[idx] = ref)}
            onPress={() => handleCategoryPress(idx)}
            style={
              activeIndex === idx
                ? styles?.categoriesBtnActive
                : styles?.categoriesBtn
            }
          >
            <MaterialIcons
              name={category.icon as any}
              size={24}
              color={activeIndex === idx ? "#000" : Colors?.grey}
            />
            <Text
              style={
                activeIndex === idx
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  filterBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors?.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Plusj",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "PlusJ-Bold",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
