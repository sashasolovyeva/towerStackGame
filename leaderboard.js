$(document).ready(function() {
    $("#submit").on("click", function(event) {
        var name = $("#fname").val();
        var finalScore = parseInt($("#finalscore").text());

        console.log(finalScore);

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

                $.getJSON('data/leaderboardData.json', function(json) {
                    for(let i = 0; i < 5; i++) {
                        console.log(json[i].name)
                        $('<div>', {
                            id: i + 1,
                            class: 'leaderboard-entry',
                        }).html(i + 1 + ') ' + json[i].name + ': ' + json[i].score)
                        .appendTo('.leaderboard');

                    }
                });
            }
        })
    })
})