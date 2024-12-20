import CreateUserModal from "@/components/Users/CreateUserModal";
import EditUserModal from "@/components/Users/EditUserModal";
import Layout from "@/layouts/Layout";
import userService from "@/services/user.service";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  TableFooter,
  Pagination,
  Button,
  Input,
} from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Users() {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const page = +searchParams.get("page");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const results = users.filter(
      (user) =>
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.fullname.toLowerCase().includes(value.toLowerCase())
    );
    setSearchUsers(results);
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.user_id !== id));
      setTotal((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userService
      .getUsers(page)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const datas = search ? searchUsers : users;

  return (
    <Layout title="Users" loading={isLoading}>
      <CreateUserModal
        isModalOpen={isModalCreateOpen}
        closeModal={() => setIsModalCreateOpen(false)}
        setUsers={setUsers}
        setTotal={setTotal}
      />

      {user && (
        <EditUserModal
          isModalOpen={isModalEditOpen}
          closeModal={() => setIsModalEditOpen(false)}
          user={user}
          setUsers={setUsers}
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
                <TableCell>Email</TableCell>
                <TableCell>Fullname</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datas.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <span>{user.user_id}</span>
                  </TableCell>
                  <TableCell>
                    <span>{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <span>{user.fullname}</span>
                  </TableCell>
                  <TableCell>
                    <span>{user.username}</span>
                  </TableCell>
                  <TableCell>
                    <span>{user.address}</span>
                  </TableCell>
                  <TableCell className="space-x-1">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        type={role === "admin" ? "danger" : "success"}
                      >
                        {role}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <span>
                      {new Date(user.created_at).toLocaleString("vi-VN")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      layout="primary"
                      onClick={() => {
                        setUser(user);
                        setIsModalEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      layout="primary"
                      onClick={() => handleDelete(user.user_id)}
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
              label="Users navigation"
            />
          </TableFooter>
        </TableContainer>
      </div>
    </Layout>
  );
}
