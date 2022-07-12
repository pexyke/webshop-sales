import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/rating/rating";
import { useSelector, useDispatch } from "react-redux";
import MessageBox from "../components/boxes/MessageBox";
import LoadingBox from "../components/boxes/LoadingBox";
import { detailProduct } from "../redux/action/productAction";

function ProductDetailScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailProduct(productId));
  }, [dispatch, productId]);

  const handleToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <div className="top">
        <h2>{product?.name} részletei</h2>
        <p>
          <Link to="/">Főoldal</Link> - <span>Részletek</span>
        </p>
      </div>

      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="sections">
            <div className="boxesrr row">
              <div className="col-lg-6 col-md-6">
                <div className="exzoom">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                  <h1>{product.name}</h1>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <div className="product__details__price">
                    {product.price} Ft
                  </div>
                  <p>{product.description}</p>

                  {product.countInstock > 0 && (
                    <>
                      <div className="product__details__quantity">
                        <div className="quantity">
                          <select
                            className="pro-qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInstock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <button onClick={handleToCart} className="primary-btn">
                        KOSÁRBA
                      </button>
                      {/* <span className="heart-icon">
                        <i className="far fa-heart"></i>
                      </span> */}
                    </>
                  )}

                  <ul>
                    <li>
                      <b>Elérhetőség</b>
                      {product.countInstock > 0 ? (
                        <span>Raktáron</span>
                      ) : (
                        <span>Nem elérhető</span>
                      )}
                    </li>
                    <li>
                      <b>Szállítás</b>{" "}
                      <span>
                        1 napon belül.
                      </span>
                    </li>
                    <li>
                      <b>Súly</b> <span>0.5 kg</span>
                    </li>
                    <li>
                      <b>Megosztás</b>
                      <div className="share">
                        <Link to="">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="">
                          <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="">
                          <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="">
                          <i className="fab fa-pinterest"></i>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetailScreen;
