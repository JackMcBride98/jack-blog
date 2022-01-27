import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Comment from '../../components/comment'
import Container from '../../components/container'
import formatDate from '../../lib/formatDate'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const PostPage = ({ frontMatter: { title, date }, slug, mdxSource }) => {
  const router = useRouter()

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container>
      <Head>
        <title>{title} | My awesome blog</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article className="prose mb-4">
            <header>
              <h1 className="text-4xl font-bold">{title}</h1>
              <time className="flex mt-2 text-gray-400">
                {formatDate(new Date(date))}
              </time>
            </header>
            {/* <div>{post.content}</div> */}
            {/* <div
              className="prose mt-10 pb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            /> */}
            <MDXRemote {...mdxSource} components={{ Image }} />
          </article>
          <div className="flex justify-center">
            <Link className="" href="/">
              <a className="text-purple-600 bg-purple-100 border-2 border-purple-400 rounded p-2">
                Back to home
              </a>
            </Link>
          </div>

          <Comment />
        </div>
      )}
    </Container>
  )
}

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}

export { getStaticProps, getStaticPaths }
export default PostPage
