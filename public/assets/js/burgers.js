$(document).ready(function(){

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
    })

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