!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("lodash"),require("styled-components")):"function"==typeof define&&define.amd?define(["react","lodash","styled-components"],t):"object"==typeof exports?exports.reactSearchableInput=t(require("react"),require("lodash"),require("styled-components")):e.reactSearchableInput=t(e.React,e._,e.styled)}(window,function(e,t,s){return function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t,s){e.exports=s(4)()},function(t,s){t.exports=e},function(e,s){e.exports=t},function(e,t){e.exports=s},function(e,t,s){"use strict";var i=s(5);function n(){}function o(){}o.resetWarningCache=n,e.exports=function(){function e(e,t,s,n,o,l){if(l!==i){var r=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw r.name="Invariant Violation",r}}function t(){return e}e.isRequired=e;var s={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:n};return s.PropTypes=s,s}},function(e,t,s){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,s){"use strict";s.r(t);var i=s(1),n=s.n(i),o=s(0),l=s.n(o),r=s(2);class a extends i.Component{constructor(...e){var t,s,i;super(...e),i=(e=>{this.component.contains(e.target)||this.props.handleOutsideClick&&this.props.handleOutsideClick()}),(s="handleOutsideClick")in(t=this)?Object.defineProperty(t,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[s]=i}componentDidMount(){document.body.addEventListener("click",this.handleOutsideClick)}componentWillUnmount(){document.body.removeEventListener("click",this.handleOutsideClick)}render(){return n.a.createElement("div",{ref:e=>{this.component=e}},this.props.children)}}a.propTypes={handleOutsideClick:l.a.func,children:l.a.node};var c=a;const h=e=>t=>t[e]?t[e].toString():t,u=e=>t=>t.map(e),p=e=>(t,s)=>d(t,s,e)?function(e,t,s){const i=h(s);return e.filter(e=>!Object(r.isEqual)(i(e),i(t)))}(t,s,e):m(t,s);function d(e,t,s){const i=h(s);return!!u(i)(e).find(e=>Object(r.isEqual)(e,i(t)))}const m=(e,t)=>[...e,t];var f=(e,t,s)=>{const i=e.find(e=>e.query===t&&Object(r.isEqual)(e.data,s))?e:[...e.filter(e=>e.query!==t),{query:t,data:s}];return i.length>10?Object(r.drop)(i):i},b=s(3),y=s.n(b);const g=y.a.div`
  position: relative;
  min-height: ${e=>e.theme.itemHeight};
  width: 100%;
`,C=y.a.div`
  cursor: pointer;
  width: 100%;
  height: ${e=>e.theme.itemHeight};
  line-height: ${e=>e.theme.itemHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${e=>e.disabled?e.thems.disabledColor:"inherit"};
  opacity: ${e=>e.visible?1:0};
`,x=y.a.input`
  opacity: ${e=>e.visible?1:0};
  display: inline-block;
  width: 100%;
  height: ${e=>e.theme.itemHeight};
  line-height: ${e=>e.theme.itemHeight};
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: 0;
  border-bottom: 1px solid ${e=>e.theme.mainColor};
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
  width: 100%;
  box-sizing: border-box;
  background: inherit;
  padding-top: ${e=>e.hasTop?e.theme.itemHeight:"0px"};
  max-height: ${e=>e.showResults?e.theme.listMaxHeight:"0px"};
  overflow: scroll;
  color: inherit;
`,k=y.a.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  line-height: ${e=>e.theme.itemHeight};
`,S=y.a.span`
  font-size: 0.8em;
  color: #ff0000;
`;function v(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const E=()=>{};class w extends i.Component{constructor(e){super(e),v(this,"handleOutsideClick",()=>{this.props.onBlur&&this.props.onBlur(),this.setState({focused:!1,showResults:!1})}),v(this,"handleChange",e=>{const t=e.target.value;this.setState({input:t,selectedItems:this.props.multi?this.state.selectedItems:[],showResults:!0}),this.asyncSearch&&!this.searchCache.find(e=>e.query===t)&&this.asyncSearch(t)}),v(this,"onListItemClick",e=>()=>{this.setState({focused:!1,selectedItems:this.props.multi?this.props.collection.filter(t=>d(p("id")(this.state.selectedItems,e),t,"id")):[e]},this.afterItemChanged)}),v(this,"afterItemChanged",()=>{this.setState({showResults:Object(r.isBoolean)(this.props.multi)?this.props.multi:!!Object(r.isBoolean)(this.props.closeOnSelect)&&!this.props.closeOnSelect}),this.props.onListItemClick&&this.props.onListItemClick(this.state.selectedItems)}),v(this,"handleKeyPress",e=>{13===(e.keyCode||e.charCode||0)&&(e.preventDefault(),this.props.onPressEnter&&this.props.onPressEnter(e.target.value))}),v(this,"onSelectAllClicked",e=>()=>{this.selectAll.checked?this.setState({selectedItems:e},this.afterItemChanged):this.setState({selectedItems:Object(r.without)(this.props.collection,...e)},this.afterItemChanged)}),v(this,"onFocus",e=>{this.props.onFocus&&this.props.onFocus(e),this.setState({showResults:!0,focused:!0})}),v(this,"showDropdown",()=>{this.filterSearch.focus(),this.setState({showResults:!0,focused:!0})}),this.asyncSearch=this.props.asyncSearch?this.props.enableCache?Object(r.throttle)(this.props.asyncSearch,300):this.props.asyncSearch:E,this.searchCache=[],this.state={input:"",focused:!1,selectedItems:[],showResults:!1}}render(){const{isDisabled:e,placeholder:t,showError:s,defaultError:i,multi:o,selectAll:l,enableSelectAll:a,renderListItem:h,showLabelText:u}=this.props,{input:p,focused:m,showResults:y,selectedItems:v}=this.state,E=""===p||this.props.asyncSearch?this.props.collection:this.props.collection.filter(e=>{const t=e.label||e;return Object(r.includes)(t,p)||Object(r.includes)(t.toLowerCase(),p)});this.props.enableCache&&(this.searchCache=f(this.searchCache,p,E));let w=!1;if(this.selectAll){const e=v.length===E.length;this.selectAll.checked=e,this.selectAll.indeterminate=v.length&&!e,w=e}return n.a.createElement(b.ThemeProvider,{theme:this.props.theme},n.a.createElement(g,null,u&&n.a.createElement(C,{onClick:e?null:this.showDropdown,disabled:e,visible:!m},(()=>v.length?o?`${v.length} selected`:v[0].label||v[0]:t)()),n.a.createElement(c,{handleOutsideClick:this.handleOutsideClick},n.a.createElement(x,{type:"text",disabled:e,value:p,placeholder:t,mainColor:this.props.theme.mainColor,onKeyPress:this.handleKeyPress,onChange:this.handleChange,onFocus:this.onFocus,visible:!u||m,ref:e=>this.filterSearch=e}),!Object(r.isEmpty)(E)&&n.a.createElement(O,{showResults:y,hasTop:!u},o&&a&&n.a.createElement(k,{key:"all"},n.a.createElement("label",{className:"input-checkbox-label"},n.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,onChange:this.onSelectAllClicked(E),ref:e=>this.selectAll=e}),n.a.createElement("span",null,w?l.unSelectAllText:l.selectAllText))),E.map((e,t)=>o?n.a.createElement(k,{key:`${e.id}-${t}`},n.a.createElement("label",{className:"input-checkbox-label"},n.a.createElement("input",{type:"checkbox",className:"input-checkbox",disabled:!1,checked:d(this.state.selectedItems,e,"id"),onChange:this.onListItemClick(e)}),h?h(e):n.a.createElement("span",null,e.label||e))):n.a.createElement(k,{key:`${e.id}-${t}`,onClick:this.onListItemClick(e)},h?h(e):n.a.createElement("span",null,e.label||e))))),s&&n.a.createElement(S,null,i)))}}v(w,"propTypes",{collection:l.a.arrayOf(l.a.oneOfType([l.a.string,l.a.shape({id:l.a.oneOfType([l.a.string,l.a.number]).isRequired,label:l.a.string.isRequired})])).isRequired,placeholder:l.a.string,isDisabled:l.a.bool,onListItemClick:l.a.func,asyncSearch:l.a.func,enableCache:l.a.bool,multi:l.a.bool,showLabelText:l.a.bool,closeOnSelect:l.a.bool,selectAll:l.a.shape({selectAllText:l.a.string,unSelectAllText:l.a.string}),enableSelectAll:l.a.bool,theme:l.a.object,renderListItem:l.a.func,onPressEnter:l.a.func,onBlur:l.a.func,onFocus:l.a.func,showError:l.a.bool,defaultError:l.a.string}),v(w,"defaultProps",{placeholder:"Choose an item",isDisabled:!1,showLabelText:!1,multi:!1,enableCache:!1,closeOnSelect:!0,theme:{mainColor:"#F0F1F2",disabledColor:"#DDDDDD",itemHeight:"34px",listMaxHeight:"500px"},selectAll:{selectAllText:"Select all",unSelectAllText:"Unselect all"},defaultError:"please select a valid label"});var I=w;t.default=I}])});