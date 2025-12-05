import BlogList from '@/components/BlogList'

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>
      <p className="text-gray-600 mb-8">
        Share your thoughts and read amazing content from our community.
      </p>
      <BlogList />
    </div>
  )
}
