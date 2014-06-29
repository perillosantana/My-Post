define(["backbone", "/Scripts/libs/jquery.validate.js"], function (Backbone, validate) {
    var Login = Backbone.View.extend({
        el: ".mypost-login",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.form = this.$el.find("form");

            this.delegateEvents(this.events);
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            "click .btn-enviar": "onBtnEnviarClick",
            "click .u-abas ul li a": "onLinkAbaClick"
        },
        onBtnEnviarClick: function (evt) {
            console.log(evt);
            Utilidades.Validacao(evt);

            var usuario = $('.txt-usuario').val();
            var senha = $('.txt-senha').val();

            if (usuario != '' && senha != '') {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/Home/Entrar",
                    data: "{'Usuario':'" + usuario + "','Senha':'" + senha + "'}",
                    dataType: "JSON",
                    success: function (data) {
                        var obj = data.d;
                        console.log(obj);
                    },
                    error: function (result) {
                        console.log(result);
                        alert("Error");
                        $('#lblmsg').html("Erro login");
                    }
                });
            }
        },
        onLinkAbaClick: function (evt) {
            elmt = $(evt.target);
            currentAttrValue = elmt.attr('href');

            //Show/Hide Tabs
            $('.mypost-login ' + currentAttrValue).show().siblings().hide();

            // Change/remove current tab to active
            elmt.parent('li').addClass('active').siblings().removeClass('active');

            evt.preventDefault();
        }
    });

    return Login;
});