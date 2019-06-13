import React from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.bottom}>
        <div className="row">
          <div className="col-sm-6">
            <div className={styles.copyright}>
              <span>
                © 2019{' '}
                <a href="https://towardsblockchain.com//" target="_blank" rel="noopener noreferrer">
                  TowardsBlockchain
                </a>
                <br />
                All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
