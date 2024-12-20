import EditOrderModal from "@/components/Orders/EditOrderModal";
import { formatCurrency } from "@/helpers/formatCurrency";
import Layout from "@/layouts/Layout";
import orderService from "@/services/order.service";
import {
  Badge,
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [searchOrders, setSearchOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const page = +searchParams.get("page");

  const handleSearch = (e) => {};

  const handleDelete = (id) => {};

  useEffect(() => {
    orderService
      .getAllOrders(page)
      .then((res) => {
        setOrders(res.data.items);
        setTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const datas = search ? searchOrders : orders;

  return (
    <Layout title="Orders" loading={isLoading}>
      {order && (
        <EditOrderModal
          isOpen={isModalEditOpen}
          closeModal={() => setIsModalEditOpen(false)}
          order={order}
        />
      )}
      <div className="py-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Input
              type="search"
              className="shadow appearance-none border rounded py-2 px-3 text-grey-darker w-72"
              aria-label="Search"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Ref</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datas.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>
                    <span>{order.order_id}</span>
                  </TableCell>
                  <TableCell>
                    <span>{order.ref}</span>
                  </TableCell>
                  <TableCell>
                    <span>{formatCurrency(order.amount)}</span>
                  </TableCell>
                  <TableCell>
                    <span>{order.total}</span>
                  </TableCell>
                  <TableCell>
                    <span>{order.payment_method}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type="success">{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span>
                      {new Date(order.date).toLocaleDateString("vi-VN")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      layout="primary"
                      onClick={() => {
                        setOrder(order);
                        setIsModalEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      layout="primary"
                      onClick={() => handleDelete(order.order_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={total}
              resultsPerPage={12}
              onChange={(activePage) => {
                setSearchParams({ page: activePage });
              }}
              label="Orders navigation"
            />
          </TableFooter>
        </TableContainer>
      </div>
    </Layout>
  );
}
