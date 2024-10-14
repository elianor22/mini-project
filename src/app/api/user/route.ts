import { BaseService } from "@/service/base.service";
import { IResponseUser } from "@/types/response/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    console.log(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const service = new BaseService("/users");
    // console.log(request);
    const res = await service.get({
      params: {
        page,
        limit,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  try {
    const service = new BaseService("/users");
    const data = await req.json();
    const res = await service.post<IResponseUser>(data);
    return NextResponse.json({ message: "success", data: res });
  } catch (error) {
    NextResponse.json(error);
  }
}
