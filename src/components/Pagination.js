import uuid from "react-uuid";

const Pagination = ({allUsersProducts, postsPerPage, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allUsersProducts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav className="d-flex justify-content-center my-5">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={uuid()} className="page-item">
                        <button
                            onClick={() => paginate(number)}
                            className="m-1 btn btn-primary"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;