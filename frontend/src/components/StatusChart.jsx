import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StatusChart({ dashboardData }) {

    const data = [

        {
            name: "Active",
            value: dashboardData.active_employees
        },

        {
            name: "On Leave",
            value: dashboardData.on_leave_employees
        },

        {
            name: "Resigned",
            value: dashboardData.resigned_employees
        }

    ];

    const COLORS = [

        "#10B981",
        "#F59E0B",
        "#EF4444"

    ];

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

            <h2 className="text-2xl font-bold text-white mb-6">

                Employee Status

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >

                            {

                                data.map(

                                    (_, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default StatusChart;