import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { addItem, addNum } from "../../store/actions";
import store from "../../store";

const ItemCard = ({ item, navigation, dispatch, index, onChange }) => {
  //   Tips：
  // 这边使用 Image 组件，
  // require 中的图片名称必须为一个静态的字符串信息。不能在require中进行拼接。例如 :
  const img_Obj = {
    apple: require("../../assets/images/apple.jpg"),
    orange: require("../../assets/images/orange.jpg"),
    salmon: require("../../assets/images/apple.jpg"),
    greens: require("../../assets/images/greens.jpg"),
    tomato: require("../../assets/images/tomato.jpg"),
    "rye-bread": require("../../assets/images/rye-bread.jpg"),
    cat: require("../../assets/images/cat.jpg"),
    xiaohuangren: require("../../assets/images/xiaohuangren.jpg"),
  };
  return (
    <View
      key={item.id}
      style={index % 2 != 0 ? styles.listItemStyleRight : styles.listItemStyle}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { detailId: item.id })}
      >
        <Image style={styles.itemImgeStyle} source={img_Obj[item.image]} />
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
            dispatch(addItem({ item, num: store.getState().ch.shopNum + 1 }));
            onChange();
            console.log(store.getState(), "====改变后STORE数据");
            // navigation.navigate("Cart");
          }}
        />
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
export default ItemCard;
