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

// Binding that can be used for displaying an Activity overlay
ko.bindingHandlers.activityOverlay = {
    init: function (element, valueAccessor, allBindingsAccessor) {
    },
    update: function (element, valueAccessor, allBindingsAccessor) {

        var $element = $(element);
        var value = valueAccessor();
        var unwrappedValue = ko.utils.unwrapObservable(value);

        if ($.isFunction($element.activity)) {
            if (unwrappedValue) {
                $element.before('<div class="busyIndicator"></div>');
                var $busyIndicator = $('.busyIndicator', $element.parent());

                // Get the layout values for the busyIndicator
                var marginHorizontal = parseInt($element.css('marginLeft').replace('px', ''), 10) + parseInt($element.css('marginRight').replace('px', ''), 10);
                var marginVertical = parseInt($element.css('marginTop').replace('px', ''), 10) + parseInt($element.css('marginBottom').replace('px', ''), 10);
                var top = $element.position().top;
                var left = $element.position().left;
                var width = $element.outerWidth() + marginHorizontal;
                var height = $element.outerHeight() + marginVertical;
                var zIndex = parseInt($element.css('z-index'));
                if (!zIndex) {
                    zIndex = 8000;
                }

                $busyIndicator.css({
                    position: 'absolute',
                    'background-color': 'white',
                    opacity: 0.8,
                    top: top,
                    left: left
                });
                $busyIndicator.css('z-index', zIndex + 1000);
                $busyIndicator.width(width);
                $busyIndicator.height(height);

                $busyIndicator.activity(true);
            }
            else {
                var $busyIndicator = $('.busyIndicator', $element.parent());
                if ($busyIndicator.length > 0) {
                    $busyIndicator.activity(false);
                    $busyIndicator.remove();
                }
            }
        }
    }
};