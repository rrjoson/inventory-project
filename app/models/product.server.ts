import type { User, Product } from "@prisma/client";

import { prisma } from "~/db.server";

export function getProduct({ id }: Pick<Product, "id">) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct({
  userId,
  title,
  description,
  price,
  discount,
  stock,
  listed,
}: Product & {
  userId: User["id"];
}) {
  return prisma.product.create({
    data: {
      title,
      description,
      price,
      discount,
      stock,
      listed,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function updateProduct({
  id,
  updates,
}: Pick<Product, "id"> & {
  updates: Partial<Omit<Product, "id">>;
}) {
  return prisma.product.update({
    where: {
      id,
    },
    data: updates,
  });
}

export function getProductListItems({ userId }: { userId: User["id"] }) {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export function deleteProduct({ id }: Pick<Product, "id">) {
  return prisma.product.delete({
    where: { id },
  });
}
