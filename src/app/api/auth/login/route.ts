import {NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiErrorResponse } from '@/utils/ApiErrorResponse'
import { validateEmail } from '@/utils/zod';
import { comparePassword } from '@/utils/Bcrypt';
import { ApiSuccessResponse } from '@/utils/ApiSuccessResponse';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();

        const {email, password} = body;

        if(!email || !password) {
            return NextResponse.json(new ApiErrorResponse(400, "Anyone field is empty", false))
        }

        const findUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!findUser) {
            return NextResponse.json(new ApiErrorResponse(400, 'User does not exist, Please sign up', false));
        }

        const checkPassword =  await comparePassword(password, findUser.password);

        if(!checkPassword) {
            return NextResponse.json(new ApiErrorResponse(400, "Password is invalid", false))
        }

        return NextResponse.json(new ApiSuccessResponse(200, "User loggedIn Successfully", findUser, true))


    } catch (error) {
        console.log(error)

        return NextResponse.json(new ApiErrorResponse(500, "Unable to login the user", false));
    }
}