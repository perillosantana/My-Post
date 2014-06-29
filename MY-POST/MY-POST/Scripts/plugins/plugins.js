(function ($) {
    //CONSOLE LOG
    // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    //modo de usar: console.log(objeto,string,numbers,"hello");
    window.log = function f() { log.history = log.history || []; log.history.push(arguments); if (this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr); } };
    // make it safe to use console.log always
    (function (a) { function b() { } for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop()) ;) { a[d] = a[d] || b; } })
    (function () { try { console.log(); return window.console; } catch (a) { return (window.console = {}); } }());

    String.prototype.lpad = function (pSize, pCharPad) {
        var str = this;
        var dif = pSize - str.length;
        var ch = String(pCharPad).charAt(0);
        for (; dif > 0; dif--) str = ch + str;
        return (str);
    }

    //NUMBER toDecimal
    //MODO DE USAR: var strDecimal ="1.222,56".toDecimal();
    //RETURN: 1222.56 - para poder fazer operacoes matematicas
    String.prototype.toDecimal = function () {
        var content = this,
            result;
        result = content.replace(/\./g, "").replace(/\,/g, ".");
        return result;
    }

    //STRING FORMAT
    //MODO DE USAR: var str="Texte {0}".formar(valor);
    String.prototype.format = function () {
        var content = this,
            i = 0,
            total = arguments.length,
            replacement;

        for (i; i < total; i += 1) {
            replacement = "{" + i + "}";
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };

    //busca de cep
    $.fn.cepConsultar = function (campos) {
        this.cep({
            load: function () {
            },
            complete: function () {
            },
            error: function (msg) {
            },
            success: function (data) {
                campos.endereco.val(data.tipoLogradouro + ' ' + data.logradouro);
                campos.bairro.val(data.bairro);
                campos.estado.val(data.estado);
                campos.cidade.val(data.cidade);
                campos = undefined;
            }
        });
    };

    //GET QUERYSTRING PARAMETERS FROM URL
    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = decodeURI(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
            var total = hashes.length;
            for (var i = 0; i < total; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0].toLowerCase());
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

    //VALIDA SE CHECKBOX | RADIO BUTTON ESTA SELECIONADO
    //MODE DE USAR: $("checkbox").isSelected();
    //RETORNO: boolean;
    $.fn.isSelected = function () {
        var selected = this.attr("checked");
        return selected;
    }

    //VALIDA SE EXISTE AO MENOS 1 ITEM SELECIONADO (CHECKBOX | RADIOBUTTON)
    //MODE DE USAR: $("container").hasSelected();
    //RETORNO: boolean;
    $.fn.hasSelected = function () {
        var selected = (this.find("input:checked").length);
        return selected;
    }

    //OBTER VALORES SELECIONADOS CHECKBOX | RADIOBUTTONLIST
    //MODO DE USAR: $(container).getSelectedValues()
    //RETORNO:  Array com valores marcados
    $.fn.getSelectedValues = function () {
        var valores = [];
        this.find("input:checked").each(function (index) {
            var val = $(this).val();
            valores[index] = val;
        });

        return valores;
    };

    //ESCONDER COLUNA GRID
    //MODE DE USAR: $("tabela").hideColumn(1).hideColumn(2).hideColumn(3);
    //RETORNO: elemento;
    $.fn.hideColumn = function (index) {
        var headerColunas = this.find("th:nth-child(" + (index + 1) + ")");
        headerColunas.hide();

        var colunas = this.find("td:nth-child(" + (index + 1) + ")");
        colunas.hide();

        return this;
    };

    //VERIFICA SE GRID TEM REGISTROS
    //modo de usar: $(gridSeletor).hasRows();
    //return: boolean
    $.fn.hasRows = function () {
        var bool = (this.find("tbody").find("tr").length > 0);
        return bool;
    }

    //OBTER COLUNA GRID
    //modo de usar: $(gridSeletor).column(1);
    //return: tr
    $.fn.column = function (index) {
        var coluna = this.find("td:nth-child(" + (index + 1) + ")");

        return coluna;
    };

    //DESMARCAR TODAS OPÇÕES SELECIONADAS CHECKBOX LIST | RADIOBUTTON LIST
    //modo de usar: $(seletor).unselectAll();
    $.fn.unselectAll = function () {
        this.find("input:checked").each(function (index) {
            $(this).removeAttr("checked");
        });
    };

    //SELECIONAR CHECKBOX LIST | RADIOBUTTON LIST POR VALOR
    //modo de usar: $(seletor).listSelectValue ("valor");
    $.fn.listSelectValue = function (valor) {
        this.find("input").each(function (index) {
            var elmt = $(this),
                val = elmt.val().toString();

            if (val.toString() === valor) {
                elmt.attr('checked', true);
            }
        });
    }

    //ADICIONA EVENTOS DE CLICK NO RADIO BUTTON LIST
    //modo de usar: $(seletorRadioButtoList).radioButtonListClick(onClick);
    $.fn.radioButtonListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":radio")) {
                var radioButton = $(this).find("input:radio");

                var isEnable = !radioButton.attr("disabled");

                if (isEnable) {
                    radioButton.attr("checked", true);

                    if (onChangeCallBack) {
                        onChangeCallBack(radioButton);
                    }
                }
            }
        });

        return this;
    };

    //CHECKBOX LIST
    //modo de usar: $(seletorCheckBoxList).checkBoxListClick(onClick);
    $.fn.checkBoxListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":checkbox")) {
                var checkBox = $(this).find("input:checkbox");

                if (!checkBox.attr("disabled")) {
                    var isChecked = checkBox.is(":checked");

                    if ($(evt.target).attr("type") === "checkbox") {
                        checkBox.attr("checked", isChecked);
                    } else {
                        checkBox.attr("checked", !isChecked);
                    }

                    if (onChangeCallBack) {
                        onChangeCallBack(checkBox);
                    }
                }
            }
        });

        return this;
    };

    //WAIT (delay callback)
    //MODO DE USAR: $.wait(delay,callback);
    $.extend({
        wait: function (delay, callBack) {
            var idTimeOut = setTimeout(onComplete, delay);
            function onComplete() {
                clearTimeout(idTimeOut);
                callBack();
            }

            return idTimeOut;
        }
    });

    //KILL TIMEOUT ($.wait(500,func))
    //MODO DE USAR: var timer = $.wait(500,func);  //$.killTimeOut(timer);
    $.extend({
        killTimeOut: function (timer) {
            clearTimeout(timer);
        }
    });

    //RESETA CAMPOS COM AVISO PARA SEU ESTADO NORMAL
    //DEPENDENCIA: jQuery.validate
    //MODO DE USAR: $("form").reset();
    $.fn.reset = function () {
        var validator = this.validate();
        this.clearForm();
        this.find("label.error").text("");
        this.find("*").removeClass("error");
        validator.resetForm();
        $(".field-validation-error").empty();
    };

    $.fn.disableEnter = function () {
        this.bind("keyup keypress", function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
                e.preventDefault();
                return false;
            }
        });
        return this;
    };

    $.fn.resetValidation = function () {
        var validator = this.validate();
        this.find("label.error").text("");
        this.find("*").removeClass("error");
        validator.resetForm();
        $(".field-validation-error").empty();
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    //LIMPA CAMPOS DO FORMULARIO
    //MODO DE USAR: $("form").clearForm();
    $.fn.clearForm = function () {
        this.find(':input').each(function (index, elmt) {
            switch (this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
            }
        });

        return this;
    };

    //DESABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").disable();
    $.fn.disable = function () {
        this.find(':input').each(function (index, elmt) {
            $(elmt).addClass("disabled").attr("disabled", true);
        });

        return this;
    };

    //DESABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").disableInput();
    $.fn.disableInput = function () {
        this.addClass("disabled").attr("disabled", true);
        this.find(':input').each(function (index, elmt) {
            $(elmt).addClass("disabled").attr("disabled", true);
        });

        return this;
    };

    //HABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").enable();
    $.fn.enable = function () {
        this.find(':input').each(function (index, elmt) {
            $(elmt).removeClass("disabled").attr("disabled", false);
        });
        return this;
    };

    //HABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").enableInput();
    $.fn.enableInput = function () {
        this.removeClass("disabled").attr("disabled", false);
        this.find(':input').each(function (index, elmt) {
            $(elmt).removeClass("disabled").attr("disabled", false);
        });

        return this;
    };

    $.fn.watch = function (props, callback, timeout) {
        if (!timeout)
            timeout = 10;
        return this.each(function () {
            var el = $(this),
                func = function () { __check.call(this, el) },
                data = {
                    props: props.split(","),
                    func: callback,
                    vals: []
                };
            $.each(data.props, function (i) { data.vals[i] = el.css(data.props[i]); });
            el.data(data);
            if (typeof (this.onpropertychange) == "object") {
                el.bind("propertychange", callback);
            } else if ($.browser.mozilla) {
                el.bind("DOMAttrModified", callback);
            } else {
                setInterval(func, timeout);
            }
        });
        function __check(el) {
            var data = el.data(),
                changed = false,
                temp = "";
            for (var i = 0; i < data.props.length; i++) {
                temp = el.css(data.props[i]);
                if (data.vals[i] != temp) {
                    data.vals[i] = temp;
                    changed = true;
                    break;
                }
            }
            if (changed && data.func) {
                data.func.call(el, data);
            }
        }
    }

    //HELPER PARA USAR O CKEDITOR
    /*MODO DE USAR:
        var ckeditorHelper = $(selector).ckeditorHelper(containerId);
        ckeditorHelper.setText(texto);
        ckeditorHelper.getFormatedText();
        ckeditorHelper.getText();
    */
    $.fn.ckeditorHelper = function (containerId) {
        var html = "",
            editor = undefined,
            config = {},
            scope = this;

        if (window.CKEDITOR) {
            (function () {
                var showCompatibilityMsg = function () {
                    var env = CKEDITOR.env,
                        html = '<p><strong>Your browser is not compatible with CKEditor.</strong>',
                        browsers = {
                            gecko: 'Firefox 2.0',
                            ie: 'Internet Explorer 6.0',
                            opera: 'Opera 9.5',
                            webkit: 'Safari 3.0'
                        },
                        alsoBrowsers = '',
                        key,
                        alertsEl,
                        onload;

                    for (key in env) {
                        if (browsers[key]) {
                            if (env[key]) {
                                html += ' CKEditor is compatible with ' + browsers[key] + ' or higher.';
                            } else {
                                alsoBrowsers += browsers[key] + '+, ';
                            }
                        }
                    }

                    alsoBrowsers = alsoBrowsers.replace(/\+,([^,]+), $/, '+ and $1');

                    html += ' It is also compatible with ' + alsoBrowsers + '.';
                    html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';

                    alertsEl = document.getElementById('alerts');
                    alertsEl && (alertsEl.innerHTML === this.html);
                };

                onload = function () {
                    // Show a friendly compatibility message as soon as the page is loaded,
                    // for those browsers that are not compatible with CKEditor.
                    if (!CKEDITOR.env.isCompatible) {
                        showCompatibilityMsg();
                    }
                };

                // Register the onload listener.
                if (window.addEventListener) {
                    window.addEventListener('load', onload, false);
                } else if (window.attachEvent) {
                    window.attachEvent('onload', onload);
                }
            }());
        }

        // Create a new editor inside the <div id="editor">, setting its value to html
        config.toolbar = 'Full';
        config.resize_enabled = false;
        config.toolbar_Full =
            [
                { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] }
            ];

        editor = CKEDITOR.appendTo(containerId, config, html);

        return {
            instance: editor,
            getFormatedText: function () {
                var textoHtml = scope.find("iframe").contents().find("body").html();
                return textoHtml;
            },
            getText: function () {
                var texto = Utilidades.htmlRemover(scope.find("iframe").contents().find("body").html().replace(/&nbsp;/g, ''));
                return texto;
            },
            setText: function (value) {
                console.log("setText", editor);
                editor.setData(value);
            },
            setReadOnly: function (value) {
                editor.setReadOnly(value);
            },
            removeToolBar: function () {
                $("#" + containerId).find(".cke_toolbox").remove();
                $("#" + containerId).find(".cke_path").remove();
            },
            destroy: function () {
                $("#" + containerId).empty();
            },
            focus: function () {
                var focusManager = new CKEDITOR.focusManager(editor);
                focusManager.focus();
            }
        };
    }
}(jQuery));