/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const [userId, setUserId] = useState(null); // State to handle user ID
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.user.uid); // Set the logged-in user's ID
    } else {
      setUserId("guest"); // Set as guest if not logged in
    }
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter((obj) => obj.userid === userId || obj.userid === "guest") // Show orders for both logged-in users and guests
            .map((order) => {
              return (
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                  {order.cartItems.map((item) => {
                    return (
                      <div className="rounded-lg md:w-2/3">
                        <div
                          className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                          style={{
                            backgroundColor: mode === "dark" ? "#282c34" : "",
                            color: mode === "dark" ? "white" : "",
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt="product-image"
                            className="w-full rounded-lg sm:w-40"
                          />
                          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                              <h2
                                className="text-lg font-bold text-gray-900"
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {item.title}
                              </h2>
                              <p
                                className="mt-1 text-xs text-gray-700 line-clamp-3"
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {item.description}
                              </p>
                              <p
                                className="text-lg font-bold mt-4 text-gray-700 "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                PKR {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
