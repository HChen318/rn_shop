import React, { useState } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
// import reactotron from "reactotron-react-native";
import { decreaseItem, increaseItem } from "../../store/actions";
import store from "../../store";

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

const ItemRow = ({
  data = [],
  item,
  index = 0,
  changeItem,
  navigation,
  dispatch,
}) => {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(item.num);
  // Set the initial button and over purchase limit err msg to false
  const [disabled, setDisabled] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    if (count >= item.purchaseLimit) {
      //if count>purchase limit, will show error msg
      setShowErrMsg(true);
    } else if (count >= item.stock) {
      alert("no avaiable stock");
    } else {
      setCount((prevCount) => prevCount + 1);
      let tempCount = count;
      item.count = ++tempCount;
      // 增加当前数据的数量 id 当前id,num为总数量
      dispatch(
        increaseItem({ id: item.id, num: store.getState().ch.shopNum + 1 })
      );
      changeItem(item, index);
    }
    setDisabled(false);
    // reactotron.log("handle Increment Called", item.name);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    } else {
      setDisabled(true);
      setCount(0);
    }
    // 减少当前数据的数量 id 当前id,num为总数量
    dispatch(
      decreaseItem({ id: item.id, num: store.getState().ch.shopNum - 1 })
    );

    setShowErrMsg(false);
    let tempCount = count;
    item.count = --tempCount;
    changeItem(item, index);
  };

  const { containerStyle, lastItemStyle, imageStyle, textStyle } = styles;

  return (
    <View style={index + 1 === data.length ? lastItemStyle : containerStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { detailId: item.id })}
      >
        <Image source={img_Obj[item.image]} style={imageStyle} />
      </TouchableOpacity>
      <View style={textStyle}>
        <Text style={{ color: "#2e2f30" }}>{item.name}</Text>
        <Text>${item.price}</Text>
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button title="-" onPress={handleDecrement} disabled={disabled} />
          <Text>{count}</Text>
          <Button title="+" onPress={handleIncrement} />
        </View>
        {showErrMsg ? (
          <Text style={{ fontSize: 11, color: "red" }}>
            reach limit {item.purchaseLimit}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
};

export default ItemRow;
