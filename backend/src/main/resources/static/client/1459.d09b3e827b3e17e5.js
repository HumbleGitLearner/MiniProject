"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[1459],{1459:(O,_,r)=>{r.r(_),r.d(_,{ion_picker_column:()=>g});var f=r(467),o=r(8393),y=r(8476),m=r(4920),b=r(1086),v=r(4921),I=r(333);r(8438);const g=class{constructor(s){(0,o.r)(this,s),this.ionChange=(0,o.d)(this,"ionChange",7),this.isScrolling=!1,this.isColumnVisible=!1,this.canExitInputMode=!0,this.updateValueTextOnScroll=!1,this.centerPickerItemInView=(e,t=!0,i=!0)=>{const{isColumnVisible:n,scrollEl:d}=this;if(n&&d){const u=e.offsetTop-3*e.clientHeight+e.clientHeight/2;d.scrollTop!==u&&(this.canExitInputMode=i,this.updateValueTextOnScroll=!1,d.scroll({top:u,left:0,behavior:t?"smooth":void 0}))}},this.setPickerItemActiveState=(e,t)=>{t?e.classList.add(p):e.classList.remove(p)},this.inputModeChange=e=>{if(!this.numericInput)return;const{useInputMode:t,inputModeColumn:i}=e.detail;this.setInputModeActive(!(!t||void 0!==i&&i!==this.el))},this.setInputModeActive=e=>{this.isScrolling?this.scrollEndCallback=()=>{this.isActive=e}:this.isActive=e},this.initializeScrollListener=()=>{const e=(0,v.a)("ios"),{el:t,scrollEl:i}=this;let n,d=this.activeItem;const u=()=>{(0,m.r)(()=>{var E;if(!i)return;n&&(clearTimeout(n),n=void 0),this.isScrolling||(e&&(0,b.a)(),this.isScrolling=!0);const x=i.getBoundingClientRect(),P=x.x+x.width/2,S=x.y+x.height/2,C=t.getRootNode(),A=C instanceof ShadowRoot?C:y.d;if(void 0===A)return;const h=A.elementsFromPoint(P,S).find(k=>"ION-PICKER-COLUMN-OPTION"===k.tagName);void 0!==d&&this.setPickerItemActiveState(d,!1),void 0!==h&&!h.disabled&&(h!==d&&(e&&(0,b.b)(),this.canExitInputMode&&this.exitInputMode()),d=h,this.setPickerItemActiveState(h,!0),this.updateValueTextOnScroll&&(null===(E=this.assistiveFocusable)||void 0===E||E.setAttribute("aria-valuetext",this.getOptionValueText(h))),n=setTimeout(()=>{this.isScrolling=!1,this.updateValueTextOnScroll=!0,e&&(0,b.h)();const{scrollEndCallback:k}=this;k&&(k(),this.scrollEndCallback=void 0),this.canExitInputMode=!0,this.setValue(h.value)},250))})};(0,m.r)(()=>{i&&(i.addEventListener("scroll",u),this.destroyScrollListener=()=>{i.removeEventListener("scroll",u)})})},this.exitInputMode=()=>{const{parentEl:e}=this;null!=e&&(e.exitInputMode(),this.el.classList.remove("picker-column-active"))},this.findNextOption=(e=1)=>{const{activeItem:t}=this;if(!t)return null;let i=t,n=t.nextElementSibling;for(;null!=n;){if(e>0&&e--,"ION-PICKER-COLUMN-OPTION"===n.tagName&&!n.disabled&&0===e)return n;i=n,n=n.nextElementSibling}return i},this.findPreviousOption=(e=1)=>{const{activeItem:t}=this;if(!t)return null;let i=t,n=t.previousElementSibling;for(;null!=n;){if(e>0&&e--,"ION-PICKER-COLUMN-OPTION"===n.tagName&&!n.disabled&&0===e)return n;i=n,n=n.previousElementSibling}return i},this.onKeyDown=e=>{const t=(0,v.a)("mobile");let i=null;switch(e.key){case"ArrowDown":i=t?this.findPreviousOption():this.findNextOption();break;case"ArrowUp":i=t?this.findNextOption():this.findPreviousOption();break;case"PageUp":i=t?this.findNextOption(5):this.findPreviousOption(5);break;case"PageDown":i=t?this.findPreviousOption(5):this.findNextOption(5);break;case"Home":i=this.el.querySelector("ion-picker-column-option:first-of-type");break;case"End":i=this.el.querySelector("ion-picker-column-option:last-of-type")}null!==i&&(this.setValue(i.value),e.preventDefault())},this.getOptionValueText=e=>{var t;return e?null!==(t=e.getAttribute("aria-label"))&&void 0!==t?t:e.innerText:""},this.renderAssistiveFocusable=()=>{const{activeItem:e}=this,t=this.getOptionValueText(e);return(0,o.h)("div",{ref:i=>this.assistiveFocusable=i,class:"assistive-focusable",role:"slider",tabindex:this.disabled?void 0:0,"aria-label":this.ariaLabel,"aria-valuemin":0,"aria-valuemax":0,"aria-valuenow":0,"aria-valuetext":t,"aria-orientation":"vertical",onKeyDown:i=>this.onKeyDown(i)})},this.ariaLabel=null,this.isActive=!1,this.disabled=!1,this.value=void 0,this.color="primary",this.numericInput=!1}ariaLabelChanged(s){this.ariaLabel=s}valueChange(){this.isColumnVisible&&this.scrollActiveItemIntoView(!0)}componentWillLoad(){const s=this.parentEl=this.el.closest("ion-picker");new IntersectionObserver(t=>{if(t[t.length-1].isIntersecting){const{activeItem:n,el:d}=this;this.isColumnVisible=!0;const u=(0,m.g)(d).querySelector(`.${p}`);u&&this.setPickerItemActiveState(u,!1),this.scrollActiveItemIntoView(),n&&this.setPickerItemActiveState(n,!0),this.initializeScrollListener()}else this.isColumnVisible=!1,this.destroyScrollListener&&(this.destroyScrollListener(),this.destroyScrollListener=void 0)},{threshold:.001,root:this.parentEl}).observe(this.el),null!==s&&s.addEventListener("ionInputModeChange",t=>this.inputModeChange(t))}componentDidRender(){const{el:s,activeItem:e,isColumnVisible:t,value:i}=this;if(t&&!e){const n=s.querySelector("ion-picker-column-option");null!==n&&n.value!==i&&this.setValue(n.value)}}scrollActiveItemIntoView(s=!1){var e=this;return(0,f.A)(function*(){const t=e.activeItem;t&&e.centerPickerItemInView(t,s,!1)})()}setValue(s){var e=this;return(0,f.A)(function*(){!0===e.disabled||e.value===s||(e.value=s,e.ionChange.emit({value:s}))})()}setFocus(){var s=this;return(0,f.A)(function*(){s.assistiveFocusable&&s.assistiveFocusable.focus()})()}connectedCallback(){var s;this.ariaLabel=null!==(s=this.el.getAttribute("aria-label"))&&void 0!==s?s:"Select a value"}get activeItem(){const{value:s}=this;return Array.from(this.el.querySelectorAll("ion-picker-column-option")).find(t=>!(!this.disabled&&t.disabled)&&t.value===s)}render(){const{color:s,disabled:e,isActive:t,numericInput:i}=this,n=(0,v.b)(this);return(0,o.h)(o.f,{key:"d60736ce74c0e8c774a163272b78fbad32993ec2",class:(0,I.c)(s,{[n]:!0,"picker-column-active":t,"picker-column-numeric-input":i,"picker-column-disabled":e})},this.renderAssistiveFocusable(),(0,o.h)("slot",{key:"74611112ef154b343ae29a773f8cd8a01cc1447d",name:"prefix"}),(0,o.h)("div",{key:"af772d2b61b7eb41a567593d290b80a50b7caa72","aria-hidden":"true",class:"picker-opts",ref:d=>{this.scrollEl=d},tabIndex:-1},(0,o.h)("div",{key:"4b646ee97bcf8ed541b9798c91dff189eec41dd1",class:"picker-item-empty","aria-hidden":"true"},"\xa0"),(0,o.h)("div",{key:"a44d1a10d20a13aeb47f9871b09e291aa7f216bd",class:"picker-item-empty","aria-hidden":"true"},"\xa0"),(0,o.h)("div",{key:"6a481715bd68fa68dc2a76c2e867ce771ea680b0",class:"picker-item-empty","aria-hidden":"true"},"\xa0"),(0,o.h)("slot",{key:"23236e731b1ad432c104761ebeec91697a6b7643"}),(0,o.h)("div",{key:"58a6c1f35a3ff0b26acaceebfd477d74b6dcfd6d",class:"picker-item-empty","aria-hidden":"true"},"\xa0"),(0,o.h)("div",{key:"ea864872dec6dc363406d1bd9101b1bf21944db6",class:"picker-item-empty","aria-hidden":"true"},"\xa0"),(0,o.h)("div",{key:"28cc4c570d0dd59f491eef2b15a5ed706d28b7bb",class:"picker-item-empty","aria-hidden":"true"},"\xa0")),(0,o.h)("slot",{key:"cff1cc0bea732a5ce22bb451c5ea404a84af1993",name:"suffix"}))}get el(){return(0,o.i)(this)}static get watchers(){return{"aria-label":["ariaLabelChanged"],value:["valueChange"]}}},p="option-active";g.style=":host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;max-width:100%;height:200px;font-size:22px;text-align:center}.assistive-focusable{left:0;right:0;top:0;bottom:0;position:absolute;z-index:1;pointer-events:none}.assistive-focusable:focus{outline:none}.picker-opts{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;min-width:26px;max-height:200px;outline:none;text-align:inherit;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none}.picker-item-empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.picker-opts::-webkit-scrollbar{display:none}::slotted(ion-picker-column-option){display:block;scroll-snap-align:center}.picker-item-empty,:host(:not([disabled])) ::slotted(ion-picker-column-option.option-disabled){scroll-snap-align:none}::slotted([slot=prefix]),::slotted([slot=suffix]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}::slotted([slot=prefix]){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:0;-ms-flex-pack:end;justify-content:end}::slotted([slot=suffix]){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:0;-ms-flex-pack:start;justify-content:start}:host(.picker-column-disabled) .picker-opts{overflow-y:hidden}:host(.picker-column-disabled) ::slotted(ion-picker-column-option){cursor:default;opacity:0.4;pointer-events:none}@media (any-hover: hover){:host(:focus) .picker-opts{outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}"},333:(O,_,r)=>{r.d(_,{c:()=>y,g:()=>b,h:()=>o,o:()=>I});var f=r(467);const o=(a,l)=>null!==l.closest(a),y=(a,l)=>"string"==typeof a&&a.length>0?Object.assign({"ion-color":!0,[`ion-color-${a}`]:!0},l):l,b=a=>{const l={};return(a=>void 0!==a?(Array.isArray(a)?a:a.split(" ")).filter(c=>null!=c).map(c=>c.trim()).filter(c=>""!==c):[])(a).forEach(c=>l[c]=!0),l},v=/^[a-z][a-z0-9+\-.]*:/,I=function(){var a=(0,f.A)(function*(l,c,g,p){if(null!=l&&"#"!==l[0]&&!v.test(l)){const s=document.querySelector("ion-router");if(s)return c?.preventDefault(),s.push(l,g,p)}return!1});return function(c,g,p,s){return a.apply(this,arguments)}}()}}]);