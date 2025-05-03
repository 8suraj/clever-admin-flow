
import React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

interface AreaChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
}

export const AreaChart = ({
  data,
  index,
  categories,
  colors = ["#5046e5"],
  className,
}: AreaChartProps) => {
  return (
    <ChartContainer config={{}} className={className}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => `${label}`} />} />
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors[i % colors.length]}
            stroke={colors[i % colors.length]}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};
