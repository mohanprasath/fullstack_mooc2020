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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}