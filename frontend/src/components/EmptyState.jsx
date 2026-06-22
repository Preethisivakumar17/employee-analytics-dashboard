import { Users } from "lucide-react";

function EmptyState() {

    return (

        <div
            className="
            flex flex-col
            items-center
            justify-center
            py-20
            text-slate-400
            "
        >

            <Users size={70} />

            <h2 className="mt-4 text-xl">

                No Employees Found

            </h2>

        </div>

    );

}

export default EmptyState;