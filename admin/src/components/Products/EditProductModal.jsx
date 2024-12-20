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

export default function EditProductModal({
  isModalOpen,
  closeModal,
  product,
  setProducts,
}) {
  const [validationError, setValidationError] = useState();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await productService.updateProduct(product.product_id, data);
      setProducts((prev) => {
        const index = prev.findIndex(
          (p) => p.product_id === product.product_id
        );
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
      <ModalHeader>Edit Product</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                min: {
                  value: 0,
                  message: "Price must be greater than 0",
                },
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </Label>
          {errors?.price && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors.price.message}
            </HelperText>
          )}
          <Label className="py-2">
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

          <div className="py-2">
            <span className="text-sm font-medium text-gray-500">Image</span>
            <div className="py-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
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
