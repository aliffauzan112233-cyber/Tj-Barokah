import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URL);

async function main() {
  try {
    for (const table of ['admins', 'products']) {
      const columns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = ${table}
      `;
      console.log(`Columns for ${table}:`, columns);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

main();
