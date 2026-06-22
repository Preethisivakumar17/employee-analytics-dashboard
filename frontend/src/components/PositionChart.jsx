import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList
} from "recharts";

function PositionChart({ positionChartData }) {

    console.log(positionChartData);

    return (

        <div
            className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-8
            shadow-xl
            "
        >

            <h2 className="text-2xl font-bold text-white mb-8">

                Employee Position Distribution

            </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

                <BarChart data={positionChartData}>

                        <CartesianGrid stroke="#1e293b" />

                        <XAxis
                           dataKey="position"
                            stroke="#94a3b8"
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                            height={100}
                        />

                        <YAxis stroke="#94a3b8" />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#8B5CF6"
                            radius={[10, 10, 0, 0]}>
                        
                            <LabelList
                                dataKey="count"
                                position="top"
                                fill="#ffffff"
                            />
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default PositionChart;