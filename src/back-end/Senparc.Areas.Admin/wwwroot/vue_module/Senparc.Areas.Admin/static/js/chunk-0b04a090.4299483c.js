(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b04a090"],{"0c99":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"el-main"},[a("div",{staticClass:"admin-tenant-info"},[a("div",[a("h2",{staticClass:"tenant-list"},[e._v("当前租户信息")]),a("el-row",{directives:[{name:"show",rawName:"v-show",value:!e.enableMultiTenant,expression:"!enableMultiTenant"}],attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("当前系统已关闭多租户")])])],1),a("el-row",{directives:[{name:"show",rawName:"v-show",value:e.enableMultiTenant,expression:"enableMultiTenant"}],attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("当前系统匹配规则："),a("span",[e._v(e._s(e.tenantRule))])])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("名称："),a("span",[e._v(e._s(e.requestTenantInfo.name)+" "),a("span",{staticClass:"float-right"},[e._v("(ID:"+e._s(e.requestTenantInfo.id)+")")])])])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("匹配关键字："),a("span",[e._v(e._s(e.requestTenantInfo.tenantKey))])])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("匹配时间："),a("span",[e._v(e._s(e.requestTenantInfo.beginTime))])])])],1)],1),a("h2",{staticClass:"current-tenant-info"},[e._v("多租户信息")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"id(TentanId)",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.id)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"租户名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.name)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"匹配规则"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.tenantKey)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"添加时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.formaTableTime(t.row.addTime))+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"管理员备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.adminRemark)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"启用",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.enable)+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")])]}}])},[[a("el-popconfirm",{attrs:{placement:"top",title:"确认删除此租户吗？删除后所有租户信息将处于游离状态，请谨慎操作！"},on:{"on-confirm":function(t){return e.handleDelete(e.scope.$index,e.scope.row)}}},[a("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[e._v("删除")])],1)]],2)],1),a("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.visible,"close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[a("el-form",{ref:"dataForm",staticStyle:{"max-width":"400px","margin-left":"50px"},attrs:{rules:e.dialog.rules,model:e.dialog.data,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"租户名称",error:e.dialog.nameError,prop:"name"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入租户名称"},model:{value:e.dialog.data.name,callback:function(t){e.$set(e.dialog.data,"name",t)},expression:"dialog.data.name"}})],1),a("el-form-item",{attrs:{label:"租户匹配关键字",error:e.dialog.tenantKeyError,prop:"tenantKey"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入租户匹配关键字"},model:{value:e.dialog.data.tenantKey,callback:function(t){e.$set(e.dialog.data,"tenantKey",t)},expression:"dialog.data.tenantKey"}})],1),a("el-form-item",{attrs:{label:"管理员备注",prop:"adminRemark"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入管理员备注"},model:{value:e.dialog.data.adminRemark,callback:function(t){e.$set(e.dialog.data,"adminRemark",t)},expression:"dialog.data.adminRemark"}})],1),a("el-form-item",{attrs:{label:"是否启用"}},[a("el-switch",{model:{value:e.dialog.data.enable,callback:function(t){e.$set(e.dialog.data,"enable",t)},expression:"dialog.data.enable"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialog.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{loading:e.dialog.updateLoading,type:"primary"},on:{click:e.updateData}},[e._v("确 认")])],1)],1)],1)])},i=[],l=(a("99af"),a("b0c0"),{name:"Index",data:function(){return{paginationQuery:{total:5},listQuery:{pageIndex:1,pageSize:20,adminUserInfoName:""},tableData:[],requestTenantInfo:{},tenantRule:"",enableMultiTenant:!0,dialog:{title:"新增租户信息",visible:!1,data:{id:0,name:"",tenantKey:"",adminRemark:"",enable:!0},rules:{name:[{required:!0,message:"租户名称为必填项",trigger:"blur"}],tenantKey:[{required:!0,message:"租户匹配规则为必填项",trigger:"blur"}]},updateLoading:!1,updateLoadingSet:!1,nameError:"",tenantKeyError:""}}},computed:{},watch:{"dialog.visible":function(e,t){e||(this.dialog.data={id:0,name:"",tenantKey:"",adminRemark:"",enable:!0},this.dialog.nameError="",this.dialog.tenantKeyError="",this.dialog.updateLoading=!1,this.$refs["dataForm"].resetFields())}},created:function(){this.getList(),this.getRequestTenantInfo()},methods:{getList:function(){var e=this,t=this.listQuery,a=t.pageIndex,n=t.pageSize;service.get("/Admin/TenantInfo/index?handler=List&pageIndex=".concat(a,"&pageSize=").concat(n)).then((function(t){e.tableData=t.data.data.list,e.paginationQuery.total=t.data.data.totalCount}))},handleEdit:function(e,t){if(this.dialog.visible=!0,t){var a=t.id,n=t.name,i=t.tenantKey,l=t.adminRemark,s=t.enable;this.dialog.data={id:a,name:n,tenantKey:i,adminRemark:l,enable:s},this.dialog.title="编辑租户信息",this.dialog=Object.assign({},this.dialog)}else this.dialog.title="新增租户信息"},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){e.dialog.updateLoading=!0;var a={Id:e.dialog.data.id,Name:e.dialog.data.name,TenantKey:e.dialog.data.tenantKey,AdminRemark:e.dialog.data.adminRemark,Enable:e.dialog.data.enable};service.post("/Admin/TenantInfo/Index?handler=Save",a).then((function(t){t.data.success&&(e.getList(),e.$notify({title:"Success",message:t.data.msg,type:"success",duration:2e3}),e.dialog.visible=!1,e.dialog.updateLoading=!1)})).catch((function(t){e.dialog.updateLoading=!1}))}}))},handleDelete:function(e,t){var a=this,n=[t.id];service.post("/Admin/TenantInfo/Index?handler=Delete",n).then((function(e){e.data.success&&(a.getList(),a.$notify({title:"Success",message:"删除成功",type:"success",duration:2e3}))}))},getRequestTenantInfo:function(){var e=this;service.get("/Admin/TenantInfo/Index?handler=RequestTenantInfo").then((function(t){t.data.success&&(e.requestTenantInfo=t.data.data.requestTenantInfo,e.tenantRule=t.data.data.tenantRule,e.enableMultiTenant=t.data.data.enableMultiTenant)}))}}}),s=l,o=(a("641a"),a("2877")),r=Object(o["a"])(s,n,i,!1,null,"7931e750",null);t["default"]=r.exports},1812:function(e,t,a){},"641a":function(e,t,a){"use strict";a("1812")}}]);