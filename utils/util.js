const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取映射表中对应text的value
 * @param {Array} map 
 * @param {string} key 
 */
function getValueInObjectArray(map,key){
  for(let obj of map){
    if(obj['text'] === key){
      return obj['value'];
    }
  }
  return null;
}


module.exports = {
  formatTime: formatTime,
  getValueInObjectArray
}
