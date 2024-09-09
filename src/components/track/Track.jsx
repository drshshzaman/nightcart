/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

function Track() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div>
      <section>
        <div className=" container mx-auto px-5 md:py-5">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <IoShieldCheckmark className="text-green-600 w-12 h-12 mb-3 inline-block" />

                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Quality Products
                </h2>
                <p className="leading-relaxed">
                  We deliver top-tier skincare products you can trust.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <FaTruckFast className="text-green-600 w-12 h-12 mb-3 inline-block" />

                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Fast & Reliable Delivery
                </h2>
                <p className="leading-relaxed">
                  Get your favorite skincare essentials delivered quickly to
                  your doorstep.
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <FaDollarSign className="text-green-600 w-12 h-12 mb-3 inline-block" />

                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Affordable Prices
                </h2>
                <p className="leading-relaxed">
                  Luxury skincare that doesn’t break the bank.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Track;
