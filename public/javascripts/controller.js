/**
 * Created by hama on 2017/5/11.
 */
//注册模块
const registerApp = angular.module('registerApp',[]);
registerApp.controller('registerController',($scope,$http)=>{
    //数据
    $scope.formData = {};
    $scope.error = '';
    $scope.success = '';
    //这是一个表单提交的行为
    $scope.postForm = ()=>{
        $http({
            method:'POST',
            url:'/register',
            data:$.param($scope.formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(data=>{
            if(data == 'success'){
                $scope.success = '注册成功,5秒后跳转,请注意查收邮件';
                $('#successbox').fadeIn();
                setTimeout(function(){
                    window.location.href='/login';
                },5000)
            }else{
                $scope.error = data;
                $('#errorbox').fadeIn();
                setTimeout(function(){
                    $('#errorbox').fadeOut();
                },1000)
            }
        }).error(err=>{
            console.log(err);
        })
    }
})
//登录模块
const loginApp = angular.module('loginApp',[]);
loginApp.controller('loginController',($scope,$http)=>{
    $scope.formData = {};
    $scope.error = '';
    //定义表单的提交行为
    $scope.postForm = ()=>{
        $http({
            method:'POST',
            url:'/login',
            data:$.param($scope.formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(data=>{
            if(data == 'success'){
                window.location.href='/';
            }else{
                $scope.error = data;
                $('#errorbox').fadeIn();
                setTimeout(function(){
                    $('#errorbox').fadeOut();
                },1000)
            }
        }).error(err=>{
            console.log(err);
        })

    }
})
//新建问题模块
var createApp = angular.module('createApp',[]);
createApp.controller('createController',($scope,$http)=>{
    $scope.formData = {};
    $scope.isEmpty = false;
    $scope.error = '';
    var simplemde = new SimpleMDE({
        element: $("#question")[0],
        status:false,
        styleSelectedText:false,
    });
    simplemde.codemirror.on("change", function(){
        if(simplemde.value().trim() == ''){
            $scope.isEmpty = false;
            $scope.$apply('');
        }else{
            $scope.isEmpty = true;
            $scope.$apply('');
        }
    });
    $scope.postForm = ()=>{
        $scope.formData.content = simplemde.value();
        $http({
            method:'POST',
            url:'/question/create',
            data:$.param($scope.formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(data=>{
            if(typeof data === 'object'){
                window.location.href = data.url;
            }else{
                $scope.error = data;
                $('#errorbox').fadeIn();
                setTimeout(function(){
                    $('#errorbox').fadeOut();
                },1000)
            }
        }).error(err=>{
            console.log(err);
        })
    }
})
//消息列表
var messageApp = angular.module('messageApp',[]);
messageApp.controller('messageController',($scope,$http)=>{
    $scope.readOne = (index)=>{
        let messageId = $('.aw-item').eq(index).attr('message_id');
        console.log(messageId);
        $http({
            method:'GET',
            url:'/updateMessage/'+ messageId
        }).success((data)=>{
            if(data == 'success'){
                $('.aw-item').eq(index).fadeOut('slow');
            }else{
                console.log(data);
            }
        }).error((err)=>{
            console.log(err);
        })
    }
    $scope.allRead = ()=>{
        $http({
            method:'GET',
            url:'/updateAllMessage'
        }).success((data)=>{
            if(data == 'success'){
                $('.aw-item').fadeOut('slow');
            }else{
                console.log(data);
            }
        }).error((err)=>{
            console.log(err);
        })
    }
})

//问题的详情
var showApp = angular.module('showApp',[]);
showApp.controller('showController',($scope,$http)=>{
    //删除操作
    $scope.delete = ()=>{

    }
    //关注某个文章
    //关注某个人


})
showApp.controller('replyController',($scope,$http)=>{
    //一级回复
    $scope.postForm = ()=>{
        $http({
            method:'POST',
            url:$('#reply_form').attr('target'),
            data:$('#reply_form').serialize(),
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success((data)=>{
            if(typeof data == 'object'){
                window.location.reload();
            }else{
                alert(data);
            }
        }).error((err)=>{
            console.log(err);
        })
    }
})
showApp.controller('reply2Controller',($scope,$http)=>{


})

//编辑文章
var editApp = angular.module('editApp',[]);
editApp.controller('editController',($scope,$http)=>{
    $scope.formData = {
        title:$('input[name=title]').val(),
        category:$('select[name=category]').val()
    };
    $scope.isEmpty = true;
    $scope.error = '';
    var simplemde = new SimpleMDE({
        element: $("#question")[0],
        status:false,
        styleSelectedText:false,
    });
    simplemde.codemirror.on("change", function(){
        if(simplemde.value().trim() == ''){
            $scope.isEmpty = false;
            $scope.$apply('');
        }else{
            $scope.isEmpty = true;
            $scope.$apply('');
        }
    });
    $scope.updateForm = ()=>{
        console.log($scope.formData);
        console.log(simplemde.value());
    }

})

