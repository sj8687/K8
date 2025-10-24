
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const  ProductList: React.FC<ProductListProps> = async () => {

  const res = await fetch('http://localhost:3200/api/products')

  if (!res.ok) {
    console.log("err");
    
  }

  const products = await res.json()
  console.log("products",products);
  
  return (

    <div className="m-10">
           <Link href={"/create"}><button className="bg-gray-300 p-3 rounded-2xl text-black">GO TO CREATE</button></Link> 

    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product:any) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
        >

          {/* that is cloud front url (CDN) */}
          <img
            src={`https://d27d5l8jx52wuz.cloudfront.net/${product.filename}`}
            alt={product.name}
            className="h-56 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-orange-500 font-bold text-lg mt-3">
              ₹{product.price}
            </p>
          </div>

        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
