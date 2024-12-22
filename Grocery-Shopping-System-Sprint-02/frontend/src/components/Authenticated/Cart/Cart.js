import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import handleAxiosError from "../../../utils/ErrorHandler";

const Cart = ({final, formValues}) => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(()=>{
        axios.get('/api/product/get-cart').then(response=>{
            setCartItems(response.data.cart);
            setTotalPrice(response.data.totalPrice);
        }).catch(handleAxiosError);
    },[])

    const removeCartItems = (id) => {
        axios.delete('/api/product/remove-from-cart/'+id).then(response=>{
            toast.success(response.data.message);
        }).catch(handleAxiosError);
    }

    const increase = (maxQuantity, quantity, id) => {
        if(quantity+1 < maxQuantity) {
            quantity += 1;
            axios.patch('/api/product/update-cart-quantity/'+id, {quantity}).then(response=>{
                window.location.reload();
            }).catch(handleAxiosError);
        } else {
            toast.error("Quantity exceeds available stock");
        }
    }
    const decrease = (quantity, id) => {
        if(quantity-1 > 0) {
            quantity -= 1;
            axios.patch('/api/product/update-cart-quantity/'+id, {quantity}).then(response=>{
                window.location.reload();
            }).catch(handleAxiosError);
        } else {
            axios.delete('/api/product/remove-from-cart/'+id).then(response=>{
                window.location.reload();
            }).catch(handleAxiosError);
        }
    }

    const clickCheckout = () => {
        if(!final) {
            navigate("/checkout");
        } else {
            formValues.totalPrice = totalPrice;
            toast.promise(
                new Promise(async (resolve, reject) => {
                  try {
                    await new Promise((res) => setTimeout(res, 3000));
              
                    const response = await axios.post("/api/product/checkout", formValues);
              
                    resolve(response.data.message);
              
                    navigate("/home");
                  } catch (error) {
                    reject(error);
                  }
                }),
                {
                  loading: "Processing payment through gateway...",
                  success: (data) => data,
                  error: (error) => handleAxiosError(error)
                }
              );
              
        }
    }

    return (
        <>
        <table className="table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    {!final && <th></th>}
                    <th>Quantity</th>
                    {!final && <th></th>}
                    {!final && <th>Remove</th>}
                </tr>
            </thead>
            <tbody>
                {cartItems.map(item=>(
                    <tr key={item._id}>
                        <td><img src={item.product.imageUrl} alt="Product" style={{width: "50px", height: "50px"}} /></td>
                        <td>{item.product.name}</td>
                        <td>{item.product.price} TK</td>
                        {!final && <td><button className="btn btn-outline-primary" onClick={() => decrease(item.quantity, item._id)}>-</button></td>}
                        <td>{item.quantity}</td>
                        {!final && <td><button className="btn btn-outline-primary" onClick={() => increase(item.product.quantity, item.quantity, item._id)}>+</button></td>}
                        {!final && <td><button className="btn btn-outline-danger" onClick={()=>removeCartItems(item._id)}>Remove Item</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>
        {cartItems.length!==0 && <div className="d-flex justify-content-between">
            <h6>Total:</h6>
            <div className="d-flex align-items-center gap-4">
                <h6 className="m-0">{totalPrice} TK</h6>
                <button className="btn btn-warning" onClick={clickCheckout}>Checkout</button>
            </div>
        </div>}
        </>
    )
}

export default Cart;