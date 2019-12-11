/**
 * Created by yanghao on 2019/3/21.
 */
function updatepassword() {

    if($("#updateby").val()==null||$("#updateby").val()=="")
    {
        alert ("操作姓名为空,请输入修改者姓名");
        return;
    }
    if($("#newpassword").val()==null||$("#newpassword").val()=="")
    {
        alert ("新密码为空,请输入新密码");
        return;
    }
    if($("#mobile").val()==null||$("#mobile").val()=="")
    {
        alert ("手机号为空,请先选择或输入手机号");
        return;
    }
    alert("更新中，请耐心等待");
    var url='/my-test/testuntil/updateCarrierPassowrd',
        data={
            // tradeNo:$("#tradeNo").val(),
            //  testType:$("#project_select").val(),
            mobile:$("#mobile").val(),
            updateby:$("#updateby").val(),
            newpassword:$("#newpassword").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        type:"POST",
        success:function(result){
            //  $("#resultData").val(JSON.stringify(result));
          //  alert(result);
            if(result=="1")
            {alert("修改成功");

            }
            else if(result=="0")
            {alert("未找到运营商数据，请检查");

            }
            else{
                alert(result);
            }
            // var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

            //$("#resultReport").val(y);

            //$("#taskId").val(result.data.task_id);
        }
    });
}