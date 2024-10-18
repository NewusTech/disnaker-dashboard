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

export const description = "A pie chart showing job sectors in Indonesia"

const chartData = [
    { sector: "Pendidikan", count: 150, fill: "#E74C3C" }, // Red
    { sector: "Kesehatan", count: 300, fill: "#F39C12" }, // Orange
    { sector: "Teknologi Informasi", count: 200, fill: "#F1C40F" }, // Yellow
    { sector: "Perdagangan", count: 100, fill: "#2ECC71" }, // Green
    { sector: "Pertanian", count: 80, fill: "#3498DB" }, // Blue
    { sector: "Transportasi", count: 50, fill: "#9B59B6" }, // Purple
]

const chartConfig = {
    sector: {
        label: "Job Sector",
    },
    education: {
        label: "Pendidikan",
        color: "#FFB3BA",
    },
    health: {
        label: "Kesehatan",
        color: "hsl(var(--chart-3))",
    },
    it: {
        label: "Teknologi Informasi",
        color: "hsl(var(--chart-4))",
    },
    trade: {
        label: "Perdagangan",
        color: "hsl(var(--chart-5))",
    },
    agriculture: {
        label: "Pertanian",
        color: "hsl(var(--chart-6))",
    },
    transportation: {
        label: "Transportasi",
        color: "hsl(var(--chart-7))",
    },
} satisfies ChartConfig

export function PosisiChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                {/* <CardDescription>Sektor Pekerjaan di Indonesia - 2024</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel className="bg-white" />} />
                        <Pie data={chartData} dataKey="count" label nameKey="sector" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
