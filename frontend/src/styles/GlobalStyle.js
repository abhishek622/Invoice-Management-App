import {
	DialogContent,
	DialogTitle,
	Grid,
	Paper,
	styled,
} from "@mui/material";

const AddBox = styled(DialogContent)(({ theme }) => ({
	textAlign: "center",
	"& .MuiTextField-root": {
		margin: ".4rem",
		width: "16rem",
		[theme.breakpoints.down("md")]: {
			width: "14rem",
		},
	},
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	marginBottom: ".4rem",
	padding: ".5rem 3.1rem",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		alignItems: "center",
		padding: "0.2rem 1rem",
	},
}));

const FooterPaper = styled(Paper)(() => ({
	bottom: 0,
	position: "fixed",
	textAlign: "center",
	width: "100%",
	padding: "0.2ch 3ch",
}));

const SearchBarPaper = styled(Paper)(() => ({
	padding: "3px 4px",
	display: "flex",
	alignItems: "center",
	backgroundColor: "rgba(255, 255, 255, 1)",
	color: "rgba(0, 0, 0, 0.87)",
	"& .MuiInputBase-root": {
		"input::-webkit-outer-spin-button": { display: "none" },
		"input::-webkit-inner-spin-button": { display: "none" },
		"input[type=number]": { MozAppearance: "textfield" },
		color: "rgba(0, 0, 0, 0.87)",
	},
	borderRadius: "8px",
}));

const StyledTitle = styled(DialogTitle)(() => ({
	fontWeight: "bold",
	backgroundColor: "#C3E0E5",
	width: "90%",
	color: "#003366",
	borderBottomLeftRadius: "8px",
	borderBottomRightRadius: "8px",
	margin: "0rem auto",
	padding: ".3rem 1rem",
	marginBottom: "1rem",
	fontSize: "1.2rem",
	boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
	alignItems: "center",
	marginBottom: "1rem",
	"& .MuiButton-root": {
		fontSize: "0.8rem",
		borderRadius: "8px",
		[theme.breakpoints.down("sm")]: {
			fontSize: ".7rem",
		},
	},
}));

export {
	AddBox,
	HeaderPaper,
	FooterPaper,
	SearchBarPaper,
	StyledTitle,
	StyledGrid,
};
