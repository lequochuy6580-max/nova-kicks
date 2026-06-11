import clientPromise from "@/libs/mongodb";
import bcrypt from "bcryptjs";

const DB_NAME = "Nova-kicks";
const COLLECTION_NAME = "users";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const users = await db.collection(COLLECTION_NAME).find({}).toArray();
    return Response.json(users.map((u) => ({ ...u, _id: String(u._id) })));
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, password, role, status } = await request.json();

    if (!name || !email || !password || !role || !status) {
      return Response.json({ error: "Vui lòng điền đầy đủ thông tin." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const existing = await db.collection(COLLECTION_NAME).findOne({ email });
    if (existing) {
      return Response.json({ error: "Email đã tồn tại." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    const joined = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const result = await db.collection(COLLECTION_NAME).insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      joined,
      avatar: `https://i.pravatar.cc/80?u=${email}`,
    });

    return Response.json({ success: true, _id: String(result.insertedId) });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}