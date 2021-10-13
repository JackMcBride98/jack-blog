import Link from 'next/link'
import Container from '../components/container'

function Header() {
  return (
    <header className="py-6">
      <Container>
        <nav className="flex space-x-4 border-b-2">
          <h1> <b> The Jack McBride Project </b> </h1>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav>
      </Container>
    </header>
  )
}

export default Header
