import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Departments from "./pages/Departments";
import Reports from "./pages/Reports";

function App() {
    return (
        <BrowserRouter>

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/employees"
                            element={<Employees />}
                        />

                        <Route
                            path="/add-employee"
                            element={<AddEmployee />}
                        />
                        <Route
                            path="/departments"
                            element={<Departments />}
                        />
                        <Route
                            path="/reports"
                            element={<Reports />}
                        />

                    </Routes>

                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;