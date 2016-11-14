/**
 * Created by sparsh on 12/11/16.
 */

var semester = [];
var current_selected = -1;
var current_sem = 0;

$(document).ready(function () {
    $('.ui.modal').modal({
        onHide: function () {
            current_selected = -1;
        }
    });

    $('#b_add_program').click(function (event) {

        var programCode = $('#program_code').val();
        var programName = $('#program_name').val();
        var num_sems = Number($('#num_sems').val());

        console.log(semester);

        var semesterObject = {
            data : semester
        }

        $.post('/dashboard/manageProgram/add',{
            code : programCode,
            name : programName,
            semesterCount: num_sems,
            semesters : JSON.stringify(semesterObject)
        }).done(function(data){
            window.location.href = data.redirect;
        });
    });

    $('#b_view_program').click(function(event){
        var programCode = $(document).find('input[name="programNameSearch"]').val();
        $.get('/dashboard/manageProgram/view',{programCode:programCode}).done(function(data){
            document.write(data);
        });
    });

    $('#b_add_semster').click(function (event) {
        $('#semster_container').append(getNewSemesterFormChild());
        incrementSemesterCount();
    });


    $(document).on('click', '.ui.fluid.large.teal.button.b_add_course', function () {
        current_selected = $(this).closest('.ui.stacked.segment').attr('data-index');
        $('.ui.modal').modal('show');
    });


    $('.item.list_item').click(function (event) {
        if (current_selected > -1) {
            if (!semester[current_selected])
                semester[current_selected] = [];
            semester[current_selected].push($(this).attr('data-value'));
            addCourseToSemesterUi(current_selected, $(this).attr('data-value'));
            incrementCoursesInSemester(current_selected);
        }
        $('.ui.modal').modal('hide');
    });

});


/***************************Utility Functions*************************************/

var incrementSemesterCount = function () {
    var num_sems = Number($('#program_form').find('.ui.header.num_sems')[0].textContent);
    if (num_sems)
        num_sems += 1;
    else
        num_sems = 1;

    $('#program_form').find('.ui.header.num_sems')[0].textContent = (num_sems.toString());
};

var incrementCoursesInSemester = function (semester) {
    var semesterSegmentId = '#semester_' + semester.toString();
    var header = $(semesterSegmentId).find('.ui.header.num_courses');

    var numCoursesInput = $(semesterSegmentId).find('.ui.header.num_courses')[0].textContent;
    if (numCoursesInput) {
        console.log(numCoursesInput);
        $(semesterSegmentId).find('.ui.header.num_courses')[0].textContent = ((Number(numCoursesInput) + 1).toString());
    }
    else {
        $(semesterSegmentId).find('.ui.header.num_courses').val(((1).toString()));
    }
};

var addCourseToSemesterUi = function (current_selected, course) {
    var semesterSegmentId = '#semester_' + current_selected.toString();
    var button = $(semesterSegmentId).find('.ui.fluid.large.teal.button.b_add_course');
    $(getCourseDiv(course)).insertBefore(button);
};

var getCourseDiv = function (course) {
    var courseDiv = `<div class="sixteen wide column">
    <h4 class="ui header" style="margin-bottom: 16px">` + course.toString() + `</h4>
</div> `;
    return courseDiv;
};

var getNewSemesterFormChild = function () {
    var segmentHtml = `<div class="ui stacked segment " id="semester_` + current_sem.toString() + `" data-index="` + current_sem.toString() + `">
    <h3 class="ui header">Semester `+ (current_sem + 1).toString() +` </h3>
    <form class="ui large form" id="semster_form">
        <div class="ui grid">
            <div class="sixteen wide column">
               <label>Number of Courses</label>
               <h3 class="ui header num_courses">0</h3>
            </div>
            <div class="sixteen wide column">
                <input type="button" value="Add Course" class="ui fluid large teal button b_add_course" data-type="button"/>
            </div>
        </div>
    </form>
</div>`;
    current_sem += 1;
    return segmentHtml;
};
