import CreateProductModal from "@/components/Products/CreateProductModal";
import EditProductModal from "@/components/Products/EditProductModal";
import { formatCurrency } from "@/helpers/formatCurrency";
import Layout from "@/layouts/Layout";
import productService from "@/services/product.service";
import {
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

export default function Products() {
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const page = +searchParams.get("page");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchProducts(results);
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsModalEditOpen(true);
  };

  const handleDelete = (id) => {
    productService
      .deleteProduct(id)
      .then(() => {
        setProducts((prev) =>
          prev.filter((product) => product.product_id !== id)
        );
        setTotal((prev) => prev - 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    productService
      .getProducts(page)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const datas = search ? searchProducts : products;

  return (
    <Layout title="Products" loading={isLoading}>
      <CreateProductModal
        isModalOpen={isModalCreateOpen}
        closeModal={() => setIsModalCreateOpen(!isModalCreateOpen)}
        setProducts={setProducts}
        setTotal={setTotal}
      />

      {product && (
        <EditProductModal
          isModalOpen={isModalEditOpen}
          closeModal={() => setIsModalEditOpen(!isModalEditOpen)}
          product={product}
          setProducts={setProducts}
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
          <Button layout="primary" onClick={() => setIsModalCreateOpen(true)}>
            Add new
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datas.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>
                    <span>{product.product_id}</span>
                  </TableCell>
                  <TableCell>
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <span>{product.slug}</span>
                  </TableCell>
                  <TableCell>
                    <span>{formatCurrency(product.price)}</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <span>{product.description}</span>
                  </TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <span>
                      {new Date(product.created_at).toLocaleString("vi-VN")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      layout="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      layout="primary"
                      onClick={() => handleDelete(product.product_id)}
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
              label="Products navigation"
            />
          </TableFooter>
        </TableContainer>
      </div>
    </Layout>
  );
}
