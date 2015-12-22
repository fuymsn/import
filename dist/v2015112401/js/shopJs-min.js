/*! cross-framework - v0.1.2 - 2015-12-22 */!function(a,b){var c=["<div class='noble-d-prop'>","<div class='noble-d-prop_left'>","<img src='"+b.PIC_PATH+"/images/noble/#{gid}.png'/>","</div>","<div class='noble-d-prop_right'>","<h2>#{title}</h2>","<p>获取资格：#{level_title}</p>","<p>获取方式：贵族坐骑，顾名思义是贵族的象征。当你开通#{level_title}后，该坐骑就会随着#{level_title}一起出现。</p>","<p>坐骑描述：#{desc}</p>","</div>","</div>"].join("");a=function(){this.currentGid=30,this.roomId=0,this.init=function(){Noble.initChargeDialog()},this.getCurrentGid=function(){return this.currentGid},this.setCurrentGid=function(a){this.currentGid=a},this.getRoomId=function(){return this.roomId},this.setRoomId=function(a){this.roomId=a},this.init()},$.extend(a,{currentChargeDialog:null,ins:null,getProp:function(a,b){$.ajax({url:"/getvipmount",type:"POST",dataType:"json",data:a,success:function(a){b&&b(a)},error:function(){Utility.log("get vip mount error!")}})},changeNobleData:function(a){if(a=a||[],!a.length){var b=a.permission,c=a.system;a.level_id_icon='<span class="hotListImg basicLevel'+a.level_id+'"></span>';for(var d in c)"keep_level"==d?c[d]=c[d]+"钻":c[d]="gift_level"==d?'<span class="hotListImg basicLevel'+c[d]+'"></span>':c[d]+'<span class="noble-table-diamond"></span>';switch(b.allowvisitroom=0==b.allowvisitroom?"不受限":"限制",b.modnickname.toString()){case"-1":b.modnickname="不受限";break;case"0":b.modnickname="限制";break;default:var e=b.modnickname.split("|"),f="";"month"==e[1]?f="月":"week"==e[1]?f="周":"year"==e[1]&&(f="年"),b.modnickname=e[0]+"次/"+f}switch(b.haswelcome=0==b.haswelcome?"无":"有",b.chatsecond=0==b.chatsecond?"":b.chatsecond+"/次",b.haschateffect=0==b.haschateffect?"无":"有",b.chatlimit.toString()){case"-1":b.chatlimit="不限制";break;case"0":b.chatlimit="禁言";break;default:b.chatlimit=b.chatlimit+"字"}switch(b.hasvipseat=0==b.hasvipseat?"无":"有",b.nochat.toString()){case"1":b.nochat="防止房主";break;case"0":b.nochat="无";break;case"2":b.nochat="防止管理员";break;case"1|2":b.nochat="防止房主、管理员"}switch(b.nochatlimit=0==b.nochatlimit?"无":b.nochatlimit+"普通用户/天",b.avoidout.toString()){case"1":b.avoidout="防房主";break;case"0":b.avoidout="无";break;case"2":b.avoidout="防止管理员";break;case"1|2":b.avoidout="防止房主、管理员"}b.letout=0==b.letout?"无":b.letout+"普通用户/天",b.allowstealth=0==b.allowstealth?"无":"有"}return a},chargeNoble:function(a){var b=this;$.ajax({url:Utility.switchOrigin("v.","www.")+"/openvip",type:"get",dataType:"jsonp",jsonp:"callback",jsonpCallback:"cb",data:a,success:function(a){switch(a.code){case 0:b.currentChargeDialog.close(),b.chargeNoblePreSuccessCB(a),$.tips("贵族开通成功！您现在就可以使用您的专属坐骑啦！",function(){b.chargeNobleSuccessCB(a)});break;default:$.tips(a.msg)}},error:function(){Utility.log("charge noble error!"),b.chargeNobleErrorCB()}})},chargeNobleSuccessCB:function(a){},chargeNoblePreSuccessCB:function(a){},chargeNobleErrorCB:function(){},initChargeDialog:function(){var a=this,b=["<div class='noble-d-charge'>","<ul class='noble-d_menu clearfix'></ul>","<div class='noble-d_main'></div>","</div>"].join("");a.currentChargeDialog=$.dialog({title:"开通贵族",content:b,onshow:function(){var b=a.ins.getCurrentGid();a.appendNobleDialogList(b),a.bindNobleSwitchEvent()}})},appendNobleDialogList:function(a){var b=this;b.getNobleAllInfo(function(b){var c="",d=b.info;$.each(d,function(a,b){c=c+"<li class='noble-d_tab' data-gid='"+d[a].gid+"'><span class='hotListImg basicLevel"+d[a].level_id+"'></span></li>"});var e=$(c);e.eq(0).addClass("active"),$(".noble-d_menu").html(e),$(".noble-d_menu").find(".noble-d_tab").filter("[data-gid="+a+"]").trigger("click")})},showChargeDialog:function(){this.currentChargeDialog.show()},getPropInfo:function(a){return{gid:a.data("gid"),title:a.data("title"),level_title:a.data("lvtitle"),desc:a.data("desc")}},showGetPropsDialog:function(a,b){var d=this,e=Utility.template(c,d.getPropInfo(a)),f=$.dialog({title:"贵族专属",content:e,onshow:function(){},ok:function(){f.close(),b&&b()},okValue:"开通贵族身份"}).show()},getNobleInfo:function(a){var b=this;$.ajax({url:Utility.switchOrigin("v.","www.")+"/getgroup",type:"get",dataType:"jsonp",jsonp:"callback",jsonpCallback:"cb",data:{gid:b.ins.getCurrentGid()},success:function(b){Utility.log(b),0==b.code?a&&b.info&&a(b.info):$.tips(b.msg)},error:function(){Utility.log("get noble group info failure.")}})},getNobleAllInfo:function(a){$.ajax({url:Utility.switchOrigin("v.","www.")+"/getgroupall",type:"get",dataType:"jsonp",jsonp:"callback",jsonpCallback:"cb",data:"",success:function(b){b.code?Utility.log(b.msg):a&&a(b)},error:function(){Utility.log("ajax request error")}})},flushNobleInfo:function(a){a.nobleLink=Utility.switchOrigin("v.","www.")+"/noble";var b=["<div class='noble-d-charge_head'>","<h2>"+a.level_name+"</h2>","</div>","<div class='noble-d-charge_content'>","<table>","<tr><td>首开礼包：</td><td>"+a.system.gift_money+"</td><td>改名限制：</td><td>"+a.permission.modnickname+"</td></tr>","<tr><td>赠送爵位：</td><td>"+a.system.gift_level+"</td><td>房间特效欢迎语：</td><td>"+a.permission.haswelcome+"</td></tr>","<tr><td>贵族标识：</td><td>"+a.level_id_icon+"</td><td>聊天特效：</td><td>"+a.permission.haschateffect+"</td></tr>","<tr><td>房间限制：</td><td>"+a.permission.allowvisitroom+"</td><td>发送文字特权：</td><td>"+a.permission.chatlimit+"</td></tr>","<tr><td>坐骑：</td><td>"+a.g_mount.name+"</td><td>贵宾席位置：</td><td>"+a.permission.hasvipseat+"</td></tr>","</table>","<h3>开通价格："+a.system.open_money+"</h3>","<p>次月保级条件：贵族等级有效期内，累计充值达"+a.system.keep_level+"。</p>","</div>","<div class='noble-d-charge_btnbox'>","<button class='noble-d_charge_btn btn' data-gid='"+a.gid+"'>立即开通贵族</button>","<a href='"+a.nobleLink+"' target='_blank' class='noble-d-link'>了解更多</a>","</div>"].join("");$(".noble-d_main").html(b)},bindNobleSwitchEvent:function(){var a=this;$(".noble-d_menu").on("click",".noble-d_tab",function(){var b=$(this);a.ins.setCurrentGid(b.data("gid")),b.siblings(".noble-d_tab").removeClass("active").end().addClass("active"),a.getNobleInfo(function(b){a.bindNobleDialogEvent(b)})})},bindNobleDialogEvent:function(a){var b=this;a=b.changeNobleData(a),b.flushNobleInfo(a),$(".noble-d_charge_btn").on("click",function(a){$(this).prop("disabled",!0);var c=$(this).data("gid");b.chargeNoble({gid:c,roomId:b.ins.getRoomId()}),b.chargeNobleErrorCB=function(){$(this).prop("disabled",!1)}})}}),b.Noble=a}("undefined"!=typeof Noble?Noble:{},window),function(a,b){var c,d=function(b){c=$.dialog({title:b.title,content:b.content,ok:function(){var c=this;a.equipMount(b.data,function(){c.remove()})},okValue:"装备",cancel:function(){},cancelValue:"不装备"})};$.extend(a,{getMoney:function(a){$.ajax({url:"/getmoney",dataType:"json",type:"POST",success:function(b){a&&a(b)},error:function(){Utility.log("get money error!")}})},equipMount:function(a,b){$.ajax({url:"/majax/equipHandle",type:"GET",dataType:"json",data:a,success:function(a){a.ret?($.tips("装备坐骑成功！"),b&&b(a)):Utility.log(a.info)},error:function(){Utility.log("Equip mount")}})},showEquipComfirmDialog:function(a){d({title:"装备道具",content:"购买成功，是否立即装备道具？",data:a}),c.show()},showEquipNobleComfirmDialog:function(a){d({title:"装备贵族道具",content:"获取成功，是否立即装备贵族道具？",data:a}),c.show()}}),b.Shop=a}("undefined"!=typeof Shop?Shop:{},window),$(function(){var a=['<div class="payContent clearfix">','<div class="payleft">','<ul class="shop-item payInfo">','<li><img src="#{img}" alt="" /></li>','<li class="forange">#{name}</li>','<li>价格：#{price}<img src="'+Config.imagePath+'/diamond.jpg" alt="" />/月</li>',"</ul>",'<ul class="payTips">',"<li>按月购买：30天/月<br/>按年购买：365天/年</li>","<li>商品有效期内购买本商品，有效期累加。<br/>其他情况，有效期从购买时算起。</li>","</ul>","</div>",'<div class="payright">','<table class="table-form">',"<thead>","<tr>","<th>开通账号：</th>",'<td class="bold">#{nickname}</td>',"</tr>","</thead>","<tbody>","<tr>","<th>购买方式：</th>",'<td id="payBtn"><button class="btn-red">按月付费</button><button>按年付费</button><img src="'+Config.imagePath+'/discount.jpg" alt="" class="discount" /></td>',"</tr>",'<tr class="pr" id="numBox">',"<th>购买时长：</th>",'<td><input type="text" value="1" id="numId" class="txt"/>','<div class="datePanel none">',"<ul>","<li>1</li>","<li>2</li>","<li>3</li>","<li>4</li>","<li>5</li>","<li>6</li>","<li>7</li>","<li>8</li>","<li>9</li>","<li>10</li>","<li>11</li>","<li>12</li>","</ul>",'</div><span id="dateTitle">个月</span></td>',"</tr>","<tr>","<th>应付金额：</th>",'<td class="bold"><span id="total-price">#{price}</span><img src="'+Config.imagePath+'/diamond.jpg" alt="" /></td>',"</tr>","<tr>","<th>当前余额：</th>",'<td class="bold"><span id="current-price" class="fred">#{money}</span><img src="'+Config.imagePath+'/diamond.jpg" alt="" /></td>',"</tr>",'<tr class="pay-tip">',"<th></th>",'<td><img src="'+Config.imagePath+'/pay-close.jpg" alt="" /><span class="fred">您的余额不足，请充值！</span></td>',"</tr>","<tr>","<th></th>","<td>",'<button class="btn btn-pay">购买</button>','<a href="/charge/order" class="btn btn-charge none">充值</a>',"</td>","</tr>","</tbody>","</table>","</div>","</div>"].join(""),b=function(a,b){var c=$("#payBtn").find(".btn-red").text();"按月付费"===c?$("#total-price").html(Number(b.val())*a.data("price")):$("#total-price").html(parseInt(Number(b.val())*a.data("price")*12*.9),10)},c=function(){var a=$("#total-price"),b=$("#current-price"),c=$(".btn-charge"),d=$(".pay-tip");parseInt($.trim(a.text(),10))>parseInt($.trim(b.text(),10))?(c.removeClass("none"),d.show()):(c.addClass("none"),d.hide())};$("#goods-list").find(".payBtn").on("click",function(){var d=$(this).parents("ul");Shop.getMoney(function(e){switch(e.code){case 101:$.dialog({title:"提示",content:"登陆后才可购买",okValue:"立即登录",ok:function(){$(".login").trigger("click")},cancelValue:"关闭",cancel:function(){}}).show();break;case 0:var e=e.info;e.img=d.find(".payImg").attr("src"),e.price=d.data("price"),e.name=d.find(".forange").text();var f=Utility.template(a,e),g=$.dialog({title:"购买道具",content:f,onshow:function(){c()}});g.show();var h=$("#numId"),i=$("#payBtn"),j=$("#dateTitle"),k=$(".datePanel");h.on("focus",function(){k.removeClass("none"),k.find("li").on("click",function(){h.val($(this).text()),k.addClass("none"),b(d,h),c()})}),h.on("keyup",function(){k.addClass("none")}),i.on("click","button",function(){i.find("button").removeClass("btn-red"),$(this).addClass("btn-red");var a=$(this).text();"按月付费"===a?j.text("个月"):j.text("年"),b(d,h),c()});var l=$(".payContent").find(".btn-pay");l.off("click"),l.on("click",function(){return Validation.isPositiveInteger(Number(h.val()))?void $.ajax({url:"/member/pay",data:{gid:d.data("gid"),nums:h.val(),type:$("#payBtn").find("button").index($("#payBtn").find(".btn-red"))},dataType:"json",type:"POST",success:function(a){g.remove(),a.ret?Shop.showEquipComfirmDialog({gid:d.data("gid")}):$.dialog({title:"提示",content:"购买失败，您的余额不足，或输入月份不正确！",ok:function(){location.href="/charge/order"},okValue:"去充值",cancel:function(){},cancelValue:"取消"}).show()},error:function(){}}):($.tips("月份数输入不正确，请重新输入（月份数不可为小数）"),void g.remove())})}})});var d=getLocation("gid");$.each($("#goods-list > ul"),function(a,b){$(b).data("gid")+""==d&&$(b).find(".payBtn").trigger("click")});var e=getLocation("handle");"noble"==e&&$("#tabNoble").trigger("click"),$("#cChargeBtn").on("click",function(){if(User.isLogin())location.href="/charge/order";else{$.dialog({title:"提示",content:"请登录后再充值",okValue:"去登录",ok:function(){$(".login").trigger("click")},cancelValue:"取消",cancel:function(){}}).show()}});var f=function(){var a=new Noble;$(".J-noble-charge").on("click",function(b){Noble.ins=a,Noble.ins.setCurrentGid($(this).data("groupid")),Noble.chargeNobleSuccessCB=function(a){location.reload()},Noble.showChargeDialog()})},g=function(){$(".J-noble-prop").on("click",function(a){var b=$(this),c=b.closest(".shop-item").data("gid"),d=b.closest(".shop-item").data("groupid");Noble.getProp({mid:c},function(a){switch(a.code){case 0:Shop.showEquipNobleComfirmDialog({gid:c});break;case 101:$.tips("请登录后再获取坐骑！");break;case 1002:$.tips(a.msg);break;case 1003:case 1005:Noble.showGetPropsDialog(b.closest(".shop-item"),function(){$("#groupList").find(".J-noble-charge").filter("[data-groupid='"+d+"']").trigger("click")});break;default:$.tips(a.msg)}})})};f(),g()});