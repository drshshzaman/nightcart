/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import myContext from "../../../context/data/myContext";
import { storage, fireDB } from "../../../fireabase/FirebaseConfig";

function AddProduct() {
  const context = useContext(myContext);
  const { products, setProducts, setLoading } = context;
  const [imageUploading, setImageUploading] = useState(false); // New state for image uploading status
  const [imageFiles, setImageFiles] = useState([]); // To store selected image files

  // Handle multiple image uploads
  const uploadImages = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      toast.error("Please select images to upload.");
      return;
    }

    setImageUploading(true); // Show loading state during upload
    const uploadPromises = [];

    for (const file of files) {
      const storageRef = ref(storage, `products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done for ${file.name}`);
          },
          (error) => {
            console.error("Upload failed:", error);
            toast.error(`Image upload failed for ${file.name}`);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });

      uploadPromises.push(uploadPromise);
    }

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setProducts((prevState) => ({
        ...prevState,
        imageUrls: downloadURLs, // Store multiple image URLs
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setImageUploading(false); // Reset loading state
    }
  };

  // Add product to Firestore
  const addProduct = async () => {
    if (!products.title || !products.price || !products.imageUrls || !products.category || !products.description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), products);
      toast.success("Product added successfully!");

      // Reset form after successful submission
      setProducts({
        title: "",
        price: "",
        imageUrls: [], // Clear image URLs
        category: "",
        description: "",
      });
      setImageFiles([]); // Clear selected files
      setLoading(false);
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={products.title}
              onChange={(e) =>
                setProducts({ ...products, title: e.target.value })
              }
              name="title"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
              name="price"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadImages}
              name="image"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            />
          </div>
          {imageUploading && (
            <p className="text-yellow-500 mb-4">Uploading images...</p>
          )}
          <div>
            <input
              type="text"
              value={products.category}
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
              name="category"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="10"
              name="description"
              value={products.description}
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className="flex justify-center mb-3">
            <button
              onClick={addProduct}
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
              disabled={imageUploading} // Disable button if images are still uploading
            >
              {imageUploading ? "Please wait..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
