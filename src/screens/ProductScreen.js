import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import reactotron from "reactotron-react-native";
import JSonData from "../../db.json";

const Separator = () => <View style={styles.separator} />;
class ProductScreen extends React.Component {
  state = {
    details: {},
  };
  componentDidMount() {
    const detailId = this.props.navigation.getParam("detailId");
    // reactotron.log(detailId, "===detail");

    const obj = JSonData.data.find((item) => item.id === detailId);
    // console.log(obj, "===obj");
    this.setState({ details: obj });
    //fetch from JSON server
    // fetch("http://localhost:3000/data", {
    //     data: {
    //         detailId: detailId,
    //     }
    // })
    //     .then((result) => result.json())
    //     .then((res) => {
    //         reactotron.log(res, '===res')
    //         const obj = res.find((item) => item.id === detailId)
    //         this.setState({ details: obj })
    //         reactotron.log(obj, "===obj")
    //     })
  }

  static navigationOptions = (props) => {
    return {
      title: "Product Details",
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
  render() {
    const { navigate } = this.props.navigation;
    const { details } = this.state;
    return (
      <View>
        <View style={styles.headerStyle}>
          {/* <Text style={styles.headerTextStyle}>150x150</Text> */}
          <Image
            style={styles.itemImgeStyle}
            // source={
            //   this.state.details.image
            //     ? {
            //         uri: `/Users/xinyang.xu/xinyang/rn-starter-xy/src/assets/images/${this.state.details.image}.jpg`,
            //       }
            //     : `/Users/xinyang.xu/xinyang/rn-starter-xy/src/assets/images/unicorn.jpg`
            // }
            source={require(`../assets/images/apple.jpg`)}
          />
        </View>
        <View style={styles.contnetStyle}>
          <View style={{ height: 120 }}>
            <Text style={styles.itemNameStyle}>
              {details.name}
              {/* Xhoming Tencel Velvet Chiffon Curtain Voile White Sheer Curtain Window Privacy Protect */}
            </Text>
            <Text style={{ fontSize: 20, color: "red" }}>
              ${this.state.details.price}
            </Text>
            <Separator />
          </View>
          <Text style={{ fontSize: 19 }}>Shipped from: Overseas</Text>
          <Separator />
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 65 }}
          >
            <Image
              style={styles.imageStyle}
              source={{
                uri: `/Users/xinyang.xu/xinyang/rn-starter-xy/src/assets/${this.state.details.shoplogo}.png`,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.shopNameStyle}>
                {this.state.details.shop}
              </Text>
              <Text style={styles.shopInfoStyle}>Rating:4.5/5</Text>
              <Text style={styles.shopInfoStyle}>Location:Overseas</Text>
            </View>
            <Text
              style={styles.buttonStyle}
              onPress={() => navigate("Shop", { type: details.shop })}
            >
              View Shop
            </Text>
          </View>
          <Separator />
          <Text style={{ fontSize: 18, marginBottom: 25 }}>
            Product Details
          </Text>
          <Text>
            The convenient s.Its simply to wear.stick on the edge of the door,
            by use double-sided tape only.{" "}
          </Text>
          <Text>Size:1300*1599mm</Text>
          <Text>Net Weight:64g</Text>
          <Text>Package Weight:74g</Text>
          <Text>Color:white</Text>
          <Text>Packing Content: 1X Flyscreen</Text>
          <Text>1X Velco tape</Text>
          <Text>XXX</Text>
          <Text>XXX</Text>
          <Text>XXX</Text>
          <Text>XXX</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomStyle}
          onPress={() => navigate("Cart")}
        >
          <Text style={styles.bottomTextStyle}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    width: "100%",
    height: 150,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  itemImgeStyle: {
    width: 140,
    height: 140,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contnetStyle: {
    backgroundColor: "#fff",
    height: 600,
    padding: 5,
  },
  itemNameStyle: {
    fontSize: 30,
    marginBottom: 30,
  },
  imageStyle: {
    height: 70,
    width: 70,
    textAlign: "center",
    marginTop: 3,
    flex: 0.4,
  },
  shopNameStyle: {
    flex: 1,
    textAlign: "left",
    backgroundColor: "#fff",
    height: 40,
    lineHeight: 25,
    marginLeft: 25,
    fontWeight: "bold",
    fontSize: 17,
  },
  shopInfoStyle: {
    flex: 1,
    textAlign: "left",
    backgroundColor: "#fff",
    height: 40,
    lineHeight: 25,
    marginLeft: 25,
  },

  buttonStyle: {
    padding: 10,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 20,
    color: "orange",
    marginRight: 35,
  },

  bottomStyle: {
    backgroundColor: "#FF8C00",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 50,
    textAlign: "center",
  },
});
export default ProductScreen;
