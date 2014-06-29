(function (window, document) {
    var Utilidades = {
        EnumEventos: {
            onAppLoaded: "onAppLoaded"
        },

        Validacao: function (evt) {
            var elmt = $(evt.target),
                classFormulario = elmt.parent().attr("class"),
                formulario = elmt.parents().find("." + classFormulario);

            formulario.validate({
                // define regras para os campos
                rules: {
                    Nome: {
                        required: true,
                        minlength: 2
                    },
                    Email: {
                        required: true,
                        email: true
                    },
                    Sexo: {
                        required: true
                    },
                    Idade: {
                        required: true
                    },
                    Sobrenome: {
                        required: true,
                        minlength: 2
                    },
                    Telefone: {
                        required: true
                    },
                    FileImagem: {
                        required: true
                    },
                    Senha: {
                        required: true
                    },
                    Usuario: {
                        required: true
                    }
                },
                // define messages para cada campo
                messages: {
                    Nome: "Preencha o seu nome",
                    Email: "Preencha seu e-mail de contato",
                    Sexo: "Selecione seu sexo",
                    Idade: "Preencha com sua idade",
                    Sobrenome: "Preencha o seu sobrenome",
                    Telefone: "Preencha seu telefone de contato",
                    FileImagem: "Selecione uma imagem",
                    Senha: "Digite uma senha",
                    Usuario: "Digite um usuário"
                }
            });
        }
    };

    window.Utilidades = Utilidades;
}(this, this.document));