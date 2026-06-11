import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

const DB_NAME = "Nova-kicks";
const COLLECTION_NAME = "users";

function buildIdFilter(id) {
  if (ObjectId.isValid(id)) return { _id: new ObjectId(id) };
  return { _id: id };
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const user = await db.collection(COLLECTION_NAME).findOne(buildIdFilter(id));
    if (!user) return Response.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    return Response.json({ ...user, _id: String(user._id) });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, email, password, role, status } = await request.json();

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    if (Object.keys(updateData).length === 0) {
      return Response.json({ error: "Không có dữ liệu cập nhật." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).updateOne(buildIdFilter(id), { $set: updateData });

    if (result.matchedCount === 0) {
      return Response.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).deleteOne(buildIdFilter(id));
    if (result.deletedCount === 0) {
      return Response.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}