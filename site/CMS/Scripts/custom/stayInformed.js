﻿$(document).ready(function () {
    $(".sidebarBoxC input.submitBtn").submit(submitEmail);
    function submitEmail() {
        var email = $(".sidebarBoxC input[name=email]").val();
        $.get('/SidebarPage/SubmitEmail', { email: email }, function () {
            alert("Thank you for your submission");
        });
    }
});