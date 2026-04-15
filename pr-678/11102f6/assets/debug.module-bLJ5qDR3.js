import{n as a,p as T,y as P}from"./index-uvQU51rw.js";typeof window<"u"&&window.__PREACT_DEVTOOLS__&&window.__PREACT_DEVTOOLS__.attachPreact("10.5.12",a,{Fragment:P,Component:T});var x={};function J(){x={}}function m(r){return r.type===P?"Fragment":typeof r.type=="function"?r.type.displayName||r.type.name:typeof r.type=="string"?r.type:"#text"}var E=[],g=[];function M(){return E.length>0?E[E.length-1]:null}var U=!1;function j(r){return typeof r.type=="function"&&r.type!=P}function c(r){for(var l=[r],f=r;f.__o!=null;)l.push(f.__o),f=f.__o;return l.reduce(function(u,d){u+="  in "+m(d);var s=d.__source;return s?u+=" (at "+s.fileName+":"+s.lineNumber+")":U||(U=!0,console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")),u+`
`},"")}var R=typeof WeakMap=="function",D=T.prototype.setState;T.prototype.setState=function(r,l){return this.__v==null?this.state==null&&console.warn(`Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.

`+c(M())):this.__P==null&&console.warn(`Can't call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

`+c(this.__v)),D.call(this,r,l)};var Y=T.prototype.forceUpdate;function y(r){var l=r.props,f=m(r),u="";for(var d in l)if(l.hasOwnProperty(d)&&d!=="children"){var s=l[d];typeof s=="function"&&(s="function "+(s.displayName||s.name)+"() {}"),s=Object(s)!==s||s.toString?s+"":Object.prototype.toString.call(s),u+=" "+d+"="+JSON.stringify(s)}var k=l.children;return"<"+f+u+(k&&k.length?">..</"+f+">":" />")}T.prototype.forceUpdate=function(r){return this.__v==null?console.warn(`Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.

`+c(M())):this.__P==null&&console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

`+c(this.__v)),Y.call(this,r)},(function(){(function(){var e=a.__b,t=a.diffed,o=a.__,i=a.vnode,p=a.__r;a.diffed=function(n){j(n)&&g.pop(),E.pop(),t&&t(n)},a.__b=function(n){j(n)&&E.push(n),e&&e(n)},a.__=function(n,v){g=[],o&&o(n,v)},a.vnode=function(n){n.__o=g.length>0?g[g.length-1]:null,i&&i(n)},a.__r=function(n){j(n)&&g.push(n),p&&p(n)}})();var r=!1,l=a.__b,f=a.diffed,u=a.vnode,d=a.__e,s=a.__,k=a.__h,O=R?{useEffect:new WeakMap,useLayoutEffect:new WeakMap,lazyPropTypes:new WeakMap}:null,w=[];a.__e=function(e,t,o){if(t&&t.__c&&typeof e.then=="function"){var i=e;e=new Error("Missing Suspense. The throwing component was: "+m(t));for(var p=t;p;p=p.__)if(p.__c&&p.__c.__c){e=i;break}if(e instanceof Error)throw e}try{d(e,t,o),typeof e.then!="function"&&setTimeout(function(){throw e})}catch(n){throw n}},a.__=function(e,t){if(!t)throw new Error(`Undefined parent passed to render(), this is the second argument.
Check if the element is available in the DOM/has the correct id.`);var o;switch(t.nodeType){case 1:case 11:case 9:o=!0;break;default:o=!1}if(!o){var i=m(e);throw new Error("Expected a valid HTML node as a second argument to render.	Received "+t+" instead: render(<"+i+" />, "+t+");")}s&&s(e,t)},a.__b=function(e){var t=e.type,o=(function h(_){return _?typeof _.type=="function"?h(_.__):_:{}})(e.__);if(r=!0,t===void 0)throw new Error(`Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports`+y(e)+`

`+c(e));if(t!=null&&typeof t=="object")throw t.__k!==void 0&&t.__e!==void 0?new Error("Invalid type passed to createElement(): "+t+`

Did you accidentally pass a JSX literal as JSX twice?

  let My`+m(e)+" = "+y(t)+`;
  let vnode = <My`+m(e)+` />;

This usually happens when you export a JSX literal and not the component.

`+c(e)):new Error("Invalid type passed to createElement(): "+(Array.isArray(t)?"array":t));if(t!=="thead"&&t!=="tfoot"&&t!=="tbody"||o.type==="table"?t==="tr"&&o.type!=="thead"&&o.type!=="tfoot"&&o.type!=="tbody"&&o.type!=="table"?console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent."+y(e)+`

`+c(e)):t==="td"&&o.type!=="tr"?console.error("Improper nesting of table. Your <td> should have a <tr> parent."+y(e)+`

`+c(e)):t==="th"&&o.type!=="tr"&&console.error("Improper nesting of table. Your <th> should have a <tr>."+y(e)+`

`+c(e)):console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent."+y(e)+`

`+c(e)),e.ref!==void 0&&typeof e.ref!="function"&&typeof e.ref!="object"&&!("$$typeof"in e))throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [`+typeof e.ref+`] instead
`+y(e)+`

`+c(e));if(typeof e.type=="string"){for(var i in e.props)if(i[0]==="o"&&i[1]==="n"&&typeof e.props[i]!="function"&&e.props[i]!=null)throw new Error(`Component's "`+i+'" property should be a function, but got ['+typeof e.props[i]+`] instead
`+y(e)+`

`+c(e))}if(typeof e.type=="function"&&e.type.propTypes){if(e.type.displayName==="Lazy"&&O&&!O.lazyPropTypes.has(e.type)){var p="PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";try{var n=e.type();O.lazyPropTypes.set(e.type,!0),console.warn(p+"Component wrapped in lazy() is "+m(n))}catch{console.warn(p+"We will log the wrapped component's name once it is loaded.")}}var v=e.props;e.type.__f&&delete(v=(function(h,_){for(var C in _)h[C]=_[C];return h})({},v)).ref,(function(h,_,C,A,I){Object.keys(h).forEach(function(N){var b;try{b=h[N](_,N,A,"prop",null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(L){b=L}!b||b.message in x||(x[b.message]=!0,console.error("Failed prop type: "+b.message+(I&&`
`+I()||"")))})})(e.type.propTypes,v,0,m(e),function(){return c(e)})}l&&l(e)},a.__h=function(e,t,o){if(!e||!r)throw new Error("Hook can only be invoked from render methods.");k&&k(e,t,o)};var S=function(e,t){return{get:function(){var o="get"+e+t;w&&w.indexOf(o)<0&&(w.push(o),console.warn("getting vnode."+e+" is deprecated, "+t))},set:function(){var o="set"+e+t;w&&w.indexOf(o)<0&&(w.push(o),console.warn("setting vnode."+e+" is not allowed, "+t))}}},W={nodeName:S("nodeName","use vnode.type"),attributes:S("attributes","use vnode.props"),children:S("children","use vnode.props.children")},z=Object.create({},W);a.vnode=function(e){var t=e.props;if(e.type!==null&&t!=null&&("__source"in t||"__self"in t)){var o=e.props={};for(var i in t){var p=t[i];i==="__source"?e.__source=p:i==="__self"?e.__self=p:o[i]=p}}e.__proto__=z,u&&u(e)},a.diffed=function(e){if(e.__k&&e.__k.forEach(function(n){if(n&&n.type===void 0){delete n.__,delete n.__b;var v=Object.keys(n).join(",");throw new Error("Objects are not valid as a child. Encountered an object with the keys {"+v+`}.

`+c(e))}}),r=!1,f&&f(e),e.__k!=null)for(var t=[],o=0;o<e.__k.length;o++){var i=e.__k[o];if(i&&i.key!=null){var p=i.key;if(t.indexOf(p)!==-1){console.error('Following component has two or more children with the same key attribute: "'+p+`". This may cause glitches and misbehavior in rendering process. Component: 

`+y(e)+`

`+c(e));break}t.push(p)}}}})();export{J as resetPropWarnings};
