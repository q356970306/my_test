/**
 * Created by Lituo on 2017/5/2.
 */
function login(){
    $("#LastCode").val("");
    $("#LastTime").val("");
    var url='/my-test/xinqixiangV2/create',
        data={
            testType:$("#project_select").val(),
            loginCode:$("#select_login").val(),
            dataSource:$("#select_bank").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            mobile:$("#mobile").val(),

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            if(result.success){
                alert("任务创建成功:"+result.msg);
                $("#taskId").val(result.detail.token);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });
}


function getImgCode() {
    var url='/my-test/xinqixiangV2/status',
        data={
            tradeNo:$("#taskId").val(),
            testType:$("#project_select").val(),
            lastCode:$("#LastCode").val(),
            lastTime:$("#LastTime").val(),

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            $("#resultData").val(JSON.stringify(result));


         //   $("#taskId").val(result.data.task_id);

            $("#resultData").val(JSON.stringify(result));
            var  str=JSON.stringify(result);
            str=str+"\r\n"+$("#logStatus").val();
            $("#logStatus").val(str);//0087435447395024896

            if(result.detail.code!="000000") {
            //    alert(result.detail.code);
                $("#LastCode").val(result.detail.code);
                $("#LastTime").val(result.detail.time);
            }
        }
    });
}

function inputMsg() {
    var url='/my-test/xinqixiangV2/postCode',
        data={
            tradeNo:$("#taskId").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
            lastCode:$("#LastCode").val(),
            lastTime:$("#LastTime").val(),
        };
    if($("#i_img_code").val().replace(/\s/g, "").length==0) {
        alert("验证码不能为空");
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
        }
    });
}

function queryCreditBankList(){
    var url='/my-test/xinqixiang/creditbanklist',
        data={
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            loadBank(result.detail);
        }
    });
}

function loadBank(detail) {
    $("#select_bank").find("option").remove();
    $("#select_bank").empty();
    $("#select_bank").prepend("<option value='0'>请选择银行</option>");
    for (var i=0;i<detail.length;i++){
        if(detail[i].status=='1'){
            $("#select_bank").append("<option value='"+detail[i].apiName+"'>"+detail[i].apiDesc+"</option>");
        }
    }
}



function queryFundLogin(){
    if($("#select_bank").val()==''||$("#select_bank").val()==undefined||$("#select_bank").val()=='0'){
        alert("请先选择银行");
        return;
    }
    var url='/my-test/xinqixiang/login',
        data={
            areaCode:$("#select_bank").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
            if(result.success){
                loadLogin(result.data);
                $("#resultData").val(JSON.stringify(result));
            }else {
                alert(result.errorMsg);
            }
        }
    });
}
function queryhelp(){
    if($("#select_bank").val()==''||$("#select_bank").val()==undefined||$("#select_bank").val()=='0'){
        alert("请先选择银行");
        return;
    }
    var url='/my-test/xinqixiang/login/help',
        data={
            dataSource:$("#select_bank").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //alert(JSON.stringify(result));
            if(result.success){
                loadLogin(result.detail);
            }else {
                alert(result.errorMsg);
            }
        }
    });
}

var loginData ;
function loadLogin(data) {
    $("#select_login").find("option").remove();
    $("#select_login").empty();
    $("#select_login").prepend("<option value='0'>请选择登录方式</option>");
    for (var i=0;i<data.length;i++){
        $("#select_login").append("<option value='"+data[i].code+"'>"+data[i].name +"</option>");
    }
    loginData = data;


    $("#select_area").find("option").remove();
    $("#select_area").empty();
}
function checkLoginType(detail) {
    //var login_type = $("#select_login").val()
    for (var i=0;i<loginData.length;i++){
        // if(loginData[i].login_type==login_type){
            var fieldList = loginData[i].fields;
            for (var j=0;j<fieldList.length;j++){
                if(fieldList[j].name=='subArea'){
                    loadSubArea(fieldList[j].list,fieldList[j].label);
                    $("#select_addr").show();
                }
                if(fieldList[j].name=='account'){
                    $("#loginId").show();
                }
                if(fieldList[j].name=='password'){
                    $("#loginPwd").show();
                }
                if(fieldList[j].name=='real_name'|| fieldList[j].name=='name'){
                    $("#realName").show();
                }
                if(fieldList[j].name=='idCard' || fieldList[j].name=='id_card'){
                    $("#idCard").show();
                }
                if(fieldList[j].name=='mobile'|| fieldList[j].name=='phone'){
                    $("#mobile").show();
                }
                if(fieldList[j].name=='corp_account'){
                    $("#corpAccount").show();
                }
                // if(fieldList[j].name=='sub_area'){
                //   //  alert(fieldList[j].label);
                //    loadArea(fieldList[j].list,fieldList[j].label);
                //     $("#select_area").show();
                // }
            // }
        }

    }
}

function changeBank() {
    resetLogin();
    // queryFundLogin();
}

function resetLogin() {
    $("#select_addr").hide();
    $("#loginId").hide();
    $("#loginPwd").hide();
    $("#select_login").find("option").remove();
    $("#select_login").empty();
    $("#select_login").prepend("<option value='0'>请选择登录方式</option>");
}

function loadSubArea(areaList,nameText) {
    $("#select_addr").find("option").remove();
    $("#select_addr").empty();
    $("#select_addr").prepend("<option value='0'>请选择"+nameText+"</option>");
    for (var k=0;k<areaList.length;k++){
        $("#select_addr").append("<option value='"+areaList[k].value+"'>"+areaList[k].key+"</option>");
    }
}


function loadArea(areaList,nameText) {
    $("#select_area").find("option").remove();
    $("#select_area").empty();
    $("#select_area").prepend("<option value='0'>请选择"+nameText+"</option>");
    for (var k=0;k<areaList.length;k++){
        $("#select_area").append("<option value='"+areaList[k].value+"'>"+areaList[k].key+"</option>");
    }
}


function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=FUND" +
        "&msg=" + $("#select_bank").val());
}

function query(){
    window.open("../../work/fund.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}

function queryBank(){
    var count = $("#select_bank option").length;
    var text = $("#name").val();
    var find = false;
    for(var i=0;i<count;i++){
        if($("#select_bank ").get(0).options[i].text == text){
            $("#select_bank ").get(0).options[i].selected = true;
            find = true;
            break;
        }
    }
    if(!find){
        alert("查询的银行不在下拉列表中！");
    }
}

function getMsg() {

    var url='/my-test/testuntil/getsms',
        data={
            // tradeNo:$("#tradeNo").val(),
            mobile:$("#mobile").val(),
            testType:$("#project_select").val(),
        };

    if($("#mobile").val().replace(/\s/g, "").length==0) {
        alert("手机号不能为空");
        return;
    }


    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {
            var words = result.split('@');

            if (words[0] == "null") {
                alert($("#mobile").val()+ "未在数据库中匹配到短信");
                return;
            }
            else {

                var fisrt = words[0].split('|');
                if (fisrt.length > 1) {
                    $("#firsttime").val(fisrt[0]);
                    $("#firstcontent").val(fisrt[1]);
                }

            }
            if (words[1] != "null") {
                var second = words[1].split('|');

                if (second.length > 1) {
                    $("#secondtime").val(second[0]);
                    $("#secondcontent").val(second[1]);
                }


            }
            var code = words[2];

            if(code.length==0)
            {
                $("#i_img_code").val("");
                // alert("未匹配到合适的验证码");
            }
            else {
                $("#i_img_code").val(code);
            }

        }

    });

}
function getData() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/data',
        data={
            tradeNo:$("#taskId").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            if(result.success){
            var resultjson = JSON.stringify(result, null, 4);

                $("#resultData").val(resultjson);
            }else {
                alert(JSON.stringify(result));
            }
        }


    });
}

