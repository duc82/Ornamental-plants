import { convertFileToBase64 } from "@/helpers/base64";
import productService from "@/services/product.service";
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
import { Controller, useForm } from "react-hook-form";

export default function CreateProductModal({
  isModalOpen,
  closeModal,
  setProducts,
  setTotal,
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
  });
  const [validationError, setValidationError] = useState();

  const onSubmit = async (data) => {
    setValidationError();
    try {
      const res = await productService.createProduct(data);
      console.log(res);
      setProducts((prev) => [res.data, ...prev]);
      setTotal((prev) => prev + 1);
      closeModal();
    } catch (error) {
      setValidationError(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Add product</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
        <ModalBody>
          {validationError && (
            <HelperText className="mt-1 italic" valid={false}>
              {validationError}
            </HelperText>
          )}
          <Label className="py-2">
            <span className="text-sm font-medium text-gray-500 w-1/4">
              Name
            </span>
            <Input
              {...register("name", {
                required: "Name required",
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.name && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.name.message}
            </HelperText>
          )}
          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">Price</span>
            <Input
              type="number"
              {...register("price", {
                required: "Price required",
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.price && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.price.message}
            </HelperText>
          )}
          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">
              Description
            </span>
            <Input
              {...register("description", {
                required: "Description required",
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.description && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.description.message}
            </HelperText>
          )}
          <Label className="bg-white py-2">
            <span className="text-sm font-medium text-gray-500">Image</span>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{
                required: "Image required",
              }}
              render={({ field }) => (
                <Input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const base64 = await convertFileToBase64(file);
                    field.onChange(base64);
                  }}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              )}
            ></Controller>
          </Label>
          {errors?.image && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.image.message}
            </HelperText>
          )}
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
            Add
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
