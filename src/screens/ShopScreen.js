import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ItemCard from "../components/demo/ItemCard";
import store from "../store";

const Separator = () => <View style={styles.separator} />;

class ShopScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      shop: [],
      shopType: "",
    };
  }

  //customize navigaton header
  static navigationOptions = (props) => {
    return {
      title: "Shop",
      headerRight: () => (
        <AntDesign
          style={{
            marginRight: 15,
          }}
          name="shoppingcart"
          size={25}
          color="black"
          onPress={() => props.navigation.navigate("Cart")}
        />
      ),
    };
  };

  componentDidMount() {
    const type = this.props.navigation.getParam("type");
    const data = store
      .getState()
      .ch.product.filter((item) => item.shop === type);

    this.setState({ data, shopType: type });
  }

  render() {
    const { navigate } = this.props.navigation;
    // 伪代码
    const img_Obj = {
      HP: require("../assets/hp.png"),
      Lovepeace: require("../assets/lovepeace.png"),
      Super: require("../assets/lifescience.png"),
    };

    return (
      <View>
        <View style={styles.headerStyle}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Image
              style={styles.imageStyle}
              source={img_Obj[this.state.shopType]}
            />
            <Text style={styles.shopName}>{this.state.shopType}</Text>
          </View>
        </View>
        <Separator />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.shopInfoStyle}>Products:20</Text>
          <Text style={styles.shopInfoStyle}>Followers: 120</Text>
          <Text style={styles.shopInfoStyle}>Rating:5</Text>
        </View>
        <ScrollView>
          <View style={styles.listStyle}>
            {this.state.data.map((item, index) => {
              return (
                <ItemCard
                  item={item}
                  index={index}
                  key={item.id}
                  onChangeCallBack={() => {
                    this.props.navigation.setParams({
                      totalAmount: store.getState().ch.shopNum,
                    });
                  }}
                  {...this.props}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  separator: {
    marginVertical: 2,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerStyle: {
    width: "100%",
    height: 120,
    backgroundColor: "#FF8C00",
  },
  imageStyle: {
    height: 80,
    width: 80,
    marginLeft: 50,
    marginTop: 20,
  },
  shopName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 120,
    flex: 1,
    flexDirection: "row",
  },
  shopInfoStyle: {
    textAlign: "left",
    backgroundColor: "#fff",
    height: 40,
    lineHeight: 50,
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  contnetStyle: {
    backgroundColor: "#fff",
    height: 640,
    padding: 5,
    marginTop: 2,
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
    marginRight: "1%",
    // marginTop: 3,
    alignItems: "center",
    width: "49%",
  },

  listItemStyleRight: {
    marginRight: 0,
    backgroundColor: "#FFFAF0",
    // marginTop: 3,
    alignItems: "center",
    width: "50%",
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
});
export default ShopScreen;
