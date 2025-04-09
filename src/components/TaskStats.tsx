import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Task } from "../types";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const data = [
    { name: "To Do", count: tasks.filter((t) => t.status === "todo").length },
    {
      name: "In Progress",
      count: tasks.filter((t) => t.status === "inProgress").length,
    },
    { name: "Done", count: tasks.filter((t) => t.status === "done").length },
  ];

  return (
    <div className="chart-container rounded-lg p-4 glow">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">
        Task Statistics
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "rgba(30, 41, 59, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey="count" fill="url(#colorGradient)" />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStats;
