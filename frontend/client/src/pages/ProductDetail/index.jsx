import React, { useEffect, useState } from "react";
import NavbarWithAuth from "../../components/NavbarWithAuth/NavbarWithAuth";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import "../../style/ProductDetail.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const fetchProduct = async () => {
    try {
      const product = await axiosInstance.get(`/products/${id}`);
      setProduct(product.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();

    try {
      const checkouts = await axiosInstance.post("/checkout", {
        userId: parseInt(localStorage.getItem("userId")),
        productId: product.id,
        quantity: quantity,
      });
      alert(checkouts.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * product.price);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice((quantity + 1) * product.price);
  };

  return (
    <>
      <NavbarWithAuth /> {/* Add Navbar here */}
      <Dropdown /> {/* Add Dropdown here */}
      {product && product.artist ? (
        <div className="product-container">
          <div className="product-image">
            <img
              src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${
                product.image
              }`}
              alt="BLINK Membership Card"
            />
          </div>
          <main>
            <div className="product-details">
              <h4>{product.artist.name}</h4>
              <h3>{product.name}</h3>
              <p className="price">Rp.{product.price}</p>
              <p className="status">For Pre-Order</p>
              <p className="shipping-date">{product.description}</p>

              <div className="points">
                <span>{product.point} points</span>
                <div className="quantity">
                  <button onClick={decreaseQuantity}>-</button>
                  <input type="text" id="quantityInput" value="1" readOnly />
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </div>

              <p className="total" id="total">
                Total ({quantity} Item{quantity > 1 ? "s" : ""}) Rp.
                {totalPrice || product.price}
              </p>
              <div className="buttons">
                <button className="add-to-cart" onClick={addToCart}>
                  Add To Cart
                </button>
                <button className="buy-now">Buy Now</button>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div>product not avaliable</div>
      )}
      <section className="information">
        <h3>Information</h3>
        <table>
          <tr>
            <td>Product Name</td>
            <td>{product && product.name}</td>
          </tr>
          <tr>
            <td>Producer or supplier</td>
            <td>YG ENTERTAINMENT Inc.</td>
          </tr>
          <tr>
            <td>Terms and recommended usage period</td>
            <td>
              You must use the identical account for YGConnect and YGConnect
              Shop to receive Membership benefits.
            </td>
          </tr>
          <tr>
            <td>Product delivery method</td>
            <td>Membership</td>
          </tr>
          <tr>
            <td>Minimum system requirements or required software</td>
            <td>Not Applicable</td>
          </tr>
          <tr>
            <td>
              Effects of subscription withdrawal, or contract cancellation or
              termination
            </td>
            <td>
              If you cancel/refund the payment for your Membership, you will no
              longer be able to take advantage of Membership benefits.
            </td>
          </tr>
          <tr>
            <td>Telephone number for consumer consultation</td>
            <td>Customer Center: (+62)21-3452-1312</td>
          </tr>
        </table>
      </section>
      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default ProductDetail;
