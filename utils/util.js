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
 * 获取对象数组中text对应对象的value
 * @param {Array} arr 
 * @param {string} key 
 */
function getValueInObjectArray(arr,key){
  for(let obj of arr){
    if(obj['text'] === key){
      return obj['value'];
    }
  }
  return null;
}
/**
 * 通过对象数组获取每个对象的text名称属性
 * @param {Array} arr 
 */
function getAllKeyInObjectArray(arr){
  let newArr = [];
  for(let obj of arr){
    newArr.unshift(obj['text']);
  }
  return newArr;
}


module.exports = {
  formatTime: formatTime,
  getValueInObjectArray,
  getAllKeyInObjectArray
}
