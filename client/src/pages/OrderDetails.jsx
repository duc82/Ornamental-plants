import { Badge, Card, CardBody } from "@windmill/react-ui";
import { formatCurrency } from "helpers/formatCurrency";
import Layout from "layout/Layout";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import orderService from "services/order.service";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    orderService.getOrder(id).then((res) => {
      setOrder(res.data.order);
      setItems(res.data.items);
    });
  }, [id]);

  const orderNo = order?.order_id || state?.order.order_id;
  const orderTotal = order?.total || state?.order.total || "Not available";
  const status = order?.status || state?.order.status;
  const totalAmount = order?.amount || state?.order.amount;
  const date = order?.date || state?.order.date || Date.now();

  return (
    <Layout>
      <div className="my-4">
        <h1 className="font-bold text-2xl">Order Details</h1>
        <p>Order no: #{orderNo}</p>
        <p>{orderTotal} items</p>
        <p>
          Status: <Badge type="success">{status}</Badge>
        </p>
        <p>Total Amount: {formatCurrency(totalAmount)}</p>
        <p>
          Placed on:{" "}
          {new Date(date).toLocaleDateString("en", {
            dateStyle: "medium",
          })}
        </p>
        <div className="border-t-2">
          <h1 className="font-bold text-xl">Items in your order</h1>
          {items.map((item) => (
            <Card key={item.product_id} className="flex my-4 p-2 md:flex-row flex-col">
              <img
                className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 object-contain md:object-cover rounded-md"
                loading="lazy"
                decoding="async"
                src={item.image}
                alt={item.name}
              />
              <CardBody>
                <h1 className="font-semibold text-gray-600">{item.name}</h1>
                <p className="mb-2">{formatCurrency(item.price)}</p>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                <p className="mt-2">Quantity: {item.quantity}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
