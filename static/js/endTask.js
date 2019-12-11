/**
 * Created by yanghao on 2018/11/26.
 */


function getImgCode() {
    var url='/my-test/xinqixiang/status',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:"buildnewgateWayUAT_8013933867",
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){

            $("#status").val(result.code.toString());
            if ((result.code.toString()=="20003")||(result.code.toString()=="20005"))
            {   $("#img_code").attr("");
                $("#img_code").attr('src',result.msg);
            }
            if (result.code.toString()=="20007")
            {
                $("#img_code").attr('src',result.msg);
            }
            else
           {
               $("#img_code").attr("");
           }

            $("#resultData").val(JSON.stringify(result));

            var  str=JSON.stringify(result);
            str=str+"\r\n"+$("#logStatus").val();

            //      alert(result.detail.time);
            $("#logStatus").val(str);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function clearlog() {
    $("#logStatus").val("");
}
function endTask(){
    var url='/my-test/testuntil/endTask',
        data={

            tradeNo:$("#tradeNo").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"text",
        type:"POST",

        success:function(result){
            // alert("任务创建成功:");

            // $("#resultData").val(result.detail.data);
            var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));
            alert(y);
            $("#resultData").val(y);

        }
    });
}


