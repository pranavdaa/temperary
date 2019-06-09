import React from 'react'
import styles from './style.module.scss'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let images = {
      orgLogo: window.SITE_CONFIG.IMG_URL + this.props.images.orgLogoPath,
      authoritySig: window.SITE_CONFIG.IMG_URL + this.props.images.authoritySigPath,
      orgStamp: window.SITE_CONFIG.IMG_URL + this.props.images.orgStampPath,
      background: window.SITE_CONFIG.IMG_URL + this.props.images.backgroundPath,
    }
    console.log('Images', images)
    var docJson = this.props.docJson
    console.log('DocJOsn', docJson)
    return (
      <div className={styles.page}>
        {console.log(docJson.page)}
        <div style={{ position: 'absolute', top: '0', ...docJson.page }}>
          {docJson.components.map((element, i) => {
            switch (element.type) {
              case 'img':
                var imagesrc = images ? images[element.src.replace('{', '').replace('}', '')] : ''
                return <img src={imagesrc} style={{ position: 'absolute', ...element.style }} />

              case 'text':
                return <p style={{ position: 'absolute', ...element.style }}>{element.text}</p>

              default:
                return <p />
            }
          })}
        </div>
      </div>
    )
  }
}

export default Index
