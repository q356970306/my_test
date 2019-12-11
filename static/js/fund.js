/**
 * Created by Lituo on 2017/5/2.
 */
function login(){
    var url='/my-test/fund/create',
        data={
            loginId:$("#loginId").val(),
            logPwd:$("#loginPwd").val(),
            testType:$("#project_select").val(),
            areaCode:$("#select_city").val(),
          //  subArea:$("#select_addr").val(),
            loginType:$("#select_login").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            mobile:$("#mobile").val(),
            corpAccount:$("#corpAccount").val(),
            accessMode:$("#access_mode").val(),
            subArea:$("#select_area").val()
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                alert("任务创建成功:"+result.data.tradeNo);
                $("#tradeNo").val(result.data.tradeNo);
            }else {
                alert("任务创建失败:"+result.errorMsg);
            }
        }
    });
}


function getImgCode() {
    var url='/my-test/fund/status',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:$("#project_select").val(),

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            $("#resultData").val(JSON.stringify(result));

            var  str=JSON.stringify(result);

          //  $("#resultData").val(JSON.stringify(result));

            str=str+"\r\n"+$("#logStatus").val();


            $("#logStatus").val(str);

            $("#taskId").val(result.data.task_id);
            if(result.data.phase=='LOGIN' && result.data.phase_status=='WAIT_CODE'){
                $("#img_code").attr('src',"data:image/bmp;base64,"+result.data.input.value);
                return;
            }
        }
    });
}

function inputMsg() {
    var url='/my-test/fund/input',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
        };
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

function queryAreaList(){
    var url='/my-test/fund/arealist',
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
            loadCity(result.data);
        }
    });
}

function loadCity(data) {
    $("#select_city").find("option").remove();
    $("#select_city").empty();
    $("#select_city").prepend("<option value='0'>请选择城市</option>");
    for (var i=0;i<data.length;i++){
        if(data[i].status=='0'){
            $("#select_city").append("<option value='"+data[i].area_code+"'>"+data[i].city_name+"</option>");
        }
    }
}



function queryFundLogin(){
    if($("#select_city").val()==''||$("#select_city").val()==undefined||$("#select_city").val()=='0'){
        alert("请先选择城市");
        return;
    }
    var url='/my-test/fund/login',
        data={
            areaCode:$("#select_city").val(),
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
    if($("#select_city").val()==''||$("#select_city").val()==undefined||$("#select_city").val()=='0'){
        alert("请先选择城市");
        return;
    }
    var url='/my-test/fund/login/help',
        data={
            areaCode:$("#select_city").val(),
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
        $("#select_login").append("<option value='"+data[i].login_type+"'>"+data[i].label+"</option>");
    }
    loginData = data;


    $("#select_area").find("option").remove();
    $("#select_area").empty();
}
function checkLoginType() {
    var login_type = $("#select_login").val()
    for (var i=0;i<loginData.length;i++){
        if(loginData[i].login_type==login_type){
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
                if(fieldList[j].name=='real_name'){
                    $("#realName").show();
                }
                if(fieldList[j].name=='idCard' || fieldList[j].name=='id_card'){
                    $("#idCard").show();
                }
                if(fieldList[j].name=='mobile'){
                    $("#mobile").show();
                }
                if(fieldList[j].name=='corp_account'){
                    $("#corpAccount").show();
                }
                if(fieldList[j].name=='sub_area'){
                  //  alert(fieldList[j].label);
                   loadArea(fieldList[j].list,fieldList[j].label);
                    $("#select_area").show();
                }
            }
        }

    }
}

function changeCity() {
    resetLogin();
    queryFundLogin();
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
        "&msg=" + $("#select_city").val());
}

function query(){
    window.open("../../work/fund.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}

function queryCity(){
    var count = $("#select_city option").length;
    var text = $("#cityName").val();
    var find = false;
    for(var i=0;i<count;i++){
        if($("#select_city ").get(0).options[i].text == text){
            $("#select_city ").get(0).options[i].selected = true;
            find = true;
            break;
        }
    }
    if(!find){
        alert("查询的城市不在下拉列表中！");
    }
}



