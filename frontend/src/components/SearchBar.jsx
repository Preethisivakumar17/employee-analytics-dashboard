function SearchBar({ searchTerm, setSearchTerm }) {

    <div className=" flex flex-wrap gap-4 mb-8 ">

    {/* search input */}

    {/* department dropdown */}

    {/* position search */}

    </div>

    return (

        <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
            w-full
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            px-6
            py-4
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
        />

    );

}

export default SearchBar;