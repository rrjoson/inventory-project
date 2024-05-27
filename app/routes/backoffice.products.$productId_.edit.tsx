import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { getProduct, updateProduct } from "~/models/product.server";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const price = parseFloat(formData.get("price"));
  const discount = parseFloat(formData.get("discount"));
  const stock = parseInt(formData.get("stock"), 10);
  const listed = formData.get("listed") === "on" ? true : false;

  const product = await updateProduct({
    id: params.productId,
    updates: {
      ...updates,
      price,
      discount,
      stock,
      listed,
    },
  });

  if (!product) {
    return null;
  }

  return redirect(`/backoffice/products`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const product = await getProduct({ id: params.productId });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ product });
};

export default function EditProduct() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      {/* Title */}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            defaultValue={product.title}
            name="title"
            data-cy="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Description: </span>
          <textarea
            defaultValue={product.description}
            data-cy="description"
            name="description"
            rows={6}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      {/* Price */}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Price: </span>
          <input
            name="price"
            defaultValue={product.price}
            data-cy="price"
            type="number"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      {/* Discount */}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Discount: </span>
          <input
            name="discount"
            defaultValue={product.discount}
            data-cy="discount"
            type="number"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      {/* Stock */}
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Stock: </span>
          <input
            name="stock"
            defaultValue={product.stock}
            type="number"
            data-cy="stock"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      {/* Listed */}
      <div>
        <label className="">
          <span>Listed: </span>
          <input
            name="listed"
            checked={product.listed}
            data-cy="listed"
            type="checkbox"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          data-cy="save"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
