$(document).ready(function() {
  var counter = 1; // initialize counter variable

  // Add click event listener to "Add a subpage" button
  $("#add-subpage").click(function() {
    // Check if maximum number of containers has been reached
    if (counter >= 4) {
      alert("You can only add a maximum of 4 subpages.");
      return;
    }

    // Clone the last subpage container
    var $lastSubpage = $(".form-pages_subpage:last");
    var $newSubpage = $lastSubpage.clone();

    // Increment counter and use it to generate unique IDs for new input and textarea elements
    counter++;
    $newSubpage.find("input[type=text]").attr("id", "page-name-" + counter).attr("name", "page-name-" + counter);
    $newSubpage.find("textarea").attr("id", "page-seo-" + counter).attr("name", "page-seo-" + counter);

    // Set the heading of the new container
    $newSubpage.find("h2").text("Subpage " + counter);

    // Clear the input and textarea fields in the new container
    $newSubpage.find("input[type=text], textarea").val("");

    // Append the new container after the last one
    $lastSubpage.after($newSubpage);

    // Add is-shown class to the remove-subpage button in the new container
    $newSubpage.find(".remove-subpage").addClass("is-shown");

    // Disable "Add a subpage" button if maximum number of containers has been reached
    if (counter >= 4) {
      $("#add-subpage").attr("disabled", true);
    }
  });

  // Add click event listener to remove-subpage element inside a form-pages_subpage
  $(document).on("click", ".form-pages_subpage .is-shown", function() {
    $(this).closest(".form-pages_subpage").remove();

    // Update the counter and the IDs and names of the input and textarea fields
    counter--;
    $(".form-pages_subpage input[type=text], .form-pages_subpage textarea").each(function() {
      var oldId = $(this).attr("id");
      var oldName = $(this).attr("name");
      var newId = oldId.replace(/\d+$/, counter);
      var newName = oldName.replace(/\d+$/, counter);
      $(this).attr("id", newId).attr("name", newName);
    });

    // Enable "Add a subpage" button if it was disabled due to maximum number of containers
    if (counter < 4) {
      $("#add-subpage").attr("disabled", false);
    }

    // Update the subpage headings
    $(".form-pages_subpage h2").each(function(index) {
      $(this).text("Subpage " + (index + 1));
    });
  });
});