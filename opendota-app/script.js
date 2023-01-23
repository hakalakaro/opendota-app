
        // This function resets the page when the "Reset" button is clicked
    function resetClick() {
        location.reload();
        }

    //This function makes an api call to the Open Dota when user submits a match id
    function btnClick() {
        document.getElementById("information1").style.display = "block";
            var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.opendota.com/api/matches/" + document.getElementById("input1").value, true);

    //On successful api call it parses the response and shows various match informations
        xhr.onload = function () {
            //Executes only if the response from the api call is successful, 200 means success
            if (xhr.status === 200) {
                //Hides possible error-message on succesful api call
                document.getElementById("error-message").style.display = "none";
                var data = JSON.parse(xhr.responseText);
                // Turn the wanted data into variables for use
                var region = data.region;
                var radiantWin = data.radiant_win;
                if (radiantWin == true) {
                    radiantWin = "Radiant Wins";
                }
                if (radiantWin == false) {
                    radiantWin = "Dire Wins";
                }

                var start = data.start_time;
                var newStart = new Date(start * 1000); // unix timestamp conversion

                var duration = data.duration;
                var minutes = Math.floor(duration / 60); // duration comes in seconds, we turn it to minutes and seconds
                var seconds = duration % 60;

                var radiantscore = data.radiant_score;
                var direscore = data.dire_score;
                var totalkills = direscore + radiantscore;

                var matchid = document.getElementById("input1").value;

                // Display the information
                document.getElementById("infotext").style.display = "block";
                document.getElementById("infotext").innerHTML = `Showing match ID: ${matchid}`;
                document.getElementById("region").style.display = "block";
                document.getElementById("region").innerHTML = `Region: ${region}`;
                document.getElementById("startdate").style.display = "block";
                document.getElementById("startdate").innerHTML = `Start Time: ${newStart}`;
                document.getElementById("radiant_win").style.display = "block";
                document.getElementById("radiant_win").innerHTML = `Game result: ${radiantWin}`;
                document.getElementById("duration").style.display = "block";
                document.getElementById("duration").innerHTML = `Duration of the game: ${minutes} minutes and ${("0" + seconds).slice(-2)} seconds`;
                document.getElementById("radiantscore").style.display = "block";
                document.getElementById("radiantscore").innerHTML = `Radiant kills: ${radiantscore}`;
                document.getElementById("direscore").style.display = "block";
                document.getElementById("direscore").innerHTML = `Dire kills: ${direscore}`;
                document.getElementById("totalkills").style.display = "block";
                document.getElementById("totalkills").innerHTML = `Total kills: ${totalkills}`;
            }
            //If the match ID is empty or not found from the api, an error is given
            else {
                document.getElementById("error-message").style.display = "block";
                document.getElementById("error-message").innerHTML = "Error: Could not retrieve data for given match ID. Please check your input and try again.";
            }
        };
    xhr.send();
}

function btnClick2() {
    var account_id = document.getElementById("input2").value;
    document.getElementById("information2").style.display = "block";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.opendota.com/api/players/" + document.getElementById("input2").value, true);

    //On successful api call it parses the response and shows various player information
    xhr.onload = function () {
        //Executes only if the response from the api call is successful, 200 means success
        if (xhr.status === 200) {
            //Hides error-message on succesful api call
            document.getElementById("error-message2").style.display = "none";
            var data = JSON.parse(xhr.responseText);

            // Turn the wanted data into variables for use
            var name = data.profile.personaname;
            var login = data.profile.last_login;
            var profileurl = data.profile.profileurl;
            var mmr = data.mmr_estimate.estimate;

            // Display the information
            document.getElementById("acc_id").style.display = "block";
            document.getElementById("acc_id").innerHTML = `Showing account ID: ${account_id}`;
            document.getElementById("accname").style.display = "block";
            document.getElementById("accname").innerHTML = `Account name: ${name}`;
            document.getElementById("mmr").style.display = "block";
            document.getElementById("mmr").innerHTML = `Current rating: ${mmr}`;
            document.getElementById("login").style.display = "block";
            document.getElementById("login").innerHTML = `Last login: ${login}`;
            document.getElementById("profileurl").style.display = "block";
            document.getElementById("profileurl").innerHTML = `Link to profile: ${profileurl}`;
            
        }
        // if the api call didn't get a response, display error message
        else {
            document.getElementById("error-message2").style.display = "block";
            document.getElementById("error-message2").innerHTML = "Error: Could not retrieve data for given account ID. Please check your input and try again.";
        }
    };
    xhr.send();

    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://api.opendota.com/api/players/" + account_id + "/wl");

    //On successful api call it parses the response and shows various player information
    xhr1.onload = function () {
        //Executes only if the response from the api call is successful, 200 means success
        if (xhr1.status === 200) {
            //Hides error-message on succesful api call
            document.getElementById("error-message2").style.display = "none";
            var data1 = JSON.parse(xhr1.responseText);

            // Turn the wanted data into variables for use
            var win = data1.win;
            var loss = data1.lose;
            var games = win + loss;

            //Display the information
            document.getElementById("total").style.display = "block";
            document.getElementById("total").innerHTML = `Total games played: + ${games}`;
            document.getElementById("win").style.display = "block";
            document.getElementById("win").innerHTML = `Total wins:  + ${win}`;
            document.getElementById("loss").style.display = "block";
            document.getElementById("loss").innerHTML = `Total losses:  + ${loss}`;
        }
        // Again if no response, display error message
        else {
            document.getElementById("error-message2").style.display = "block";
            document.getElementById("error-message2").innerHTML = "Error: Could not retrieve data for wins / losses. Player may have hidden the information from public.";
        }
    };
    xhr1.send();
}
