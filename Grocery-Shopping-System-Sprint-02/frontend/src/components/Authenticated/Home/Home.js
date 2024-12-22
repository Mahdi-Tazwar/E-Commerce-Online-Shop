import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import handleAxiosError from "../../../utils/ErrorHandler";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/product/get')
       .then(res => setProducts(res.data.product))
       .catch(handleAxiosError)
    },[])

    const addToCart = (id) => {
        axios.post(`/api/product/add-to-cart/${id}`, {quantity: 1})
        .then(res=>toast.success(res.data.message))
        .catch(handleAxiosError)
    }

    return (
        <>
            <div className="d-flex justify-content-start flex-wrap gap-4">
                {products.map(product =>(
                    <div key={product._id} className="d-flex flex-column align-items-center gap-2 border shadow" style={{width: "200px", height: "350px",padding: "20px", borderRadius: "10px"}}>
                        <img src={product.imageUrl} alt="Product" style={{width: "150px", height: "150px"}} />
                        <div style={{width: "100%",height: "5vh", whiteSpace: "nowrap", textAlign: "center" }}>
                            <h6 style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{product.name}</h6>
                        </div>
                        <p>{product.price} TK</p>
                        <p>{product.quantity} </p>
                        <button className="btn btn-success w-100" onClick={() => addToCart(product._id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;