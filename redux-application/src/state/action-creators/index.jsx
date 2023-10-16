export const addItem = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "add",
      payload: amount,
    });
  };
};
export const removeItem = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "remove",
      payload: amount,
    });
  };
};
