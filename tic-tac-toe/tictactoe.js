function TicTacToe(app_id, message_field_id) {
    let value = 'x';
    let count = 0;
    let app = document.getElementById(app_id);
    let obj = this;
    let key = app_id + '_values';

    let values = JSON.parse(localStorage.getItem(key));
    if (typeof values != 'object' || values == null) {
        values = {};
    }
    console.log(values);
    app.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.textContent == '') {
            if (count % 2 == 0) {
                value = 'x';
            }
            else {
                value = 'o';
            }

            event.target.textContent = value;

            let id = event.target.getAttribute('data-id');
            values[id] = value;
            localStorage.setItem(key, JSON.stringify(values));
            
            obj.checkWinner(value);

            count++;
        }
    });
    let links = app.getElementsByTagName('a');

    for (const [key, val] of Object.entries(values)) {
        links[key].textContent = val;
        count++;
    }

    this.checkWinner = function(player) {
        let combinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
    
            [0,3,6],
            [1,4,7],
            [2,5,8],
    
            [0,4,8],
            [2,4,6],
        ];
    
        for(let combination of combinations) {
            if (links[combination[0]].textContent == player &&
                links[combination[1]].textContent == player &&
                links[combination[2]].textContent == player) {

                document.getElementById(message_field_id).textContent = 'Winner is ' + player;
                return true;
            }
        }
    }

    if (count % 2 != 0) {
        player = 'x';
    }
    else {
        player = 'o';
    }
    this.checkWinner(player);
}


let app = new TicTacToe('app', 'message');

let tictactoe = new TicTacToe('tictactoe', 'message2');

function resestApp() {
    let app_name = this.getAttribute('data-app');
    let key = app_name + '_values';
    localStorage.setItem(key, '{}');
    location.reload();
}

