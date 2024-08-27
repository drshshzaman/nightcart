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

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      const productData = productTemp.data();

      // Add some fake small images for testing
      const fakeSmallImages = [
        "https://via.placeholder.com/100x100.png?text=Image+1",
        "https://via.placeholder.com/100x100.png?text=Image+2",
        "https://via.placeholder.com/100x100.png?text=Image+3",
      ];

      setProducts({
        ...productData,
        additionalImages: fakeSmallImages,
      });

      setSelectedImage(productData.imageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (products) => {
    dispatch(addToCart(products));
    toast.success("add to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full">
                <img
                  alt="ecommerce"
                  className="w-full h-auto object-cover object-center rounded"
                  src={selectedImage}
                />
                <div className="flex justify-between mt-4">
                  {products.additionalImages &&
                    products.additionalImages.map((image, index) => (
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
                  SkinSugar
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {products.title}
                </h1>
                <div className="flex mb-4">
                  {/* Existing stars and reviews section */}
                </div>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {products.description}
                </p>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
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
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
