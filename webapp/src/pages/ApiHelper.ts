import axios from "axios";
import { Order, OrderData, ProductStatus } from "../components/interfaces";

const INPIPELINE_URL = '/api/orders/inpipeline';

const getInPipelineData = async () => {
  const orderData: OrderData = {
    Queued: [],
    InProgress: [],
    QA: [],
  };
  let errorOccured = false;
  try {
    const response = await axios.get(INPIPELINE_URL);
    if (response?.status === 200) {
      const { data } = response.data;
      data.forEach((order: Order) => {
        orderData[order.OrderStatus as keyof OrderData].push(order);
      });
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    errorOccured = true;
  }
  return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
  const updatedOrder = { ...order, OrderStatus: newOrderStatus };
  try {
    const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
    if (response?.status === 200)
      return true;

    const { message } = response.data;
    throw message;
  } catch (err) {
    return false;
  }
};


const PRODUCT_URL = '/api/products/all';

const getProductData = async (status: ProductStatus = ProductStatus.Active) => {
  const params = { status: status }

  try {
    const response = await axios.get(PRODUCT_URL, { params });
    if (response?.status === 200) {
      const { data } = response.data;
      return {
        products: data,
        errorOccurred: false
      }
    }
    const { message } = response.data;
    throw message;
  } catch (err) {
    return {
      products: [],
      errorOccurred: true
    }
  };
};

export { getProductData, PRODUCT_URL, getInPipelineData, INPIPELINE_URL, updateOrderStatus, UPDATE_STATUS_URL };