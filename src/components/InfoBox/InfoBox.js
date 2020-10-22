import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = ({ title, cases, total, isRed, active, ...props }) => {
	return (
		<Card
			onClick={props.onClick}
			className={`infoBox ${active && "infoBox_Selected"} ${
				isRed && "infoBox_red"
			}`}
		>
			<CardContent>
				<Typography color="textSecondary" className="infoBox_title">
					{title}
				</Typography>
				<h2 className={`infoBox_cases ${!isRed && "infoBox_green"}`}>
					{cases}
				</h2>
				<Typography color="textSecondary" className="infoBox_total">
					{total}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default InfoBox;
