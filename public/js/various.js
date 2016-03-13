$(document).ready(function() {
    $(".disconnect").hide()
    checkSessions()
    
    
    $("#signup-submit").on("click", function() {
        if($("#pass").val() == $("#pass2").val()) {
            $.ajax({
                type: "POST",
                url: "/signup",
                data: $("#signup-form").serialize(),
                success: function(data) {
                    if(data.created) {
                        Materialize.toast("Registered!", 1500)
                        $("#signupModal").closeModal()
                        $("#signup-form").trigger("reset")
                        checkSessions()
                    } else {
                        Materialize.toast("Username already registered!", 1500)
                    }
                }
            })
        } else {
            Materialize.toast("Passwords must be the same.", 1500)
        }
    })
    
    $("#login-submit").on("click", function() {
        $.ajax({
            type: "POST",
            url: "/login",
            data: $("#login-form").serialize(),
            success: function(data) {
                if(data.connected) {
                    Materialize.toast("Connected!", 1500)
                    $("#loginModal").closeModal()
                    $("#login-form").trigger("reset")
                    checkSessions()
                } else {
                    Materialize.toast("Invalid Data.", 1500)
                }
            }
        })
    })
    
    $(".logout").click(function() {
        $.ajax({
            type: "GET",
            url: "/logout",
            success: function(data) {
                if(!data.connected) {
                    Materialize.toast("Disconnected!", 1500)
                    checkSessions()
                } else {
                    Materialize.toast("An error has ocurred D:", 1500)
                }
            }
        })
    })
    
    function checkSessions() {
        $.ajax({
            type: "GET",
            url: "/sessions",
            async: true,
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                if(data.connected) {
                    $(".disconnect").show()
                    $(".connect").hide()
                } else {
                    $(".disconnect").hide()
                    $(".connect").show()
                }
            }
        })
    }
})