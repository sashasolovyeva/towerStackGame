<?php 
    $name = $_POST['name'];
    $score = $_POST['finalScore'];
    
    $name = trim($name);

    if ($name != null) {
        $filedata = file_get_contents('data/leaderboardData.json');
        $data = json_decode($filedata, true);

        if (count($data) >= 1) {
            $inserted = false;

            for ($i = 0; $i < count($data); $i++) {
                if ($score >= $data[$i]["score"]) {
                    
                    array_splice($data, $i, 0, [
                        [
                            "name" => $name,
                            "score" => $score
                        ]
                    ]);

                    $inserted = true;
                    break;
                }
            }
                
            if (!$inserted) {
                $data[] = [
                    "name" => $name,
                    "score" => $score
                ];
            }
        } else {
            $data[] = [
                "name" => $name,
                "score" => $score
            ];
        }

        $filedata = json_encode($data);
        file_put_contents('data/leaderboardData.json', $filedata);

        print "added";

        exit();
    }
?>