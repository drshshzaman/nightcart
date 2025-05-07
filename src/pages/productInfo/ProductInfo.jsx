/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const { mode } = context;

  const [products, setProducts] = useState(null); // Initial state is null
  const [selectedImage, setSelectedImage] = useState("");

  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      const productData = productTemp.data();

      if (!productData) {
        throw new Error("Product not found");
      }

      setProducts(productData);
      setSelectedImage(productData.imageUrls && productData.imageUrls[0]); // Set initial image if available
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load product data");
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.id]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove the 'categoryId' from the description
  const cleanDescription = products?.description
    ? products.description.replace(/category\d+/i, "")
    : "";

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products ? (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full">
                <img
                  alt="ecommerce"
                  className="w-full h-auto object-cover object-center rounded"
                  src={selectedImage}
                />
                <div className="flex justify-between mt-4">
                  {products.imageUrls &&
                    products.imageUrls.map((image, index) => (
                      <img
                        key={index}
                        alt={`small-image-${index}`}
                        className="w-1/4 h-auto object-cover object-center cursor-pointer"
                        src={image}
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Night Cart
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {products.title}
                </h1>
                <div className="flex mb-4">
                  {/* Existing stars and reviews section */}
                </div>
                <p
                  className="leading-relaxed border-b-2 mb-5 pb-5"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {cleanDescription}
                </p>
                <div className="flex">
                  <span
                    className="title-font font-medium text-2xl text-gray-900"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    PKR {products.price}
                  </span>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center flex items-center justify-center text-gray-500">
              <Loader />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
