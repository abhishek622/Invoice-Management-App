const initialState = {
  analytics: false,
  searchCustomer: false,
  addCustomer: false,
  editCustomer: false,
  delCustomer: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANALYTICS":
      return {
        ...state,
        analytics: action.payload,
      };
    case "SET_SEARCH_CUSTOMER":
      return {
        ...state,
        searchCustomer: action.payload,
      };
    case "SET_ADD_CUSTOMER":
      return {
        ...state,
        addCustomer: action.payload,
      };
    case "SET_EDIT_CUSTOMER":
      return {
        ...state,
        editCustomer: action.payload,
      };
    case "SET_DEL_CUSTOMER":
      return {
        ...state,
        delCustomer: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
