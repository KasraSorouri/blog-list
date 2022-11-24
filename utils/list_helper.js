const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.map(blog => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    const favorite = (blogs.length > 0 ? {likes:0} : null)

    blogs.map(blog => {
        if (blog.likes > favorite.likes){
            favorite.title = blog.title,
            favorite.author = blog.author,
            favorite.likes = blog.likes
            }
        
    })
//    console.log(favorite)
    return favorite
}

const mostBlogs = (blogs) => {
    let authors = (blogs.length > 0 ? [{author:'', blogs: 0}] : null)

    if (blogs.length > 0) {
      blogs.map(blog => {
        const author= authors.find(author => author.author === blog.author)
//        console.log('find reapeted author ->', author);
        if (author) {
            author.blogs ++
        } else {
            authors = authors.concat({author: blog.author, blogs: 1})
 //           console.log('39 * authors ->',authors)
        }
      })
    }
    const most = authors ? {author: '', blogs: 0} : null
    if (most) {
      authors.map(author => {
        if (author.blogs > most.blogs) {
            most.author = author.author,
            most.blogs = author.blogs
        }
    })
}
//    console.log('most ->', most)
    return most
}

const mostLikes = (blogs) => {
    let authors = (blogs.length > 0 ? [{author:'', likes: 0}] : null)

    if (blogs.length > 0) {
      blogs.map(blog => {
        const author= authors.find(author => author.author === blog.author)
//        console.log('find reapeted author ->', author);
        if (author) {
            author.likes += blog.likes
        } else {
            authors = authors.concat({author: blog.author, likes: blog.likes})
 //           console.log('39 * authors ->',authors)
        }
      })
    }
    const most = authors ? {author: '', likes: 0} : null
    if (most) {
      authors.map(author => {
        if (author.likes > most.likes) {
            most.author = author.author,
            most.likes = author.likes
        }
    })
}
//    console.log('most ->', most)
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}