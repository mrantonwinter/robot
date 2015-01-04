app.filter('dot2underscore', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/[.]/g, '_')) : '';
    };
})