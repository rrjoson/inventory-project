import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteProduct } from "~/models/product.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.productId, "Missing productId param");
  await deleteProduct({ id: params.productId });
  return redirect("/backoffice/products");
};
