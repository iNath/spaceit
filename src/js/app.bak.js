
var STAGE_WIDTH = 300;
var STAGE_HEIGHT = 300;

function app(){

    var body = document.body;
    //body.style.width = '100%';
    //body.style.height = '100%';
    //body.style.textAlign = 'center';
    //body.style.padding = '30px 0px';


    var container = document.getElementById('app');
    container.style.border = '2px solid black';
    //var ctx = container.getContext('2d');

    var inputManager = new InputManager();
    var circle,
        velocity = Physics.vector(0, 0),
        force = 0.006,
        vMax = 0.11;

    var intervalLeft, intervalRight, intervalForward, intervalBackward;

    inputManager.on('left-enter', function () {
        //velocity = Physics.vector(-0.001, 0);
        var cb = function () {
            if(circle.state.vel.x < -vMax) return;
            circle.applyForce(Physics.vector(-force, 0));
        };
        intervalLeft = window.setInterval(cb, 100);
        cb();
    });
    inputManager.on('right-enter', function () {
        //velocity = Physics.vector(0.001, 0);
        var cb = function () {
            console.log(circle.state.vel.x);
            if(circle.state.vel.x > vMax) return;
            circle.applyForce(Physics.vector(force, 0.0));
        };
        intervalRight = window.setInterval(cb, 100);
        cb();
    });

    inputManager.on('forward-enter', function () {
        //velocity = Physics.vector(0, -0.001);
        var cb = function () {
            if(circle.state.vel.y < -vMax) return;
            circle.applyForce(Physics.vector(0, -force));
        };
        intervalForward = window.setInterval(cb, 100);
        cb();
    });
    inputManager.on('backward-enter', function () {
        console.log(velocity);
        //velocity = Physics.vector(0, 0.001);
        var cb = function () {
            if(circle.state.vel.y > vMax) return;
            circle.applyForce(Physics.vector(0, force));
        };
        intervalBackward= window.setInterval(cb, 100);
        cb();
    });


    inputManager.on('left-exit', function () {
        window.clearInterval(intervalLeft);
    });
    inputManager.on('right-exit', function () {
        window.clearInterval(intervalRight);
    });
    inputManager.on('forward-exit', function () {
        window.clearInterval(intervalForward);
    });
    inputManager.on('backward-exit', function () {
        window.clearInterval(intervalBackward);
    });

    Physics(function(world){

        var renderer = Physics.renderer('canvas', {
            el: container,
            autoResize: false,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            meta: false, // don't display meta data
            styles: {
                // set colors for the circle bodies
                'circle' : {
                    strokeStyle: '#351024',
                    lineWidth: 1,
                    fillStyle: '#d33682',
                    angleIndicator: '#351024'
                }
            }
        });

        // add the renderer
        world.add( renderer );
        // render on each step
        world.on('step', function(){
            world.render();
        });

        // bounds of the window
        var viewportBounds = Physics.aabb(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

        // constrain objects to these bounds
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.5,
            cof: 0.99
        }));

        // add a circle
        var circle = Physics.body('circle', {
            x: 50, // x-coordinate
            y: 30, // y-coordinate
            vx: 0.1, // velocity in x-direction
            vy: 0, // velocity in y-direction

            state :  { angular: {vel : 0.1}},

            radius: 20
        });
        world.add(circle);

        // ensure objects bounce when edge collision is detected
        world.add( Physics.behavior('body-impulse-response') );

        // add some gravity
        //world.add( Physics.behavior('constant-acceleration') );

        // subscribe to ticker to advance the simulation
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