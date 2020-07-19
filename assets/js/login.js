$(function () {
    $('#link_zhuce').on('click', function () {
        $('.denglujiemian').hide()
        $('.zhucejiemian').show()

    })
    $('#link_denglu').on('click', function () {
        $('.denglujiemian').show()
        $('.zhucejiemian').hide()

    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.zhucejiemian [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
      //注册 
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_denglu').click()
        })

    })

    //登录
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
            
        })
    })
})