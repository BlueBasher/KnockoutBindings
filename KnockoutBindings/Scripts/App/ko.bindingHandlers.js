ko.bindingHandlers.imageLoader = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $el = $(element),
            settings = valueAccessor();

        // Nothing much to do in Init. Maybe in the future when we're adding more functionality
    },
    update: function (element, valueAccessor) {
        var $el = $(element),
            settings = valueAccessor();

        // When jQuery Activity plugin has been loaded add an additional div in place of the image
        // That div will be showing the loading activity
        if ($.isFunction($el.activity)) {
            $el.before('<div class="imageLoader"></div>');

            var $imageLoader = $('.imageLoader', $el.parent());

            // Make the imageLoader div overlay the actual image
            $imageLoader.css({
                position: 'absolute',
                top: $el.position().top,
                left: $el.position().left
            });
            $imageLoader.css('z-index', $el.css('z-index') + 1);
            $imageLoader.width($el.outerWidth());
            $imageLoader.height($el.outerHeight());

            // Trigger the jQuery Activity plugin
            $imageLoader.activity(true);
        }

        // Trigger the actual loading of the image
        setTimeout(function () {
            $el.attr('src', settings.src());

            // After the image has been loaded disable the activity and remove the imageLoader div so we're cleaning up after ourselves.
            $el.load(function () {
                var $imageLoader = $('.imageLoader', $el.parent());
                if ($imageLoader) {
                    $imageLoader.activity(false);
                    $imageLoader.remove();
                }

                // Check to see if there is a callback method defined in the binding. If so, call it
                if ($.isFunction(settings.afterLoad)) {
                    settings.afterLoad.call(this, element, settings.src());
                }
            });
        },
        settings.loadDelay || 100);
    }
};