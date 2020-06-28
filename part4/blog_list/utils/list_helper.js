const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let likes = blogs.map(blog => blog.likes)
  let i = likes.indexOf(Math.max(...likes))
  const result = { title:blogs[i].title, author:blogs[i].author, likes:blogs[i].likes }
  return result
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined
  // let authors = blogs.map(blog => blog.author)
  // console.log(_.groupBy(authors))
  const authorsAndBlogCounts = _.countBy(blogs, 'author')
  // converting the above variables to pairs and sorting them by count
  const sortedAuthorsByBlogCount = _.toPairs(authorsAndBlogCounts).sort((a, b) => b[1] - a[1])
  const authorsWithMostBlogs = sortedAuthorsByBlogCount[0]
  return { author: authorsWithMostBlogs[0], blogs: authorsWithMostBlogs[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}