"use strict";!function(e,s){void 0!==e&&e.controller("CreateDeployCollectionCtr",["$scope","$domeUser","$domeDeployCollection","dialog","$state",function(e,s,r,t,l){e.$emit("pageTitle",{title:"新建服务",descrition:"在这里您可以新建一个服务。",mod:"user"}),e.resourceType="DEPLOY_COLLECTION",e.selectedUsers=[],e.userList=[],e.role="REPORTER",e.selectedUsersList=[],e.group={},e.deployCollection={},e.userKey={key:""},e.isWaitingCreate=!1;var o=s.userService,i=r.deployCollectionService;o.getCurrentUser().then(function(s){var r=s.data.result;e.myself={userId:r.id,username:r.username,role:"MASTER"},o.getUserList().then(function(s){e.userList=s.data.result||[];for(var r=0;r<e.userList.length;r++)if(e.userList[r].id===e.myself.userId){e.userList.splice(r,1);break}})}),e.selectUser=function(s,r){var t,l=0;for(l=0,t=e.selectedUsers.length;l<t;l++)if(e.selectedUsers[l].userId===s)return;for(l=0,t=e.selectedUsersList.length;l<t;l++)if(e.selectedUsersList[l].userId===s)return;e.selectedUsers.push({userId:s,username:r}),e.userKey.key=""},e.cancelUser=function(s){e.selectedUsers.splice(s,1)},e.addUser=function(){for(var s=0,r=e.selectedUsers.length;s<r;s++)e.selectedUsersList.push({userId:e.selectedUsers[s].userId,username:e.selectedUsers[s].username,role:e.role});e.selectedUsers=[]},e.deleteUser=function(s){e.selectedUsersList.splice(s,1)},e.toggleRole=function(s){e.role=s},e.userKeyDown=function(s,r,t){13==s.keyCode&&t&&e.selectUser(t.id,t.username),r||8!=s.keyCode||e.selectedUsers.pop()},e.createDeployCollection=function(){e.isWaitingCreate=!0;var s=[];e.deployCollection.creatorId=e.myself.userId,e.deployCollection.creatorName=e.myself.name,i.createDeployCollection(e.deployCollection).then(function(r){for(var i=r.data.result.result.id,n=0,c=e.selectedUsersList.length;n<c;n++)s.push({collectionId:i,userId:e.selectedUsersList[n].userId,role:e.selectedUsersList[n].role,resourceType:e.resourceType});var u={collectionId:i,resourceType:e.resourceType,members:s};o.createCollectionUser(u).then(function(){t.alert("提示","创建成功！"),l.go("deployCollectionManage")},function(s){e.isWaitingCreate=!1,t.error("创建成功，添加用户失败！",s.data.resultMsg),l.go("deployCollectionManage")})},function(s){e.isWaitingCreate=!1,t.error("创建失败，请重试！",s.data.resultMsg)})}}])}(angular.module("domeApp"));