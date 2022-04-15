import React, { useContext, useEffect, useRef } from "react";
import {
  ActionBar,
  CustomNoRowsOverlay,
  Footer,
  Header,
  LoadingScreen,
  Notification,
} from "../components";
import { getData } from "../services/javaServices";
import { TableContext } from "../helpers/context";
import { defaultColumns } from "../utils/colNames";
import { Paper } from "@mui/material";
import { Container, StyledDataGrid } from "../styles/TableStyle";
import { SortedAscendingIcon, SortedDescendingIcon } from "../utils/generalFn";

function Home() {
  const [state, dispatch] = useContext(TableContext);
  const prevRef = useRef(state.selectionModel);

  const handleSelectionModelChange = (ids) => {
    dispatch({ type: "SET_SELECTION_MODEL", payload: ids });
  };

  const handlePageChange = (page) => {
    // prevRef.current = state.selectionModel;
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const handlePageSizeChange = (pageSize) => {
    prevRef.current = state.selectionModel;
    dispatch({ type: "SET_PAGE_SIZE", payload: pageSize });
  };

  const handleSortModelChange = (sortModel) => {
    prevRef.current = state.selectionModel;
    dispatch({ type: "SET_SORT_MODEL", payload: sortModel });
    dispatch({ type: "SET_PAGE", payload: 0 });
  };

  const fetchData = async (data) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await getData(data);
    dispatch({ type: "SET_ROW_COUNT", payload: response.count });
    dispatch({ type: "SET_TABLE_DATA", payload: response.rows });
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_SELECTION_MODEL", payload: prevRef.current });
    prevRef.current = state.selectionModel;
    console.log("fetch Data called");
  };

  useEffect(() => {
    fetchData({
      filed: state.sortModel?.length ? state.sortModel[0].field : null,
      sort: state.sortModel?.length ? state.sortModel[0].sort : null,
      page_size: state.pageSize,
      page: state.page,
      doc_id: state.doc_id,
      invoice_id: state.invoice_id,
      cust_number: state.cust_number,
      business_year: state.business_year,
    });
  }, [
    state.page,
    state.pageSize,
    state.sortModel,
    state.doc_id,
    state.invoice_id,
    state.cust_number,
    state.business_year,
  ]);

  return state.tableData ? (
    <div>
      <Header />
      <Container>
        <ActionBar fetchData={fetchData} prevRef={prevRef} />
        <Paper sx={{ height: "26.3rem" }}>
          <StyledDataGrid
            rows={state.tableData}
            columns={defaultColumns}
            getRowId={(row) => row.sl_no}
            rowHeight={30}
            headerHeight={50}
            checkboxSelection
            disableColumnMenu
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              ColumnSortedDescendingIcon: SortedDescendingIcon,
              ColumnSortedAscendingIcon: SortedAscendingIcon,
            }}
            selectionModel={state.selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            rowCount={state.rowCount}
            loading={state.loading}
            paginationMode="server"
            rowsPerPageOptions={[10, 25, 100]}
            pagination
            page={state.page}
            onPageChange={handlePageChange}
            pageSize={state.pageSize}
            onPageSizeChange={handlePageSizeChange}
            sortingMode="server"
            sortModel={state.sortModel}
            onSortModelChange={handleSortModelChange}
            getCellClassName={(params) => {
              if (params.field === "aging_bucket") {
                switch (params.value) {
                  case "":
                    return "";
                  case "Before Due":
                    return "aging-bucket-before-due";
                  case "Greatar than 60":
                    return "aging-bucket-greater-than-60";
                  default:
                    return "others";
                }
              }
              return "";
            }}
          />
        </Paper>
        <Notification />
      </Container>
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  );
}

export default Home;
