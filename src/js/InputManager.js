function InputManager(){

    var self = this;

    this.actions = {
        left: {
            state: false,
            enterCb: [],
            exitCb: []
        },
        right: {
            state: false,
            enterCb: [],
            exitCb: []
        },
        forward: {
            state: false,
            enterCb: [],
            exitCb: []
        },
        backward: {
            state: false,
            enterCb: [],
            exitCb: []
        }
    };

    this.on = function(action, cb) {
        if(!cb)

        var toCall;
        switch (action) {
            case 'left-enter':
                toCall = this.actions.left.enterCb;
                break;
            case 'right-enter':
                toCall = this.actions.right.enterCb;
                break;
            case 'forward-enter':
                toCall = this.actions.forward.enterCb;
                break;
            case 'backward-enter':
                toCall = this.actions.backward.enterCb;
                break;
            case 'left-exit':
                toCall = this.actions.left.exitCb;
                break;
            case 'right-exit':
                toCall = this.actions.right.exitCb;
                break;
            case 'forward-exit':
                toCall = this.actions.forward.exitCb;
                break;
            case 'backward-exit':
                toCall = this.actions.backward.exitCb;
                break;
            default:
                break;
        }
        toCall.push(cb);
    };

    window.addEventListener('keydown', function(e){
        var action;
        switch(e.keyCode){
            case 37:
                action = self.actions.left; break;
            case 38:
                action = self.actions.forward; break;
            case 39:
                action = self.actions.right; break;
            case 40:
                action = self.actions.backward; break;
            default: return;
        }

        if(action.state) return;
        action.state = true;

        for(var i=0;i<action.enterCb.length;i++){
            action.enterCb[i]();
        }

    });

    window.addEventListener('keyup', function(e){
        var action;
        switch(e.keyCode){
            case 37:
                action = self.actions.left; break;
            case 38:
                action = self.actions.forward; break;
            case 39:
                action = self.actions.right; break;
            case 40:
                action = self.actions.backward; break;
            default: return;
        }

        if(!action.state) return;
        action.state = false;

        for(var i=0;i<action.exitCb.length;i++){
            action.exitCb[i]();
        }

    });

}