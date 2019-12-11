/**
 * Created by LiTuo on 2017/4/27.
 */
function login(){
    var url='/my-test/linked/create',
        data={
            loginId:$("#loginId").val(),
            logPwd:$("#loginPwd").val(),
            testType:$("#project_select").val(),
            accessMode:$("#access_mode").val(),
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
    var url='/my-test/linked/status',
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
    var url='/my-test/linked/input',
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
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=LINKEDIN" +
                "&msg=" + $("#msg").val());
}

function query(){
    window.open("../../work/linked.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}