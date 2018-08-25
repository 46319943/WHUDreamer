Page({
  data: {
    url:null
  },


  onLoad: function(options){
    console.log(options);
    this.setData({url:options.url});
  },

})