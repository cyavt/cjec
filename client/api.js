$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:3000/data',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#temperature').text(data[0].temperature);
            $('#humidity').text(data[0].humidity);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});
