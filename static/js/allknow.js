/**
 * Created by LiTuo on 2017/4/27.
 */
function login(){
    var url='/my-test/allknow/create',
        data={
            relaTradeNo:$("#relaTradeNo").val(),
            idCard:$("#idCard").val(),
            realName:$("#realName").val(),
            firstContactsMobile:$("#firstContactsMobile").val(),
            secondContactsMobile:$("#secondContactsMobile").val(),
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
            $("#resultData").val(JSON.stringify(result));
        }
    });
}
