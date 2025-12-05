'use client'

import { useEffect, useState } from 'react'

interface Blog {
  id: string
  title: string
  content: string
  author: {
    name: string | null
  }
  createdAt: string
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(blog => (
        <div key={blog.id} className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-600 mb-4">
            {blog.content.substring(0, 150)}...
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {blog.author?.name || 'Anonymous'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
