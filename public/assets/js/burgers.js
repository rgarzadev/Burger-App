$(function () {
  //changes devoured state of burger
  $(".change-status").on("click", function (event) {
    var id = $(this).data("id");
    var name = $(this).data("name");

    var newDevouredState = {
      burger_name: name,
      devoured: true
    };

    //send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devoured state to true");
        //reload the page to get the updated list
        location.reload();
      }
    );
  });

  //creates new burger
  $(".create-form").on("submit", function (event) {
    //make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    //send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        //reload the page to get the updated list
        location.reload();
      }
    );
  });

  //deletes burger from devoured list
  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");

    //send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted burger", id);
        //reload the page to get the updated list
        location.reload();
      }
    );
  });

});
