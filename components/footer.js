import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import {useRouter} from "next/router";

export default function Footer() {
  const router = useRouter()
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <img src={`/assets/icons/GitHub-Mark-32px.png`} />
            <a
              href={`https://github.com/laiso/dev/tree/master/_posts/${router.query.slug}.md`}
              className="mx-3 font-bold hover:underline"
            >
              GitHubでプルリクエストする
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
