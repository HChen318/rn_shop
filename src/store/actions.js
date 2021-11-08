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
    dispatch({ type: "SET_CHANGE_NUM", data });
  };
}

// 获取列表失败
export function getListSuccess(data) {
  return (dispatch, getState) => {
    dispatch({ type: "GET_PRODUCT_SUCCESS", data });
  };
}

// 获取列表失败
export function getListFail(data) {
  return (dispatch, getState) => {
    dispatch({ type: "GET_PRODUCT_FAIL" });
  };
}

// 选择的商品
export function addItem(data) {
  return (dispatch, getState) => {
    dispatch({ type: "ADD_ITEM", data: data });
  };
}

// 增加商品
export function increaseItem(data) {
  console.log(data, "====action=== data");
  return (dispatch, getState) => {
    dispatch({ type: "INCREASE_ITEM", data: data });
  };
}

// 减少商品
export function decreaseItem(data) {
  console.log(data, "====action=== data");
  return (dispatch, getState) => {
    dispatch({ type: "DECREASE_ITEM", data: data });
  };
}
