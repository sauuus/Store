import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/products";
import { Link } from "react-router-dom";


const Product = ({ product }) => {
  const { title, price, category, image, id } = product;
  console.log(product);
  const dispatch = useDispatch();

  const deleteCurrentProduct = () => {
    dispatch(deleteProduct(id));
  };
return( 
    <>
  <div className="col pb-5">
      <div className="card">
        <img
          className="card-img-top"
          src={image}
          alt="Card img cap"
          style={{
            height: "15rem",
            width: "12rem",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title.slice(0, 20)}... - ${price}
          </h5>
          <div className="badge badge-dark text-danger">{category}</div>
          {/* <p className="card-text">{description}</p> */}
          <span className="btn btn-danger my-2" onClick={deleteCurrentProduct}>
            Delete
          </span>
         
        </div>
      </div>
    </div>


    </>
     ) 
 };

  

export default Product;
