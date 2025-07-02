import moment from "moment";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const generateMonthlyData = () => {
  const currentMonth = moment().month(); // 0-indexed (0 = Jan)
  const data = [];

  for (let i = 0; i <= currentMonth; i++) {
    const monthName = moment().month(i).format("MMM"); // e.g., Jan, Feb
    data.push({
      name: monthName,
      blue: Math.floor(Math.random() * 50) + 10,
      yellow: Math.floor(Math.random() * 50) + 10,
      red: Math.floor(Math.random() * 50) + 10,
      cyan: Math.floor(Math.random() * 50) + 10,
    });
  }

  return data;
};

const data = [
  {
    name: "Q1",
    blue: 35,
    yellow: 51,
    red: 15,
    cyan: 60,
  },
  {
    name: "Q2",
    blue: 44,
    yellow: 5,
    red: 25,
    cyan: 50,
  },
  {
    name: "Q3",
    blue: 24,
    yellow: 49,
    red: 30,
    cyan: 15,
  },
  {
    name: "Q4",
    blue: 34,
    yellow: 30,
    red: 50,
    cyan: 25,
  },
];

type CustomTooltip = {
  active?: any;
  payload?: any;
  label?: any;
};
const CustomTooltip = ({ active, payload, label }: CustomTooltip) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const BarChartComponent = ({ data }: any) => {
  //   const data = generateMonthlyData();
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="shareCount" fill="#3b82f6" name="Shares Count" />
        <Bar dataKey="streamCount" fill="#22d3ee" name="Streams Count" />
        <Bar dataKey="vaultCount" fill="#f43f5e" name="Vaults Count" />
        {/* <Bar dataKey="red" fill="#f43f5e" name="Red" />
        <Bar dataKey="cyan" fill="#22d3ee" name="Cyan" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
