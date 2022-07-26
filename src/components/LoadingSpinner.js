const LoadingSpinner = () => {
    return <div className="loading-spinner">
        <div className="spinner-grow text-primary" role="status" />
        <div className="spinner-grow text-secondary" role="status" />
        <div className="spinner-grow text-success" role="status" />
        <div className="spinner-grow text-danger" role="status" />
        <div className="spinner-grow text-warning" role="status" />
        <div className="spinner-grow text-info" role="status" />
        <div className="spinner-grow text-light" role="status" />
        <div className="spinner-grow text-dark" role="status" />
    </div>
}

export default LoadingSpinner;
