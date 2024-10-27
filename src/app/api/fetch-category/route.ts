import {NextResponse} from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiErrorResponse } from '@/utils/ApiErrorResponse'
import { ApiSuccessResponse } from '@/utils/ApiSuccessResponse';

const prisma = new PrismaClient()

export async function GET() {
    try {
        const response = await prisma.category.findMany({});

        if(!response) {
            return NextResponse.json(new ApiErrorResponse(500, 'Cannot fetch the categories', false));
        }

        return NextResponse.json(new ApiSuccessResponse(200, 'Categories fetched successfully', response, true));
        
    } catch (error) {
        console.log(error)

        return NextResponse.json(new ApiErrorResponse(500, 'Unable to fetch the categories', false))
    }
}