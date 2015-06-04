/**
 * Created with JetBrains WebStorm.
 * User: wwz07651
 * Date: 15-6-3
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */

//module:todoApp  对应html中的todoApp
angular.module('todoApp',[])
//下面一行定义了controller名称：TodoListController
    .controller('TodoListController',function(){
        var todoList=this;
        //定义对象数组，每个对象包含text和done属性
        todoList.todos=[
            {text:'learn angular',done:true},
            {text:'build an angular app',done:false}
        ];
        //向上面定义的对象属性进行添加内容
        todoList.addTodo=function(){
            todoList.todos.push({text:todoList.todoText,done:false});
            todoList.todoText='';
        }
        //循环遍历对象数组，获取未勾选的值
        todoList.remaining=function(){
            var count=0;
            angular.forEach(todoList.todos,function(todo){
                count+=todo.done?0:1;
            });
            return count;
        }
        //使用该方法，将勾选的对象直接删除
        todoList.archive=function(){
            var oldTodos=todoList.todos;
            todoList.todos=[];
            angular.forEach(oldTodos,function(todo){if(!todo.done) todoList.todos.push(todo);})
        }
    })