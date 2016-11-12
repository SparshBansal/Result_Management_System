/**
 * Created by sparsh on 12/11/16.
 */
$(document).ready(function () {

    $('#b_add_course').click(function (event) {
        var courseName = $('#course_form').find('input[name="courseName"]').val();
        var credits = $('#course_form').find('input[name="credits"]').val();
        var hours = $('#course_form').find('input[name="hours"]').val();
        var maxMarks = $('#course_form').find('input[name="maxMarks"]').val();


        console.log("Posting data");
        $.post('/dashboard/manageCourse/add', {
            name: courseName,
            maxMarks: maxMarks,
            hours: hours,
            credits: credits
        }).done(function (data) {
            clearFields();
            console.log(data.message);
        });

    });

    $('#b_view_course').click(function(event){
        var courseName = $('#search_form').find('input[name="courseNameSearch"]').val();
        clearFields();
        $.get('/dashboard/manageCourse/view',{
            name : courseName
        }).done(function(data){
            if(data.course){
                console.log(data.course);
                $('#course_form').find('input[name="courseName"]').val(data.course.courseName);
                $('#course_form').find('input[name="credits"]').val(data.course.credits);
                $('#course_form').find('input[name="hours"]').val(data.course.hours);
                $('#course_form').find('input[name="maxMarks"]').val(data.course.maxMarks);
            }
        });
    });

    $('#b_delete_course').click(function(event){
        var courseName = $('#search_form').find('input[name="courseNameSearch"]').val();

        $.post('/dashboard/manageCourse/delete',{
            name : courseName
        }).done(function(data){
            clearFields();
            console.log(data.message);
        });
    });

    $("#b_update_course").click(function(event){

        var courseName = $('#course_form').find('input[name="courseName"]').val();
        var credits = $('#course_form').find('input[name="credits"]').val();
        var hours = $('#course_form').find('input[name="hours"]').val();
        var maxMarks = $('#course_form').find('input[name="maxMarks"]').val();


        console.log("Posting data");
        $.post('/dashboard/manageCourse/update', {
            name: courseName,
            maxMarks: maxMarks,
            hours: hours,
            credits: credits
        }).done(function (data) {
            clearFields();
            console.log(data.message);
        });

    });

    var clearFields = function(){
        $('#course_form').find('input[name="courseName"]').val(null);
        $('#course_form').find('input[name="credits"]').val(null);
        $('#course_form').find('input[name="hours"]').val(null);
        $('#course_form').find('input[name="maxMarks"]').val(null);
    }
});