import Container from '../components/container'
import Image from 'next/image'
import Link from 'next/link'
import distanceToNow from '../lib/dateRelative'
import { getAllPosts } from '../lib/getPost'
import JackElmaImg from '../public/images/Jack-Elma.jpg'
import rightArrow from '../public/images/right-arrow.png'

function HomePage({ allPosts }) {
  return (
    <>
      <Container>
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src={JackElmaImg}
            alt="Jack and Elma"
            width={250}
            height={250}
            placeholder="blur"
          />
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="container max-w-4xl m-auto px-4"></div>
          <h1 className="text-2xl font-bold">
            Welcome to "The Jack McBride Project"!
          </h1>
          <p className="text-center">
            This is my personal blog. I will cover topics such as software
            development, music production, book reviews, spirituality, mental
            health and more.
          </p>
          <h1 className="text-2xl font-bold py-8 self-center">Blog Posts</h1>
        </div>
        <div className="flex flex-col items-center">
          {allPosts.length ? (
            allPosts.map((post) => (
              <Link
                as={`/posts/${post.slug}`}
                href="/posts/[slug]"
                key={post.slug}
              >
                <article
                  key={post.slug}
                  className="mb-10 rounded-md hover:shadow-md hover:cursor-pointer border-2 p-4 pb-0 space-y-2 w-4/5 group"
                >
                  <a className="text-lg leading-6 font-bold group-hover:text-purple-600">
                    {post.title}
                  </a>
                  <p>{post.excerpt}</p>
                  <p className="text-sm ">
                    Tags: <b> {post.tags} </b>{' '}
                  </p>
                  <div className="text-gray-400 flex justify-between">
                    <time>{distanceToNow(new Date(post.date))}</time>
                    <div className="mr-2 mb-2">
                      <Image
                        src={rightArrow}
                        width={25}
                        height={25}
                        alt="blue right arrow"
                        className=""
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p>No blog posted yet :/</p>
          )}
        </div>
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
