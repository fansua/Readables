export function truncate(content, length) {
    if(content.length <= length) {
      return content
    } else {
      return content.substring(0,length) + '...';
    }
}


export function formatDate(timestamp) {
  const d = new Date(timestamp)
  return d.toUTCString().split(" ").slice(0,4).join(" ")
}

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}
