import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createProduct } from "~/models/product.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const price = parseFloat(formData.get("price"));
  const discount = parseFloat(formData.get("discount"));
  const stock = parseInt(formData.get("stock"), 10);
  const listed = formData.get("listed") === "on" ? true : false;

  const product = await createProduct({
    ...updates,
    userId,
    price,
    discount,
    stock,
    listed,
  });

  if (!product) {
    return null;
  }

  return redirect(`/backoffice/products`);
};

export default function NewProductPage() {
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
            name="description"
            rows={6}
            data-cy="description"
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
            type="number"
            data-cy="price"
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
            type="number"
            data-cy="discount"
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
            type="checkbox"
            data-cy="listed"
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
