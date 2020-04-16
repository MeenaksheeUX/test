var users = [{
    id: 1,
    OrderNumber: 1,
    UserName: "Nagendra",
    OrderDate: "03/30/2020",
    RequiredDate: "03/30-/2020",
    ShippedDate: "03/30/3030",
    Email: "nagendra@april.biz",
    Status: "Active",
    Contact: "9999999999",
    street: "Kulas Light",
    city: "Gwenborough",
    zipcode: "92998-3874"
},
{
    id: 2,
    OrderNumber: 2,
    UserName: "Kumar",
    OrderDate: "03/30/2020",
    RequiredDate: "03/30/2020",
    ShippedDate: "03/30/3030",
    Email: "Kumar@april.biz",
    Status: "InActive",
    Contact: "9999999999",
    street: "Kulas Light",
    city: "Gwenborough",
    zipcode: "92998-3874"
},
{
    id: 3,
    OrderNumber: 3,
    UserName: "Johnson",
    OrderDate: "03/30/2020",
    RequiredDate: "03/30/2020",
    ShippedDate: "03/30/3030",
    Email: "Johnson@april.biz",
    Status: "Pending",
    Contact: "9999999999",
    street: "Kulas Light",
    city: "Gwenborough",
    zipcode: "92998-3874"
}
]

$.each(users, function (i, user) {
    appendToUsrTable(user);
});

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#addUser").submit(function () {
    var user = {};
    var orderNumber = $('input[name="OrderNumber"]').val().trim();
    var userName = $('input[name="UserName"]').val().trim();
    var orderDate = $('input[name="OrderDate"]').val().trim();
    var requiredDate = $('input[name="RequiredDate"]').val().trim();
    var shippedDate = $('input[name="ShippedDate"]').val().trim();
    var email = $('input[name="Email"]').val().trim();
    var status = $('input[name="Status"]').val().trim();
    var contact = $('input[name="Contact"]').val().trim();
    var street = $('input[name="street"]').val().trim();
    var city = $('input[name="city"]').val().trim();
    var zipCode = $('input[name="zipcode"]').val().trim();
    if (orderNumber && userName && orderDate && requiredDate && shippedDate && email && status && contact && street && city && zipCode) {
        $(this).serializeArray().map(function (data) {
            user[data.name] = data.value;
        });
        var lastUser = users[Object.keys(users).sort().pop()];
        user.id = lastUser.id + 1;

        addUser(user);
    } else {
        alert("All fields must have a valid value.");
    }
});

function addUser(user) {
    users.push(user);
    appendToUsrTable(user);
}

function editUser(id) {
    users.forEach(function (user, i) {
        if (user.id == id) {
            $(".modal-body").empty().append(`
        <form id="updateUser" action="">
        <div class="row">
        <div class="col-3">
            <input class="form-control" type="number" name="OrderNumber" value="${user.OrderNumber}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="text" name="UserName" value="${user.UserName}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="text" name="OrderDate"
                onfocus="(this.type='date')" placeholder="Order Date" value="${user.OrderDate}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="text" name="RequiredDate"
                onfocus="(this.type='date')" placeholder="Required Date" value="${user.RequiredDate}"/>
        </div>
        </div>
        <br>
        <div class="row">
        <div class="col-3">
           <input class="form-control" type="text" name="ShippedDate"
            onfocus="(this.type='date')" placeholder="Shipped Date" value="${user.ShippedDate}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="email" name="Email" value="${user.Email}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="text" name="Status" value="${user.Status}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="number" name="Contact" value="${user.Contact}"/>
        </div>
        </div>
        <br>
        <div class="row">
        <div class="col-3">
            <input class="form-control" type="text" name="street" value="${user.street}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="text" name="city" value="${user.city}"/>
        </div>
        <div class="col-3">
            <input class="form-control" type="number" name="zipcode" value="${user.zipcode}"/>
        </div>
        </div>
    `);
            $(".modal-footer").empty().append(`
            <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">SAVE CHANGES</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">CLOSE</button>
        </form>
    `);
        }
    });
}

function deleteUser(id) {
    var action = confirm("Are you sure you want to delete this user?");
    var msg = "User deleted successfully!";
    users.forEach(function (user, i) {
        if (user.id == id && action != false) {
            users.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
            flashMessage(msg);
        }
    });
}

function updateUser(id) {
    var msg = "User updated successfully!";
    var user = {};
    user.id = id;
    users.forEach(function (user, i) {
        if (user.id == id) {
            $("#updateUser").find("input").each(function () {
                var value = $(this).val();
                var attr = $(this).attr("name");
                if (attr == "OrderNumber") {
                    user.OrderNumber = value;
                } else if (attr == "UserName") {
                    user.UserName = value;
                } else if (attr == "OrderDate") {
                    user.OrderDate = value;
                } else if (attr == "RequiredDate") {
                    user.RequiredDate = value;
                } else if (attr == "ShippedDate") {
                    user.ShippedDate = value;
                } else if (attr == "Email") {
                    user.Email = value;
                } else if (attr == "Status") {
                    user.Status = value;
                } else if (attr == "Contact") {
                    user.Contact = value;
                } else if (attr == "street") {
                    user.street = value;
                } else if (attr == "city") {
                    user.city = value;
                } else if (attr == "zipcode") {
                    user.zipcode = value;
                }
            });
            users.splice(i, 1);
            users.splice(user.id - 1, 0, user);
            $("#userTable #user-" + user.id).children(".userData").each(function () {
                var attr = $(this).attr("name");
                if (attr == "OrderNumber") {
                    $(this).text(user.OrderNumber);
                } else if (attr == "UserName") {
                    $(this).text(user.UserName);
                } else if (attr == "OrderDate") {
                    $(this).text(user.OrderDate);
                } else if (attr == "RequiredDate") {
                    $(this).text(user.RequiredDate);
                } else if (attr == "ShippedDate") {
                    $(this).text(user.ShippedDate);
                } else if (attr == "Email") {
                    $(this).text(user.Email);
                } else if (attr == "Status") {
                    $(this).text(user.Status);
                } else if (attr == "Contact") {
                    $(this).text(user.Contact);
                } else if (attr == "street") {
                    $(this).text(user.street);
                } else if (attr == "city") {
                    $(this).text(user.city);
                } else {
                    $(this).text(user.zipcode);
                }
            });
            $(".modal").modal("toggle");
            flashMessage(msg);
        }
    });
}

function flashMessage(msg) {
    $(".flashMsg").remove();
    $(".alert-msg").prepend(`
<div class="col-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
`);
}

function appendToUsrTable(user) {
    $("#userTable > tbody:last-child").append(`
<tr id="user-${user.id}">
    <td class="userData" name="OrderNumber">${user.OrderNumber}</td>
    '<td class="userData" name="UserName">${user.UserName}</td>
    <td class="userData" name="OrderDate">${user.OrderDate}</td>
    '<td class="userData" name="RequiredDate">${user.RequiredDate}</td>
    <td class="userData" name="ShippedDate">${user.ShippedDate}</td>
    '<td class="userData" name="Email">${user.Email}</td>
    '<td class="userData" name="Status">${user.Status}</td>
    <td class="userData" name="Contact">${user.Contact}</td>
    '<td class="userData" name="street">${user.street}</td>
    '<td class="userData" name="city">${user.city}</td>
    '<td id="tdZipCode" class="userData" name="OrderDate">${user.zipcode}</td>
    '<td align="center">
        <button class="btn btn-success" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
    </td>
    <td align="center">
        <button class="btn btn-danger" onClick="deleteUser(${user.id})">DELETE</button>
    </td>
</tr>
`);
}
