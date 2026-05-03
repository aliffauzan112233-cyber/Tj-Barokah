"use server";

import { db } from "@/db";
import { admins, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const admin = await db.query.admins.findFirst({
    where: eq(admins.username, username),
  });

  if (admin && admin.password === password) {
    // In a real app, set a cookie/session here
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function getProducts() {
  return await db.query.products.findMany();
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const stock = parseInt(formData.get("stock") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;

  await db.insert(products).values({
    name,
    price: price,
    stock,
    imageUrl,
    description,
  });

  revalidatePath("/admin");
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin");
}
