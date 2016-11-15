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
            if(data.redirect){
                window.location.href = data.redirect;
            }
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
                if(data.redirect){
                    window.location.href = data.redirect;
                }
                console.log(data);
                marksData = data;
                console.log(data.status);
                $('#marksContainer').empty().append(getMarksForm(data.marks,data.status));
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
            if(data.redirect){
                window.location.href = data.redirect;
            }
        });
    });

    $("#b_delete_marks").click(function (event) {

        var regId = $('#search_form').find('input[name="studentIdSearch"]').val();
        var semester = Number($('#search_form').find('input[name="semesterSearch"]').val());

        var postMarks = {};
        postMarks.regId = regId;
        postMarks.semester = semester;

        $.post('/dashboard/manageMarks/delete',{postMarks : JSON.stringify(postMarks)}).done(function (data) {
            if(data.redirect){
                window.location.href = data.redirect;
            }
        })

    });


    var getMarksForm = function (marks,status) {
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
            <% if(status == 1){ %>
            <div class="sixteen wide column">
                <input type="button" value="Add Marks" class="ui fluid large teal button" id="b_add_marks" disabled/>
            </div>
            <div class="sixteen wide column">
                <input type="button" value="Update Marks" class="ui fluid large teal button" id="b_update_marks"/>
            </div>
            <% } else { %>
            <div class="sixteen wide column">
                <input type="button" value="Add Marks" class="ui fluid large teal button" id="b_add_marks"/>
            </div>
            <div class="sixteen wide column">
                <input type="button" value="Update Marks" class="ui fluid large teal button" id="b_update_marks" disabled/>
            </div>
            <% } %>
        </div>
    </form>
</div>`, {marks: marks,status:status});
        return html;
    }
});