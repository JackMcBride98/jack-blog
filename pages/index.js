import Container from '../components/container'
import Image from 'next/image'
import Link from 'next/link'
import distanceToNow from '../lib/dateRelative'
import { getAllPosts } from '../lib/getPost'

function HomePage({ allPosts }) {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Welcome to "The Jack McBride Project"!
          </h1>
          <p>
            This is my personal blog. I will cover topics such as software development, music production, book reviews, spirituality, mental health and more.
          </p>
          <br/>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <br/>
        </div>
          {allPosts.length ? (
            allPosts.map((post) => (
              <article key={post.slug} className="mb-10">
                <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                  <a className="text-lg leading-6 font-bold">{post.title}</a>
                </Link>
                <p>{post.excerpt}</p>
                <div className="text-gray-400">
                  <time>{distanceToNow(new Date(post.date))}</time>
                </div>
              </article>
            ))
          ) : (
            <p>No blog posted yet :/</p>
          )}
      </Container>

      <div className="container max-w-4xl m-auto px-4 mt-20">
        <Image
          src="/images/JackElma.jpg"
          alt="Jack and Elma"
          width={500}
          height={500}
        />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'date'])

  return {
    props: { allPosts },
  }
}

export default HomePage
