import {NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({})
    }
}