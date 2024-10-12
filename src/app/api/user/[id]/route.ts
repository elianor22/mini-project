import { BaseService } from "@/service/base.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = new BaseService("/users");
    const res = await service.delete(params.id);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = new BaseService("/users");
    const body = await req.json();
    const res = await service.patch(params.id, body);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
