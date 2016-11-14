/**
 * Created by sparsh on 14/11/16.
 */
/**
 * Created by sparsh on 14/11/16.
 */
/**
 * Created by sparsh on 12/11/16.
 */
$(document).ready(function () {

    var marksData = {};
    var studentId;

    $(document).on('click','#b_add_marks',function(event){
        var postMarks = {};
        postMarks.marks = {};
        Object.keys(marksData.marks).forEach(function (mark) {
            if(marksData.marks.hasOwnProperty(mark)){
                postMarks.marks[mark] = Number($("#marks_form").find('input[name = "' + mark + '"]').val());
            }
        });
        postMarks.semester = marksData.semester;
        postMarks.regId = studentId;
        $.post('/dashboard/manageMarks/add',{postMarks : JSON.stringify(postMarks)}).done(function (data) {

        });
    });


    $('#b_view_marks').click(function (event) {
        var regId = $('#search_form').find('input[name="studentIdSearch"]').val();
        var semester = Number($('#search_form').find('input[name="semesterSearch"]').val());

        studentId = regId;
        //clearFields();
        $.get('/dashboard/manageMarks/view', {
            regId: regId,
            semester: semester
        }).done(function (data) {
            if (data) {
                console.log(data);
                marksData = data;
                $('#marksContainer').empty().append(getMarksForm(data.marks));
            }
        });
    });

    $(document).on('click','#b_update_marks',function(event){
        var postMarks = {};
        postMarks.marks = {};
        Object.keys(marksData.marks).forEach(function (mark) {
            if(marksData.marks.hasOwnProperty(mark)){
                postMarks.marks[mark] = Number($("#marks_form").find('input[name = "' + mark + '"]').val());
            }
        });
        postMarks.semester = marksData.semester;
        postMarks.regId = studentId;
        $.post('/dashboard/manageMarks/update',{postMarks : JSON.stringify(postMarks)}).done(function (data) {

        });
    });

    $("#b_delete_marks").click(function (event) {

        var regId = $('#search_form').find('input[name="studentIdSearch"]').val();
        var semester = Number($('#search_form').find('input[name="semesterSearch"]').val());

        var postMarks = {};
        postMarks.regId = regId;
        postMarks.semester = semester;

        $.post('/dashboard/manageMarks/delete',{postMarks : JSON.stringify(postMarks)}).done(function (data) {
            console.log(data.message);
        })

    });

    var clearFields = function () {

        var name = $('#student_form').find('input[name="studentName"]').val(null);
        var age = $('#student_form').find('input[name="studentAge"]').val(null);
        var email = $('#student_form').find('input[name="email"]').val(null);
        var address = $('#student_form').find('input[name="address"]').val(null);
        var regId = $('#student_form').find('input[name="regId"]').val(null);
        var password = $('#student_form').find('input[name="password"]').val(null);
        var program = $('#student_form').find('input[name="program"]').val(null);
        var semester = $('#student_form').find('input[name="semester"]').val(null);

    }

    var getMarksForm = function (marks) {
        var html = ejs.render(`<div class="ui stacked segment">
    <h3 class="ui header">Marks Details</h3>
    <form class="ui large form" id="marks_form">
        <div class="ui grid">
            <% Object.keys(marks).forEach(function(mark){ %>
            <% if(marks.hasOwnProperty(mark)){ %>
            <div class="eight wide column">
                <div class="field">
                    <h3><%= mark %></h3>
                    <input name="<%= mark %>" type="number" value="<%= marks[mark] %>"/>
                </div>
            </div>
            <% } %>
            <%});%>
           
            <div class="sixteen wide column">
                <input type="button" value="Add Marks" class="ui fluid large teal button" id="b_add_marks"/>
            </div>

            <div class="sixteen wide column">
                <input type="button" value="Update Marks" class="ui fluid large teal button" id="b_update_marks"/>
            </div>
          
        </div>
    </form>
</div>`, {marks: marks});
        return html;
    }
});