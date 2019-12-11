/**
 * Created by LiTuo on 2017/4/27.
 */
function checke() {
    var type=$("#company_select").val();
    if(type=='PAIC'){
        $("#mobile").show();
    }else{
        $("#mobile").hide();
    }
}

function login(){
    var url='/my-test/insurancePolicy/create',
        data={
            loginId:$("#loginId").val(),
            idCard:$("#idCard").val(),
            insurerCode:$("#company_select").val(),
            testType:$("#project_select").val(),
            loginType:$("#select_login").val(),
            accessMode:$("#access_mode").val(),
            mobile:$("#mobile").val()
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
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
    var url='/my-test/insurancePolicy/status',
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
    var url='/my-test/insurancePolicy/input',
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

function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=INSURANCE" +
                "&msg=" + $("#msg").val());
}

function query(){
    window.open("../../work/insurancePolicy.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}