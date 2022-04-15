import { Divider, IconButton, InputBase } from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { TableContext } from "../../helpers/context";
import { SearchBarPaper } from "../../styles/GlobalStyle";

function SearchBar() {
	const [state, dispatch] = useContext(TableContext);
	const [search, setSearch] = useState("");

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: "SET_CUST_NUMBER", payload: search });
		dispatch({ type: "SET_PAGE", payload: 0 });
	};

	const handleClearSearch = () => {
		if (state.cust_number !== null) {
			dispatch({ type: "SET_PAGE", payload: 0 });
			dispatch({
				type: "SET_SORT_MODEL",
				payload: [{field: "", sort: "asc",}],
			});
			dispatch({ type: "SET_CUST_NUMBER", payload: null });
		}
		setSearch("");
	};

	return (
		<SearchBarPaper component="form" onSubmit={handleSubmit} elevation={0}>
			<InputBase
				sx={{ml: 1, flex: 1}}
				type="number"
				value={search}
				placeholder="Search Customer Number"
				inputProps={{ "aria-label": "search customer number" }}
				onChange={handleSearch}
			/>

			{search && (
				<IconButton
					onClick={handleClearSearch}
					sx={{ p: "4px", color: "rgba(0,0,0,0.5)" }}
					aria-label="clear search"
				>
					<CloseIcon />
				</IconButton>
			)}

			<Divider
				sx={{ height: 24, m: 0.5, borderColor: "#000" }}
				orientation="vertical"
			/>

			<IconButton
				type="submit"
				sx={{ p: "4px", color: "#000" }}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</SearchBarPaper>
	);
}

export default SearchBar;
