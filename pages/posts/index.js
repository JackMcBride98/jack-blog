import Link from 'next/link'
import Container from '../../components/container'
import distanceToNow from '../../lib/dateRelative'
import { getAllPosts } from '../../lib/getPost'

export default function NotePage({ allPosts }) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.sort((post1, post2) => (post1.date < post2.date ? -1 : 1)).map((post) => (
          <Link as={`/posts/${post.slug}`} href="/posts/[slug]" >
            <article key={post.slug} className="mb-10 rounded hover:shadow-md hover:cursor-pointer border-2 p-2 ">
              <a className="text-lg leading-6 font-bold">{post.title}</a>
              <p>{post.excerpt}</p>
              <p>Tags: <b> {post.tags} </b> </p>
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
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'tags' , 'date'])

  return {
    props: { allPosts },
  }
}
