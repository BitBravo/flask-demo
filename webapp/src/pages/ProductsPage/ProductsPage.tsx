import { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { DATA_STATES, Product } from "../../components/interfaces";
import { getProductData } from "../ApiHelper";

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { products: productList, errorOccurred } = await getProductData();
    setProducts(productList);
    setLoadingState(errorOccurred ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageWrapper loading={loadingState}>
      <div className="container mx-auto py-10" data-testid="product-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              key={product.ProductID}
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-64 flex justify-center bg-white shadow-lg">
                <img
                  src={product.ProductPhotoURL}
                  alt={product.ProductName}
                  className="w-full object-cover w-auto h-auto"
                />
              </div>
              <div className="flex justify-between items-start px-4 py-6">
                <div className="flex-grow">
                  <h2 className="font-bold text-xl mb-2">
                    {product.ProductName}
                  </h2>
                  <p className="text-gray-500 font-nunito">
                    ID: {product.ProductID}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block bg-${
                      product.ProductStatus === "Active" ? "teal" : "red"
                    }-500 text-white rounded-full px-3 py-1 text-sm font-semibold`}
                  >
                    {product.ProductStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductsPage;
