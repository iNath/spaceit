
var STAGE_WIDTH = 300;
var STAGE_HEIGHT = 300;

function app(){

    Physics(function(world){

        var renderer = Physics.renderer('canvas', {
            //el: container,
            //autoResize: false,
            //width: STAGE_WIDTH,
            //height: STAGE_HEIGHT,
            meta: false,
            styles: {
                // set colors for the player bodies
                'circle' : {
                    strokeStyle: '#351024',
                    lineWidth: 1,
                    fillStyle: '#d33682',
                    angleIndicator: '#351024'
                }
            }
        });
        world.add( renderer );



        // bounds of the window
        //var viewportBounds = Physics.aabb(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

        /*
        // constrain objects to these bounds
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.5,
            cof: 0.99
        }));*/

        var obstacle = Physics.body('obstacle', {
            x: 200,
            y: 400,
            vertices : [
                {x : 10, y: 10},
                {x : 10, y: -10},
                {x : -10, y: -10},
                {x : -10, y: 10}
            ]
        });
        world.add(obstacle);

        var player = Physics.body('player', {
            x: 500, // x-coordinate
            y: 30, // y-coordinate,

            radius: 20
        });
        var playerVel = Physics.vector(0,0);
        world.add(player);

        var playerBehavior = Physics.behavior('player-behavior', { player: player });
        world.add(playerBehavior);

        // ensure objects bounce when edge collision is detected
        world.add( Physics.behavior('body-impulse-response') );

        // add some gravity
        // world.add( Physics.behavior('constant-acceleration') );

        world.on('step', function(){
            var middle = {
                x: 0.5 * window.innerWidth,
                y: 0.5 * window.innerHeight
            };
            // follow player
            //renderer.options.offset.clone( middle ).vsub( player.state.pos );

            world.render();
        });

        Physics.util.ticker.on(function( time, dt ){
            world.step( time );
        });

        // start the ticker
        Physics.util.ticker.start();

    });


}


window.onload = function(){
    app();
};