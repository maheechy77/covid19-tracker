import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
	cases: {
		hex: "#CC1034",
		multiplier: 800,
	},
	deaths: {
		hex: "#fb4443",
		multiplier: 2000,
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 1200,
	},
};

export const sortData = (data) => {
	const sortedData = [...data];
	sortedData.sort((a, b) => {
		if (a.cases > b.cases) {
			return -1;
		} else {
			return 1;
		}
	});
	return sortedData;
};

export const prettyPrintStat = (stat) =>
	stat ? `+${numeral(stat).format("0,0a")}` : "+0";

export const showDataOnMap = (data, caseType = "cases") =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={caseTypeColors[caseType].hex}
			fillColor={caseTypeColors[caseType].hex}
			radius={
				Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
			}
		>
			<Popup>
				<div className="infoContainer">
					<div
						className="infoFlag"
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
					></div>
					<div className="infoName">{country.country}</div>
					<div className="infoCases">
						Cases : {numeral(country.cases).format("0,0")}
					</div>
					<div className="infoRecovered">
						Recovered : {numeral(country.recovered).format("0,0")}
					</div>
					<div className="infoDeaths">
						Deaths : {numeral(country.deaths).format("0,0")}
					</div>
				</div>
			</Popup>
		</Circle>
	));
