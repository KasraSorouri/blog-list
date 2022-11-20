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
    console.log('blogs ->', blogs)
    const favorite = (blogs.length > 0 ? {likes:0} : null)

    blogs.map(blog => {
        if (blog.likes > favorite.likes){
            favorite.title = blog.title,
            favorite.author = blog.author,
            favorite.likes = blog.likes
            }
        
    })
    console.log(favorite)
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}