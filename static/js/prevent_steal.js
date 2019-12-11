function check() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/prevent/steal',
        data={
            testType:$("#project_select").val(),
            siteName:$("#siteName").val(),
            userIp:$("#userIp").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            // if(result.success){
            var resultjson = JSON.stringify(result, null, 4);

            $("#resultData").val(resultjson);
            //    }else {
            //        alert(JSON.stringify(result));
            //    }
        }


    });
}
function gateWayChange(){


    var   apiuser="3";
    var   apienc="36b8ef55f9a74e9284166a0bda87d604";



    var   apiusersc="15900578770";
    var   apiencsc="6aa065f93d4cf0cd362ba29d515203b6";

    $("#apiuser").val(apiusersc);
    $("#apienc").val(apiencsc);
    if($("#project_select").val() == "buildnewgateWay"){

        $("#apiuser").val(apiusersc);
        $("#apienc").val(apiencsc);
    }
    if($("#project_select").val() == "buildnewgateWayUAT"){

        $("#apiuser").val(apiuser);
        $("#apienc").val(apienc);
    }

}