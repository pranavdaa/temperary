import React from 'react'
import { user } from './data.json'
import Avatar from '../Avatar'
import styles from './style.module.scss'

class ProfileHeadCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <div
          className={styles.head}
          style={{
            backgroundImage: `url('${user.cover}')`,
          }}
        >
          
        </div>
       
      </div>
    )
  }
}
export default ProfileHeadCard
