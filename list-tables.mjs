import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URL);

async function main() {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("TABLES:", tables.map(t => t.table_name));
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

main();
