function clearlog() {
    var url='/my-test/testuntil/deleteMailbill',
        data={


            mobile:$("#moblie").val(),

        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"text",
        type:"POST",

        success:function(result){

            alert(result);
              $("#resultData").val(result);
        }
    });
}