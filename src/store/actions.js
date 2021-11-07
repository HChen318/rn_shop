// actions.js

// 设置标题数据
export function setPageTitle(data) {
  return (dispatch, getState) => {
    dispatch({ type: "SET_PAGE_TITLE", data: data });
  };
}

// 改变总数值
export function changeNum(data) {
  return (dispatch, getState) => {
    dispatch({ type: "SET_CHANGE_NUM", data: data });
  };
}

// 选择的商品
export function addItem(data) {
  console.log(data, "===data");
  return (dispatch, getState) => {
    dispatch({ type: "ADD_ITEM", data: data });
  };
}

// 获取列表失败
export function getListFail(data) {
  return (dispatch, getState) => {
    dispatch({ type: "GET_PRODUCT_FAIL" });
  };
}


// export function setAmount(data) {
//   return (dispatch, getState) => {
//     dispatch({ type: "SET_PAGE_TITLE1111", data: data });
//   };
// }
