/**
 * Created by sparsh on 14/11/16.
 */
/**
 * Created by sparsh on 12/11/16.
 */
$(document).ready(function () {

    $('#b_add_student').click(function (event) {
        var student = {};
        student.name = $('#student_form').find('input[name="studentName"]').val();
        student.age = $('#student_form').find('input[name="studentAge"]').val();
        student.email = $('#student_form').find('input[name="email"]').val();
        student.address = $('#student_form').find('input[name="address"]').val();
        student.regId = $('#student_form').find('input[name="regId"]').val();
        student.password = $('#student_form').find('input[name="password"]').val();
        student.program = $('#student_form').find('input[name="program"]').val();
        student.semester = $('#student_form').find('input[name="semester"]').val();
        
        
        console.log(student);
        
        $.post('/dashboard/manageStudent/add', {
            student : JSON.stringify(student)
        }).done(function (data) {
            if(data.redirect){
                window.location.href = data.redirect;
            }
            clearFields();
            console.log(data.message);
        });

    });

    $('#b_view_student').click(function(event){
        var regId = $('#search_form').find('input[name="studentIdSearch"]').val();
        clearFields();
        $.get('/dashboard/manageStudent/view',{
            regId : regId
        }).done(function(data){
            if(data.redirect){
                window.location.href = data.redirect;
            }
            if(data){
                var student = data.data.student;
                var member = data.data.member;

                var name = $('#student_form').find('input[name="studentName"]').val(member.name);
                var age = $('#student_form').find('input[name="studentAge"]').val(member.age);
                var email = $('#student_form').find('input[name="email"]').val(member.email);
                var address = $('#student_form').find('input[name="address"]').val(member.address);
                var regId = $('#student_form').find('input[name="regId"]').val(student.registrationId);
                var password = $('#student_form').find('input[name="password"]').val(null);
                var program = $('#student_form').find('input[name="program"]').val(student.program);
                var semester = $('#student_form').find('input[name="semester"]').val(student.semester);

            }
        });
    });

    $('#b_delete_student').click(function(event){

        var regId = $('#search_form').find('input[name="studentIdSearch"]').val();

        $.post('/dashboard/manageStudent/delete',{
            regId : regId
        }).done(function(data){
            if(data.redirect){
                window.location.href = data.redirect;
            }
            clearFields();
            console.log(data.message);
        });
    });

    $("#b_update_student").click(function(event){

        var student = {};
        student.name = $('#student_form').find('input[name="studentName"]').val();
        student.age = $('#student_form').find('input[name="studentAge"]').val();
        student.email = $('#student_form').find('input[name="email"]').val();
        student.address = $('#student_form').find('input[name="address"]').val();
        student.regId = $('#student_form').find('input[name="regId"]').val();
        student.password = $('#student_form').find('input[name="password"]').val();
        student.program = $('#student_form').find('input[name="program"]').val();
        student.semester = $('#student_form').find('input[name="semester"]').val();


        console.log(student);

        $.post('/dashboard/manageStudent/update', {
            student : JSON.stringify(student)
        }).done(function (data) {
            if(data.redirect){
                window.location.href = data.redirect;
            }
            clearFields();
            console.log(data.message);
        });

    });

    var clearFields = function(){

        var name = $('#student_form').find('input[name="studentName"]').val(null);
        var age = $('#student_form').find('input[name="studentAge"]').val(null);
        var email = $('#student_form').find('input[name="email"]').val(null);
        var address = $('#student_form').find('input[name="address"]').val(null);
        var regId = $('#student_form').find('input[name="regId"]').val(null);
        var password = $('#student_form').find('input[name="password"]').val(null);
        var program = $('#student_form').find('input[name="program"]').val(null);
        var semester = $('#student_form').find('input[name="semester"]').val(null);
        
    }
});