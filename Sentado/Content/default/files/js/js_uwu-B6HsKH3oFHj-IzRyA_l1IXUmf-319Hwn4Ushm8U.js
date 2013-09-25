jQuery(document).ready(function () {

    // Open pages in modal
    jQuery('#block-block-2 .disclaimer').click(function (e) {
        showLoader(e);
        loadPageInModal(this);
        return false;
    });

    jQuery('#block-block-1 .reg a').click(function (e) {
        showLoader(e);
        loadPageInModal(this);
        jQuery('.modal #page-title').css('text-align', 'center');
        return false;
    })


});

function showLoader(e) {
    var offsetX = 10;
    var offsetY = -110;

    jQuery('<div id="loader" />')
        .appendTo('body')
        .css({ "top": (e.pageY + offsetY) + "px", "left": (e.pageX + offsetX) + "px" });
}

function loadPageInModal(link) {
    jQuery.ajax({
        url: link.href,
        type: 'GET',
        success: function (data, textStatus, xhr) {
            var content = jQuery(data).find('#content').html();
            jQuery('<div class="modal hide fade" tabindex="1" />')
                .html('<div class="close" data-dismiss="modal" aria-hidden="true" />' + content)
                .modal({keyboard: true});
            jQuery("#loader").remove();
        }
    });
}

// access to opened tab via url#hash
function openTabByUrl(navTabSelector) {
    if(typeof(navTabSelector) === 'undefined') navTabSelector = '#nav-tab'; // set default arg value

    var hash = window.location.hash;
    var $hash = jQuery(hash);
    if($hash.length){
        var linkSelector = "a[href=" + hash + "]";
        jQuery(navTabSelector).find(linkSelector).tab('show');
        setTimeout('window.scroll(0, 0)', 600); // fix bug with scroll
    }
}

// init Bootstrap tab and add hash in url
function bootstrapTabInit(navTabLinkSelector) {
    if(typeof(navTabLinkSelector) === 'undefined') navTabLinkSelector = '#nav-tab a'; // set default arg value

    jQuery(navTabLinkSelector).click(function (e) {
        window.location.hash = jQuery(this).attr('href');
        jQuery(this).tab('show');
        e.preventDefault();
    })
};
