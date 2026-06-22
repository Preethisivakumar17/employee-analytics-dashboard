function PositionFilter({ position, setPosition }) {
    return (

        <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="
            w-full
            bg-slate-900
            border border-slate-800
            rounded-2xl
            px-6 py-4
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
        >
            <option value="">All Positions</option>

            <option value="Software Engineer">
                Software Engineer
            </option>

            <option value="Software Developer">
                Software Developer
            </option>

            <option value="System Engineer">
                System Engineer
            </option>

            <option value="UI/UX Designer">
                UI/UX Designer
            </option>

            <option value="Sr Software Tester">
                Sr Software Tester
            </option>

        </select>

    );
}

export default PositionFilter;