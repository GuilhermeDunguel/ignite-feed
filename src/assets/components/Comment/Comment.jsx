import { ThumbsUp, Trash } from 'phosphor-react';
import React, { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './Comment.module.css';

export function Comment(props) {

  const [numberOfCheers, setNumberOfCheers] = useState(0)

  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/diego3g.png" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title='11 de Maio às 08:13h' dateTime="2022-05-11 08:13:30">
                {props.publishedAt}
              </time>
            </div>
            <button onClick={() => props.onDeleteComment(props.content)} title="Deletar comentário">
              <Trash size={24}/>
            </button>
          </header>
          <p>{props.content}</p>
        </div>
        <footer>
          <button onClick={() => setNumberOfCheers(numberOfCheers + 1)}>
            <ThumbsUp />
            Aplaudir<span>{numberOfCheers}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
