import { Blogs } from '../components/blogs'
import { SubLayout } from './layout'

const BlogPage = () => {
  return (
    <SubLayout style={{ margin: '0 10px'}}>
      <Blogs maxNum='all' style={{ margin: '10px'}} />
    </SubLayout>
  )
}

export default BlogPage