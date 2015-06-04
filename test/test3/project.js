/**
 *
 * Created with JetBrains WebStorm.
 * User: wwz07651
 * Date: 15-6-4
 * Time: 上午10:12
 * To change this template use File | Settings | File Templates.
 */
angular.module('project',['ngRoute','firebase'])

.value('fbURL','https://ng-projects-list.firebaseio.com/')
.service('fbRef',function(fbURL){
        return new Firebase(fbURL);
    })
.service('fbAuth',function($q,$firebase,$firebaseAuth,fbRef){
        var auth;
        return function(){
            if(auth){
                return $q.when(auth);
            }
            var authObj=$firebaseAuth(fbRef);
            if(authObj.$getAuth()){
                return $q.when(auth==authObj.$getAuth());
            }
            var deferred=$q.defer();
            authObj.$authAnonymously().then(function(authData){
                auth=authData;
                deferred.resolve(authData);
            });
            return deferred.promise;
        }
    })
.service('Project',function ($q,$firebase,fbRef,fbAuth){
        var self=this;
        this.fetch=function(){
            if(this.projects) return $q.when(this.projects);
            return fbAuth().then(function(auth){
                var deferred=$q.defer();
                var ref=fbRef.child('project-fresh/'+auth.auth.uid);
                var projects=$firebase(ref);
                ref.on('value',function(snapshot){
                    if(snapshot.val()===null){
                        $projects.$set(window.projectsArray);
                    }
                    self.projects=$projects.$asArray();
                    deferred.resolve(self.projects);
                });
                ref.onDisconnect().remove();
                return deferred.promise;
            })
        }
    })
.config(function($routeProvider){
        $routeProvider
            .when('/',{
                controller:'ProjectListController as projectList',
                templateUrl:'list.html',
                resolve:{
                    projects:function(Projects){
                        return Projects.fetch();
                    }
                }
            })
            .when('/edit/:projectId',{
                controller:'EditProjectController as editProject',
                templateUrl:'detail.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    })
.controller('NewProjectController',function($location,Projects){
        var editProject=this;
        editProject.save=function(){
            Projects.$add(editProject.project).then(function(data){
                $location.path('/');
            });
        }
    })

.controller('EditProjectController',function($location,$routeParams,Projects){
        var editProject=this;
        var projectId=$routeParams.projectId,
            projecrIndex;
        editProject.projects=Projects.projects;
        projecrIndex=editProject.projects.$indexFor(projectId);
        editProject.project=editProject.projects[projecrIndex];

        editProject.destroy=function(){
            editProject.projects.$remove(editProject.project).then(function(data){
                $location.path('/');
            });
        };

        editProject.save=function(){
            editProject.projects.$save(editProject.project).then(function(data){
                $location.path('/');
            })
        }
    })