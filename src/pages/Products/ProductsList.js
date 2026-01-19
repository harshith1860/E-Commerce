import { useState, useEffect } from "react";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
// import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

export const ProductsList = () => {
  useTitle("Explore eBooks Collection");

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  // There are two ways to get query parameters from the URL:

  // 1️⃣ Using useLocation (manual parsing):
  // const search = useLocation().search;
  // const searchTerm = new URLSearchParams(search).get("q");

  // 2️⃣ Using useSearchParams (recommended in React Router v6):
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:8000/products");
      const data = await response.json();
      // Performing FRONTEND search because backend JSON Server search filters
      // (q / _like) are not working in the current setup.
      // If backend search is supported, the preferred approach is to fetch
      // filtered data directly from the API, for example:
      // http://localhost:8000/products?name_like=${searchTerm || ""}
      const filteredProducts = searchTerm
        ? data.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data; // if searchTerm is empty, return all products

      setProducts(filteredProducts);
    }

    fetchProducts();
  }, [searchTerm]);


  return (
    <main>
        <section className="my-5">
          <div className="my-5 flex justify-between">
            <span className="text-2xl font-semibold dark:text-slate-100 mb-5">All eBooks ({products.length})</span>
            <span>
              <button onClick={() => setShow(!show)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button"> 
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
              </button>
            </span>            
          </div>    

          <div className="flex flex-wrap justify-center lg:flex-row">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>  
        </section>
        {show && <FilterBar setShow={setShow} /> }
      </main> 
  )
}
