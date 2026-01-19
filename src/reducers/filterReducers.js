export const filterReducer = (state, action) => {
  /*
    `state`  → current filter values
    `action` → tells what change to make
    `type`   → kind of action (filter/sort/reset)
    `payload`→ data needed to update the state
  */
  const { type, payload } = action;

  switch (type) {

    /*
      This action is used when products are fetched
      for the first time from the API.
      It stores the complete product list in the state.
    */
    case "PRODUCT_LIST":
      return {
        productsList: payload.products
      };

    /*
      Updates sorting option selected by the user
      Example values:
      - "lowtohigh"
      - "hightolow"
    */
    case "SORT_BY":
      return {
        ...state,
        sortBy: payload.sortBy
      };

    /*
      Updates the rating filter.
      Example:
      - 4 → show products with rating 4 and above
    */
    case "RATINGS":
      return {
        ...state,
        ratings: payload.ratings
      };

    /*
      Toggles the "Best Seller Only" filter
      based on user checkbox selection.
    */
    case "BEST_SELLER_ONLY":
      return {
        ...state,
        bestSellerOnly: payload.bestSellerOnly
      };

    /*
      Toggles the "Only In Stock" filter
      based on user checkbox selection.
    */
    case "ONLY_IN_STOCK":
      return {
        ...state,
        onlyInStock: payload.onlyInStock
      };

    /*
      Clears all applied filters and sorting.
      Product list remains unchanged.
    */
    case "CLEAR_FILTER":
      return {
        ...state,
        bestSellerOnly: false,
        onlyInStock: false,
        ratings: null,
        sortBy: null
      };

    /*
      Default case runs when action type does not match.
      Helps catch mistakes during development.
    */
    default:
      throw new Error("No Case Found");
  }
};
