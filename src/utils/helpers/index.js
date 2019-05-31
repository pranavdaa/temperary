export const loadImage = file => {
  return new Promise(function(resolve, reject) {
    if (file.type.match('image.*')) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
          resolve(evt.target.result)
        }
      }
    } else {
      reject('File is not Image')
    }
  })
}
