"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";



export default function ProductForm() {
  const [name, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [filename, setfilename] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);



  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const mime = file.type.split("/")[1]; //extract that .png
      console.log(mime, file);

      // this req generate a presigned url for upload a image on aws validate for 10 min we only send extenstion of file like .png

      const res = await fetch("http://localhost:3200/get-presigned-url", {
        method: "POST",
        headers: {
          "content-type": "application/json",

        },
        body: JSON.stringify({
          mime
        })
      })

      if (!res.ok) {
        console.log("fuck");
        return
      }
      const data = await res.json()

      setfilename(data.finalname)



      // this will upload our image to s3 with the help of that url (aws bucket url)

      const ress = await fetch(data.url, {
        method: 'PUT',
        headers: {
          "content-type": file.type || 'application/octet-stream',
        },
        body: file,

      })

      if (!ress.ok) {
        console.log("fuck");
        return
      }

      

    } else {
      setImagePreview(null);
    }
  };



  // this req send a that filename(path we upload in S3) and some info about product to db

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {

      const response = await fetch('http://localhost:3200/api/products',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name,
            description,
            price,
            filename
          })
        });


      const data = await response.json();
      console.log(data);

      console.log({ name, description, price, filename });
      alert("Product submitted (demo). Connect this to your API to save.");


    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="max-w-xl m-20 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setProductName(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 
         
            `}
            placeholder="e.g. Classic Wooden Chair"
            required
          />

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 
           `}
            placeholder="Short description of the product"
            required
          />

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-sm">Upload image</span>
            </label>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ) : (
              <div className="w-20 h-20 rounded-md bg-gray-50 border flex items-center justify-center text-xs text-gray-400">
                Preview
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (USD)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 
            `}
            placeholder="0.00"
            required
          />

        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"

            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
