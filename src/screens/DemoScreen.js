import React, { Component } from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";
import ItemRow from "../components/demo/itemRow";
import CartFooter from "../components/demo/CartFooter";
import { Octicons, SimpleLineIcons } from "@expo/vector-icons";
import store from "../store";
import { connect } from "react-redux";

class DemoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SectionData: [],
      total: 0,
      count: 0,
      data: [],
    };
  }
  //customize navigator header
  static navigationOptions = (props) => {
    return {
      title: "Cart",
      headerRight: () => (
        <SimpleLineIcons
          style={{
            marginRight: 15,
          }}
          name="home"
          size={20}
          color="black"
          onPress={() => props.navigation.navigate("Home")}
        />
      ),
    };
  };

  componentDidMount() {
    this.handleData();

    this.unsubscribe = store.subscribe(() => {
      console.log("state状态改变了，新状态以下");
      console.log(store.getState(), "===store===");
      this.handleData();
    });
  }

  handleData = () => {
    // 已选择的商品
    const storeSelected = store.getState().ch.selected;

    console.log(storeSelected, "===storeSelected");

    var obj = {};
    for (var i in storeSelected) {
      if (!obj[storeSelected[i].shop]) {
        var arr = [];
        arr.push(storeSelected[i]);
        obj[storeSelected[i].shop] = arr;
      } else {
        obj[storeSelected[i].shop].push(storeSelected[i]);
      }
    }
    var arr = Object.keys(obj).map((key) => {
      return {
        data: obj[key],
        title: key,
      };
    });
    this.setState({ SectionData: arr, data: storeSelected });
  };

  componentWillUnmount() {
    this.props.navigation.state.params.refresh();
    // 解除监听
    this.unsubscribe();
  }

  changeDataList(dataItem, index) {
    const data = this.state;
    data[index] = dataItem;
    this.subtotalPrice();
  }

  subtotalPrice = () => {
    const { data } = this.state;
    var total = 0;
    var count = 0;
    if (data) {
      data.forEach((item) => {
        if (item.count > 0) {
          total += item.count * item.price;
          count += item.count;
        }
      });
    }
    this.setState({
      total: total,
      count: count,
    });
  };

  clearCart() {
    this.setState({
      SectionData: [],
    });
  }

  order() {
    this.setState({
      SectionData: [],
    });
  }

  _sectionComp = (info) => {
    var txt = "" + info.section.title;
    return (
      <View
        style={{
          height: 40,
          backgroundColor: "#FFA500",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {txt}
        </Text>
        <Octicons
          name="home"
          size={20}
          color="white"
          onPress={() =>
            this.props.navigation.navigate("Shop", { type: info.section.title })
          }
        />
      </View>
    );
  };

  render() {
    const { containerStyle } = styles;

    // console.log(this.state.SectionData, "===SectionData");
    return (
      <View style={containerStyle}>
        <SectionList
          style={styles.sectionStyle}
          sections={this.state.SectionData}
          keyExtractor={this._keyExtractor}
          renderItem={({ item, index }) => (
            <ItemRow
              data={this.state.data}
              item={item}
              index={index}
              changeItem={this.changeDataList.bind(this)}
              navigation={this.props.navigation}
              {...this.props}
            />
          )}
          renderSectionHeader={this._sectionComp}
        />
        <CartFooter
          total={this.state.total}
          count={this.state.count}
          clearEvent={this.clearCart.bind(this)}
          orderEvent={this.order.bind(this)}
        ></CartFooter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    backgroundColor: "#fff",
  },
  containerStyle: {
    flex: 2,
    borderColor: "#e2e2e2",
    backgroundColor: "#fff",
  },
  sectionStyle: {
    marginLeft: 5,
    marginTop: 8,
  },
});

export default connect()(DemoScreen);
