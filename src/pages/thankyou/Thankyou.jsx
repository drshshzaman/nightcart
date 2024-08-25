/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const Thankyou = () => {
  return (
    <Layout>
      <div className="container h-[81vh] flex items-center justify-center relative">
        <div className="container-wrapper">
          <div className="text-center absolute top-52 left-[38rem]">
            <h1 className="text-2xl xl:text-5xl font-bold mb-10">
              Thank you for your order 🎊
            </h1>
            <p className="text-gray-500 text-lg mb-7">
              Your order is successfully placed.
            </p>
            <Link
              to="/"
              className="text-sm border-gray-500 border-2 p-3 bg-gray-500 text-white"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Thankyou;
