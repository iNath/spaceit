
Physics.body('player', 'circle', function( parent ){
    // private helpers

    var deg = Math.PI/180;
    var gazAcc = 0.0005;

    return {
        // we want to do some setup when the body is created
        // so we need to call the parent's init method
        // on "this"
        init: function( options ){
            parent.init.call( this, options );
            // set the rendering image
            // because of the image i've chosen, the nose of the ship
            // will point in the same angle as the body's rotational position
            //this.view = shipImg;
        },

        // this will turn the ship by changing the
        // body's angular velocity to + or - some amount
        turn: function( amount ){
            // set the ship's rotational velocity
            this.state.angular.vel = 0.5 * amount * deg;
            return this;
        },

        gaz: function(coef){

            var self = this;
            var world = this._world;
            if (!world) return self;

            var angle = this.state.angular.pos;
            var scratch = Physics.scratchpad();

            var accX = gazAcc * Math.cos( angle ) * coef, accY = gazAcc * Math.sin( angle ) * coef;

            // Angle du vecteur vitesse
            var velAngle = Math.atan(this.state.vel.y / this.state.vel.x);

            // Si la composante sur x est trop grande
            if(Math.abs(this.state.vel.x + accX) > 0.2){
                // On limite sa valeur
                this.state.vel.x = 0.2 * this.state.vel.x / Math.abs(this.state.vel.x);

                console.log('cas x')
                // Puis on réajuste la composante y pour garder l'angle
                 this.state.vel.y = this.state.vel.x * Math.tan(velAngle);

                //accX = 0;
            }
            if(Math.abs(this.state.vel.y + accY) > 0.2){
                this.state.vel.y = 0.2 * this.state.vel.y / Math.abs(this.state.vel.y);

                this.state.vel.x = this.state.vel.y / Math.tan(velAngle);
                console.log('cas y')

                //accY = 0;
            }


            var v = scratch.vector().set(
                accX,
                accY
            );

            this.accelerate(v);
            scratch.done();

            // if we're accelerating set the image to the one with the thrusters on
            /*if ( amount ){
                this.view = shipThrustImg;
            } else {
                this.view = shipImg;
            }*/
            return self;
        }
    };
});