// jshint ignore:start
define(function(){
    'use strict';

    /**
     * Mozilla Polyfill for bind
     *
     * https://gist.github.com/dsingleton/1312328#file-function-bind-js
     */
     if (!Function.prototype.bind) {
         Function.prototype.bind=Function.prototype.bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};
     }
});
