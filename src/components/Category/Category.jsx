/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categories }) => {
  return (
    <div className="container mx-auto px-5 md:py-5 mb-10">
      <div className="flex flex-wrap -m-4 text-center">
        <div className="p-4 md:w-full w-full">
          <div className="heading flex flex-col items-start mb-14">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Our Categories
            </h1>
            <div className="h-1 w-20 bg-green-600 rounded"></div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-10">
            {categories.map((category) => (
              <Link
                className="category-box"
                key={category.id}
                to={`/category/${category.id}`}
              >
                <div className="w-40 h-40 flex flex-col justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden relative hover:scale-110 transition-scale-110  duration-300 ease-in-out">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="overlay bg-black bg-opacity-50 inset-0 flex items-center justify-center absolute">
                    <h2 className="text-white text-lg font-semibold">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
