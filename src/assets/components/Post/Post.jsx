import React, {useState} from 'react'
import {format, formatDistanceToNow} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR';

import styles from './Post.module.css'

import {Comment} from '../Comment/Comment'
import {Avatar} from '../Avatar/Avatar'


export function Post(props) {

  const [comments, setComments] = useState([])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(props.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBr})

  const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
    locale: ptBr, 
    addSuffix: true,
  })

  const publishedCommentDateRelativeToNow = formatDistanceToNow(new Date(), {
    locale: ptBr, 
    addSuffix: true,
  })

  function handleDeleteComment(commentToDelete) {
    const commentWhithoutDeletedOne = comments.filter(item => {
      return item.content != commentToDelete
    })

    setComments(commentWhithoutDeletedOne)
  }

  function handleCreateNewComment(event) {
    event.preventDefault()
    setComments([...comments, { id: comments.length + 1, content: newCommentText}])
    setNewCommentText('')
  }

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value)
  }

  const isNewCommentValid = newCommentText === '' || newCommentText.length < 3

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={props.author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {props.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />
        <footer>
          <button className={styles.postCommentButton} disabled={isNewCommentValid} type='submit'>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment.content}
              content={comment.content}
              publishedAt={publishedCommentDateRelativeToNow}
              onDeleteComment={handleDeleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
