import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Add more colors if you have more than four categories

const Rechart = ({data}) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            labelLine={false}
            label={({ name, value }) => `${name}: ${(value / total * 100).toFixed(2)}%`}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Rechart;
