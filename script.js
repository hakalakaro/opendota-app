
        // This function resets the page when the "Reset" button is clicked
    function resetClick() {
        location.reload();
        }

    //This function makes an API call to the Open Dota when user submits a match id
    function btnClick() {

            var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.opendota.com/api/matches/" + document.getElementById("input").value, true);

    //On successful API call it parses the response and show various match informations
        xhr.onload = function () {
            //Executes only if the response from the api call is successful
            if (xhr.status === 200) {
                //Hides possible error message on succesful api call
                document.getElementById("error-message").style.display = "none";
                var data = JSON.parse(xhr.responseText);
                var radiantWin = data.radiant_win;
                if (radiantWin == true) {
                    radiantWin = "Radiant Wins";
                }
                if (radiantWin == false) {
                    radiantWin = "Dire Wins";
                }
                var duration = data.duration;
                var radiantscore = data.radiant_score;
                var direscore = data.dire_score;
                var matchid = document.getElementById("input").value;
                document.getElementById("infotext").style.display = "block";
                document.getElementById("infotext").innerHTML = `Showing match ID: ${matchid}`;
                document.getElementById("radiant_win").style.display = "block";
                document.getElementById("radiant_win").innerHTML = `Game result: ${radiantWin}`;
                document.getElementById("duration").style.display = "block";
                document.getElementById("duration").innerHTML = `Duration: ${duration} seconds`;
                document.getElementById("radiantscore").style.display = "block";
                document.getElementById("radiantscore").innerHTML = `Radiant kills: ${radiantscore}`;
                document.getElementById("direscore").style.display = "block";
                document.getElementById("direscore").innerHTML = `Dire kills: ${direscore}`;
            }
            //If the match ID is empty or not found from the api, an error is given
            else {
                document.getElementById("error-message").style.display = "block";
                document.getElementById("error-message").innerHTML = "Error: Could not retrieve data for given match ID. Please check your input and try again.";
            }
        };
    xhr.send();
        }
