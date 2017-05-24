(function(){
  if(window.Promise) return null;
  if(!document.addEventListener) document.addEventListener = document.attachEvent;
  var Promise = function(fct){
  this.resolveCode = "resolve"+Math.random();
  this.rejectCode = "reject"+Math.random();
  var self = this;
  this.resolve = function(da){
    var resolve = self.resolveCode;
    var e = document.createEvent("CustomEvent");
    e.initCustomEvent(resolve,false,false,da);
    document.dispatchEvent(e);
  }
  this.reject = function(da){
    var reject = self.rejectCode;
    var e = document.createEvent("CustomEvent");
    e.initCustomEvent(reject,false,false,da);
    document.dispatchEvent(e);
  }
  fct(this.resolve,this.reject);
}
Promise.prototype.then = function(fct1,fct2){
  document.addEventListener(this.resolveCode ,function(e){
    fct1(e.detail);
  })
  document.addEventListener(this.rejectCode,function(e){
    fct2(e.detail);
  })
  return this;
}
window.Promise = Promise;
})();