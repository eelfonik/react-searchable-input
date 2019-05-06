!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("lodash"),require("styled-components")):"function"==typeof define&&define.amd?define(["react","lodash","styled-components"],t):"object"==typeof exports?exports.reactSearchableInput=t(require("react"),require("lodash"),require("styled-components")):e.reactSearchableInput=t(e.React,e._,e.styled)}(window,function(e,t,s){return function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t,s){e.exports=s(4)()},function(t,s){t.exports=e},function(e,s){e.exports=t},function(e,t){e.exports=s},function(e,t,s){"use strict";var i=s(5);function n(){}function l(){}l.resetWarningCache=n,e.exports=function(){function e(e,t,s,n,l,o){if(o!==i){var r=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw r.name="Invariant Violation",r}}function t(){return e}e.isRequired=e;var s={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:n};return s.PropTypes=s,s}},function(e,t,s){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,s){"use strict";s.r(t);var i=s(1),n=s.n(i),l=s(0),o=s.n(l),r=s(2);class a extends i.Component{constructor(...e){var t,s,i;super(...e),i=(e=>{this.component.contains(e.target)||this.props.handleOutsideClick&&this.props.handleOutsideClick()}),(s="handleOutsideClick")in(t=this)?Object.defineProperty(t,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[s]=i}componentDidMount(){document.body.addEventListener("click",this.handleOutsideClick)}componentWillUnmount(){document.body.removeEventListener("click",this.handleOutsideClick)}render(){return n.a.createElement("div",{ref:e=>{this.component=e}},this.props.children)}}a.propTypes={handleOutsideClick:o.a.func,children:o.a.node};var c=a;const h=e=>t=>t[e]?t[e].toString():t,u=e=>t=>t.map(e),p=e=>(t,s)=>d(t,s,e)?function(e,t,s){const i=h(s);return e.filter(e=>!Object(r.isEqual)(i(e),i(t)))}(t,s,e):m(t,s);function d(e,t,s){const i=h(s);return!!u(i)(e).find(e=>Object(r.isEqual)(e,i(t)))}const m=(e,t)=>[...e,t];var f=(e,t,s)=>{const i=e.find(e=>e.query===t&&Object(r.isEqual)(e.data,s))?e:[...e.filter(e=>e.query!==t),{query:t,data:s}];return i.length>10?Object(r.drop)(i):i},b=s(3),y=s.n(b);const g=y.a.div`
  position: relative;
  min-height: ${e=>e.theme.itemHeight};
  width: 100%;
`,x=y.a.div`
  cursor: pointer;
  width: 100%;
  height: ${e=>e.theme.itemHeight};
  line-height: ${e=>e.theme.itemHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${e=>e.disabled?e.thems.disabledColor:"inherit"};
  opacity: ${e=>e.visible?1:0};
`,C=y.a.input`
  opacity: ${e=>e.visible?1:0};
  display: inline-block;
  width: 100%;
  height: ${e=>e.theme.itemHeight};
  line-height: ${e=>e.theme.itemHeight};
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
`,k=y.a.ul`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  background: inherit;
  padding-top: ${e=>e.hasTop?e.theme.itemHeight:"0px"};
  max-height: ${e=>e.showResults?e.theme.listMaxHeight:"0px"};
  overflow: scroll;
  color: inherit;
`,O=y.a.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  cursor: pointer;
  line-height: ${e=>e.theme.itemHeight};
`,v=y.a.span`
  font-size: 0.8em;
  color: #ff0000;
`;function S(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const E=()=>{};class w extends i.Component{constructor(e){super(e),S(this,"handleOutsideClick",()=>{this.props.onBlur&&this.props.onBlur(),this.setState({focused:!1,showResults:!1})}),S(this,"handleChange",e=>{const t=e.target.value;this.setState({input:t,selectedItems:this.props.multi?this.state.selectedItems:[],showResults:!0}),this.asyncSearch&&!this.searchCache.find(e=>e.query===t)&&this.asyncSearch(t)}),S(this,"onListItemClick",e=>()=>{this.setState({focused:!1,selectedItems:this.props.multi?this.props.collection.filter(t=>d(p("id")(this.state.selectedItems,e),t,"id")):[e]},this.afterItemChanged)}),S(this,"afterItemChanged",()=>{this.setState({showResults:this.props.multi||!this.props.closeOnSelect}),this.props.onListItemClick&&this.props.onListItemClick(this.state.selectedItems)}),S(this,"handleKeyPress",e=>{13===(e.keyCode||e.charCode||0)&&(e.preventDefault(),this.props.onPressEnter&&this.props.onPressEnter(e.target.value))}),S(this,"onSelectAllClicked",e=>()=>{this.setState({selectedItems:this.selectAll.checked?e:Object(r.without)(this.props.collection,...e)},this.afterItemChanged)}),S(this,"onFocus",e=>{this.props.onFocus&&this.props.onFocus(e),this.setState({showResults:!0,focused:!0})}),S(this,"showDropdown",()=>{this.filterSearch.focus(),this.setState({showResults:!0,focused:!0})}),this.asyncSearch=this.props.asyncSearch?this.props.enableCache?Object(r.throttle)(this.props.asyncSearch,300):this.props.asyncSearch:E,this.searchCache=[],this.state={input:"",focused:!1,selectedItems:[],showResults:!1}}render(){const{isDisabled:e,placeholder:t,showError:s,defaultError:i,multi:l,selectAll:o,enableSelectAll:a,renderListItem:h,showLabelText:u}=this.props,{input:p,focused:m,showResults:y,selectedItems:S}=this.state,E=""===p||this.props.asyncSearch?this.props.collection:this.props.collection.filter(e=>{const t=e.label||e;return Object(r.includes)(t,p)||Object(r.includes)(t.toLowerCase(),p)});this.props.enableCache&&(this.searchCache=f(this.searchCache,p,E));let w=!1;if(this.selectAll){const e=S.length===E.length;this.selectAll.checked=e,this.selectAll.indeterminate=S.length&&!e,w=e}return n.a.createElement(b.ThemeProvider,{theme:this.props.theme},n.a.createElement(g,null,u&&n.a.createElement(x,{onClick:e?null:this.showDropdown,disabled:e,visible:!m},(()=>S.length?l?`${S.length} selected`:S[0].label||S[0]:t)()),n.a.createElement(c,{handleOutsideClick:this.handleOutsideClick},n.a.createElement(C,{type:"text",disabled:e,value:p,placeholder:t,onKeyPress:this.handleKeyPress,onChange:this.handleChange,onFocus:this.onFocus,visible:!u||m,ref:e=>this.filterSearch=e}),!Object(r.isEmpty)(E)&&n.a.createElement(k,{showResults:y,hasTop:!u},l&&a&&n.a.createElement(O,{key:"all"},n.a.createElement("label",{className:"input-checkbox-label"},n.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,onChange:this.onSelectAllClicked(E),ref:e=>this.selectAll=e}),n.a.createElement("span",null,w?o.unSelectAllText:o.selectAllText))),E.map((e,t)=>l?n.a.createElement(O,{key:`${e.id}-${t}`},n.a.createElement("label",{className:"input-checkbox-label"},n.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,checked:d(this.state.selectedItems,e,"id"),onChange:this.onListItemClick(e)}),h?h(e):n.a.createElement("span",null,e.label||e))):n.a.createElement(O,{key:`${e.id}-${t}`,onClick:this.onListItemClick(e)},h?h(e):n.a.createElement("span",null,e.label||e))))),s&&n.a.createElement(v,null,i)))}}S(w,"propTypes",{collection:o.a.arrayOf(o.a.oneOfType([o.a.string,o.a.shape({id:o.a.oneOfType([o.a.string,o.a.number]).isRequired,label:o.a.string.isRequired})])).isRequired,placeholder:o.a.string,isDisabled:o.a.bool,onListItemClick:o.a.func,asyncSearch:o.a.func,enableCache:o.a.bool,multi:o.a.bool,showLabelText:o.a.bool,closeOnSelect:o.a.bool,selectAll:o.a.shape({selectAllText:o.a.string,unSelectAllText:o.a.string}),enableSelectAll:o.a.bool,theme:o.a.object,renderListItem:o.a.func,onPressEnter:o.a.func,onBlur:o.a.func,onFocus:o.a.func,showError:o.a.bool,defaultError:o.a.string}),S(w,"defaultProps",{placeholder:"Choose an item",isDisabled:!1,showLabelText:!1,multi:!1,enableCache:!1,closeOnSelect:!0,theme:{disabledColor:"#DDDDDD",itemHeight:"34px",listMaxHeight:"500px"},selectAll:{selectAllText:"Select all",unSelectAllText:"Unselect all"},defaultError:"please select a valid label"});var T=w;t.default=T}])});