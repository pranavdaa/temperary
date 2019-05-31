import React from 'react'
import ProfileMenu from '../ProfileMenu'
import styles from '../style.module.scss'
import { Button } from 'antd'
import Logo from './Group 7242.svg'
class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className="mr-4">
          <img src={Logo} width="200" height="40" />
        </div>
        <div>About </div>
        <div>Plans </div>
        <div>Contact Us </div>
        <div>
          <Button type="primary" shape="round" size={'large'}>
            Signin
            </Button>
        </div>
      </div>
    )
  }
}

export default TopBar
