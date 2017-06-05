"use strict";!function(e,t){function n(e,t){return{storage:{name:null,description:"",storageType:"GLUSTERFS",storageInfo:{cephMonitors:null,cephUser:null,keyring:null,ips:null},storageManagerInfo:{host:null,accesskey:null,secretkey:null}},volume:{name:null,description:"",clusterId:null,namespace:null,labels:null,capacity:null,accessMode:"ReadWriteMany",readOnly:!1,reclaimPolicy:"RETAIN",glusterfsDraft:null,cephfsDraft:null,rbdDraft:null},storageBackend:new function(){var n="/api/storage";this.listStorage=function(){return e.get(""+n)},this.getStorage=function(t){return e.get(n+"/"+t)},this.createStorage=function(t){return e.post(""+n,angular.toJson(t))},this.deleteStorage=function(t){return e.delete(n+"/"+t)},this.modifyStorage=function(t){return e.put(""+n,angular.toJson(t))},this.getStorageVolume=function(t){return e.get(n+"/"+t+"/volume")},this.createStorageVolume=function(t,l){return e.post(n+"/"+t+"/volume",angular.toJson(l))},this.deleteVolume=function(t,l){return e.delete(n+"/"+t+"/volume/"+l)},this.modifyVolume=function(t){return e.put(n+"/volume",angular.toJson(t))},this.listClusterVolume=function(t){return e.get(n+"/cluster/"+t+"/volume")},this.listRelatedDeployInfo=function(t){return e.get(n+"/volume/"+t+"/deployinfo")},this.clusterService=t.getInstance("ClusterService")}}}var l=angular.module("storageModule",[]);n.$inject=["$http","$domeCluster"],l.factory("$domeStorage",n),e.storageModule=l}(window);