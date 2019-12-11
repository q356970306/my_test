/**
 * Created by Lituo on 2017/5/2.
 */
function login(){
    var url='/my-test/securitys/create',
        data={
            loginId:$("#loginId").val(),
            logPwd:$("#loginPwd").val(),
            testType:$("#project_select").val(),
            areaCode:$("#select_city").val(),
            subArea:$("#select_addr").val(),
            loginType:$("#select_login").val(),
            idCard:$("#idCard").val(),
            realName:$("#realName").val(),
            mobile:$("#mobile").val(),
            accessMode:$("#access_mode").val(),
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
    var url='/my-test/securitys/status',
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
            if(result.data.phase=='LOGIN' && result.data.phase_status=='WAIT_CODE'){
                $("#img_code").attr('src',"data:image/bmp;base64,"+result.data.input.value);
                return;
            }

            $("#taskId").val(result.data.task_id);
        }
    });
}

function inputMsg() {
    var url='/my-test/securitys/input',
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
    var url='/my-test/securitys/arealist',
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
    var url='/my-test/securitys/login',
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
}
function checkLoginType() {

    var login_type = $("#select_login").val();
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
                if(fieldList[j].name=='id_card'){
                    $("#idCard").show();
                }
                if(fieldList[j].name=='mobile'){
                    $("#mobile").show();
                }
                if(fieldList[j].name=='real_name'){
                    $("#realName").show();
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

function queryFundLogin(){
    if($("#select_city").val()==''||$("#select_city").val()==undefined||$("#select_city").val()=='0'){
        alert("请先选择城市");
        return;
    }
    var url='/my-test/securitys/login',
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

function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=SECURITY" +
        "&msg=" + $("#select_city").val());
}

function query(){
    window.open("../../work/security.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
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
