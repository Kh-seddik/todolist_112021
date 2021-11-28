//elements in the array
// task = {day, day_tasks[]}
//"today": [{"id": 0,"title": "next 1 task","done": false},
//          {"id": 1,"title": "next 2 task","done": false},
//         ]
var all_tasks = [];

function parse_json() {

    fetch('./tasks.json')
        .then(response => response.json())
        .then(data =>
                //process josn data here
            {
                for (let list in data) {
                    let day = list;
                    let day_tasks = data[list];
                    let x = {day, day_tasks};
                    all_tasks.push(x);
                }
                first_load(".today", 0);
                first_load(".tomorrow", 1);
                first_load(".this_week", 2);
            }
        )
        .catch(error => console.log(error));

}

function first_load(day, index) {
    let day_div = document.querySelector(day);
    let day_tasks = all_tasks[index].day_tasks;

    for (let task of day_tasks) {
        let title = task["title"];
        const para = document.createElement("p");
        const node = document.createTextNode(title);
        para.appendChild(node);
        day_div.appendChild(para);
    }
}

function closeBtnAction() {

    var addNewPopup = document.querySelector('.add_new_popup');
    var taskApp = document.querySelector('.task_app');
    var closeButton = document.querySelectorAll('.closeBTN');
    var openMenu = document.querySelector('.top_title > span');

    closeButton.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            addNewPopup.classList.remove('opened');
            taskApp.classList.remove('opened');
            //only for new task page
            //reset text area and date
            document.querySelector('.newtask_txt').value = "";
            let today_span = document.querySelector('.chooseDate span:first-of-type');
            navigate(".chooseDate span", today_span, "selected_span");

        });
    });

    openMenu.addEventListener('click', function (e) {
        taskApp.classList.add('opened');
    });
}

function leftMenuNav() {
    let lftmnuspan = document.querySelectorAll('.left_menu span');
    lftmnuspan.forEach(function (item) {
        item.addEventListener('click', function () {

            //add selectec_class and remove unselected_class
            navigate(".left_menu span", item, "selected_span");
            navigate(".right_menu div", document.querySelector('.' + item.id), "show");
        });
    });

}

function navigate(listname, selected_item, _class) {

    let all_list = document.querySelectorAll(listname);
    selected_item.classList.add(_class);

    let all_list_arr = [...all_list];
    let other_elements = all_list_arr.filter(function (element) {
        if (element !== selected_item) {
            element.classList.remove(_class);
        }
    });


}

function addTask() {
    let new_task = document.querySelector('.newtask_txt');
    let submit_button = document.querySelector('.submit');
    let user_day = "today";

    //press add button
    let addButton = document.querySelector('.add_task');
    let addNewPopup = document.querySelector('.add_new_popup');
    addButton.addEventListener('click', function (e) {
        addNewPopup.classList.add('opened');
        //1- get the selected day from the left menu
        user_day = document.querySelector('.left_menu .selected_span').id;
        navigate(".chooseDate span", document.getElementById("date_" + user_day), "selected_span");
    });

    //2- select the task day to add new task in the day's array (today, tomorrow, or this week)
    let menu = document.querySelectorAll('.chooseDate span');
    menu.forEach(function (item) {
        item.addEventListener('click', function () {
            user_day = item.innerHTML.toLowerCase().replace(" ", "_");
            //add selected_class and remove unselected_class
            navigate(".chooseDate span", item, "selected_span");
        });
    });

    //2-add new task
    submit_button.addEventListener('click', function (e) {

        //nothing is written in the text area
        if (new_task.value.trim() == "") {
            let audio = new Audio("media/Windows_Error.wav");
            audio.play();
        } else {
            // create new task object
            let task_to_be = {
                title: new_task.value,
                done: false
            };

            // x = {day, day_tasks}
            //"today": [{"id": 0,"title": "next 1 task","done": false},
            //          {"id": 1,"title": "next 2 task","done": false},
            //         ]

            for (let x_task of all_tasks) {
                if (x_task.day.toLowerCase() == user_day) {

                    //create new task's id
                    task_to_be.id = x_task.day_tasks.length;
                    //push task to the correct day's array
                    x_task.day_tasks.push(task_to_be);

                    //add the new task to the page in the html
                    let class_name = "." + x_task.day.toLowerCase();
                    let day_div = document.querySelector(class_name);
                    const para = document.createElement("p");
                    const node = document.createTextNode(task_to_be.title);
                    para.appendChild(node);
                    day_div.appendChild(para);
                    break;
                } else {
                    //create new day by adding new object  {day, day_tasks}
                }
            }

            //highlight the selected menu tab
            navigate(".left_menu span", document.getElementById(user_day), "selected_span");
            navigate(".right_menu div", document.querySelector("." + user_day), "show");

            //close the popup
            let addNewPopup = document.querySelector('.add_new_popup');
            addNewPopup.classList.remove('opened');

            //reset text area and date
            new_task.value = "";
            // user_day = "today";
            // let today_span = document.querySelector('.chooseDate span:first-of-type');
            // navigate(".chooseDate span", today_span, "selected_span");
        }

    });


}

parse_json();
closeBtnAction();
leftMenuNav();
addTask();



