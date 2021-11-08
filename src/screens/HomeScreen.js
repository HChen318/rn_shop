import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import ItemList from "../components/demo/itemList";
import ItemCard from "../components/demo/ItemCard";
import reactotron from "reactotron-react-native";
import JSonData from "../../db.json";

// import * as Action from "../store/actions";
import { changeNum } from "../store/actions";
import store from "../store";
import { connect } from "react-redux";

// Hooks 16.8
const CHCOM = () => {
  const [val, setVal] = useState(0);
  return (
    <View>
      <Text
        onPress={() => {
          setVal(1);
        }}
      >
        ch来了{val}
      </Text>
    </View>
  );
};
let that;
// class
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      data: [],
      val: 1,
      data1: [],
      currentShop: 0,
    };
    // store.subscribe(() => {
    //   console.log(props, "===props");
    //   props.navigation.setParams({
    //     totalAmount: props.shopNum,
    //   });
    // });
  }
  //customize navigaton header
  static navigationOptions = (props) => {
    return {
      title: "Home",
      headerRight: () => (
        <View style={styles.headerRightStyle}>
          <AntDesign
            style={{
              marginRight: 15,
            }}
            name="shoppingcart"
            size={25}
            color="black"
            onPress={() =>
              props.navigation.navigate("Cart", {
                refresh: function () {
                  // console.log(props, "===props");
                  // 获取及使用
                  props.navigation.getParam("updateNum")();
                },
              })
            }
          />
          <View style={styles.headerRightNum}>
            <Text style={{ fontSize: 12, color: "#fff" }}>
              {props.navigation.getParam("totalAmount")}
            </Text>
          </View>
        </View>
      ),
    };
  };

  componentDidMount() {
    this.setState({
      data: JSonData.data,
    });

    // 右侧数量
    this.props.navigation.setParams({
      totalAmount: this.props.shopNum,
      updateNum: this.updateNum, // 挂载一个右侧更新数量的函数
    });

    //fetch from JSON server
    // fetch("http://localhost:3000/db.json")
    //   .then((result) => result.json())
    //   .then((res) => {
    //     this.setState({ data: res })
    //     reactotron.log(res,'===homeres')
    //   })
  }

  updateNum = () => {
    this.props.navigation.setParams({
      totalAmount: this.props.shopNum,
    });
  };

  test1 = () => {
    // mapDispatchToProps
    // this.props.changeNum(2000);
    // 常规
    this.props.dispatch(changeNum(2000));
    this.this.setState({
      val: 2,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { val, data, currentShop } = this.state;

    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle} onPress={() => this.test1()}>
            150x150 {currentShop}
            <CHCOM />
          </Text>
        </View>
        <View style={styles.listStyle}>
          {data.map((item, index) => {
            return (
              <ItemCard
                item={item}
                index={index}
                key={item.id}
                onChange={() => {
                  this.props.navigation.setParams({
                    totalAmount: store.getState().ch.shopNum,
                  });
                }}
                // dispatch={this.props.dispatch}
                // navigation={this.props.navigation}
                {...this.props}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerRightStyle: {
    position: "relative",
  },
  headerRightNum: {
    position: "absolute",
    top: -5,
    right: 3,
    color: "#fff",
    width: 20,
    height: 20,
    borderRadius: 40,
    backgroundColor: "#f76260",
    alignItems: "center",
    justifyContent: "center",
  },

  headerStyle: {
    width: "100%",
    height: 150,
    backgroundColor: "#87ceeb",
  },

  headerTextStyle: {
    fontSize: 35,
    textAlign: "center",
    color: "#808080",
    lineHeight: 150,
  },
  listStyle: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    shopNum: state.ch.shopNum,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeNum: (val) => {
//       dispatch(changeNum(val));
//     },
//     fetchProduct: () => {
//       //....
//     },
//   };
// };

// export default HomeScreen;
export default connect(mapStateToProps)(HomeScreen);
