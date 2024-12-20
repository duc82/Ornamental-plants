import userService from "@/services/user.service";
import {
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditUserModal({
  isModalOpen,
  closeModal,
  user,
  setUsers,
}) {
  const [validationError, setValidationError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      fullname: user.fullname,
      email: user.email,
      password: "",
      username: user.username,
      address: user?.address || "",
      country: user?.country || "",
      city: user?.city || "",
      state: user?.state || "",
      admin: user.roles.includes("admin"),
    },
  });

  const onSubmit = async (data) => {
    try {
      data.roles = data.admin ? ["customer", "admin"] : ["customer"];
      delete data.admin;
      const res = await userService.updateUser(user.user_id, data);
      setUsers((prev) => {
        const index = prev.findIndex((u) => u.user_id === user.user_id);
        prev[index] = res.data;
        return [...prev];
      });
      closeModal();
    } catch (error) {
      setValidationError(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Edit User</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          {validationError && (
            <HelperText className="mt-1 italic" valid={false}>
              {validationError}
            </HelperText>
          )}
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500 w-1/4">
              Full name
            </span>
            <Input
              {...register("fullname", {
                required: "Full name required",
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.fullname && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.fullname.message}
            </HelperText>
          )}
          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">Username</span>
            <Input
              {...register("username", {
                required: "Username required",
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.username && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.username.message}
            </HelperText>
          )}
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500">
              Email address
            </span>
            <Input
              {...register("email", {
                required: "Email required",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not valid",
                },
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.email && errors?.email.type === "required" && (
            <HelperText className="mt-1 italic" valid={false}>
              Email required
            </HelperText>
          )}
          {errors?.email && errors?.email.type === "pattern" && (
            <HelperText className="mt-1 italic" valid={false}>
              Invalid email
            </HelperText>
          )}
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500">Password</span>
            <Input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              placeholder="Leave empty to keep the same"
              {...register("password")}
            />
          </Label>
          {errors?.password && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors?.password?.type === "required" && "Password required"}
            </HelperText>
          )}

          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <Input
              {...register("address")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500">City</span>
            <Input
              {...register("city")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">State</span>
            <Input
              {...register("state")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500">Country</span>
            <Input
              {...register("country")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          <div className="py-2">
            <p className="text-sm font-medium text-gray-500 mb-2">Roles</p>
            <Label className="inline-flex items-center mr-4">
              <Input type="checkbox" {...register("admin")} />
              <span className="ml-2">Admin</span>
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Save
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
