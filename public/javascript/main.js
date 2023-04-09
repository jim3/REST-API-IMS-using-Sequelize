var partname = document.getElementById("partname");
var screwtype = document.getElementById("screwtype");
var nuttype = document.getElementById("nuttype");
var bolttype = document.getElementById("bolttype");
var washertype = document.getElementById("washertype");
var form = document.getElementById("myform");

form.addEventListener("submit", function (event) {
    var part = document.querySelector('input[name="partname"]:checked');
    var type = null;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;

    if (part == null) {
        alert("Please select a category.");
        event.preventDefault();
    }

    if (part != null) {
        if (part.value == "screws") {
            type = document.querySelector('input[name="screwtype"]:checked');
        } else if (part.value == "nuts") {
            type = document.querySelector('input[name="nuttype"]:checked');
        } else if (part.value == "bolts") {
            type = document.querySelector('input[name="bolttype"]:checked');
        } else if (part.value == "washers") {
            type = document.querySelector('input[name="washertype"]:checked');
        }
    }

    if (type == null) {
        alert("Please select a " + part.value + " type.");
        event.preventDefault();
    }

    if (quantity == "") {
        alert("Please enter a quantity.");
        event.preventDefault();
    }

    if (price == "") {
        alert("Please enter a price.");
        event.preventDefault();
    }

    alert("Thank you for your order.");
});

partname.addEventListener("change", function () {
    var parttype = document.querySelector('input[name="partname"]:checked').value;
    if (parttype == "screws") {
        screwtype.disabled = false;
        nuttype.disabled = true;
        bolttype.disabled = true;
        washertype.disabled = true;
    } else if (parttype == "nuts") {
        screwtype.disabled = true;
        nuttype.disabled = false;
        bolttype.disabled = true;
        washertype.disabled = true;
    } else if (parttype == "bolts") {
        screwtype.disabled = true;
        nuttype.disabled = true;
        bolttype.disabled = false;
        washertype.disabled = true;
    } else if (parttype == "washers") {
        screwtype.disabled = true;
        nuttype.disabled = true;
        bolttype.disabled = true;
        washertype.disabled = false;
    } else {
        alert("You need to select a part type!");
    }
});
