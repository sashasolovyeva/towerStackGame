$(document).ready(function() {
    $("#submit").on("click", function(event) {
        event.preventDefault();

        var name = $("#fname").val();
        var finalScore = parseInt($("#finalscore").text());

        $.ajax({
            type: "POST",
            url: "processdata.php",
            data: {
                name: name,
                finalScore: finalScore
            },
            success: function(data, status){
                $(".inputForm").css("display", "none");
                $(".leaderboard").css("display", "block");

                if(data == "added") {
                    $.getJSON('data/leaderboardData.json', function(json) {

                        $('.leaderboard').empty();

                        if (json.length >= 10) {
                            for(let i = 0; i < 10; i++) {
                                console.log(json[i].name)
                                $('<div>', {
                                    id: i + 1,
                                    class: 'leaderboard-entry',
                                }).html(i + 1 + ') ' + json[i].name + ': ' + json[i].score)
                                .appendTo('.leaderboard');
                            }
                        } else {
                            for(let i = 0; i < json.length; i++) {
                                console.log(json[i].name)
                                $('<div>', {
                                    id: i + 1,
                                    class: 'leaderboard-entry',
                                }).html(i + 1 + ') ' + json[i].name + ': ' + json[i].score)
                                .appendTo('.leaderboard');
                            }
                        }
                    });
                }
            }
        })
    })
})