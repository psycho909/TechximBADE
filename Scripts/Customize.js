$(document).ready(function () {
    $('.collapseLayers').on('click', function () {
        var $BOX_PANEL = $(this).closest('.card'),
            $BOX_CONTENT = $BOX_PANEL.find('card-body');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.removeAttr('style');
            $('#collapseLayers').removeClass("col-md-1");
            $('#mapDiv').removeClass("col-md-11");
            $('#mapDiv').removeClass("col-sm-11");
            $('#collapseLayers').addClass("col-md-3");
            $('#collapseLayers').addClass("col-sm-3");
            $('#mapDiv').addClass("col-md-9");
            $('#mapDiv').addClass("col-sm-9");
            $('#toggleBtn').removeClass("fas fa-plus");
            $('#toggleBtn').addClass("fas fa-minus");
            $('.list-unstyled').show();
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
            $('#collapseLayers').removeClass("col-md-3");
            $('#collapseLayers').removeClass("col-sm-3");
            $('#mapDiv').removeClass("col-md-9");
            $('#mapDiv').removeClass("col-sm-9");
            $('#collapseLayers').addClass("col-md-1");
            $('#mapDiv').addClass("col-md-11");
            $('#mapDiv').addClass("col-sm-11");
            $('#toggleBtn').removeClass("fas fa-minus");
            $('#toggleBtn').addClass("fas fa-plus");
            $('.list-unstyled').hide();
        }

    });
});