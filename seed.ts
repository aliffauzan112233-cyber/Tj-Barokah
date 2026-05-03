import "dotenv/config";
import { db } from "./src/db/index";
import { products } from "./src/db/schema";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("🧹 Cleaning up old products...");
  await db.delete(products);

  console.log("🌱 Seeding chicken products...");
  await db.insert(products).values([
    {
      name: "Ayam Broiler Utuh",
      price: "35000",
      stock: 100,
      imageUrl: "/img/ayam1.jpg",
      description: "Ayam broiler segar kualitas premium, dipotong setiap hari.",
    },
    {
      name: "Ayam Kampung Asli",
      price: "85000",
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Ayam kampung asli, sehat dan rendah lemak.",
    },
    {
      name: "Fillet Dada Ayam",
      price: "55000",
      stock: 75,
      imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Daging dada ayam tanpa tulang, cocok untuk diet.",
    },
    {
      name: "Paha Ayam Juicy",
      price: "42000",
      stock: 80,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Paha ayam segar dengan tekstur yang sangat juicy.",
    },
    {
      name: "Telur Ayam Negeri (1kg)",
      price: "28000",
      stock: 200,
      imageUrl: "https://images.unsplash.com/photo-1516733978644-10ef0c0ceaf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Telur ayam negeri segar pilihan, kaya nutrisi.",
    },
    {
      name: "Telur Bebek Pilihan",
      price: "3500",
      stock: 150,
      imageUrl: "https://images.unsplash.com/photo-1554580221-a3f2906e578c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Telur bebek segar per butir, cocok untuk jamu atau masakan.",
    }
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
