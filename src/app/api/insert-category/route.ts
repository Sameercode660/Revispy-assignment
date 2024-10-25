import {NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiErrorResponse } from '@/utils/ApiErrorResponse'

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {category} = body

        category.map(async(value: any) => {
            await prisma.category.create({
                data: {
                    name: value.name
                }
            })
        })

        // const response = await prisma.category.createMany({
        //     data: category
        // })
         
        return NextResponse.json({message: "Success"})
    } catch (error) {
        console.log(error)

        return NextResponse.json(new ApiErrorResponse(500, 'Unable to insert the categroy', false))
    }
}