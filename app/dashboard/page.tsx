'use client'

import { usePrivy } from '@privy-io/react-auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Blog {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
}

export default function Dashboard() {
  const { user, authenticated } = usePrivy()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authenticated) {
      fetch('/api/blogs')
        .then(res => res.json())
        .then(data => {
          setBlogs(data)
          setLoading(false)
        })
    }
  }, [authenticated])

  if (!authenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please sign in to access dashboard</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Link
          href="/dashboard/create"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create New Post
        </Link>
      </div>

      {loading ? (
        <p>Loading your blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs yet. Create your first one!</p>
      ) : (
        <div className="grid gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="border p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-2">{blog.content.substring(0, 200)}...</p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded ${blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <Link
                  href={`/blog/${blog.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
