$(function() {
    let count = 0;

    let links = $('#app a');
    links.click(function (event) {
        event.preventDefault();

        if ($(this).text() != '') {
            return;
        }

        let torn = 'x';
        if (count % 2 != 0) {
            torn = 'o';
        }
        $(this).text(torn);

        count++;


        const win_combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];

        for (combination of win_combinations) {
            if (
                links.eq(combination[0]).text() == torn &&
                links.eq(combination[1]).text() == torn &&
                links.eq(combination[2]).text() == torn
            ) {
                console.log('winner is ' + torn);
                links.eq(combination[0]).addClass('red');
                links.eq(combination[1]).addClass('red');
                links.eq(combination[2]).addClass('red');
                $("#dialog")
                    .dialog("open")
                    .find('strong')
                    .text(torn);
            }
        }
    });

    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $('.reset').click(function () {
        links.text('');
        count = 0;
        links.removeClass('red');
    });

    $(document).tooltip();

    $( ".draggable" ).draggable({ handle: ".handle" });
    $('.task_list').sortable();

    let template = $('.template');
    $('.add-task').click(function (event) {
        event.preventDefault();
        let todo = template.clone().removeClass('template');
        $('#tasks .task_list').append(todo);
    });


    $('#tasks').submit(function (event) {
        event.preventDefault();
        let data = $(this).serialize();
        $.post('api.php', data).done(function (response) {
            console.log(response);
        });

    });
} );