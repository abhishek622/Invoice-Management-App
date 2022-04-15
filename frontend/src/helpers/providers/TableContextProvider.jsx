import { useReducer } from "react";
import { TableContext } from "../context";
import { tableReducer, tableInitialState } from "../reducers/tableReducer";

export default function TableContextProvider({ children }) {
  const [state, dispatch] = useReducer(tableReducer, tableInitialState);
  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
}
