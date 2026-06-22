function Pagination({
    currentPage,
    totalPages,
    setCurrentPage
}) {

    return (
    <div className="flex items-center justify-center gap-4 mt-8">

        <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="
            px-5 py-2
            rounded-2xl
            bg-gradient-to-r from-indigo-600 to-violet-600
            text-white
            font-medium
            shadow-lg
            hover:scale-105
            transition
            disabled:opacity-50
            disabled:hover:scale-100
            "
        >
            Previous
        </button>

        <span
            className="
            px-4 py-2
            rounded-xl
            bg-indigo-600
            text-white
            font-medium
            "
        >
            Page {currentPage} of {totalPages}
        </span>

        <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
                px-5 py-2
                rounded-2xl
                bg-gradient-to-r from-indigo-600 to-violet-600
                text-white
                font-medium
                shadow-lg
                hover:scale-105
                transition
                disabled:opacity-50
                disabled:hover:scale-100
                "
        >
            Next
        </button>

    </div>
);

}

export default Pagination;