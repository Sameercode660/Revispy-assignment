import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiErrorResponse } from "@/utils/ApiErrorResponse";
import { generateToken } from "@/utils/Jwt";
import { ApiSuccessResponse } from "@/utils/ApiSuccessResponse";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, otp } = body;

    console.log(id, otp)

    if (!id || !otp) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Anyone field is empty", false)
      );
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!(findUser?.otp == otp)) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Please enter correct Otp", false)
      );
    }

    const accessToken = generateToken({ id });

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        accessToken,
      },
    });

    return NextResponse.json(new ApiSuccessResponse(200, 'Verified user successfully', updateUser, true))
    
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      new ApiErrorResponse(
        500,
        "Unable to verify the Otp, Try again Later",
        false
      )
    );
  }
}
