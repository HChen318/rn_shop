import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import reactotron from "reactotron-react-native";

const ItemList = ({ data = [], navigation }) => {
  return (
    <View>
      <View style={styles.contnetStyle}>
        {/* make item cards scrollable */}
        <ScrollView>
          <View style={styles.listStyle}>
            {/* get every item info */}
            {data.map((item, i) => {
              return (
                <View
                  key={item.id}
                  style={
                    i % 2 != 0
                      ? styles.listItemStyleRight
                      : styles.listItemStyle
                  }
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Product", { detailId: item.id })
                    }
                  >
                    <Image
                      style={styles.itemImgeStyle}
                      source={
                        item.image
                          ? require("../../assets/images/apple.jpg")
                          : require(`../../assets/images/unicorn.jpg`)
                        // item.image
                        //   ? require(`../../assets/images/${item.image}.jpg`)
                        //   : require(`../../assets/images/unicorn.jpg`)
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.itemContentStyle}>{item.content}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: "center",
                        backgroundColor: "#FFC0CB",
                        height: 25,
                        lineHeight: 25,
                      }}
                    >
                      ${item.price}
                    </Text>
                    <AntDesign
                      style={{
                        flex: 1,
                        textAlign: "center",
                        backgroundColor: "#FFC0CB",
                        height: 25,
                        lineHeight: 25,
                      }}
                      name="shoppingcart"
                      size={20}
                      color="black"
                      onPress={() => {
                        navigation.navigate("Cart");
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = {
  contnetStyle: {
    backgroundColor: "#ccc",
    height: 650,
    padding: 5,
  },

  listStyle: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
  },

  listItemStyle: {
    backgroundColor: "#FFFAF0",
    marginRight: "2%",
    marginTop: 6,
    alignItems: "center",
    width: "49%",
  },

  listItemStyleRight: {
    marginRight: 0,
    backgroundColor: "#FFFAF0",
    marginTop: 6,
    alignItems: "center",
    width: "49%",
  },

  itemImgeStyle: {
    width: 150,
    height: 150,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContentStyle: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  itemShoppingStyle: {
    width: 100,
    backgroundColor: "#FFC0CB",
  },
};
export default ItemList;
