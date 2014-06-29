(function (window, document) {
    var folder = "/Scripts/",
        views = folder + "site/views/";

    //#region getJsFile(jsFolder, fileName)
    function getJsFile(jsFolder, fileName) {
        var retorno = jsFolder + fileName + ".js";
        return retorno;
    }
    //#endregion

    //#region APP
    App = function () {
        this.login = { loadComplete: function (callBack) { require([getJsFile(views, "login")], function (arguments) { callBack(arguments); }); } };
        this.home = { loadComplete: function (callBack) { require([getJsFile(views, "home")], function (arguments) { callBack(arguments); }); } };
        this.imagens = { loadComplete: function (callBack) { require([getJsFile(views, "imagens")], function (arguments) { callBack(arguments); }); } };
    };
    window.app = new App();
    //#endregion

    // Require.js allows us to configure shortcut alias
    require.config({
        noGlobal: true,
        baseUrl: folder,
        urlArgs: new Date().getMilliseconds(),
        paths: {
            views: "site/views",
            routers: "site/routers",
            controls: "controls",
            jquery: 'libs/jquery-1.7.1.min',
            backbone: 'libs/backbone.min',
            tinyscroll: "/Scripts/plugins/jquery.tinyscrollbar"
        },
        shim: {
            'vendors/underscore': {
                exports: '_'
            },
            '/Scripts/libs/jquery.validate.js': {
                deps: ['/Scripts/libs/jquery-1.7.1.min.js'],
                exports: 'jQueryValidate'
            },
            'backbone': {
                deps: ['/Scripts/libs/jquery-1.7.1.min.js', 'libs/underscore-min'],
                exports: 'Backbone'
            },
            '/Scripts/plugins/plugins.js': {
                deps: ['/Scripts/libs/jquery-1.7.1.min.js'],
                exports: 'plugins'
            },
            '/Scripts/plugins/jquery.tinyscrollbar.js': {
                deps: ['/Scripts/libs/jquery-1.7.1.min.js'],
                exports: 'tinyscrollbar'
            },
            'utilidades.js': {
                exports: 'utilidades'
            }
        }
    });

    //init
    require(['/Scripts/libs/jquery-1.7.1.min.js',
                "backbone",
                "/Scripts/plugins/plugins.js",
                "utilidades",
                "libs/domReady",
                "/Scripts/libs/modernizr.js"
    ],
        function (jQuery, Backbone, plugins, utilidades, domReady, modernizr) {
            domReady(function () {
                if (!Backbone.History.started) {
                    Backbone.history.start();
                }

                window.pubsub.publish(Utilidades.EnumEventos.onAppLoaded);
            });
        });
}(this, this.document));