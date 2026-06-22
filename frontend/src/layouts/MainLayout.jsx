import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default MainLayout;