/**
 * Created by Lituo on 2017/4/27.
 */
function login(){
    var url='/my-test/bank/create',
        data={
            loginId:$("#loginId").val(),
            logPwd:$("#loginPwd").val(),
            bankCode:$("#bank_select").val(),
            cardType:$("#cardType_select").val(),
            loginType:$("#loginType_select").val(),
            idCard:$("#idCard").val(),
            realName:$("#realName").val(),
            loginTarget:$("#cardType_select").val(),
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
                alert("任务创建成功:"+result.data.tradeNo);
                $("#tradeNo").val(result.data.tradeNo);
            }else {
                alert("任务创建失败:"+result.errorMsg);
            }
        }
    });
}

function getImgCode() {
    var url='/my-test/bank/status',
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
    var url='/my-test/bank/input',
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

function  getBanks() {
    var url='/my-test/bank/config/list',
        data={
            testType:$("#project_select").val(),
            accessMode:$("#access_mode").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //alert(JSON.stringify(result));
            loadBank(result.data);
        }
    });
}

function loadBank(data){
    $("#bank_select").find("option").remove();
    $("#bank_select").empty();
    $("#bank_select").prepend("<option value='0'>请选择银行</option>");
    for (var i=0;i<data.length;i++){
        //alert($("#cardType_select").val() + "===============" + data[i].card_type);
        if($("#cardType_select").val() == data[i].card_type){
            for (var j=0;j<data[i].bank_list.length;j++){
                $("#bank_select").append("<option value='"+data[i].bank_list[j].abbr +"'>"+data[i].bank_list[j].name+"</option>");
            }
        }

    }
}

function getBanksLoginConfig(){
    if($("#bank_select").val() == '0'){
        alert("请选择银行");
        return;
    }
    var url='/my-test/bank/config/login',
        data={
            cardType:$("#cardType_select").val(),
            bankCode:$("#bank_select").val(),
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
            loadLoginType(result.data);
        }
    });
}

function loadLoginType(data){
    $("#loginType_select").find("option").remove();
    $("#loginType_select").empty();
    for (var i=0;i<data.logins.length;i++){
        $("#loginType_select").append("<option value='"+data.logins[i].login_type +"'>"+data.logins[i].username_desc+"</option>");
    }
}

function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=BANK" +
        "&msg=" + $("#msg").val());
}

function query(){
    window.open("../../work/bank.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}




