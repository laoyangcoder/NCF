(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e44ed"],{9055:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"el-main"},[a("div",{staticClass:"admin-role"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleEdit}},[e._v("增加")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"角色名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.roleName)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"角色代码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.roleCode)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.adminRemark)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"说明"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.remark)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"添加时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.formaTableTime(t.row.addTime))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleRole(t.$index,t.row)}}},[e._v("权限")]),a("el-popconfirm",{attrs:{placement:"top",title:"确认删除此角色吗？"},on:{"on-confirm":function(a){return e.handleDelete(t.$index,t.row)}}},[a("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[e._v("删除")])],1)]}}])})],1),a("pagination",{attrs:{total:e.paginationQuery.total,page:e.listQuery.pageIndex,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"pageIndex",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.visible,"close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.dialog,"visible",t)}}},[a("el-form",{ref:"dataForm",staticStyle:{"max-width":"400px","margin-left":"50px"},attrs:{rules:e.dialog.rules,model:e.dialog.data,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入角色名称"},model:{value:e.dialog.data.roleName,callback:function(t){e.$set(e.dialog.data,"roleName",t)},expression:"dialog.data.roleName"}})],1),a("el-form-item",{attrs:{label:"角色代码",prop:"roleCode"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入角色代码"},model:{value:e.dialog.data.roleCode,callback:function(t){e.$set(e.dialog.data,"roleCode",t)},expression:"dialog.data.roleCode"}})],1),a("el-form-item",{attrs:{label:"是否启用"}},[a("el-switch",{model:{value:e.dialog.data.enabled,callback:function(t){e.$set(e.dialog.data,"enabled",t)},expression:"dialog.data.enabled"}})],1),a("el-form-item",{attrs:{label:"说明"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入说明"},model:{value:e.dialog.data.remark,callback:function(t){e.$set(e.dialog.data,"remark",t)},expression:"dialog.data.remark"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入备注信息"},model:{value:e.dialog.data.adminRemark,callback:function(t){e.$set(e.dialog.data,"adminRemark",t)},expression:"dialog.data.adminRemark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialog.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{loading:e.dialog.updateLoading,type:"primary"},on:{click:e.updateData}},[e._v("确 认")])],1)],1),a("el-dialog",{attrs:{title:"为  "+e.au.title+"  角色授权",visible:e.au.visible,"close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.au,"visible",t)}}},[a("el-tree",{ref:"tree",attrs:{data:e.allMenu,"show-checkbox":"",props:e.defaultProps,"default-expanded-keys":e.defaultExpandedKeys,"default-checked-keys":e.defaultCheckedKeys,"node-key":"id"}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.au.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{loading:e.au.updateLoading,type:"primary"},on:{click:e.auUpdateData}},[e._v("确 认")])],1)],1)],1)])},l=[],n=a("7580"),r=(a("96cf"),a("d81d"),a("4de4"),a("d3b7"),a("99af"),{name:"Index",data:function(){return{paginationQuery:{total:5},listQuery:{pageIndex:1,pageSize:20,roleName:"",orderField:""},tableData:[],dialog:{title:"新增角色",visible:!1,data:{roleName:"",roleCode:"",adminRemark:"",remark:"",addTime:"",id:"",enabled:!1},rules:{roleName:[{required:!0,message:"角色名称为必填项",trigger:"blur"}],roleCode:[{required:!0,message:"角色代码为必填项",trigger:"blur"}]},updateLoading:!1},defaultProps:{children:"children",label:"menuName"},au:{title:"",visible:!1,updateLoading:!1,temp:{}},allMenu:[],currMenu:[],defaultExpandedKeys:[],defaultCheckedKeys:[],parentArr:[]}},watch:{"dialog.visible":function(e,t){e||(this.dialog.data={roleName:"",roleCode:"",adminRemark:"",remark:"",addTime:"",id:""},this.dialog.updateLoading=!1)},"au.visible":function(e,t){e||(this.currMenu=[],this.defaultCheckedKeys=[],this.defaultExpandedKeys=[],this.au.updateLoading=!1)}},created:function(){this.getList()},methods:{handleRole:function(e,t){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i,l,n,r,o,d,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.au={title:t.roleName,visible:!0,temp:t},e.next=3,service.get("/Admin/Role/Permission?handler=RolePermission&roleId=".concat(t.id));case 3:return i=e.sent,a.currMenu=i.data.data,l=[],a.currMenu.map((function(e){l.push(e.permissionId)})),e.next=9,service.get("/Admin/Menu/Edit?handler=menu");case 9:n=e.sent,r=n.data.data,o=[],d=[],a.ddd(r,null,o,d),a.allMenu=o,s=[],d.map((function(e){l.map((function(t){e!==t&&d.indexOf(t)<0&&s.indexOf(t)<0&&s.push(t)}))})),a.defaultCheckedKeys=s;case 18:case"end":return e.stop()}}),e)})))()},ddd:function(e,t,a,i){var l=e.filter((function(e){return e.parentId===t}));for(var n in l){var r=l[n];r.children=[],a.push(r),this.ddd(e,r.id,r.children,i),r.children.length>0&&i.push(r.id)}},auUpdateData:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,i,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.au.updateLoading=!0,a=e.$refs.tree.getCheckedNodes(!1,!0),i=[],a.map((function(t){i.push({PermissionId:t.id,roleId:e.au.temp.id,isMenu:t.isMenu,roleCode:t.resourceCode})})),t.next=6,service.post("/Admin/Role/Permission",i);case 6:l=t.sent,l.data.success&&(e.getList(),e.$notify({title:"Success",message:"授权成功",type:"success",duration:800,onClose:function(){app.au.visible=!1,app.au.updateLoading=!1,window.location.reload()}}));case 8:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this,t=this.listQuery,a=t.pageIndex,i=t.pageSize,l=t.roleName,n=t.orderField;service.get("/Admin/Role/index?handler=List&pageIndex=".concat(a,"&pageSize=").concat(i,"&roleName=").concat(l,"&orderField=").concat(n)).then((function(t){e.tableData=t.data.data.list,e.paginationQuery.total=t.data.data.totalCount}))},handleEdit:function(e,t){if(this.dialog.visible=!0,t){var a=t.roleName,i=t.roleCode,l=t.adminRemark,n=t.remark,r=t.addTime,o=t.id,d=t.enabled;this.dialog.data={roleName:a,roleCode:i,adminRemark:l,remark:n,addTime:r,id:o,enabled:d},this.dialog.title="编辑角色"}else this.dialog.title="新增角色"},updateData:function(){var e=this;this.dialog.updateLoading=!0,this.$refs["dataForm"].validate((function(t){if(t){var a=e.dialog.data,i=a.id,l=a.roleName,n=a.roleCode,r=a.adminRemark,o=a.remark,d=a.enabled,s={id:i,roleName:l,roleCode:n,adminRemark:r,remark:o,enabled:d};service.post("/Admin/Role/Edit?handler=Save",s).then((function(t){t.data.success&&(e.getList(),e.$notify({title:"Success",message:"成功",type:"success",duration:2e3}),e.dialog.visible=!1,e.dialog.updateLoading=!1)}))}}))},handleDelete:function(e,t){var a=this,i=[t.id];service.post("/Admin/Role/Index?handler=Delete",i).then((function(e){e.data.success&&(a.getList(),a.$notify({title:"Success",message:"删除成功",type:"success",duration:2e3}))}))}}}),o=r,d=a("2877"),s=Object(d["a"])(o,i,l,!1,null,"2207b0be",null);t["default"]=s.exports}}]);