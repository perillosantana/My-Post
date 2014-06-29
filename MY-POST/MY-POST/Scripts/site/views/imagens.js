define(["backbone", "/Scripts/libs/jquery.validate.js", "tinyscroll"], function (Backbone, validate, tinyscrollbar) {
    var Imagens = Backbone.View.extend({
        el: ".imagens",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.form = this.$el.find("form");

            this.redimensionarBoxImagens();

            this.delegateEvents(this.events);
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            "click .btn-enviar": "onBtnEnviarClick",
            "click .box": "onBoxClick",
            "click .exibir-imagem": "onExibirImagemClick",
            "click .imagem": "onImagemClick"
        },
        redimensionarBoxImagens: function () {  
            this.quantidadeImagens = this.$el.find(".overview .box").length;


            if (this.quantidadeImagens == 0) {
                $(".scrollbar-ph").hide();
            } else if (this.quantidadeImagens >= 13) {
                this.overview = this.$el.find(".overview")

                this.overview.width((this.quantidadeImagens * 122));

                $(".scrollbar-ph").tinyscrollbar({ axis: 'x' });
            } else {
                $(".scrollbar").hide();
            }

            
        },
        onBtnEnviarClick: function (evt) {
            evt.preventDefault();
            var formData = new FormData($('.form-upload')[0]);

            $.ajax({
                url: '/Imagem/UploadImagem',
                type: 'POST',
                data: formData,
                beforeSend: function () {
                    $('.carregando').show(100);
                },
                async: false,
                complete: function () {
                    $('.carregando').hide(100);
                },
                success: function (retorno) {
                    window.location.reload();
                },
                cache: false,
                contentType: false,
                processData: false
            });
        },
        exibirImagemTamanhoGrande: function (caminhoImagem) {
            $(".exibir-imagem").show(1000);
            $(".exibir-imagem .imagem").attr("src", caminhoImagem);
        },
        esconderImagemTamanhoGrande: function () {
            $(".exibir-imagem").hide(100);
        },
        onBoxClick: function (evt) {
            elmt = $(evt.target);
            box = elmt.parent();
            caminhoImagem = box.find("img").attr("src");

            this.exibirImagemTamanhoGrande(caminhoImagem);
        },
        onExibirImagemClick: function () {
            this.esconderImagemTamanhoGrande();
        },
        onImagemClick: function () {
            this.esconderImagemTamanhoGrande();
        }
    });

    return Imagens;
});