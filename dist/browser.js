!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){var t=document.querySelector("#email-form");(function(e){var t=r(e.elements);if(!u())return!1;var n=t.filter((function(e){return e.offsetParent})),o=n.filter((function(e){return e.checkValidity()}));return n.length===o.length})(t)?(console.log("All valid"),function(){var e=document.querySelector("#Region").value,t=document.querySelector("#Role").value;"Agency"===t?c(".attendance-question"):"ERO"!==e&&"SRO"!==e||c(".attendance-question");"Dealer Principal"!==t&&"Dealer GM"!==t&&"Dealer Other"!==t&&c(".management-question")}()):(e.preventDefault(),e.stopPropagation(),t.reportValidity())}function u(){var e=n(l(),2),t=e[0],r=e[1],o=t.value===r.value,a=o?"none":"block";return document.querySelector(".confirm-password-warning").style.display=a,o}function l(){return r(document.querySelectorAll("".concat("#email-form",' [type="password"]')))}function c(e){var t=document.querySelector(e);t&&t.parentNode.removeChild(t)}function f(e){if(e.preventDefault(),e.stopPropagation(),document.querySelector("#email-form").reportValidity()){for(var t,r,o=e.target.elements,a={FNAME:o.namedItem("EA-First-Name").value,EMAIL:o.namedItem("EA-Email").value},i=(t=document.querySelector("#email-form").elements,{MANAGERN1:(r=[t.namedItem("First-Name").value,t.namedItem("Surname").value])[0]+" "+r[1],MANAGERE1:t.namedItem("Email").value,PHONE:t.namedItem("Mobile").value,REGION:t.namedItem("Region").value,ROLE:"Executive Assistant"}),u=0,l=Object.entries(i);u<l.length;u++){var c=n(l[u],2),f=c[0],d=c[1];a[f]=d}console.log(a),$.ajax({url:"https://toyotachooseyourroad.us2.list-manage.com/subscribe/post-json?u=87fa237eb7daba1ba09d9584e&id=3f7e2117ba&c=?",data:a,dataType:"jsonp",method:"POST",success:function(e){console.log(e)},complete:function(){document.querySelector('#email-form input[type="submit"]').click()}})}}e.exports=function(){var e=document.querySelector("#first-stage-button");e&&e.addEventListener("click",i),function(){var e=l();if(2!==e.length)return;e.forEach((function(e){return e.addEventListener("keyup",u)}))}(),document.querySelector("#email-form-2").addEventListener("submit",f)}},function(e,t){function n(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(){if(window.milestones){var e,t=new Date,n=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){l=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(l)throw i}}}}(window.milestones);try{for(n.s();!(e=n.n()).done;){e.value<t&&window.location.reload()}}catch(e){n.e(e)}finally{n.f()}}}e.exports=function(){var e=[],t=new Date,r=null,o=n(document.querySelectorAll("[data-show-from]")).map((function(n){var o=new Date(n.getAttribute("data-show-from"));if(!Number.isNaN(o.getTime()))return o>t&&(e.push(o),n.parentNode.removeChild(n)),o<t&&(!r||r<o)&&(r=o),{date:o,el:n};console.log("Invalid date",n.getAttribute("data-show-from"))})).filter((function(e){return e}));r&&o.forEach((function(e){var t=e.date,n=e.el,o=n.getAttribute("data-stay-after");t!==r&&!o&&n.parentNode&&n.parentNode.removeChild(n)}));n(document.querySelectorAll("[data-show-until]")).map((function(n){var r=new Date(n.getAttribute("data-show-until"));Number.isNaN(r.getTime())?console.log("Invalid date",n.getAttribute("data-show-until")):t>r?n.parentNode.removeChild(n):e.push(r)}));window.milestones=e,window.setInterval(a,1e3)}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),i=n.n(a);window.addEventListener("load",o.a),window.addEventListener("load",i.a)}]);