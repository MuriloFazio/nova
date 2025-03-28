import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  return NextResponse.json({
    message: "Conexão com o MongoDB Atlas bem-sucedida! 🚀",
  });
}
