$(function () {
    $("#gotoRegi").click(function () {
        $(".bottomBox").show();

        $(".topBox").hide();
    });

    $("#gotoLogin").click(function () {
        $(".topBox").show();

        $(".bottomBox").hide();

    })

    let form = layui.form;

    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repass:function( value , item){
            let pwd = $(".bottomBox input[name=password]").val();

            if( value !== pwd){
                return "两次输入的密码不一致!!!";
            }
        },
    });

    $("#regiForm").on("click" , function(e){
        e.preventDefault();
        let data = $(this).serialize();

        $.ajax({
            type:"POST",
            url:"/api/reguser",
            data,
            success:function(res){
                console.log(res);
                if( res.status !== 0){
                    return layer.msg("注册失败!" + res.message);
                }
                layer.msg("注册成功!");

                $("#topBox").click();
            }
        });
    });
    $("#loginForm").on("click" , function(e){
        e.preventDefault();
        let data = $(this).serialize();

        $.ajax({
            type:"POST",
            url:"/api/login",
            data,
            success:function(res){
                console.log(res);

                if( res.status !== 0){
                    return layer.msg("登录失败！");
                }
                localStorage.setItem( "token" , res.token);
                layer.msg('登录成功,即将跳转去后台主页', {
                    time: 2000
                  }, function(){
                      location.href="index.html"
                  });
            }
        })
    })
})