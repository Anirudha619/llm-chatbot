import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function addToWaitlist(email: string) {
  return sql`
    INSERT INTO waitlist (email, created_at)
    VALUES (${email}, NOW())
    ON CONFLICT (email) DO NOTHING
  `;
}

export async function getWaitlistCount() {
  const result = await sql`SELECT COUNT(*) as count FROM waitlist`;
  return Number(result[0].count);
}
