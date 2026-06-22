import {
    useEffect,
    useState
} from "react";

import DashboardCard from "../components/DashboardCard";

import {
    getDashboard
} from "../services/employeeService";
import DepartmentOverview from "../components/DepartmentOverview";
import { getEmployees } from "../services/employeeService";
import StatusChart from "../components/StatusChart";
import PositionChart from "../components/PositionChart";

function Dashboard() {

    const [dashboardData,setDashboardData ] = useState({});
    const [employees, setEmployees] = useState([]);
    useEffect(() => {fetchDashboard(); }, []);
    const positionCounts = {};

       employees.forEach((employee) => {

            const position = employee.position.trim();

            positionCounts[position] =
                (positionCounts[position] || 0) + 1;

        });

        const positionChartData = Object.keys(positionCounts).map(
            (position) => ({
                position,
                count: positionCounts[position]
            })
        );
        console.log(positionChartData);
    const fetchDashboard = async () => {

        try {

            const response =await getDashboard();
            setDashboardData( response.data);

            const employeeResponse = await getEmployees();
            setEmployees(employeeResponse.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (
        <div
                className="
                bg-gradient-to-r
                from-white-600
                to-violet-600
                rounded-3xl
                p-8
                shadow-2xl
                mb-10
                "
            >

                <h1 className="text-4xl font-bold text-white">

                    Welcome Back 👋

                </h1>

                <p className="text-indigo-100 mt-3">

                    Manage your workforce efficiently and monitor organization growth.

                </p>



        <div>

            <h1
                className="
                text-4xl
                font-bold
                text-white
                mb-8
                "
            >

                Dashboard

            </h1>

            <div
                className="
                grid
                md:grid-cols-2
                lg:grid-cols-5
                gap-6
                "
            >
            
                <DashboardCard
                    title="Total Employees"
                    value={
                        dashboardData.total_employees
                    }
                />

                <DashboardCard
                    title="Total Positions"
                    value={
                        dashboardData.total_positions
                    }
                />

                <DashboardCard
                    title="Active Employees"
                    value={
                        dashboardData.active_employees
                    }
                />

                <DashboardCard
                    title="On Leave"
                    value={
                        dashboardData.on_leave_employees
                    }
                />

                <DashboardCard
                    title="Resigned"
                    value={
                        dashboardData.resigned_employees
                    }
                />
            

            </div>
                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <DepartmentOverview
                    employees={employees}
                />

                <StatusChart
                    dashboardData={dashboardData}
                />

            </div>
            <div className="mt-10 w-full">

                <PositionChart
                    positionChartData={positionChartData}
                />



            </div>
        </div>
    </div>
    );
}

export default Dashboard;