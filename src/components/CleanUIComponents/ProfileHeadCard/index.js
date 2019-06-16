import React from 'react'
import { user } from './data.json'
import Avatar from '../Avatar'
import styles from './style.module.scss'

class ProfileHeadCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <div
          className={styles.head + ' ' + this.props.className}
          style={{
            backgroundImage: `url('${this.props.backgroundImage}')`,
          }}
        />
      </div>
    )
  }
}
export default ProfileHeadCard
