"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart showing education levels in Indonesia"

const chartData = [
    { education: "SD", count: 100, fill: "#E74C3C" }, // Red
    { education: "SMP", count: 200, fill: "#F39C12" }, // Orange
    { education: "SMA/SMK", count: 250, fill: "#F1C40F" }, // Yellow
    { education: "Diploma", count: 100, fill: "#2ECC71" }, // Green
    { education: "Sarjana", count: 300, fill: "#3498DB" }, // Blue
    { education: "Pasca Sarjana", count: 80, fill: "#9B59B6" }, // Purple
]

const chartConfig = {
    education: {
        label: "Education Level",
    },
    sd: {
        label: "SD",
        color: "#FFB3BA",
    },
    smp: {
        label: "SMP",
        color: "hsl(var(--chart-3))",
    },
    sma: {
        label: "SMA/SMK",
        color: "hsl(var(--chart-4))",
    },
    diploma: {
        label: "Diploma",
        color: "hsl(var(--chart-5))",
    },
    sarjana: {
        label: "Sarjana",
        color: "hsl(var(--chart-6))",
    },
    pascaSarjana: {
        label: "Pasca Sarjana",
        color: "hsl(var(--chart-7))",
    },
} satisfies ChartConfig

export function PendidikanChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                {/* <CardDescription>Pendidikan di Indonesia - 2024</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel className="bg-white" />} />
                        <Pie data={chartData} dataKey="count" label nameKey="education" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
