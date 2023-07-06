<?php 
    $name = $_POST['name'];
    $score = $_POST['finalScore'];
    
    $name = trim($name);

    if ($name != null) {
        $filedata = file_get_contents('data/leaderboardData.json');
        $data = json_decode($filedata, true);
        $data[] = [
            "name" => $name,
            "score" => $score
        ];
        $filedata = json_encode($data);
        file_put_contents('data/leaderboardData.json', $filedata);

        exit();
    }
?>