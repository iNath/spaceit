
Physics.body('obstacle', 'convex-polygon', function(parent){

    return {
        init: function (options) {
            parent.init.call(this, options);

            this.bodyType = 'obstacle';
            this.treatment = 'static;'
        }
    };

});