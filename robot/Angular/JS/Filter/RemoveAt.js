app.filter('removeat', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/@/g, '')) : '';
    };
})