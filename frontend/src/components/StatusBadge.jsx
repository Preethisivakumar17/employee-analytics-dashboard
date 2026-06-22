function StatusBadge({ status }) {

    let color = "";

    if (status === "Active")
        color = "bg-emerald-500/20 text-emerald-400";

    else if (status === "On Leave")
        color = "bg-yellow-500/20 text-yellow-400";

    else
        color = "bg-red-500/20 text-red-400";

    return (

        <span
            className={`
            px-3 py-1
            rounded-full
            text-sm
            font-medium
            ${color}
            `}
        >
            {status}
        </span>

    );

}

export default StatusBadge;