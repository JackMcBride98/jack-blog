import Container from '../components/container'
import Image from 'next/image'
import Link from 'next/link'
import distanceToNow from '../lib/dateRelative'
import { getAllPosts } from '../lib/getPost'

function HomePage({ allPosts }) {
  return (
    <>
      <Container>
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src="/images/JackElma.jpg"
            alt="Jack and Elma"
            width={250}
            height={250}
          />
        </div>

        <div className="space-y-2">
          <div className="container max-w-4xl m-auto px-4"></div>
          <h1 className="text-2xl font-bold">
            Welcome to "The Jack McBride Project"!
          </h1>
          <p>
            This is my personal blog. I will cover topics such as software
            development, music production, book reviews, spirituality, mental
            health and more.
          </p>
          <h1 className="text-2xl font-bold py-8">Blog Posts</h1>
        </div>
        {allPosts.length ? (
          allPosts.map((post) => (
            <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              key={post.slug}
            >
              <article
                key={post.slug}
                className="mb-10 rounded hover:shadow-md hover:cursor-pointer border-2 p-2 "
              >
                <a className="text-lg leading-6 font-bold">{post.title}</a>
                <p>{post.excerpt}</p>
                <p className="text-sm pt-1">
                  Tags: <b> {post.tags} </b>{' '}
                </p>
                <div className="text-gray-400">
                  <time>{distanceToNow(new Date(post.date))}</time>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No blog posted yet :/</p>
        )}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'tags', 'date'])

  return {
    props: { allPosts },
  }
}

export default HomePage
