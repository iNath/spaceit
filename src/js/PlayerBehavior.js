Physics.behavior('player-behavior', function( parent ){

    return {
        init: function( options ){
            var self = this;

            parent.init.call(this, options);

            // the player will be passed in via the config options
            // so we need to store the player
            var player = self.player = options.player;

            // events
            document.addEventListener('keydown', function( evt ){

                switch ( evt.keyCode ){
                    case 38: // up
                        self.forward(true);
                        break;
                    case 40: // down
                        self.backward(true);
                        break;
                    case 37: // left
                        player.turn( -1 );
                        break;
                    case 39: // right
                        player.turn( 1 );
                        break;
                    case 90: // z
                        //player.shoot();
                        break;
                }
                return false;
            });

            document.addEventListener('keyup', function( evt ){
                switch ( evt.keyCode ){
                    case 38: // up
                        self.forward( false );
                        break;
                    case 40: // down
                        self.backward( false );
                        break;
                    case 37: // left
                        player.turn( 0 );
                        break;
                    case 39: // right
                        player.turn( 0 );
                        break;
                    case 32: // space
                        break;
                }
                return false;
            });
        },

        // when this behavior is added to the world
        connect: function( world ){
            world.on('collisions:detected', this.checkPlayerCollision, this);
            world.on('integrate:positions', this.behave, this);
        },

        // when this behavior is removed from the world
        disconnect: function( world ){
            world.off('collisions:detected', this.checkPlayerCollision);
            world.off('integrate:positions', this.behave);
        },

        // check to see if the player has collided
        checkPlayerCollision: function( data ){

            var self = this
                ,world = self._world
                ,collisions = data.collisions
                ,col
                ,player = this.player
                ;

            // TODO
            /*
            for ( var i = 0, l = collisions.length; i < l; ++i ){

                col = collisions[ i ];

                // if we aren't looking at debris
                // and one of these bodies is the player...
                if (col.bodyA === player || col.bodyB === player){
                    world.removeBehavior( this );

                    // when we crash, we'll publish an event to the world
                    // that we can listen for to prompt to restart the game
                    //world.publish('lose-game');
                    return;
                }
            }*/
        },

        forward: function(active){
            this.forwardActive = active;
        },

        backward: function(active){
            this.backwardActive = active;
        },

        behave: function( data ){
            if(this.forwardActive || this.backwardActive)
                this.player.gaz(this.forwardActive ? 1 : -1);
        }
    };
});