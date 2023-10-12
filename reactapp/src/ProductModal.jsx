/* eslint-disable react/prop-types */

export function ProductModal({ modalData, closeModal }) {

    if (!modalData.isOpen) return;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={closeModal}>&times;</span>
                <h2 className="modal-title">{modalData.title}</h2>
                <form onSubmit={(event) => { modalData.onSubmit(event, modalData.productData.id) }}>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={modalData.productData.name}
                            maxLength="100"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            defaultValue={modalData.productData.description}
                            maxLength="500"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={modalData.productData.price}
                            step="0.01"
                            min="0.1"
                            max="1000000"
                            required
                        />
                    </div>
                    <button type="submit">{modalData.buttonText}</button>
                </form>
            </div>
        </div>
    );
}
