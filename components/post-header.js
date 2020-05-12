import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import PostTitle from '../components/post-title'
import {AUTHOR} from "../lib/constants";

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={AUTHOR.NAME} picture={AUTHOR.PICTURE} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={AUTHOR.NAME} picture={AUTHOR.PICTURE} />
        </div>
        <div className="mb-6 text-lg">
          Updated: <DateFormater dateString={date} />
        </div>
      </div>
    </>
  )
}
