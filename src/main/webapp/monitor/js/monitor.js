"use strict";!function(t){var e=angular.module("monitorApp",["ngAnimate","ui.bootstrap","publicModule","amchartsModule","domeModule","commonFilters","pageLayout"]);e.directive("datepickerComponent",["$util",function(t){var e=[];return e.push('      <div class="js-dateoptions btn-group" role="group" aria-label="..." >'),e.push('        <button class="btn btn-default js-interval">最近1小时</button>'),e.push("      </div>"),e.push('      <div class="datepicker-con js-datepicker-con">'),e.push('        <div class="date-choose">'),e.push('          <datepicker ng-model="selectDate.startDate" max-date="selectDate.endDate" show-weeks="false" custom-class="getDayClass(date, mode)" class="datepicker"></datepicker>'),e.push('          <datepicker ng-model="selectDate.endDate" min-date="selectDate.startDate" max-date="today" show-weeks="false" custom-class="getDayClass(date, mode)" class="datepicker"></datepicker>'),e.push("        </div>"),e.push('        <div class="date-result">'),e.push('          <div class="result-selected">'),e.push('            <div class="date-selected">'),e.push("              <p>开始</p>"),e.push('              <input disabled="true" type="text" value="{{selectDate.startDate| day}}" class="form-control"/>'),e.push("            </div>"),e.push("          </div>"),e.push('          <div class="result-selected">'),e.push('            <div class="date-selected">'),e.push("              <p>结束</p>"),e.push('              <input disabled="true" type="text" value="{{selectDate.endDate| day}}" class="form-control"/>'),e.push("            </div>"),e.push("          </div>"),e.push("          <div>"),e.push('            <button ng-click="submitSelfDate();" class="ui-btn ui-btn-primary ui-btn-md btn-submit-date">提交</button>'),e.push("          </div>"),e.push("        </div>"),e.push("      </div>"),{restrict:"AE",scope:{dateOptions:"="},replce:!0,template:e.join(""),link:function(e,a){var n,i,s,r=a.find(".js-dateoptions"),o=a.find(".js-datepicker-con"),u=[];if(e.date={startDate:0,endDate:0},e.today=new Date,o.hide(),e.setDateInterval=function(a){var n,i,s;switch(a){case"30m":e.date.startDate=(new Date).getTime()-18e5,e.date.endDate=(new Date).getTime();break;case"1h":e.date.startDate=(new Date).getTime()-36e5,e.date.endDate=(new Date).getTime();break;case"6h":e.date.startDate=(new Date).getTime()-216e5,e.date.endDate=(new Date).getTime();break;case"12h":e.date.startDate=(new Date).getTime()-432e5,e.date.endDate=(new Date).getTime();break;case"24h":e.date.startDate=(new Date).getTime()-864e5,e.date.endDate=(new Date).getTime();break;case"7d":n=t.calculateDate(new Date,-7).split("-"),e.date.startDate=new Date(n[0],n[1]-1,n[2],0,0,0).getTime(),e.date.endDate=(new Date).getTime();break;case"30d":n=t.calculateDate(new Date,-30).split("-"),e.date.startDate=new Date(n[0],n[1]-1,n[2],0,0,0).getTime(),e.date.endDate=(new Date).getTime();break;case"self":i=t.calculateDate(new Date(e.selectDate.startDate),0).split("-"),s=t.calculateDate(new Date(e.selectDate.endDate),1).split("-"),e.date.startDate=new Date(i[0],i[1]-1,i[2],0,0,0).getTime(),e.date.endDate=new Date(s[0],s[1]-1,s[2],0,0,0).getTime()-1;break;default:return}e.$emit("dateIntervalChange",e.date)},e.dateOptions){for(s=0;s<e.dateOptions.length;s++)e.dateOptions[s].isDefault?(u.push('<button class="btn btn-default active js-interval" data-interval="'+e.dateOptions[s].interval+'">'+e.dateOptions[s].text+"</button>"),e.setDateInterval(e.dateOptions[s].interval),e.selectDate=e.date):u.push('<button class="btn btn-default js-interval" data-interval="'+e.dateOptions[s].interval+'">'+e.dateOptions[s].text+"</button>");u.push('<button class="btn btn-default js-custom">自定义</button>')}r.html(u.join("")),n=a.find(".js-interval"),i=a.find(".js-custom"),n.bind("click",function(){var t=angular.element(this);t.hasClass("active")||(n.removeClass("active"),i.removeClass("active"),t.addClass("active")),o.hide(),e.setDateInterval(t.data("interval")),e.selectDate=angular.copy(e.date),e.$digest()}),i.bind("click",function(){o.is(":visible")?o.hide():o.show()}),e.submitSelfDate=function(){e.setDateInterval("self"),o.hide(),i.hasClass("active")||(i.addClass("active"),n.removeClass("active"))}}}}]).directive("chartHeight",function(){return{restrict:"A",link:function(t,e,a){t.chartWraperHeight=0,t.$watch(function(){return a.chartHeight},function(e){e=parseInt(e),t.chartWraperHeight=330+15*e}),t.getFullChartStyle=function(){return{height:t.chartWraperHeight+20+"px"}},t.getShortChatStyle=function(){return{height:t.chartWraperHeight-43+"px"}}}}}),e.service("$monitor",["$http","$q","$util","$filter",function(e,a,n,i){function s(){D={cpu:{},mem:{},diskUsedMult:[],diskReadMult:[],diskWriteMult:[],netInMult:[],netIn:{},netOutMult:[],netOut:{},keyMap:{busy:"CPU总占用",user:"用户级进程",nice:"nice值为负的用户级进程",system:"内核级进程",iowait:"等待磁盘IO",irq:"CPU服务硬中断",softirq:"CPU服务软中断",switches:"CPU上下文每秒切换次数"}},b={monitorItem:[],monitorType:""},y={tableLength:6,tableKeyName:"",tableHead:[],tableItem:[]}}function r(t,e,a){return null===t||isNaN(t)?"——":(a||(a=""),t.toFixed(e)+a)}function o(e,a){return null===e||e===t?"——":n.formartBytesData(e,a)}function u(e,a){var n,i,s,u,l={},m=[{key:{text:"最小值"}},{key:{text:"最大值"}},{key:{text:"平均值"}}];for(n=0;n<b.monitorItem.length;n++)l[b.monitorItem[n]]={min:{value:void 0},max:{value:0},sum:0,countHasData:0,average:0};for(n=0;n<e.length;n++)for(i=0;i<b.monitorItem.length;i++)s=e[n][b.monitorItem[i]],u=l[b.monitorItem[i]],s!==t&&null!==s&&(l[b.monitorItem[i]].countHasData++,s>u.max.value&&(l[b.monitorItem[i]].max.value=s,l[b.monitorItem[i]].max.time=e[n].timeStamp),(u.min.value===t||s<u.min.value)&&(l[b.monitorItem[i]].min.value=s,l[b.monitorItem[i]].min.time=e[n].timeStamp),l[b.monitorItem[i]].sum+=s);return angular.forEach(l,function(t,e){0!==t.countHasData&&(t.average=t.sum/t.countHasData),a?"%"==a?(t.min={text:r(t.min.value,2,a),tip:p(t.min.time)},t.max={text:r(t.max.value,2,a),tip:p(t.max.time)},t.average={text:r(t.average,2,a)}):(t.min={text:o(t.min.value,a),tip:p(t.min.time)},t.max={text:o(t.max.value,a),tip:p(t.max.time)},t.average={text:o(t.average,a)}):(t.min={text:t.min.value,tip:p(t.min.time)},t.max={text:t.max.value,tip:p(t.max.time)},t.average={text:t.average}),"container"==b.monitorType&&(e=e.substring(0,12)),m[0][e]=t.min,m[1][e]=t.max,m[2][e]=t.average}),m}function l(e,a){var n,i,s,u,l=0,m=e.length,c=!1,d=[];for(n=m-1;n>=0&&l<y.tableLength;n--){if(s=e[n],u={},!c)for(i=0;i<b.monitorItem.length;i++){var f=s[b.monitorItem[i]];if(null!==f&&f!==t){c=!0;break}}if(c){for(u.key={text:p(e[n].timeStamp)},i=0;i<b.monitorItem.length;i++){var g="container"===b.monitorType?b.monitorItem[i].substring(0,12):b.monitorItem[i];u[g]="%"==a?{text:r(e[n][b.monitorItem[i]],2,"%")}:{text:o(e[n][b.monitorItem[i]],a)}}d.push(u),l++}}return d}function m(t,e,a,n){e.head=y.tableHead,e.item=y.tableItem,e.body=t?u(a,n):l(a,n)}function c(e,a){var n;for(n=e.length-4;n>=0;n--)if(e[n][a]!==t&&null!==e[n][a])return n;return-1}function d(e,a,n){return e&&e[a]?e[a][n]:t}function p(e){if(e!==t&&null!==e)return i("date")(e,"yyyy-MM-dd HH:mm:ss")}function f(e,a){if(!a)return a;for(var n=angular.copy(a),i=0;i<n.length;i++)for(var s=0;s<e.length;s++){var r=n[i][e[s]];null===r||r===t||isNaN(r)||(n[i][e[s]]=r.toFixed(2))}return n}function g(t,e,a){if(!e)return e;for(var i=angular.copy(e),s=0;s<i.length;s++)for(var r=0;r<t.length;r++)i[s][t[r]]&&(i[s][t[r]]=n.formartBytesData(i[s][t[r]],a).toFixed(2));return i}function h(e,a,n){var i,s,u={value:0,time:t},l={value:t,time:t},m=0,c=0,d=0;if(e&&n!==t){for(i=0;i<e.length;i++)null!==(s=e[i][n])&&s!==t&&(d++,s>u.value&&(u.value=s,u.time=e[i].timeStamp),(l.value===t||s<l.value)&&(l.value=s,l.time=e[i].timeStamp),c+=s);return 0!==d&&(m=c/d),a?"%"==a?{max:{text:r(u.value,2,a),tip:p(u.time)},min:{text:r(l.value,2,a),tip:p(l.time)},average:{text:r(m,2,a)}}:{max:{text:o(u.value,a),tip:p(u.time)},min:{text:o(l.value,a),tip:p(l.time)},average:{text:o(m,a)}}:{max:{text:r(u.value,2),tip:p(u.time)},min:{text:r(l.value,2),tip:p(l.time)},average:{text:r(c/e.length,2)}}}}function v(t,e){for(var a=[{key:{text:"最小值"}},{key:{text:"最大值"}},{key:{text:"平均值"}}],n=1;n<t.length;n++){var i=e[t[n]]||{min:{text:"——"},max:{text:"——"},average:{text:"——"}};a[0][t[n]]=i.min,a[1][t[n]]=i.max,a[2][t[n]]=i.average}return a}var y,b,D,x=this;s(),x.getAmchartConfig=function(t,e,a){var n={type:"serial",categoryField:"timeStamp",pathToImages:"/lib/images/amcharts/",zoomOutButtonAlpha:.26,startDuration:0,chartScrollbar:{},chartCursor:{categoryBalloonDateFormat:"JJ:NN:SS"},categoryAxis:{minPeriod:"ss",parseDates:!0,labelOffset:6,offset:1,equalSpacing:!0},graphs:[],titles:[{id:"Title-1",size:15,text:t}],dataProvider:e,trendLines:[],guides:[],valueAxes:[],allLabels:[],balloon:{}};""===t&&(n.titles=[]);for(var i=0;i<b.monitorItem.length;i++)n.graphs.push({bullet:"round",id:"AmGraph"+i,title:b.monitorItem[i],bulletField:b.monitorItem[i],balloonText:"[["+b.monitorItem[i]+"]]"+a,valueField:b.monitorItem[i]}),n.legend={useGraphSettings:!0,valueWidth:120,valueText:"[[value]]"+a};return n},x.getMonitorsArr=function(e,a,n,i){var u,l,I,k,M,R,T,B=y.tableLength,w=[],S=[],C=y.tableKeyName=i?"统计值":"时间";if(s(),a.length<2&&(l=a[0]),w=function(){var t=angular.copy(a);return t.unshift(C),t}(),S=angular.copy(a),"container"==e.targetType){for(u=0;u<S.length;u++)S[u]=S[u].substring(0,12);for(u=1;u<w.length;u++)w[u]=w[u].substring(0,12)}if(S.unshift("key"),y.tableItem=S,y.tableHead=w,b.monitorItem=a,b.monitorType=n.targetType,"node"==n.targetType){if(n.counterResults["cpu.busy"]){if(R=n.counterResults["cpu.busy"],M={head:[],item:[],body:[]},l!==t){if(M.head=[C,"busy","user","nice","system","iowait","irq","softirq","switches"],M.item=["key","busy","user","nice","system","iowait","irq","softirq","switches"],i)T={busy:h(R,"%",l),user:h(n.counterResults["cpu.user"],"%",l),nice:h(n.counterResults["cpu.nice"],"%",l),system:h(n.counterResults["cpu.system"],"%",l),iowait:h(n.counterResults["cpu.iowait"],"%",l),irq:h(n.counterResults["cpu.irq"],"%",l),softirq:h(n.counterResults["cpu.softirq"],"%",l),switches:h(n.counterResults["cpu.switches"],"",l)},M.body=v(M.item,T);else if((I=c(R,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(R,I,"timeStamp"))},busy:{text:r(d(R,I,l),2,"%")},user:{text:r(d(n.counterResults["cpu.user"],I,l),2,"%")},nice:{text:r(d(n.counterResults["cpu.nice"],I,l),2,"%")},system:{text:r(d(n.counterResults["cpu.system"],I,l),2,"%")},iowait:{text:r(d(n.counterResults["cpu.iowait"],I,l),2,"%")},irq:{text:r(d(n.counterResults["cpu.irq"],I,l),2,"%")},softirq:{text:r(d(n.counterResults["cpu.softirq"],I,l),2,"%")},switches:{text:r(d(n.counterResults["cpu.switches"],I,l),2)}})}else m(i,M,R,"%");D.cpu={chartData:x.getAmchartConfig("CPU使用率(%)",f(a,R),"%"),tableData:M}}angular.forEach(n.counterResults,function(e,s){var u=s.split("=")[1];if(u)if(s.indexOf("df.bytes.used.percent/")!==-1){if(M={head:[],item:[],body:[]},l!==t){if(M.head=[C,"磁盘占用(GB)","磁盘总量(GB)","磁盘占用率"],M.item=["key","mountused","mounttotal","mountpercent"],i)T={mountused:h(n.counterResults["df.bytes.used/mount="+u],"GB",l),mounttotal:h(n.counterResults["df.bytes.total/mount="+u],"GB",l),mountpercent:h(e,"%",l)},M.body=v(M.item,T);else if((I=c(e,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(e,I,"timeStamp"))},mountpercent:{text:r(d(e,I,l),2,"%")},mountused:{text:o(d(n.counterResults["df.bytes.used/mount="+u],I,l),"GB")},mounttotal:{text:o(d(n.counterResults["df.bytes.total/mount="+u],I,l),"GB")}})}else m(i,M,e,"%");D.diskUsedMult.push({name:u,chartData:x.getAmchartConfig("",f(a,e),"%"),tableData:M})}else if(s.indexOf("disk.io.read_bytes/")!==-1||s.indexOf("disk.io.write_bytes/")!==-1){var y=s.indexOf("disk.io.read_bytes/")!==-1;if(M={head:[],item:[],body:[]},l!==t){if(M.head=y?[C,"读取数据(KB/s)"]:[C,"写入数据(KB/s)"],M.item=["key","data"],i)T={data:h(e,"KB",l)},M.body=v(M.item,T);else if((I=c(e,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(e,I,"timeStamp"))},data:{text:o(d(e,I,l),"KB")}})}else m(i,M,e,"KB");y?D.diskReadMult.push({name:u,chartData:x.getAmchartConfig("",g(a,e,"KB"),"KB/s"),tableData:M}):D.diskWriteMult.push({name:u,chartData:x.getAmchartConfig("",g(a,e,"KB"),"KB/s"),tableData:M})}else if(s.indexOf("net.if.out.bytes/")!==-1||s.indexOf("net.if.in.bytes/")!==-1){var b=s.indexOf("net.if.out.bytes/")!==-1;if(M={head:[],item:[],body:[]},l!==t){if(M.head=b?[C,"流出数据(KB/s)"]:[C,"流入数据(KB/s)"],M.item=["key","netdata"],i)T={netdata:h(e,"KB",l)},M.body=v(M.item,T);else if((I=c(e,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(e,I,"timeStamp"))},netdata:{text:o(d(e,I,l),"KB")}})}else m(i,M,e,"KB");b?D.netOutMult.push({name:u,chartData:x.getAmchartConfig("",g(a,e,"KB"),"KB/s"),tableData:M}):D.netInMult.push({name:u,chartData:x.getAmchartConfig("",g(a,e,"KB"),"KB/s"),tableData:M})}})}else{if(n.counterResults["container.cpu.usage.busy"]){if(R=n.counterResults["container.cpu.usage.busy"],M={head:[],item:[],body:[]},l!==t){if(M.head=[C,"busy","user","system"],M.item=["key","busy","user","system"],i)T={busy:h(R,"%",l),user:h(n.counterResults["container.cpu.usage.user"],"%",l),system:h(n.counterResults["container.cpu.usage.system"],"%",l)},M.body=v(M.item,T);else if((I=c(R,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(n.counterResults["container.cpu.usage.busy"],I,"timeStamp"))},busy:{text:r(d(n.counterResults["container.cpu.usage.busy"],I,l),2,"%")},user:{text:r(d(n.counterResults["container.cpu.usage.user"],I,l),2,"%")},system:{text:r(d(n.counterResults["container.cpu.usage.system"],I,l),2,"%")}})}else m(i,M,R,"%");D.cpu={chartData:x.getAmchartConfig("CPU占用率(%)",f(a,R),"%"),tableData:M}}angular.forEach(["container.net.if.in.bytes","container.net.if.out.bytes"],function(e){if(n.counterResults[e]){var s="container.net.if.in.bytes"===e;if(R=n.counterResults[e],M={head:[],item:[],body:[]},l!==t){if(M.head=s?[C,"流入数据(KB/s)"]:[C,"流出数据(KB/s)"],M.item=["key","netdata"],i)T={netdata:h(R,"KB",l)},M.body=v(M.item,T);else if((I=c(R,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(R,I,"timeStamp"))},netdata:{text:o(d(R,I,l),"KB")}})}else m(i,M,R,"KB");s?D.netIn={chartData:x.getAmchartConfig("网络流入(KB/s)",g(a,R,"KB"),"KB/s"),tableData:M}:D.netOut={chartData:x.getAmchartConfig("网络流出(KB/s)",g(a,R,"KB"),"KB/s"),tableData:M}}})}if(n.counterResults["mem.memused.percent"]||n.counterResults["container.mem.usage.percent"]){M={head:[],item:[],body:[]};var K,O,A;if(n.counterResults["mem.memused.percent"]?(K=n.counterResults["mem.memused.percent"],O=n.counterResults["mem.memtotal"],A=n.counterResults["mem.memused"]):(K=n.counterResults["container.mem.usage.percent"],O=n.counterResults["container.mem.limit"],A=n.counterResults["container.mem.usage"]),l!==t){if(n.counterResults["mem.memused.percent"]?M.head=[C,"内存占用量(MB)","内存总量(MB)","内存占用率"]:M.head=[C,"内存占用量(MB)","内存限额(MB)","内存占用率"],M.item=["key","memused","memtotal","mempercent"],i)T={memused:h(A,"MB",l),memtotal:h(O,"MB",l),mempercent:h(K,"%",l)},M.body=v(M.item,T);else if((I=c(K,l))!==-1)for(k=I-B;I>=0&&I>k;I--)M.body.push({key:{text:p(d(K,I,"timeStamp"))},memused:{text:o(d(A,I,l),"MB")},memtotal:{text:o(d(O,I,l),"MB")},mempercent:{text:r(d(K,I,l),2,"%")}})}else m(i,M,K,"%");D.mem={chartData:x.getAmchartConfig("内存占用率(%)",f(a,K),"%"),tableData:M}}return D},x.getMonitor=function(t){return e.get("/api/monitor/data/"+t.targetId+"?start="+t.start+"&end="+t.end+"&dataSpec="+t.dataSpec+"&cid="+t.cid)}}]),e.controller("MonitorCtr",["$scope","$http","$util","$monitor","$q","$timeout","dialog",function(t,e,a,n,i,s,r){t.sampleTypes=[{type:"MIN",text:"最小值"},{type:"MAX",text:"最大值"},{type:"AVERAGE",text:"平均值"}];var o=a.getQueryString("id"),u=a.getQueryString("cid");t.clusterName=a.getQueryString("cname"),t.singleItem=!1,t.monitorItem=[],t.monitorTypeName="",t.isLoading=!0,t.isRealTime=!1;var l,m=function(){var a=i.defer();return t.targetInfos?a.resolve(t.targetInfos):e.get("/api/monitor/target/"+o+"?cid="+u).then(function(e){t.targetInfos=e.data.result,t.monitorItem=[];var n,i=t.targetInfos.targetInfos;switch(t.targetInfos.targetType){case"node":for(t.monitorTypeName="主机",t.singleItem=i[0].node,n=0;n<i.length;n++)t.monitorItem.push(i[n].node);break;case"pod":for(t.monitorTypeName="实例",t.singleItem=i[0].pod.podName,n=0;n<i.length;n++)t.monitorItem.push(i[n].pod.podName);break;case"container":for(t.monitorTypeName="容器",t.singleItem=i[0].container.containerId.substring(0,12),n=0;n<i.length;n++)t.monitorItem.push(i[n].container.containerId);break;default:t.singleItem=!1}t.monitorItem.length>1&&(t.singleItem=!1),a.resolve(t.targetInfos)},function(t){r.error("请求失败",t.data.resultMsg),a.reject()}),a.promise};m(),t.date={},t.intervalTime=0,t.monitorsInfo={cpu:{chartData:[]},mem:{chartData:[]},diskUsedMult:[],diskWriteMult:[],diskReadMult:[],netInMult:[],netOutMult:[],netIn:{chartData:[]},netOut:{chartData:[]}},t.selectedMonitor={diskUsedMult:{name:"",chartData:[],tableData:{}},diskReadMult:{name:"",chartData:[],tableData:{}},diskWriteMult:{name:"",chartData:[],tableData:{}},netInMult:{name:"",chartData:[],tableData:{}},netOutMult:{name:"",chartData:[],tableData:{}}},t.currentSampleType=t.sampleTypes[2];var c=function(e){var a=!1;if(t.selectedMonitor[e])if(""!==t.selectedMonitor[e].name){for(var n=0;n<t.monitorsInfo[e].length;n++)t.monitorsInfo[e][n].name===t.selectedMonitor[e].name&&(a=!0,t.toggleSelectedMonitor(e,n));a||t.toggleSelectedMonitor(e,0)}else t.toggleSelectedMonitor(e,0)},d=function e(){l&&s.cancel(l),m().then(function(){var a={targetId:o,start:t.date.startDate,end:t.date.endDate,dataSpec:t.currentSampleType.type,cid:u};n.getMonitor(a).then(function(i){var r=i.data.result||{};(!r.interval||r.interval<5)&&(r.interval=5),t.intervalTime=1e3*r.interval,t.monitorsInfo=null,t.monitorsInfo=angular.copy(n.getMonitorsArr(a,t.monitorItem,r,!t.isRealTime)),c("diskUsedMult"),c("diskReadMult"),c("diskWriteMult"),c("netInMult"),c("netOutMult"),t.isRealTime&&(l=s(function(){t.date.endDate=(new Date).getTime(),t.date.startDate=t.date.endDate-36e5,e()},t.intervalTime))}).finally(function(){t.isLoading=!1})},function(){t.isLoading=!1})};t.toggleSelectedMonitor=function(e,a){t.monitorsInfo[e]&&(t.selectedMonitor[e]=t.monitorsInfo[e][a])},t.toggleSampleType=function(e){t.isLoading=!0,t.currentSampleType=t.sampleTypes[e],d()},t.$on("dateIntervalChange",function(e,a){t.date=a,t.isLoading=!0,t.date.endDate-(new Date).getTime()<2e3&&t.date.endDate-t.date.startDate<37e5?t.isRealTime=!0:t.isRealTime=!1,d()})}])}();