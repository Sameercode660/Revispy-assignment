import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiErrorResponse } from "@/utils/ApiErrorResponse";
import { validateEmail, validateName, validatePassword } from "@/utils/zod";
import { nodeMailer } from "@/utils/nodemailer";
import { ApiSuccessResponse } from "@/utils/ApiSuccessResponse";
import { hashPassword } from "@/utils/Bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    console.log(name, email, password)

    if (!name || !email || !password) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Any one field is empty", false)
      );
    }

    const findUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(findUser) {
        return NextResponse.json(new ApiErrorResponse(400, "Email Already Exist", false))
    }

    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!nameValidation.success) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Enter Correct Name please", false)
      );
    }

    if (!emailValidation.success) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Please Enter Correct Email Address", false)
      );
    }

    if (!passwordValidation.success) {
      return NextResponse.json(
        new ApiErrorResponse(400, "Please choose strong password", false)
      );
    }

    const otp = await nodeMailer(email, name);

    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        otp,
        InterestedCategory: [],
        accessToken: "",
      },
    });

    if (!response) {
      return NextResponse.json(
        new ApiErrorResponse(500, "Unable to create the user", false)
      );
    }

    return NextResponse.json(
      new ApiSuccessResponse(200, "User Created Successfully", response, true)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
