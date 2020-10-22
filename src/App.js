import { Card, CardContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { prettyPrintStat, sortData } from "./utils";
import LineGraph from "./components/LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({
		lat: 34.80746,
		lng: -40.4796,
	});
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	const getCountriesData = async () => {
		fetch("https://disease.sh/v3/covid-19/countries")
			.then((res) => res.json())
			.then((data) => {
				const countries = data.map((country) => ({
					name: country.country,
					value: country.countryInfo.iso3,
				}));
				const sortedCountries = sortData(data);
				setTableData(sortedCountries);
				setMapCountries(data);
				setCountries(countries);
			});
	};

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;

		const url =
			countryCode === "Worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);

				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((res) => res.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);
	useEffect(() => {
		getCountriesData();
	}, []);

	return (
		<div className="app">
			<div className="app_left">
				<div className="app_header">
					<h1>Covid-19 Tracker</h1>
					<FormControl className="app_dropdown">
						<Select
							variant="outlined"
							onChange={onCountryChange}
							value={country}
						>
							<MenuItem value="Worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app_stats">
					<InfoBox
						isRed
						active={casesType === "cases"}
						onClick={(e) => setCasesType("cases")}
						title="Corona-Virus Cases"
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={prettyPrintStat(countryInfo.cases)}
					/>
					<InfoBox
						active={casesType === "recovered"}
						onClick={(e) => setCasesType("recovered")}
						title="Recoverd"
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={prettyPrintStat(countryInfo.recovered)}
					/>
					<InfoBox
						isRed
						active={casesType === "deaths"}
						onClick={(e) => setCasesType("deaths")}
						title="Deaths"
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={prettyPrintStat(countryInfo.deaths)}
					/>
				</div>
				<Map
					caseType={casesType}
					countries={mapCountries}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>

			<Card className="app_right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3 className="app_graphTitle">Worldwide new {casesType}</h3>
					<LineGraph className="app_graph" casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
