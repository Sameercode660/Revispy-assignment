import {NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiErrorResponse } from '@/utils/ApiErrorResponse'
import { ApiSuccessResponse } from '@/utils/ApiSuccessResponse';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();

        const {id, categories} = body;

        if(!id || !categories) {
            return NextResponse.json(new ApiErrorResponse(400, "Anyone field is empty", false));
        }

        const response = await prisma.user.update({
            where:{
                id
            },
            data: {
                InterestedCategory: categories
            }
        })

        if(!response) {
            return NextResponse.json(new ApiErrorResponse(500, "Someting went wrong in updating categories", false))
        }

        return NextResponse.json(new ApiSuccessResponse(200, 'Category updated successfully', response, true))

    } catch (error) {
        console.log(error)

        return NextResponse.json(new ApiErrorResponse(500, 'Unable to store the categories in user', false))
    }
}