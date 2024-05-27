import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getProduct } from "~/models/product.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "productId not found");

  const product = await getProduct({ id: params.productId });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ product });
};

export default function ProductDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-row">
        <h3 className="text-2xl font-bold">{data.product.title}</h3>
        <Form action="edit" method="get">
          <button
            data-cy="edit"
            type="submit"
            className="rounded px-2 py-2 text-white focus:bg-blue-400"
            aria-label="edit"
          >
            ✏️
          </button>
        </Form>
        <Form action="delete" method="post">
          <button
            data-cy="delete"
            type="submit"
            className="rounded px-2 py-2 text-white focus:bg-blue-400"
            aria-label="delete"
          >
            🗑️
          </button>
        </Form>
      </div>
      <p className="py-6">{data.product.description}</p>
      <hr className="my-4" />
    </div>
  );
}
