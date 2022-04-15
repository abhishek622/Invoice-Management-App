import React from "react";
import { Grid, Skeleton } from "@mui/material";

function LoadingScreen() {
	return (
		<div>
			<Skeleton
				variant="rect"
				animation="wave"
				width="100%"
				height={50}
				sx={{ marginBottom: 2 }}
			/>
			<div style={{ paddingLeft: "3ch", paddingRight: "3ch" }}>
				<Skeleton variant="text" width="20%" sx={{ marginBottom: 2 }} />
				<Grid container spacing={2} sx={{ marginBottom: 4 }}>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={6}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
					<Grid item xs={1}>
						<Skeleton
							variant="rect"
							animation="wave"
							width="100%"
							height={30}
						/>
					</Grid>
				</Grid>
				<Skeleton variant="rect" animation="wave" width="100%" height={398} />
			</div>
		</div>
	);
}

export default LoadingScreen;
