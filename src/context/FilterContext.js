import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

/*
  This is the default / initial state for all filters.
  It defines how the filter system should look
  when the app loads for the first time.
*/
const filterInitialState = {
  productsList: [],        // Stores all products fetched from API
  onlyInStock: false,      // Filter: show only in-stock products
  bestSellerOnly: false,   // Filter: show only best-seller products
  sortBy: null,            // Sorting option (lowtohigh / hightolow)
  ratings: null            // Rating filter (1 star, 2 star, etc.)
};

// Create a Context to share filter state across the app
export const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {

  /*
    useReducer is used instead of useState because:
    - We have multiple related filter values
    - State changes depend on actions (toggle, sort, filter)
    - Reducer keeps logic centralized and predictable
  */
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  /*
    This function is called once when products are fetched.
    It stores the full product list in the global filter state.
  */
  function initialProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products
      }
    });
  }

  /*
    Filter 1: Best Seller
    If "Best Seller Only" is enabled, return only best-seller products.
    Otherwise, return all products.
  */
  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter(product => product.best_seller === true)
      : products;
  }

  /*
    Filter 2: In Stock
    If "Only In Stock" is enabled, return products that are in stock.
  */
  function inStock(products) {
    return state.onlyInStock
      ? products.filter(product => product.in_stock === true)
      : products;
  }

  /*
    Filter 3: Sorting
    Sort products based on price (low to high / high to low).
    If no sorting is selected, return products as-is.
  */
  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (state.sortBy === "hightolow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return products;
  }

  /*
    Filter 4: Ratings
    Filters products based on minimum rating selected by user.
  */
  function rating(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter(product => product.rating >= 4);
    }
    if (state.ratings === "3STARSABOVE") {
      return products.filter(product => product.rating >= 3);
    }
    if (state.ratings === "2STARSABOVE") {
      return products.filter(product => product.rating >= 2);
    }
    if (state.ratings === "1STARSABOVE") {
      return products.filter(product => product.rating >= 1);
    }
    return products;
  }

  /*
    Apply all filters one by one:
    1. Best Seller
    2. In Stock
    3. Sort
    4. Ratings

    The final result is the filtered product list.
  */
  const filteredProductList =
    rating(
      sort(
        inStock(
          bestSeller(state.productsList)
        )
      )
    );

  /*
    Values provided to the entire app using Context.
    Any component wrapped by FilterProvider can access these.
  */
  const value = {
    state,                 // Complete filter state
    dispatch,              // Used to trigger filter actions
    products: filteredProductList, // Final filtered products
    initialProductList     // Used to load initial products
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

/*
  Custom hook to easily access FilterContext
  instead of writing useContext(FilterContext) everywhere
*/
export const useFilter = () => {
  return useContext(FilterContext);
};
