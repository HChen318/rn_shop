// reducers.js

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from "redux";
// 默认值
import defaultState from "./state.js";
// console.log(defaultState, "===defaultState ");

// 一个reducer就是一个函数
function pageTitle(state = defaultState, action) {
  // console.log(state, "===state");
  // console.log(action, "===action");
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case "SET_PAGE_TITLE":
      return state;
    case "GET_PRODUCT_FAIL":
      const newState4 = {
        ...state,
        product: null,
      };
      return newState4;
    // case "SET_CHANGE_NUM":
    //   const newState = {
    //     ...state,
    //     totalShopCartNum: action.data,
    //   };
    //   return newState;
    case "ADD_ITEM":
      const arr = [...state.selected];
      var num = 0; // 数量
      var hasExist = false; // 是否存在
      console.log(arr, "==arr");
      var newArr = arr.map((ele) => {
        if (action.data && action.data.item && ele.id === action.data.item.id) {
          hasExist = true;
          num = (ele.num || 1) + 1;
          return { ...ele, num };
        }
        return { ...ele };
      });
      if (!hasExist) {
        newArr.push(action.data.item);
      }
      const newState2 = {
        ...state,
        shopNum: action.data.num, // 选择的数量
        selected: newArr, // 选择的列表
      };
      return newState2;
    case "SET_CHANGE_NUM":
      const newState3 = {
        ...state,
        shopNum: action.data,
      };
      return newState;
    default:
      return state;
  }
}

// function infoList(state = defaultState.infoList, action) {
//   switch (action.type) {
//     case "SET_INFO_LIST":
//       return action.data;
//     default:
//       return state;
//   }
// }

// 导出所有reducer
export default combineReducers({
  ch: pageTitle,
  // infoList,
});
