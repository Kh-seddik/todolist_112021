(function() {

    function closeBtnAction() {
        var addButton = document.querySelector('.add_task');
        var addNewPopup = document.querySelector('.add_new_popup');
        var taskApp = document.querySelector('.task_app');
        var closeButton = document.querySelectorAll('.closeBTN');
        var openMenu = document.querySelector('.top_title > span');

        addButton.addEventListener('click',function (e) {
            addNewPopup.classList.add('opened');
        });



        closeButton.forEach(function (elem) {
            elem.addEventListener('click',function (e) {
                addNewPopup.classList.remove('opened');
                taskApp.classList.remove('opened');
            });
        });

        openMenu.addEventListener('click',function (e) {
            taskApp.classList.add('opened');
        });
    }
    function leftMenuNav() {
        let lftmnuspan= document.querySelectorAll('.left_menu span');

        lftmnuspan.forEach(function(item){
            item.addEventListener('click', function(){

                //add selectec_class and remove unselected_class
                navigate(".left_menu span", item, "selected_span");
                navigate(".right_menu div", document.querySelector('.'+item.id), "show");

            });

        });

    }
    function navigate(listname, selected_item, _class){

        let all_list= document.querySelectorAll(listname);

        selected_item.classList.add(_class);

        let all_list_arr = [...all_list];
        let other_elements= all_list_arr.filter(function(element) {
            if (element !== selected_item){
                element.classList.remove(_class);
            }
        });


    }
    function addTask() {


    }
    closeBtnAction();
    leftMenuNav();
})();


