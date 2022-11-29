const Post = require('../models/post')
const User = require('../models/user')

// Create a new post
exports.createPost = async (req, res) => {
  try {
    // Find the user that created the post
    const user = await User.findOne({
      username: req.body.username,
    })

    // Create a new post
    const post = new Post({
      content: req.body.content,
      author: user,
      createdAt: Date.now(),
    })

    // Save the post
    await post.save()

    // Add the post to the user that created it
    user.posts.push(post)

    // Save the user that created the post
    await user.save()

    // Send the post
    res.status(201).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: (In the future) Limit the posts results to n posts and get more posts when the user scrolls down or clicks a button (use mongoose skip and limit)

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    // Find all posts
    const posts = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      // Limit the posts to 100
      .limit(100)
      .exec()

    // Send all posts as json
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Get a post by id
exports.getPostById = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id).populate('author')
    // .populate('comments')

    // Send the post
    res.status(200).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Get a post
exports.getPost = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findOne({
      content: req.body.content,
    })

    // Send the post
    res.status(200).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Update a post
exports.updatePost = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id)

    // Update the post
    post.content = req.body.content

    // Save the post
    await post.save()

    // Send the post
    res.status(201).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id)

    // TODO: Delete the post if the user that created it is the user that is logged in (do it in the front end). You simply check if the user that created the post is the user that is logged in and if it is you show the delete button

    // Delete the post
    await Post.findByIdAndDelete(req.params.id)

    // Send the post
    res.status(200).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Get user posts
exports.getUserPosts = async (req, res) => {
  try {
    // Find the user
    const user = await User.findOne({ username: req.params.username })

    // Find the user posts
    const posts = await Post.find({ author: user })

    // Send the user posts
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Like Post
exports.likePost = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)

    // Find the user
    const user = await User.findOne({ username: req.body.username }).populate(
      'posts'
    )

    // Check if the user has already liked the post
    if (post.likes.includes(user._id)) {
      // Send a message
      res.status(200).json({ message: 'You already liked this post' })
    } else {
      // Add the user to the post likes
      post.likes.push(user)

      // Increment the number of likes
      post.numberOfLikes++

      // Save the post
      await post.save()

      // Send the post
      res.status(200).json(post)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

// Add comment to post using mongoose $push and populate
exports.addComment = async (req, res) => {
  try {
    // Define the comment
    const comment = {
      content: req.body.content,
      username: req.body.username,
      createdAt: Date.now(),
    }

    // Find the post and update it
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { comments: comment },

        // increase number of comments by one each time a comment is added
        $inc: { numberOfComments: 1 },
      },
      { new: true }
    )

    // Send the post
    res.status(200).json(post)
  } catch (err) {
    res.status(500).send(err)
  }
}

// GET comments
exports.getComments = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)

    // Send the comments
    res.status(200).json(post.comments)
  } catch (err) {
    res.status(500).send(err)
  }
}
