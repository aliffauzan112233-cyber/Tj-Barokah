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
    console.log("Tables found:", tables.map(t => t.table_name).join(", "));
    
    for (const table of tables) {
      const columns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = ${table.table_name}
      `;
      console.log(`Columns for ${table.table_name}:`, columns);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

main();
