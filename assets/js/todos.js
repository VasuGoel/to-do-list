// NOTE: on() method is used to make our events be listened on the newly created lis (dynamic) as well. It has a new argument between the actual event name and the callback function which tell that event is to be fired on that particular element that is inside the dollar sign on the left
// This is done cuz our events weren't firing on the newly created lis i.e no fadeout, no removal on clicking.
// Reason why we added "ul" on the select dollar sign is that in jQuery we can only add event listeners on elements that already exist when this code is run the first time (i.e. when the page loads ). And when this code runs for the first time we don't have all lis so if we did something like $("li").on("click", function(){.....}) it would only take effect on those existing lis but not the newly added ones.
// So just using on("click") method doesn't help but we actually have to change our code a lil bit by adding that middle argument to make event fire on that particular element.
// In a nutshell the ul denotes element that is definitely on the page when it first runs and the second element argument is to denote the element that may or may not have been on the page when it loaded.

// Strikethrough when todo is clicked
$("ul").on("click", "li", function() {
  $(this).toggleClass("strikethrough");
});


// Delete the todo when trash icon is clicked
// .parent() is a jQuery Method to target the parent of the element it postfixes
$("ul").on("click", ".delete", function(event) {
  $(this).parent().addClass("animated bounceOutRight");
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  event.stopPropagation(); //Stops the delete button (a span tag) from bubbling up (event bubbling), i.e it'll fire on the span click listener but won't continue to li then ul then div with class wrapper same way upto the html events listeners (which we don't have set up anyway).
  // In our case it prevents the li click listener from firing after the deletion of the li (won't happen anyways cuz the li is already deleted).
});


// Add New Todos
$("input[type = 'text']").on("keypress", function(event) {
  if(event.keyCode === 13) {
    if($(this).val() !== "") {
      var todoText = $(this).val();
      // NOTE: Code below didn't work well as appending with animation as it animated all the lis.
      // $("ul").append("<li>" + todoText + "<span class='delete'><i class='far fa-trash-alt' id='trash'></i></span></li>").hode().slideToggle();
      $("<li>" + todoText + "<span class='delete'><i class='far fa-trash-alt' id='trash'></i></span></li>").appendTo("ul").hide().slideToggle(0, function() {
        $(this).addClass("animated bounceInLeft");
      });
      $(this).val("");  //Acts as setter rather than just getter and sets the value of input type text as empty string
    } else {
      $("div").toggleClass("animated shake");
    }
  };
});
// NOTE: These events below listen for animation end. It removes the css animation class from div after the animation is done.
$("div").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
     $(this).removeClass("animated shake");
});

// Add functionality to plus icon
$("#plus").on("click", function() {
    $("input[type= 'text']").toggle();
    $("input[type= 'text']").addClass("animated shake");
    $("input[type= 'text']").focus(); // To keep input field already selected
});


// Make delete button appear when li is hovered over
$("ul").on("mouseenter", "li", function() {
  $(this).css("fontSize", "20px");
  $(this).children().toggle();
});
$("ul").on("mouseleave", "li", function() {
  $(this).css("fontSize", "16px");
  $(this).children().toggle();
});

// Make the Plus button animate when hovered over
$("#plus").on("mouseenter", function() {
  $(this).addClass("animated rubberBand");
});
$("#plus").on("mouseleave", function() {
  $(this).removeClass("animated rubberBand");
});

// Make the trashcan bigger when hovered over
$("ul").on("mouseenter", "#trash", function() {
  $(this).css("fontSize", "20px");
});
$("ul").on("mouseleave", "#trash", function() {
  $(this).css("fontSize", "15px");
});
