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

    // Public Methods
};