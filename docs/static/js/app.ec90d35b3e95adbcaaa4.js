webpackJsonp([0],[,,,function(t,e,i){"use strict";var n=i(10),s=i(35),o=i(0),a=o(n.a,s.a,!1,null,null,null);e.a=a.exports},,function(t,e,i){"use strict";e.a={name:"EmptyRouterView"}},function(t,e,i){"use strict";var n=i(25),s=i(27),o=i(37);e.a={el:"app",components:{"header-o":n.a,"osouji-list":s.a,"update-notification":o.a},data:function(){return{}}}},function(t,e,i){"use strict";e.a={name:"HeaderO",data:function(){return{title:"おそうじカレンダー"}}}},function(t,e,i){"use strict";var n=i(29),s=i.n(n),o=i(1),a=i(4),r=i(32),c=i(3);o.a.use(a.a);var u=1;e.a={name:"OsoujiList",components:{"osouji-list-item":r.a,"com-button":c.a},data:function(){return{listName:"おそうじリスト",showRemove:!1,osoujiList:[]}},methods:{AddOsouji:function(t){this.osoujiList.push({id:u++,name:t.osoujiName}),this.saveOsoujiList()},Open:function(){this.$router.push("add")},RemoveOsouji:function(t){this.osoujiList=this.osoujiList.filter(function(e){return e.id!==t}),this.saveOsoujiList()},saveOsoujiList:function(){localStorage.setItem("osoujiList",s()(this.osoujiList))}},created:function(){var t=localStorage.getItem("osoujiList");t&&t.length>0&&(this.osoujiList=JSON.parse(t),this.osoujiList.forEach(function(t){t.id=u++}),this.saveOsoujiList())},mounted:function(){this.$eventHub.$on("add-osouji",this.AddOsouji)}}},function(t,e,i){"use strict";e.a={props:{osouji:{type:Object,required:!0},removeVisible:{type:Boolean,default:!1}}}},function(t,e,i){"use strict";e.a={name:"ComButton",props:{clickEvent:Function,isDisabled:{type:Boolean,default:!1}}}},function(t,e,i){"use strict";var n=i(3);e.a={name:"UpdateNotification",components:{"com-button":n.a},data:function(){return{visible:!1,message:"新しいバージョンが配信されています。"}},methods:{showNotification:function(){this.visible=!0},updateCache:function(){navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage("updateCache"),setTimeout(function(){location.reload()})}},created:function(){var t=this;navigator.serviceWorker&&navigator.serviceWorker.addEventListener("message",function(e){console.log("test1"),"latestDetection"===e.data.toString()&&(console.log("test2"),t.showNotification())})},mounted:function(){console.log("test3"),navigator.serviceWorker.controller&&(console.log("post! test4"),navigator.serviceWorker.controller.postMessage("updateCheck"))}}},function(t,e,i){"use strict";var n=i(3);e.a={name:"AddOsouji",components:{"com-button":n.a},data:function(){return{osoujiName:""}},computed:{addDisabled:function(){return!this.osoujiName}},methods:{add:function(){this.$eventHub.$emit("add-osouji",{osoujiName:this.osoujiName}),this.$router.back()},close:function(){this.$router.back()}},mounted:function(){document.getElementById("text-osouji-name").focus()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(1),s=i(17),o=i(21),a=i(44),r=i(46);n.a.config.productionTip=!1,n.a.use(r.a),new n.a({router:o.a,store:a.a,render:function(t){return t(s.a)}}).$mount("#app")},,,,function(t,e,i){"use strict";function n(t){i(18)}var s=i(20),o=i(0),a=n,r=o(null,s.a,!1,a,null,null);e.a=r.exports},function(t,e){},,function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=i(1),s=i(4),o=i(22),a=i(24),r=i(41);n.a.use(s.a);var c=[{path:"/",component:o.a,children:[{path:"/",name:"home",component:a.a},{name:"add",path:"add",components:{default:a.a,dialog:r.a}}]}],u=new s.a({mode:"history",base:"osouji-calender/",routes:c,linkActiveClass:"active"});e.a=u},function(t,e,i){"use strict";var n=i(5),s=i(23),o=i(0),a=o(n.a,s.a,!1,null,null,null);e.a=a.exports},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("router-view",{attrs:{name:"dialog"}}),t._v(" "),i("router-view")],1)},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=i(6),s=i(40),o=i(0),a=o(n.a,s.a,!1,null,null,null);e.a=a.exports},function(t,e,i){"use strict";var n=i(7),s=i(26),o=i(0),a=o(n.a,s.a,!1,null,null,null);e.a=a.exports},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"header"}},[t._v("\n  "+t._s(t.title)+"\n")])},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";function n(t){i(28)}var s=i(8),o=i(36),a=i(0),r=n,c=a(s.a,o.a,!1,r,"data-v-1e72db5c",null);e.a=c.exports},function(t,e){},,,,function(t,e,i){"use strict";function n(t){i(33)}var s=i(9),o=i(34),a=i(0),r=n,c=a(s.a,o.a,!1,r,"data-v-85b3601c",null);e.a=c.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("li",{staticClass:"osouji-item"},[t._v("\n    "+t._s(t.osouji.name)+"\n    "),i("div",{staticClass:"remove",attrs:{target:t.removeVisible.toString()},on:{click:function(e){return t.$emit("remove",t.osouji.id)}}},[t._v("\n      削除\n    ")])])])},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"btn",class:{disabled:t.isDisabled},on:{click:function(e){t.clickEvent&&!t.isDisabled&&t.clickEvent.call()}}},[t._t("default")],2)},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"osouji-list-root"}},[i("div",{attrs:{id:"osouji-list-title"},domProps:{textContent:t._s(t.listName)}}),t._v(" "),i("div",{staticClass:"btn-container"},[i("div",{staticClass:"checkbox-area"},[i("label",{staticClass:"checkbox-area-label"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.showRemove,expression:"showRemove"}],staticClass:"checkbox-area-label-main",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.showRemove)?t._i(t.showRemove,null)>-1:t.showRemove},on:{change:function(e){var i=t.showRemove,n=e.target,s=!!n.checked;if(Array.isArray(i)){var o=t._i(i,null);n.checked?o<0&&(t.showRemove=i.concat([null])):o>-1&&(t.showRemove=i.slice(0,o).concat(i.slice(o+1)))}else t.showRemove=s}}}),t._v(" "),i("span",{staticClass:"checkbox-area-label-box"})])])]),t._v(" "),t.osoujiList.length?i("ul",{staticClass:"osouji-list"},t._l(t.osoujiList,function(e){return i("osouji-list-item",{key:e.id,attrs:{osouji:e,"remove-visible":t.showRemove},on:{remove:t.RemoveOsouji}})}),1):i("p",[t._v("\n    おそうじが登録されていません。\n  ")]),t._v(" "),i("div",{staticClass:"btn-container"},[i("com-button",{attrs:{"click-event":t.Open}},[t._v("追加")])],1)])},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";function n(t){i(38)}var s=i(11),o=i(39),a=i(0),r=n,c=a(s.a,o.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"update-notification"},[i("div",{staticClass:"msg"},[t._v(t._s(t.message))]),t._v(" "),i("div",{staticClass:"btn-container"},[i("com-button",{staticClass:"btn-light",attrs:{"click-event":t.updateCache}},[t._v("更新")])],1)])])},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header-o",{attrs:{id:"header-o"}}),t._v(" "),i("osouji-list"),t._v(" "),i("update-notification")],1)},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";function n(t){i(42)}var s=i(12),o=i(43),a=i(0),r=n,c=a(s.a,o.a,!1,r,"data-v-501d47aa",null);e.a=c.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dialog"},[i("div",{staticClass:"dialog-inner"},[i("h2",{staticClass:"title"},[t._v("おそうじの追加")]),t._v(" "),i("div",{staticClass:"dialog-inner-elements"},[i("label",{staticClass:"label"},[t._v("おそうじ名:\n        "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.osoujiName,expression:"osoujiName"}],attrs:{id:"text-osouji-name"},domProps:{value:t.osoujiName},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.osoujiName&&t.add.call()},input:function(e){e.target.composing||(t.osoujiName=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"btn-container"},[i("com-button",{attrs:{"is-disabled":t.addDisabled,"click-event":t.add}},[t._v("追加")]),t._v(" "),i("com-button",{attrs:{"click-event":t.close}},[t._v("閉じる")])],1)])])},s=[],o={render:n,staticRenderFns:s};e.a=o},function(t,e,i){"use strict";var n=i(1),s=i(45);n.a.use(s.a),e.a=new s.a.Store({state:{},mutations:{},actions:{},modules:{}})},,function(t,e,i){"use strict";var n={install:function(t){t.prototype.$eventHub=new t}};e.a=n}],[13]);
//# sourceMappingURL=app.ec90d35b3e95adbcaaa4.js.map