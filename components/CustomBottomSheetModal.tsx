import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  LayoutChangeEvent,
  TouchableOpacity,
  Text,
} from "react-native";
import Colors from "@/constants/Colors";
import ListingsMap from "@/components/ListingsMap";
import ListingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomBottomSheet = ({ isVisible, children, onClose }: Props) => {
  const [sheetHeight, setSheetHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const lastGestureY = useRef(0);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  useEffect(() => {
    if (isVisible && sheetHeight > 0) {
      const initialPosition = sheetHeight * 0.9;
      translateY.setValue(initialPosition);
      lastGestureY.current = initialPosition;
    }
  }, [isVisible, sheetHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.setOffset(lastGestureY.current);
      },
      onPanResponderMove: (_, gesture) => {
        // Prevent dragging below 10% position
        const newY = Math.min(
          lastGestureY.current + gesture.dy,
          sheetHeight * 0.9
        );
        translateY.setValue(newY - lastGestureY.current);
      },
      onPanResponderRelease: (_, gesture) => {
        translateY.flattenOffset();
        lastGestureY.current += gesture.dy;

        // Only allow swiping up to open fully
        if (gesture.dy < -50) {
          // Swipe up
          snapTo(0);
        } else {
          // Always maintain at least 10% visibility
          snapTo(Math.min(lastGestureY.current, sheetHeight * 0.9));
        }
      },
    })
  ).current;

  const snapTo = (position: number) => {
    const minPosition = 0;
    const maxPosition = sheetHeight * 0.9;

    const boundedPosition = Math.max(
      minPosition,
      Math.min(maxPosition, position)
    );

    Animated.spring(translateY, {
      toValue: boundedPosition,
      useNativeDriver: true,
    }).start(() => {
      lastGestureY.current = boundedPosition;
    });
  };

  const handleSheetLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setSheetHeight(height);
  };

  const handleClose = () => {
    snapTo(sheetHeight * 0.9); // Snap to 10% position
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <ListingsMap listings={ListingsDataGeo} />

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
        onLayout={handleSheetLayout}
        {...panResponder.panHandlers}
      >
        <View style={styles.header}>
          <View style={styles.dragHandle} />
        </View>
        <View style={styles.content}>
          {children}
          <View style={styles.absoluteBtn}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={{ fontFamily: "PlusJ", color: "white" }}>Map</Text>
              <Ionicons name="map" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    bottom: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: "center",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.grey,
    borderRadius: 2,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: Colors.dark,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default CustomBottomSheet;
