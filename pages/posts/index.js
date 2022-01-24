import Link from 'next/link'
import Image from 'next/image'
import rightArrow from '../../public/images/right-arrow.png'
import Container from '../../components/container'
import distanceToNow from '../../lib/dateRelative'
import { getAllPosts } from '../../lib/getPost'

export default function NotePage({ allPosts }) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts
          .sort((post1, post2) => (post1.date < post2.date ? -1 : 1))
          .map((post) => (
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
              <article
                key={post.slug}
                className="mb-10 rounded-md hover:shadow-md hover:cursor-pointer border-2 p-4 space-y-2"
              >
                <a className="text-lg leading-6 font-bold">{post.title}</a>
                <p>{post.excerpt}</p>
                <p>
                  Tags: <b> {post.tags} </b>{' '}
                </p>
                <div className="text-gray-400 flex justify-between">
                  <time>{distanceToNow(new Date(post.date))}</time>
                  <Image
                    src={rightArrow}
                    width={25}
                    height={25}
                    alt="blue right arrow"
                  />
                </div>
              </article>
            </Link>
          ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'tags', 'date'])

  return {
    props: { allPosts },
  }
}
