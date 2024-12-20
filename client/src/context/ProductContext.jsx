import { createContext, useContext, useEffect, useState } from "react";
import productService from "services/product.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    productService.getProducts(page).then((response) => {
      setProducts(response.data.products);
      setTotal(response.data.total);
      setIsLoading(false);
    });
  }, [page]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, isLoading, setIsLoading, page, setPage, total }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext, ProductProvider, useProduct };
