"use server";

import { db } from "@/db";
import { admins, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const admin = await db.query.admins.findFirst({
    where: eq(admins.username, username),
  });

  if (admin && admin.password === password) {
    return { success: true };
  }
  return { success: false, error: "Invalid credentials" };
}

export async function getProducts() {
  return await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const description = (formData.get("description") as string) || null;
  const address = (formData.get("address") as string) || null;
  const latitude = (formData.get("latitude") as string) || null;
  const longitude = (formData.get("longitude") as string) || null;
  
  let imageUrl = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "tj-barokah" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    imageUrl = uploadResult.secure_url;
  }

  await db.insert(products).values({ 
    name, 
    price, 
    stock, 
    imageUrl, 
    description,
    address,
    latitude,
    longitude
  });
  revalidatePath("/admin");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const description = (formData.get("description") as string) || null;
  const address = (formData.get("address") as string) || null;
  const latitude = (formData.get("latitude") as string) || null;
  const longitude = (formData.get("longitude") as string) || null;

  let imageUrl = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "tj-barokah" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    imageUrl = uploadResult.secure_url;
  }

  await db
    .update(products)
    .set({ 
      name, 
      price, 
      stock, 
      imageUrl, 
      description,
      address,
      latitude,
      longitude
    })
    .where(eq(products.id, id));

  revalidatePath("/admin");
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin");
}

export async function getSettings() {
  const allSettings = await db.query.settings.findMany();
  return allSettings.reduce((acc: any, s: any) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
}

export async function updateSetting(key: string, value: string) {
  const { settings } = await import("@/db/schema");
  const existing = await db.query.settings.findFirst({
    where: eq(settings.key, key),
  });

  if (existing) {
    await db.update(settings).set({ value }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({ key, value });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}
