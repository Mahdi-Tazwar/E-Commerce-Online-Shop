import { useState } from "react";
import { toast } from "react-hot-toast";
import Cart from "../Cart/Cart";

const Checkout = () => {

    const [summary, setSummary] = useState(false);
    const [formValues, setFormValues] = useState({
        shippingAddress: "",
        contactNumber: "",
        email: "",
    })
    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value });
    }
    const toggleSummary = () => {
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);
        if (hasError) {
            toast.error("Please fill all the required fields");
            return;
        }
        setSummary(!summary);
    }
    return (
        <>
            {!summary &&<>
                <h2>Shipping Info</h2>
                <textarea placeholder="Shipping Address" type="text" name="shippingAddress" className="form-control mb-2" onChange={handleChange} />
                <input placeholder="Contact Number" type="text" name="contactNumber" className="form-control mb-2" onChange={handleChange} />
                <input placeholder="Email" type="email" name="email" className="form-control mb-2" onChange={handleChange} />
                <button className="btn btn-primary" onClick={toggleSummary}>Procceed</button>
            </>}
            {summary && <>
                <h2>Order Summary</h2>
                <h6>Shipping Address</h6>
                <p>{formValues.shippingAddress}</p>
                <h6>Contact Number</h6>
                <p>{formValues.contactNumber}</p>
                <h6>Email</h6>
                <p>{formValues.email}</p>
                <Cart final={true} formValues={formValues} />
            </>}
        </>
    )
}

export default Checkout;