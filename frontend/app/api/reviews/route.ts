import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
import prisma from '../../../../prisma/client';

// for testing purposes, can be removed when backend is connected
const createReviewSchema = z.object({
  description:z.string().min(1)
})
export async function POST(request: NextRequest){
  const body = await request.json();
  console.log(body);
  const validation = createReviewSchema.safeParse(body);
  if (!validation.success){
    return NextResponse.json(validation.error.errors, {status:400});
  }

  const newReview = await prisma.review.create({
    data:{
      description:body.description,
      rating:body.rating,
    }
  });

  return NextResponse.json(newReview, {status:201});
}