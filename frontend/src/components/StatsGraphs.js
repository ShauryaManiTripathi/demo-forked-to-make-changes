import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const reimbursementData = [
  { month: "Jan", count: 157 },
  { month: "Feb", count: 245 },
  { month: "Mar", count: 289 },
  { month: "Apr", count: 346 },
  { month: "May", count: 403 },
  { month: "Jun", count: 478 },
];

const registrationData = [
  { month: "Jan", count: 1245 },
  { month: "Feb", count: 1890 },
  { month: "Mar", count: 2347 },
  { month: "Apr", count: 2890 },
  { month: "May", count: 3456 },
  { month: "Jun", count: 4123 },
];

export function StatsGraphs() {
  return (
    <div className="flex gap-4 flex-nowrap">
      <div className="flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Successful Reimbursements</h2>
          <p className="text-sm text-gray-500">
            Number of reimbursements completed per month
          </p>
        </div>
        <div className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={reimbursementData}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Total Registrations</h2>
          <p className="text-sm text-gray-500">
            Cumulative number of user registrations
          </p>
        </div>
        <div className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={registrationData}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
