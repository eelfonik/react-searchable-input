!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("lodash"),require("styled-components")):"function"==typeof define&&define.amd?define(["react","lodash","styled-components"],t):"object"==typeof exports?exports.reactSearchableInput=t(require("react"),require("lodash"),require("styled-components")):e.reactSearchableInput=t(e.React,e._,e.styled)}(window,function(e,t,s){return function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}return s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t,s){e.exports=s(4)()},function(t,s){t.exports=e},function(e,s){e.exports=t},function(e,t){e.exports=s},function(e,t,s){"use strict";var n=s(5);function i(){}function l(){}l.resetWarningCache=i,e.exports=function(){function e(e,t,s,i,l,o){if(o!==n){var r=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw r.name="Invariant Violation",r}}function t(){return e}e.isRequired=e;var s={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:i};return s.PropTypes=s,s}},function(e,t,s){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,s){"use strict";s.r(t);var n=s(1),i=s.n(n),l=s(0),o=s.n(l),r=s(2);class a extends n.Component{constructor(...e){var t,s,n;super(...e),n=(e=>{this.component.contains(e.target)||this.props.handleOutsideClick&&this.props.handleOutsideClick()}),(s="handleOutsideClick")in(t=this)?Object.defineProperty(t,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[s]=n}componentDidMount(){document.body.addEventListener("click",this.handleOutsideClick)}componentWillUnmount(){document.body.removeEventListener("click",this.handleOutsideClick)}render(){return i.a.createElement("div",{ref:e=>{this.component=e}},this.props.children)}}a.propTypes={handleOutsideClick:o.a.func,children:o.a.node};var c=a;const h=e=>t=>t[e]?t[e].toString():t,u=e=>t=>t.map(e),p=e=>(t,s)=>d(t,s,e)?function(e,t,s){const n=h(s);return e.filter(e=>!Object(r.isEqual)(n(e),n(t)))}(t,s,e):f(t,s);function d(e,t,s){const n=h(s);return!!u(n)(e).find(e=>Object(r.isEqual)(e,n(t)))}const f=(e,t)=>[...e,t];var m=(e,t,s)=>{const n=e.find(e=>e.query===t&&Object(r.isEqual)(e.data,s))?e:[...e.filter(e=>e.query!==t),{query:t,data:s}];return n.length>10?Object(r.drop)(n):n},b=s(3),y=s.n(b);const g=y.a.div`
  position: relative;
  min-height: ${e=>e.theme.inputHeight};
  width: 100%;
`,x=y.a.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${e=>e.greyOut?"#818181":"inherit"};
  background-color: ${e=>e.disabled?e.thems.disabledColor:"inherit"};
  opacity: ${e=>e.visible?1:0};
`,C=y.a.input`
  opacity: ${e=>e.visible?1:0};
  width: 100%;
  height: ${e=>e.theme.inputHeight};
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: 0;
  outline: none;
  font-family: inherit;
  color: inherit;
  font-size: 1em;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  &:placeholder {
    font-family: inherit;
    font-size: 1em;
  }
`,O=y.a.ul`
  position: absolute;
  top: ${e=>e.theme.listTop};
  left: ${e=>e.theme.listLeft};
  padding: 0 ${e=>e.theme.listPadding};
  width: ${e=>e.theme.listWidth||"100%"};
  box-sizing: border-box;
  background-color: ${e=>e.theme.listBg||"transparent"};
  max-height: ${e=>e.showResults?e.theme.listMaxHeight:"0px"};
  overflow: scroll;
  color: inherit;
`,k=y.a.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  cursor: pointer;
`,v=y.a.span`
  font-size: 0.8em;
  color: #ff0000;
`;function S(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const E=()=>{};class w extends n.Component{constructor(e){super(e),S(this,"handleOutsideClick",()=>{this.props.onBlur&&this.props.onBlur(),this.setState({focused:!1,showResults:!1})}),S(this,"handleChange",e=>{const t=e.target.value;this.setState({input:t,selectedItems:this.props.multi?this.state.selectedItems:[],showResults:!0}),this.asyncSearch&&!this.searchCache.find(e=>e.query===t)&&this.asyncSearch(t)}),S(this,"onListItemClick",e=>()=>{this.setState({focused:!1,selectedItems:this.props.multi?this.props.collection.filter(t=>d(p("id")(this.state.selectedItems,e),t,"id")):[e]},this.afterItemChanged)}),S(this,"afterItemChanged",()=>{this.setState({showResults:this.props.multi||!this.props.closeOnSelect}),this.props.onListItemClick&&this.props.onListItemClick(this.state.selectedItems)}),S(this,"handleKeyPress",e=>{13===(e.keyCode||e.charCode||0)&&(e.preventDefault(),this.props.onPressEnter&&this.props.onPressEnter(e.target.value))}),S(this,"onSelectAllClicked",e=>()=>{this.setState({selectedItems:this.selectAll.checked?e:Object(r.without)(this.props.collection,...e)},this.afterItemChanged)}),S(this,"onFocus",e=>{this.props.onFocus&&this.props.onFocus(e),this.setState({showResults:!0,focused:!0})}),S(this,"showDropdown",()=>{this.filterSearch.focus(),this.setState({showResults:!0,focused:!0})}),this.asyncSearch=this.props.asyncSearch?this.props.enableCache?Object(r.throttle)(this.props.asyncSearch,300):this.props.asyncSearch:E,this.searchCache=[],this.state={input:"",focused:!1,selectedItems:[],showResults:!1}}render(){const{isDisabled:e,placeholder:t,showError:s,defaultError:n,multi:l,selectAll:o,enableSelectAll:a,renderListItem:h,showLabelText:u}=this.props,{input:p,focused:f,showResults:y,selectedItems:S}=this.state,E=()=>S.length?{text:l?`${S.length} selected`:S[0].label||S[0],isPlaceholder:!1}:{text:t,isPlaceholder:!0},w=""===p||this.props.asyncSearch?this.props.collection:this.props.collection.filter(e=>{const t=e.label||e;return Object(r.includes)(t,p)||Object(r.includes)(t.toLowerCase(),p)});this.props.enableCache&&(this.searchCache=m(this.searchCache,p,w));let T=!1;if(this.selectAll){const e=S.length===w.length;this.selectAll.checked=e,this.selectAll.indeterminate=S.length&&!e,T=e}return i.a.createElement(b.ThemeProvider,{theme:this.props.theme},i.a.createElement(g,null,u&&i.a.createElement(x,{onClick:e?null:this.showDropdown,disabled:e,visible:!f,greyOut:E().isPlaceholder},E().text),i.a.createElement(c,{handleOutsideClick:this.handleOutsideClick},i.a.createElement(C,{type:"text",disabled:e,value:p,placeholder:t,onKeyPress:this.handleKeyPress,onChange:this.handleChange,onFocus:this.onFocus,visible:!u||f,ref:e=>this.filterSearch=e}),!Object(r.isEmpty)(w)&&i.a.createElement(O,{showResults:y},l&&a&&i.a.createElement(k,{key:"all"},i.a.createElement("label",{className:"input-checkbox-label"},i.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,onChange:this.onSelectAllClicked(w),ref:e=>this.selectAll=e}),i.a.createElement("span",null,T?o.unSelectAllText:o.selectAllText))),w.map((e,t)=>l?i.a.createElement(k,{key:`${e.id}-${t}`},i.a.createElement("label",{className:"input-checkbox-label"},i.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,checked:d(this.state.selectedItems,e,"id"),onChange:this.onListItemClick(e)}),h?h(e):i.a.createElement("span",null,e.label||e))):i.a.createElement(k,{key:`${e.id}-${t}`,onClick:this.onListItemClick(e)},h?h(e):i.a.createElement("span",null,e.label||e))))),s&&i.a.createElement(v,null,n)))}}S(w,"propTypes",{collection:o.a.arrayOf(o.a.oneOfType([o.a.string,o.a.shape({id:o.a.oneOfType([o.a.string,o.a.number]).isRequired,label:o.a.string.isRequired})])).isRequired,placeholder:o.a.string,isDisabled:o.a.bool,onListItemClick:o.a.func,asyncSearch:o.a.func,enableCache:o.a.bool,multi:o.a.bool,showLabelText:o.a.bool,closeOnSelect:o.a.bool,selectAll:o.a.shape({selectAllText:o.a.string,unSelectAllText:o.a.string}),enableSelectAll:o.a.bool,theme:o.a.object,renderListItem:o.a.func,onPressEnter:o.a.func,onBlur:o.a.func,onFocus:o.a.func,showError:o.a.bool,defaultError:o.a.string}),S(w,"defaultProps",{placeholder:"Choose an item",isDisabled:!1,showLabelText:!1,multi:!1,enableCache:!1,closeOnSelect:!0,theme:{disabledColor:"#DDDDDD",inputHeight:"34px",listMaxHeight:"500px",listPadding:"20px",listWidth:"100%",listTop:"30px",listLeft:"0px",listBg:"transparent"},selectAll:{selectAllText:"Select all",unSelectAllText:"Unselect all"},defaultError:"please select a valid label"});var T=w;t.default=T}])});