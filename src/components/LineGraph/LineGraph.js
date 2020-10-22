import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./LineGraph.css";
import numeral from "numeral";

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tootltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				tick: {
					callbacks: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			},
		],
	},
};

const LineGraph = ({ casesType = "cases", ...props }) => {
	const [data, setData] = useState({});

	const buildChartData = (data, casesType) => {
		let chartData = [];
		let lastDataPoint;

		for (let date in data.cases) {
			if (lastDataPoint) {
				let newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				};
				chartData.push(newDataPoint);
			}

			lastDataPoint = data[casesType][date];
		}

		return chartData;
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
				.then((res) => res.json())
				.then((data) => {
					const chartData = buildChartData(data, casesType);
					setData(chartData);
				});
		};

		fetchData();
	}, [casesType]);
	return (
		<div className={props.className}>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								backgroundColor: "rgbs (204,16,52,0.5)",
								borderColor: "#CC1034",
								data,
							},
						],
					}}
					options={options}
				/>
			)}{" "}
		</div>
	);
};

export default LineGraph;