import React from 'react'
import IssuesHistory from './IssuesHistory'
import ProfileMenu from './ProfileMenu'
import styles from './style.module.scss'
class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className="mr-4">
          <i className="lnr lnr-home" />
        </div>
        <div>Welcome To Signy </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
