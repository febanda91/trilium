$(function() {
    $(window).resize(function() {
        // dynamically setting height of tree and note content to match window's height
        const fancyTree = $('ul.fancytree-container');

        if (fancyTree.length) {
            fancyTree.height($(window).height() - fancyTree.offset().top - 10);
        }

        const noteEditable = $('div.note-editable');

        if (noteEditable.length) {
            noteEditable.height($(window).height() - noteEditable.offset().top);
        }
    });
    $(window).resize();
});

// hot keys are active also inside inputs and content editables
jQuery.hotkeys.options.filterInputAcceptingElements = true;
jQuery.hotkeys.options.filterContentEditable = true;

$(document).bind('keydown', 'alt+h', function() {
    const toggle = $(".hide-toggle");
    const hidden = toggle.css('display') === 'none';

    toggle.css('display', hidden ? 'block' : 'none');

    $("#noteDetailWrapper").css("width", hidden ? "750px" : "100%");
});

$(document).bind('keydown', 'alt+s', function() {
    $("input[name=search]").focus();
});

// hide (toggle) everything except for the note content for distraction free writing
$(document).bind('keydown', 'alt+t', function() {
    const date = new Date();

    const dateString = date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear() + " " +
        date.getHours() + ":" + date.getMinutes();

    $('#noteDetail').summernote('insertText', dateString);
});

$(window).on('beforeunload', function(){
    // this makes sure that when user e.g. reloads the page or navigates away from the page, the note's content is saved
    // this sends the request asynchronously and doesn't wait for result
    saveNoteIfChanged();
});

// Overrides the default autocomplete filter function to search for matched on atleast 1 word in each of the input term's words
$.ui.autocomplete.filter = function (array, terms) {
    const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "value"
        ]
    };

    const fuse = new Fuse(array, options); // "list" is the item array
    return fuse.search(terms);
};