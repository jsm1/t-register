!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function u(e){r(i,o,a,u,c,"next",e)}function c(e){r(i,o,a,u,c,"throw",e)}u(void 0)}))}}function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c={init:function(){var e=this;Object.assign(this,{videoDataAttribute:"data-video",videoDataElement:"[data-video-data] > div",videoListItemSelector:".sidebar-item",watchedClass:"watched",activeClass:"current",disabledClass:"disabled",videoWrapperId:"video-wrapper",videoNameAttribute:"data-video-name",feedbackFormSelector:"[data-toy-feedback-form]",feedbackSectionSelector:"[data-toy-feedback-section]",player:null,watchedVideos:null,currentVideo:null,state:{watchedVideos:[],videos:[],completed:!1,timeUpdatePromise:null,nextUnwatchedVideo:null},isCompleting:!1}),this.getInitialState().then((function(){e.applyState(),e.state.completed&&(a(document.querySelectorAll("[data-hide-if-complete]")).forEach((function(e){e.style.display="none"})),a(document.querySelectorAll("[data-show-if-complete]")).forEach((function(e){e.style.display="flex"})))})).catch((function(e){"Not logged in"!==e?console.error(e):console.log("Not logged in")})),document.querySelectorAll("[data-show-videos]").forEach((function(t){t.addEventListener("click",e.setVideosStared.bind(e))})),document.querySelectorAll("[data-show-videos-again]").forEach((function(t){t.addEventListener("click",e.showVideosPaneAfterCompletion.bind(e))})),this.setBars(),this.initFeedbackFormListener()},getInitialState:function(){var e=this;return o(regeneratorRuntime.mark((function t(){var n,r,o,i,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,MemberStack.reload();case 2:return t.next=4,MemberStack.onReady;case 4:if(n=t.sent,console.log("Member",n),n.loggedIn){t.next=8;break}throw"Not logged in";case 8:r=e.getWatchedVideos(n),o=e.getCurrentVideo(n)||{},i=!1,o.name||(i=!0),u=a(document.querySelectorAll(e.videoListItemSelector)),e.state.watchedVideos=r,e.state.completed=!0===n.completed||"true"===n.completed,e.state.videosStarted=!0===n["videos-started"]||"true"===n["videos-started"],console.log("Completed",e.state.completed),e.state.videos=u.map((function(t,n){var a=e.getVideoData(t),u=o.name===a.name||0===n&&i;return t.addEventListener("click",c.onVideoItemClick),{el:t,data:a,watched:r.includes(a.name),current:u,playbackPosition:u?o.time||0:void 0}}));case 18:case"end":return t.stop()}}),t)})))()},applyState:function(e){var t=this;console.log("Videos",this.state.videos),this.state.videos.forEach((function(e,n){var r=e.el;r.classList.remove(t.activeClass),e.watched?r.classList.add(t.watchedClass):(r.classList.remove(t.watchedClass),r.classList.add(t.disabledClass)),e.current&&(r.classList.add(t.activeClass),r.classList.remove(t.disabledClass),t.loadVideo(e.data.link,e.playbackPosition),t.setVideoData(e.data,e.playbackPosition))})),e||this.toggleCompletedConditionals(),this.toggleVideosStartedConditionals()},getWatchedVideos:function(e){var t=(e["videos-watched"]||"").split(", ");return 1!==t.length||t[0]?t:[]},getCurrentVideo:function(e){var t=e["last-video-watched"],n=e["current-video-time"];return t||n?{name:t,time:n}:null},isComplete:function(e){return e.completed},getVideoData:function(e){var t=this,n=e.querySelector(this.videoDataElement);if(!n)return null;var r=a(n.attributes),o={};return r.forEach((function(e){if(-1!==e.name.indexOf(t.videoDataAttribute)){var n=e.name.replace(t.videoDataAttribute+"-","");o[n]=e.value}})),o},loadVideo:function(e,t){var n=this;if(this.player){var r=e.replace(/^.+\.com\/(.+)/,"$1");this.player.loadVideo(r).then((function(){return n.player.setCurrentTime(t||0)}))}else this.removeChildElements("#"+this.videoWrapperId),this.player=new Vimeo.Player(this.videoWrapperId,{url:e}),this.player.on("ended",this.onVideoEnd.bind(this)),this.player.on("timeupdate",this.onVideoTimeUpdate.bind(this)),t&&this.player.setCurrentTime(t)},removeChildElements:function(e){document.querySelectorAll(e).forEach((function(e){return e.children.forEach((function(e){return e.parentNode.removeChild(e)}))}))},setVideoData:function(e){var t=this;Object.entries(e).forEach((function(e){var r=n(e,2),o=r[0],a=r[1],i=document.querySelector("[".concat(t.videoDataAttribute,'="').concat(o,'"]'));if(i){o.indexOf("icon");-1!==o.indexOf("supportlink")?i.href=a:i.innerText=a}}));var r=e.presenter2,o=document.querySelector('[data-video="presenter1"] + .space-after');o&&(o.hidden=!r)},onVideoEnd:function(e){var t=this;return o(regeneratorRuntime.mark((function e(){var n,r,o,a,i,u,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.findCurrentVideo()){e.next=3;break}return e.abrupt("return");case 3:return r=n.data,o=r.name,t.state.watchedVideos.push(o),n.current=!1,n.playbackPosition=0,n.watched=!0,a=t.getNextUnwatchedVideo(),i=!1,a?(a.current=!0,a.playbackPosition=0):(i=!0,t.isCompleting=!t.state.completed,t.state.completed=!0),u=a?a.data:{},e.next=15,t.updateState(t.state.watchedVideos,u.name||null,0,i);case 15:c=!t.isCompleting&&t.state.completed,t.applyState(c);case 17:case"end":return e.stop()}}),e)})))()},getNextUnwatchedVideo:function(){var e=this.state.watchedVideos;return this.state.videos.find((function(t){return!e.includes(t.data.name)}))},getNextVideo:function(e){var t=this.state.videos,n=t.findIndex((function(t){return t.data.name===e}));if(-1===n)return null;var r=n+1;return r<t.length?t[r]:null},updateState:function(e,t,n,r){var a=this;return o(regeneratorRuntime.mark((function o(){var i;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return console.log("Updating state",e,t,n,r),a.watchedVideos=e,a.currentVideo=t,o.next=5,MemberStack.onReady;case 5:return i=o.sent,o.abrupt("return",i.updateProfile({"last-video-watched":t,"current-video-time":n,"videos-watched":e.join(", "),completed:r},!1).then((function(){return console.log("sucess")})).catch((function(e){return console.log(e)})));case 7:case"end":return o.stop()}}),o)})))()},onVideoTimeUpdate:function(e){var t=this;return o(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=e.seconds,t.state.currentTime=r,t.timeUpdatePromise||(t.timeUpdatePromise=t.updateWatchTime(r).then((function(){return t.timeUpdatePromise=null})));case 3:case"end":return n.stop()}}),n)})))()},updateWatchTime:function(e){var t=this;return o(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=t.findCurrentVideo()){n.next=3;break}return n.abrupt("return");case 3:return r.data,n.next=6,MemberStack.onReady;case 6:return o=n.sent,n.abrupt("return",o.updateProfile({"current-video-time":e},!1));case 8:case"end":return n.stop()}}),n)})))()},findCurrentVideo:function(){return this.state.videos.find((function(e){return e.current}))},onVideoItemClick:function(e){var t=this,n=c.state.videos.find((function(e){return e.el===t})),r=c.getNextUnwatchedVideo()===n;n&&(n.watched||r)&&c.setActiveVideo(n)},setActiveVideo:function(e){this.state.videos.forEach((function(e){e.current=!1})),e.current=!0,e.playbackPosition=0,this.applyState(this.state.completed)},toggleCompletedConditionals:function(){var e=this,t=this.state.completed?"flex":"none";document.querySelectorAll("[data-completed-only]").forEach((function(e){return e.style.display=t})),document.querySelectorAll("[data-watch-videos-again]").forEach((function(t){return t.addEventListener("click",e.showVideosPane.bind(e))})),this.state.completed&&this.showVideosPane(!!window.localStorage.getItem("always-show-video"))},toggleVideosStartedConditionals:function(){this.showIntroductoryPane(!this.state.videosStarted),this.state.completed||this.showVideosPane(this.state.videosStarted)},setBars:function(){var e=this.getRegionData(),t=this.getBars();Object.entries(e).forEach((function(e){var r=n(e,2),o=r[0],a=r[1],i=t[o];if(i){var u=Math.round(a/i.total*100);i.chartEl.style.width=u+"%"}}))},getRegionData:function(){var e={};return a(document.querySelectorAll(".region-list .region-total")).forEach((function(t){var n=a(t.children),r=n[0],o=n[1];e[r.innerText]=parseInt(o.innerText||0)})),e},getBars:function(){var e={};return a(document.querySelectorAll(".bar-under")).forEach((function(t){var n=a(t.attributes).find((function(e){return-1!==e.name.indexOf("data-total")})),r=n.name.replace("data-total-","").toUpperCase(),o=parseInt(n.value);e[r]={total:o,chartEl:t.querySelector(".bar-over")}})),e},showVideosPane:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=e?"flex":"none";document.querySelector("[data-video-section]").style.display=t},showVideosPaneAfterCompletion:function(){window.localStorage.setItem("always-show-video",!0),this.showVideosPane(!0),document.querySelector("[data-video-section]").scrollIntoView()},showIntroductoryPane:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=e?"flex":"none";document.querySelector("[data-welcome-section]").style.display=t},setVideosStared:function(){var e=this;return o(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.showVideosPane(!0),e.state.videosStarted=!0,e.applyState(),t.next=5,MemberStack.onReady;case 5:return n=t.sent,t.abrupt("return",n.updateProfile({"videos-started":!0},!1));case 7:case"end":return t.stop()}}),t)})))()},initFeedbackFormListener:function(){var e=this,t=document.querySelector(this.feedbackFormSelector);t&&t.addEventListener("submit",this.onFeedbackFormSubmit.bind(this)),MemberStack.onReady.then((function(t){if(t["feedback-completed"]){var n=document.querySelector(e.feedbackSectionSelector);n.parentNode.removeChild(n)}}))},onFeedbackFormSubmit:function(e){return o(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,MemberStack.onReady;case 2:e.sent.updateProfile({"feedback-completed":!0},!1);case 4:case"end":return e.stop()}}),e)})))()}};e.exports=c},function(e,t){function n(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var i=e.apply(t,r);function u(e){n(i,o,a,u,c,"next",e)}function c(e){n(i,o,a,u,c,"throw",e)}u(void 0)}))}}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c="[data-toy-form]";function s(){var e=document.querySelector(c);d(e)?(console.log("All valid"),window.mailchimpSubmitted||y(),function(){var e=window.whitelist,t=document.querySelector(c+' [data-ms-member="email"]').value.toLowerCase(),n=e.some((function(e){return-1!==t.indexOf(e)})),r=a(document.querySelectorAll(c+' input[type="submit"][data-ms-membership]'));if(!n){var o=r.find((function(e){return e.getAttribute("data-disallow-button")}));if(o)return void o.click()}r[0].click()}()):(event.preventDefault(),event.stopPropagation(),e.reportValidity())}function l(e){var t=document.querySelector(c);d(t)?(console.log("All valid"),function(){var e=document.querySelector("#Region").value,t=document.querySelector("#Role").value,n=-1!==t.indexOf("Dealer");n?"CRO"!==e&&"TWA"!==e&&h(".attendance-question"):h(".attendance-question");n||"General Manager of Record"===t||h(".management-question")}()):(e.preventDefault(),e.stopPropagation(),t.reportValidity())}function d(e){var t=a(e.elements);if(!f())return!1;var n=t.filter((function(e){return e.offsetParent})),r=n.filter((function(e){return e.checkValidity()}));return n.length===r.length}function f(){var e=o(m(),2),t=e[0],n=e[1],r=t.value===n.value,a=r?"none":"block";return document.querySelector(".confirm-password-warning").style.display=a,r}function m(){return a(document.querySelectorAll("".concat(c,' [type="password"]')))}function h(e){var t=document.querySelector(e);t&&t.parentNode.removeChild(t)}function p(e,t){var n=e.find((function(e){return e.getAttribute("data-ms-member")===t}));return n?n.value:null}function v(e){e.preventDefault(),e.stopPropagation(),document.querySelector(c).reportValidity()&&y()}function y(){var e=document.querySelector("[data-toy-ea-form]");if(e){var t=e.querySelector("[data-ea-first-name]").value,n=e.querySelector("[data-ea-email]").value;if(t&&n){for(var r,i,u={FNAME:t,EMAIL:n},l=(r=a(document.querySelector(c).elements),{MANAGERN1:(i=[p(r,"first-name"),p(r,"surname")])[0]+" "+i[1],MANAGERE1:p(r,"email"),PHONE:p(r,"mobile"),REGION:p(r,"region"),ROLE:"Executive Assistant"}),d=0,f=Object.entries(l);d<f.length;d++){var m=o(f[d],2),h=m[0],v=m[1];u[h]=v}console.log(u),$.ajax({url:"https://toyotachooseyourroad.us2.list-manage.com/subscribe/post-json?u=87fa237eb7daba1ba09d9584e&id=3f7e2117ba&c=?",data:u,dataType:"jsonp",method:"POST",success:function(e){console.log(e)},complete:function(){window.mailchimpSubmitted=!0,s()}})}else console.log("EA details not set")}else console.log("No mailchimp form")}function b(){return(b=r(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=document.querySelector("[data-toy-watch-button]"))||!t.offsetParent){e.next=6;break}return e.next=4,MemberStack.onReady;case 4:-1===e.sent.role.indexOf("Dealer")&&h("[data-toy-watch-button]");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.exports=function(){var e=document.querySelector("[data-toy-form] #first-stage-button");e&&e.addEventListener("click",l);var t,n=document.querySelector("[data-toy-whitelist-submit]");n&&n.addEventListener("click",s),function(){var e=m();if(2!==e.length)return;e.forEach((function(e){return e.addEventListener("keyup",f)}))}(),(t=document.querySelector("[data-toy-ea-form]"))&&t.addEventListener("submit",v),function(){b.apply(this,arguments)}()}},function(e,t){function n(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(){if(window.milestones){var e,t=new Date,n=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){c=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw i}}}}(window.milestones);try{for(n.s();!(e=n.n()).done;){e.value<t&&window.location.reload()}}catch(e){n.e(e)}finally{n.f()}}}e.exports=function(){var e=[],t=new Date,r=null,o=n(document.querySelectorAll("[data-show-from]")).map((function(n){var o=new Date(n.getAttribute("data-show-from"));if(!Number.isNaN(o.getTime()))return o>t&&(e.push(o),n.parentNode.removeChild(n)),o<t&&(!r||r<o)&&(r=o),{date:o,el:n};console.log("Invalid date",n.getAttribute("data-show-from"))})).filter((function(e){return e}));r&&o.forEach((function(e){var t=e.date,n=e.el,o=n.getAttribute("data-stay-after");t!==r&&!o&&n.parentNode&&n.parentNode.removeChild(n)}));n(document.querySelectorAll("[data-show-until]")).map((function(n){var r=new Date(n.getAttribute("data-show-until"));Number.isNaN(r.getTime())?console.log("Invalid date",n.getAttribute("data-show-until")):t>r?n.parentNode.removeChild(n):e.push(r)}));window.milestones=e,window.setInterval(a,1e3)}},function(e,t){function n(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function u(e){o(i,r,a,u,c,"next",e)}function c(e){o(i,r,a,u,c,"throw",e)}u(void 0)}))}}e.exports={items:[],parser:null,chunkSize:null,nextPageSelector:null,itemSelector:null,init:function(e){return Object.assign(this,e),this.parser=new DOMParser,this},run:function(){var e=this;return a(regeneratorRuntime.mark((function t(){var n,r,o,a,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.parsePage(document),n=e.getNextPagePrefix(document),r=2,o=!1;case 4:if(o){t.next=12;break}for(a=0,i=[];a<e.chunkSize;)i.push(e.getPage(n,r).then((function(t){var n=e.parser.parseFromString(t,"text/html");e.parsePage(n),e.getNextPageQueryString(n)||(o=!0)}))),r++,a++;return t.next=10,Promise.all(i);case 10:t.next=4;break;case 12:e.saveItemsToWindow();case 13:case"end":return t.stop()}}),t)})))()},getPage:function(e,t){return a(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",fetch("".concat(e).concat(t)).then((function(e){return e.text()})));case 1:case"end":return n.stop()}}),n)})))()},parsePage:function(e){var t;(t=this.items).push.apply(t,n(e.querySelectorAll(this.itemSelector)))},getNextPagePrefix:function(e){return this.getNextPageQueryString(e).replace(/=\d+$/,"=")},getNextPageQueryString:function(e){var t=e.querySelector(this.nextPageSelector);return t?t.search:null},addItemsToPage:function(){var e=document.querySelector(this.itemSelector).parentNode;this.items.forEach((function(t){t.style.display="none",e.appendChild(t)}))},saveItemsToWindow:function(){window.whitelist=this.items.map((function(e){return e.innerText.toLowerCase()}))}}},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(2),i=n.n(a),u=n(0),c=n.n(u),s=n(3),l=n.n(s);document.querySelector(".whitelist-next")&&l.a.init({chunkSize:10,nextPageSelector:".whitelist-next",itemSelector:".whitelist-email"}).run(),window.addEventListener("load",o.a),window.addEventListener("load",i.a),window.addEventListener("load",c.a.init.bind(c.a)),MemberStack.onReady.then((function(e){var t=document.querySelector("#thanks");e.loggedIn&&t&&t.scrollIntoView()}))}]);