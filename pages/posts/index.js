import Link from 'next/link'
import Image from 'next/image'
import rightArrow from '../../public/images/right-arrow.png'
import Container from '../../components/container'
import { getAllPosts } from '../../lib/getPost'
import formatDate from '../../lib/formatDate'

export default function NotePage({ allPosts }) {
  return (
    <>
      <Container>
        <div className="flex flex-col items-center">
          {allPosts.length ? (
            allPosts
              .sort((post1, post2) => (post1.date < post2.date ? -1 : 1))
              .map((post) => (
                <Link
                  as={`/posts/${post.slug}`}
                  href="/posts/[slug]"
                  key={post.slug}
                >
                  <article
                    key={post.slug}
                    className="mb-10 rounded-md hover:shadow-md hover:cursor-pointer border-2 p-4 pb-0 space-y-2 w-4/5 group transition ease-in-out duration-300"
                  >
                    <a className="text-lg leading-6 font-bold group-hover:text-purple-600  ransition ease-in-out duration-300">
                      {post.title}
                    </a>
                    <p>{post.excerpt}</p>
                    <p className="text-sm ">
                      Tags: <b> {post.tags} </b>{' '}
                    </p>
                    <div className="text-gray-400 flex justify-between">
                      <time>{formatDate(new Date(post.date))}</time>
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
