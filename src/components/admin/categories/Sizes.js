import {useState} from "react";

const Sizes = () => {
    const [size, setSize] = useState('');

    const handleChange = ({target}) => {
        setSize(target.value)
    }

    const addSize = () => {

    }

    return(
        <>
            <h5 className="text-primary">sizes</h5>

            <div className="row">
                <div className="col-md-9">
                    <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        placeholder="Size"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-3">
                    <button
                        className="form-control btn btn-primary"
                        onClick={addSize}
                    >
                        Add size
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sizes;
