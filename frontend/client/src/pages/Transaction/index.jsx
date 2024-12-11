
import React from 'react';
import NavbarWithAuth from "../../components/NavbarWithAuth/NavbarWithAuth";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import '../../style/Transaction.css';

const OrderItem = ({ image, title, quantity, price, status, link }) => (
  <div className="order-item">
    <img src={image} alt={title} className="order-image" />
    <div className="order-details">
      <h4>{title}</h4>
      <p>Quantity: {quantity}</p>
      <p>Price: {price}</p>
      <p>Status: {status}</p>
    </div>
    <a href={link} className="details-link">View Details</a>
  </div>
);


const Transaction = () => {
  return (
    <>
      <NavbarWithAuth />  {/* Use Navbar component */}
    

      <Dropdown />  {/* Use Dropdown component */}

      <h1 className="isi">Transaction</h1>

      <main>
        <section className="transaction">
          <h3>Order & Status</h3>
          <div className="filter">
            <p>Filter</p>
            <button className="filter-icon">
              <img src="/images/img/filter.png" alt="Filter Icon" />
            </button>
          </div>
          <div className="order-status">
            <OrderItem 
              image="/images/img/BLIK MEMBERSHIP.png" 
              title="BLINK MEMBERSHIP [MEMBERSHIP CARD]" 
              quantity="1" 
              price="350.000" 
              status="Packed" 
              link="/DetailsItem" 
            />
            <OrderItem 
              image="/images/img/lalisa_album.png" 
              title="LISA -LALISA- PHOTOBOOK [SPECIAL EDITION]" 
              quantity="1" 
              price="615.000" 
              status="Shipping" 
              link="/DetailsItem" 
            />
            <OrderItem 
              image="/images/img/jisso_album.png" 
              title="JISOO FIRST SINGLE ALBUM [ME] KIT ALBUM" 
              quantity="1" 
              price="270.000" 
              status="Cancelled" 
              link="/DetailsItems" 
            />
            <OrderItem 
              image="/images/img/bp_album.png" 
              title="BLACKPINK 2nd ALBUM [BORN PINK] DIGIPACK ver. SET" 
              quantity="1" 
              price="645.000" 
              status="Complete" 
              link="/DetailsItems" 
            />
          </div>
        </section>
      </main>

      <Footer />  {/* Use Footer component */}
    </>
  );
};

export default Transaction;