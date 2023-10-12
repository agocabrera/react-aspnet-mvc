import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";

export function App() {
    const [products, setProducts] = useState([]);
    const [fetchingProducts, setFetchingProducts] = useState(true);
    const [fetchCounter, setFetchCounter] = useState(0); // Modifying fetchCounter will fetch the products list again.
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://localhost:7187/api/products");
                if (!response.ok) throw new Error("Failed to GET products.");
                const result = await response.json();
                setProducts(result);
                setFetchingProducts(false);

            } catch (err) {
                console.error(err);
                setFetchingProducts(false);
            }
        }

        fetchProducts();
    }, [fetchCounter]);

    async function addProduct(event) {
        event.preventDefault();

        const eventData = {
            name: event.target.name.value,
            description: event.target.description.value,
            price: event.target.price.value
        }

        try {
            const response = await fetch("https://localhost:7187/api/products", {
                method: "POST",
                body: JSON.stringify(eventData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to POST product.");
            setFetchCounter((prev) => prev + 1);
            closeModal();

        } catch (err) {
            console.error(err);
        }
    }

    async function modifyProduct(event, id) {
        event.preventDefault();

        const eventData = {
            name: event.target.name.value,
            description: event.target.description.value,
            price: event.target.price.value
        }

        try {
            const response = await fetch("https://localhost:7187/api/products/" + id.toString(), {
                method: "PUT",
                body: JSON.stringify(eventData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to PUT product.");
            setFetchCounter((prev) => prev + 1);
            closeModal();

        } catch (err) {
            console.error(err);
        }
    }

    async function deleteProduct(id) {
        try {
            const response = await fetch("https://localhost:7187/api/products/" + id.toString(), { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to DELETE product.");
            setFetchCounter((prev) => prev + 1);

        } catch (err) {
            console.error(err);
        }
    }

    function closeModal() {
        setModalData((prev) => {
            return { ...prev, isOpen: false }
        });
    }

    return (
        <>
            <div className="products-heading">
                <h1>Products</h1>
                <button
                    title="Add a product"
                    className="new-product"
                    onClick={() => setModalData({
                        onSubmit: addProduct,
                        title: "Add a new product",
                        buttonText: "Add",
                        isOpen: true,
                        productData: {
                            id: undefined,
                            name: "",
                            description: "",
                            price: ""
                        }
                    })} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                </button>
            </div>

            <ProductModal modalData={modalData} closeModal={closeModal} />

            {
                fetchingProducts ? <p>Fetching products...</p> :
                    (
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th className="id">ID</th>
                                    <th className="name">Name</th>
                                    <th className="description">Description</th>
                                    <th className="price">Price</th>
                                    <th className="controls"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    return (
                                        <tr key={product.id}>
                                            <td className="id">{product.id}</td>
                                            <td className="name">{product.name}</td>
                                            <td className="description">{product.description}</td>
                                            <td className="price">{product.price}</td>
                                            <td className="controls">
                                                <button
                                                    className="edit"
                                                    title="Edit product"
                                                    onClick={() => setModalData({
                                                        onSubmit: modifyProduct,
                                                        title: "Modify a product",
                                                        buttonText: "Modify",
                                                        isOpen: true,
                                                        productData: {
                                                            id: product.id,
                                                            name: product.name,
                                                            description: product.description,
                                                            price: product.price
                                                        }
                                                    })}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                        <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z" />
                                                    </svg>
                                                </button>
                                                <button className="delete" title="Delete product" onClick={() => deleteProduct(product.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" alt="Delete icon." />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )
            }
        </>
    )
}
