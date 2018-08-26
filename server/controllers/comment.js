import mongoose from 'mongoose'
import axios from 'axios'
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

export const postComment = async(ctx, next) => {
  let body = ctx.request.body
  let { id, token, content, replyId  = ''} = body
  // replyId Указывает ответ и не является обязательным.
  if (!id || !token || !content) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
  }
  // Согласно token Получить имя пользователя
  const { data } = await axios.get('https://api.github.com/user?access_token=' + token)
  if (data.login) {
    let user = await User.findOne({ username: data.login })
    try {
      let comment = await new Comment({
        content: content,
        user: user._id,
        article: id,
        replyId: replyId
      })
      // Сохранить комментарии пользователей
      await comment.save()
      // Обновить комментарии к статье
      await Article.findByIdAndUpdate(id, { $push: { comments: comment } }, { safe: true, upsert: true })
      ctx.body = {
        success: true,
        data: comment
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  } else {
    ctx.body = {
      success: false,
      err: 'Token is invalid'
    }
  }
}

export const getComments = async(ctx, next) => {
  let comments = await Comment.find({})
    .populate({
      path: 'user'
    })
    .populate({
      path: 'article',
      select: 'id title'
    })
    .sort({ 'createdAt': -1 })
    .exec()
  try {
    ctx.body = {
      success: true,
      data: comments
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const deleteComment = async(ctx, next) => {
  let { id } = ctx.params

  if (!id) {
    return (ctx.body = {
      success: false,
      err: 'id is required'
    })
  }

  try {
    let body = await Comment.findByIdAndRemove(id).exec()
    ctx.body = {
      success: true,
      data: body
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}
