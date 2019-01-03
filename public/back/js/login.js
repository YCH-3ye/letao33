$(function() {
  $('.form').bootstrapValidator({
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //配置校验字段  ( 需要先在 input 中配置name )\
    fields: {
      username: {
        validators: {
          // 非空校验
          notEmpty: {
            // 校验提示
            message: "用户名不能为空",
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6为"
          },
          // 配置回调函数的提示信息
          callback: {
            message: "用户名不存在"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空",
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message: "密码错误"
          }

        }
      }
    }
  });

    $('#form').on('success.form.bv',function( e ) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: "/employee/employeeLogin",
        data: $('#form').serialize(),
        success: function(info) {
          if(info.success) {
            location.href = 'index.html';
          }
          if( info.error === 1000 ) {
            //参数2: 校验状态  NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(失败) or VALID(成功)
            $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          }
          if( info.error === 1001 ) {
            $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          }
        }
      })
    })

    $("[type='reset']").click(function() {
      $('#form').data("bootstrapValidator").resetForm();
    })
})