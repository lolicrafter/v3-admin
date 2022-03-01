"use strict";(self["webpackChunkv3_admin"]=self["webpackChunkv3_admin"]||[]).push([[729],{2885:function(e,i,n){n.d(i,{Z:function(){return m}});var s=n(6252),a=n(3577),t=n(2262),o=n(5879);const l={style:{"margin-bottom":"15px"}},r=(0,s._)("p",null,"切换权限：",-1);var d=(0,s.aZ)({emits:["change"],setup(e,{emit:i}){const n=(0,s.Fl)((()=>o.h.state.user.roles)),d=(0,t.iH)(n.value[0]);return(0,s.YP)(d,(async e=>{await o.h.dispatch("user/changeRoles",e),i("change")})),(e,i)=>{const o=(0,s.up)("el-radio-button"),u=(0,s.up)("el-radio-group");return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("div",l," 你的权限："+(0,a.zw)((0,t.SU)(n)),1),r,(0,s.Wm)(u,{modelValue:d.value,"onUpdate:modelValue":i[0]||(i[0]=e=>d.value=e)},{default:(0,s.w5)((()=>[(0,s.Wm)(o,{label:"editor"}),(0,s.Wm)(o,{label:"admin"})])),_:1},8,["modelValue"])])}}});const u=d;var m=u},2341:function(e,i,n){n.r(i),n.d(i,{default:function(){return O}});var s=n(6252),a=n(2262),t=n(5879);const o=e=>{if(e&&e instanceof Array&&e.length>0){const i=t.h.state.user.roles,n=e;return i.some((e=>n.includes(e)))}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1};var l=n(2885);const r={class:"app-container"},d={class:"permission-alert"},u=(0,s.Uk)(" Only "),m=(0,s.Uk)("admin"),c=(0,s.Uk)("can see this "),p=(0,s.Uk)(" v-permission=\"['admin']\" "),k={class:"permission-alert"},w=(0,s.Uk)(" Only "),f=(0,s.Uk)("editor"),y=(0,s.Uk)("can see this "),h=(0,s.Uk)(" v-permission=\"['editor']\" "),v={class:"permission-alert"},U=(0,s.Uk)(" Both "),g=(0,s.Uk)("admin"),_=(0,s.Uk)("and "),b=(0,s.Uk)("editor"),W=(0,s.Uk)("can see this "),C=(0,s.Uk)(" v-permission=\"['admin','editor']\" "),j=(0,s.Uk)(" 在某些情况下，不适合使用 v-permission。例如：Element 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。 "),D=(0,s.Uk)(" Admin can see this "),S=(0,s.Uk)(" v-if=\"checkPermission(['admin'])\" "),x=(0,s.Uk)(" Editor can see this "),P=(0,s.Uk)(" v-if=\"checkPermission(['editor'])\" "),Z=(0,s.Uk)(" Both admin or editor can see this "),q=(0,s.Uk)(" v-if=\"checkPermission(['admin','editor'])\" ");var A=(0,s.aZ)({setup(e){const i=(0,a.qj)({key:1,handleRolesChange:()=>{i.key++}});return(e,n)=>{const t=(0,s.up)("el-tag"),A=(0,s.up)("el-tab-pane"),E=(0,s.up)("el-tabs"),R=(0,s.Q2)("permission");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s.Wm)(l.Z,{onChange:(0,a.SU)(i).handleRolesChange},null,8,["onChange"]),((0,s.wg)(),(0,s.iD)("div",{key:(0,a.SU)(i).key,style:{"margin-top":"30px"}},[(0,s._)("div",null,[(0,s.wy)(((0,s.wg)(),(0,s.iD)("span",d,[u,(0,s.Wm)(t,null,{default:(0,s.w5)((()=>[m])),_:1}),c])),[[R,["admin"]]]),(0,s.wy)(((0,s.wg)(),(0,s.j4)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[p])),_:1})),[[R,["admin"]]])]),(0,s._)("div",null,[(0,s.wy)(((0,s.wg)(),(0,s.iD)("span",k,[w,(0,s.Wm)(t,null,{default:(0,s.w5)((()=>[f])),_:1}),y])),[[R,["editor"]]]),(0,s.wy)(((0,s.wg)(),(0,s.j4)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[h])),_:1})),[[R,["editor"]]])]),(0,s._)("div",null,[(0,s.wy)(((0,s.wg)(),(0,s.iD)("span",v,[U,(0,s.Wm)(t,null,{default:(0,s.w5)((()=>[g])),_:1}),_,(0,s.Wm)(t,null,{default:(0,s.w5)((()=>[b])),_:1}),W])),[[R,["admin","editor"]]]),(0,s.wy)(((0,s.wg)(),(0,s.j4)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[C])),_:1})),[[R,["admin","editor"]]])])])),((0,s.wg)(),(0,s.iD)("div",{key:"checkPermission"+(0,a.SU)(i).key,style:{"margin-top":"60px"}},[(0,s.Wm)(t,{type:"info"},{default:(0,s.w5)((()=>[j])),_:1}),(0,s.Wm)(E,{type:"border-card",style:{width:"550px","margin-top":"60px"}},{default:(0,s.w5)((()=>[(0,a.SU)(o)(["admin"])?((0,s.wg)(),(0,s.j4)(A,{key:0,label:"Admin"},{default:(0,s.w5)((()=>[D,(0,s.Wm)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[S])),_:1})])),_:1})):(0,s.kq)("",!0),(0,a.SU)(o)(["editor"])?((0,s.wg)(),(0,s.j4)(A,{key:1,label:"Editor"},{default:(0,s.w5)((()=>[x,(0,s.Wm)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[P])),_:1})])),_:1})):(0,s.kq)("",!0),(0,a.SU)(o)(["admin","editor"])?((0,s.wg)(),(0,s.j4)(A,{key:2,label:"Admin-OR-Editor"},{default:(0,s.w5)((()=>[Z,(0,s.Wm)(t,{class:"permission-sourceCode",type:"info"},{default:(0,s.w5)((()=>[q])),_:1})])),_:1})):(0,s.kq)("",!0)])),_:1})]))])}}}),E=n(3744);const R=(0,E.Z)(A,[["__scopeId","data-v-0678c392"]]);var O=R}}]);