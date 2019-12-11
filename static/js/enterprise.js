function login(){
    var url='/my-test/enterprise/query',
        data={
            companyName:$("#companyName").val(),
            type:$("#type").val(),
            orgNo:$("#orgNo").val(),
            records:$("#records").val(),
            startYear:$("#startYear").val(),
            endYear:$("#endYear").val(),
            keyword:$("#keyword").val(),
            taskSubType:$("#taskSubType").val(),
            testType:$("#project_select").val()
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
            $("#tradeNo").val(result.data.tradeNo);
        }
    });
}

function getImgCode() {
    var url='/my-test/enterprise/status',
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
            $("#taskId").val(result.data.task_id);
        }
    });
}

function query() {
    var url='/my-test/enterprise/queryData',
        data={
            tradeNo:$("#tradeNo").val(),
            taskSubType:$("#taskSubType").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            $("#allData").val(JSON.stringify(result));
        }
    });
}