import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { privy } from '@/lib/privy'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      const blogs = await prisma.blog.findMany({
        where: { published: true },
        include: { author: true },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(blogs)
    }

    const verifiedClaims = await privy.verifyAuthToken(token)
    const user = await prisma.user.findUnique({
      where: { privyId: verifiedClaims.userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const blogs = await prisma.blog.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const verifiedClaims = await privy.verifyAuthToken(token)
    const { title, content, published = false } = await request.json()

    let user = await prisma.user.findUnique({
      where: { privyId: verifiedClaims.userId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          privyId: verifiedClaims.userId,
          email: verifiedClaims.email
        }
      })
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        published,
        authorId: user.id
      }
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
