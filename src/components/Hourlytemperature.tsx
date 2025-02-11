import type { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";


interface HourlyTemperatureProps {
    data: ForecastData
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }))

    console.log(data)
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Hourly Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={({active, payload})=>{
                                if(active && payload && payload.length){
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div>
                                                <span>Tempertature</span>
                                                <span>{payload[0].value}</span>
                                            </div>
                                            <div>
                                                <span>Feels Like</span>
                                                <span>{payload[1].value}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            }} />
                            <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="feels_like" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default HourlyTemperature;