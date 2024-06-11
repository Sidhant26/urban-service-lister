import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../app/features/cart/cartSlice";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import AddressForm from "./AddressForm";
import "./home.css";

function Payment(props) {
  const { isLoggedIn } = props;
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null);
  const [paymentVisible, setPaymentVisible] = useState(false); 

  const handleRemoveItem = (item) => {
    dispatch(deleteProduct(item));
  };

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData);
    setPaymentVisible(true); 
  };

  const calculateTotalAmount = () => {
    return cartList.reduce((total, item) => total + item.price * item.qty, 0);
  };
  const initPayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: calculateTotalAmount() }), 
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      console.log(data);

      const options = {
        key: "rzp_test_ugzJxtO0k8gmGI",
        amount: data.data.amount,
        currency: "INR",
        name: "Cart Payment",
        description: "Test Transaction",
        image: "YOUR_LOGO_IMAGE_URL", 
        order_id: data.data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("http://localhost:5000/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            if (!verifyResponse.ok) {
              throw new Error("Failed to verify payment");
            }

            const verifyData = await verifyResponse.json();
            console.log(verifyData);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    initPayment();
    console.log("Payment submitted successfully!");
  };

  const handleCancel = () => {
    // handleRemoveItem(...cartList);
    window.location.href = "/";
  };

  console.log(cartList[0]);
  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="7" lg="7" xl="6">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex flex-row align-items-center">
              <h4 className="text-uppercase mt-1">Eligible</h4>
              <span className="ms-2 me-3">Pay</span>
            </div>
            <button className="btn-primary" onClick={handleCancel}>
              Cancel order and return home
            </button>
          </div>
          {!address && <AddressForm onSubmit={handleAddressSubmit} />}
          {address && ( // Only render payment button if address is submitted
            <MDBBtn onClick={handlePaymentSubmit} color="primary" size="sm">
              Pay with Razorpay
            </MDBBtn>
          )}
        </MDBCol>
        <MDBCol md="5" lg="4" xl="4">
          <div className="cart-container">
            <h5>Your Cart</h5>
            {cartList.map((item) => (
              <div
                key={item.id}
                className="cart-item mb-3 p-3 shadow-sm"
              >
                <h6 className="mb-3">{item.productName}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Price: ₹{item.price}</span>
                  <span>Qty: {item.qty}</span>
                  <span>Total: ₹{item.price * item.qty}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Payment;
