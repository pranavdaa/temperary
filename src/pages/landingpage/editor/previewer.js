import React from 'react'
import styles from './style.module.scss'

class Index extends React.Component {
  render() {
    let images = {
      orgLogo: 'orgLogo',
      orgStamp: 'stamp',
      authoritySig: 'sign',
      background: 'bg',
    }

    console.log('Asdasd', styles.page)
    var docJson = this.props.docJson
    return (
      <div className={styles.page}>
        {console.log(docJson.page)}
        <div style={{ position: 'absolute', top: '0', ...docJson.page }}>
          {docJson.components.map((element, i) => {
            switch (element.type) {
              case 'img':
                var imagesrc = images[element.src.replace('{', '').replace('}', '')]
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
