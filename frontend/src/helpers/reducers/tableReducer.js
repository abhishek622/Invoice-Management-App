const tableInitialState = {
  tableData: null,
  loading: false,
  rowCount: 0,
  page: 0,
  pageSize: 10,
  selectionModel: [],
  alert: false,
  response: "",
  sortModel: [],
  doc_id: null,
  invoice_id: null,
  cust_number: null,
  business_year: null,
};

const tableReducer = (state = tableInitialState, action) => {
  switch (action.type) {
    case "SET_TABLE_DATA":
      return {
        ...state,
        tableData: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ROW_COUNT":
      return {
        ...state,
        rowCount: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: action.payload,
      };
    case "SET_SELECTION_MODEL":
      return {
        ...state,
        selectionModel: action.payload,
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "SET_RESPONSE":
      return {
        ...state,
        response: action.payload,
      };
    case "SET_SORT_MODEL":
      return {
        ...state,
        sortModel: action.payload,
      };
    case "SET_DOC_ID":
      return {
        ...state,
        doc_id: action.payload,
      };
    case "SET_INVOICE_ID":
      return {
        ...state,
        invoice_id: action.payload,
      };
    case "SET_CUST_NUMBER":
      return {
        ...state,
        cust_number: action.payload,
      };
    case "SET_BUSINESS_YEAR":
      return {
        ...state,
        business_year: action.payload,
      };
    default:
      return state;
  }
};

export { tableReducer, tableInitialState };
