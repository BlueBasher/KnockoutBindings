function MainViewModel() {
    var
    // Private Fields
        self = this;

    // Private Methods

    // Public Properties
    self.imageName = ko.observable('http://www.bluebasher.com/pics/BlueBasher.png');
    self.imageLoaded = function (element, source) {
        alert('loaded: ' + source);
    };


    self.showActivity = ko.observable(false);

    // Public Methods
    self.activityButtonClick = function () {
        self.showActivity(true);

        setTimeout(function () {
            self.showActivity(false);
        },
        5000);
    };
};