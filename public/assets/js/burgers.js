$(document).ready(function(){

// On click of the "Add To List" Button, this function will check that the user has entered some data int0
// the input field and then make an ajax post request with all the data necessary to insert in the database
// and reloads the page to make a get request
    $("#add-btn").on("click", function(event){
        event.preventDefault();

        if(/\S/.test($("#burger-name").val().trim())){
            
            let newBurger = {
                burger_name : $("#burger-name").val().trim(),
                devoured: 0
            } 
    
            $.ajax("/api/burgers" , {
                type: "POST",
                data: newBurger
            }).then(function(res){
                console.log(res);
                location.reload();
            })
        }
    });

// On click of the "Devour it!" button, this function will create an object with the new devour state,
// grab the id of the burger and make an ajax put request. It will reload the page to show the updated states.

    $(".devour-btn").on("click", function(event){
        
        console.log("HIT!!")
        let burgerToUpdate = {
            devoured: 1
        }
        let id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgerToUpdate
        }).then(function(res){
            console.log(res);
            location.reload();
        })


    })

});//end of document.ready