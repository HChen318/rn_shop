import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DemoScreen from "./src/screens/DemoScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ShopScreen from "./src/screens/ShopScreen";
import { Provider } from "react-redux";
import store from "./src/store";
import "react-native-gesture-handler";

//create native stock navigator
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Cart: {
      screen: DemoScreen,
    },
    Product: {
      screen: ProductScreen,
    },
    Shop: {
      screen: ShopScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Home",
    },
    mode: "card",
    headerMode: "screen",
  }
);

let Navigation = createAppContainer(navigator);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

export default App;
