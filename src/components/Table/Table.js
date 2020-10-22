import React from "react";
import numeral from "numeral";
import "./Table.css";

const Table = ({ countries }) => {
	return (
		<div className="table">
			<tr>
				<td>
					<strong>Country Name</strong>
				</td>
				<td>
					<strong>Total Cases</strong>
				</td>
				<td>
					<strong>Deaths</strong>
				</td>
				<td>
					<strong>Recovered</strong>
				</td>
			</tr>
			{countries.map(({ country, cases, deaths, recovered }) => (
				<tr>
					<td>{country}</td>
					<td>
						<strong>{numeral(cases).format("0,0")}</strong>
					</td>
					<td>
						<strong>{numeral(deaths).format("0,0")}</strong>
					</td>
					<td>
						<strong>{numeral(recovered).format("0,0")}</strong>
					</td>
				</tr>
			))}
		</div>
	);
};

export default Table;
