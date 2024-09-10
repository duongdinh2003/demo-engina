import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function DropDown({
  title,
  data,
  placeholder,
  handleSelect,
  pos = 0,
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);
  const [value, setValue] = useState("");
  const onSelect = useCallback(
    (item) => {
      setValue(item.value);
      setExpanded(false);
      if (handleSelect) {
        handleSelect(item.value);
      } else {
        console.error("handleSelect is undefined");
      }
    },
    [handleSelect]
  );

  return (
    <View
      ref={buttonRef}
      onLayout={(e) => {
        const layout = e.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOffComponent = layout.height;

        const finalValue =
          topOffset +
          heightOffComponent +
          (Platform.OS === "android" ? -32 + pos : 3);

        setTop(finalValue);
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.txt}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View style={[styles.options, { top: top }]}>
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.value}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 20,
  },
  txt: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 5,
  },
  options: {
    position: "absolute",
    backgroundColor: Colors.WHITE,
    width: "100%",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
    borderWidth: 1,
  },
  separator: {
    height: 4,
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  backdrop: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
