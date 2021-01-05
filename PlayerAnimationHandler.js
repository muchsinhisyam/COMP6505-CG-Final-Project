var PlayerAnimationHandler = pc.createScript('playerAnimationHandler');
PlayerAnimationHandler.attributes.add('blendTime', { type: 'number', default: 0.2 });

// Initialize all of the animations
PlayerAnimationHandler.states = {
    Idle: { 
        animation: 'Idle.glb' 
    },
    WalkForward: { 
        animation: 'Standard Walk.glb' 
    },
    LeftWalk: {
        animation: "Left Strafe Walk.glb"
    },
    RightWalk: {
        animation: "Right Strafe Walk.glb"
    }
};

// Initiate idle position and game status
var direction = 'Idle';
var start = false;

// Synchronize the keypress with the model
PlayerAnimationHandler.prototype.initialize = function () {
    console.log("PlayerAnimationHandler Initialized");
    
    var player = this.app.root.findByName('Model');
    var app = this.app;
    app.keyboard.on(pc.EVENT_KEYDOWN, this._keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this._keyChange, this);
    
    this.setState(direction);
};

// Set/update the animation state
PlayerAnimationHandler.prototype.setState = function(state) {
    var states = PlayerAnimationHandler.states;

    this.state = state;
    this.entity.animation.play(states[state].animation, this.blendTime);
};

// The keypress event based on the animation initialized
PlayerAnimationHandler.prototype._checkKey = function (e) {
    var app = this.app;
    
    // Set animations in depends on pressed buttons
    if (app.keyboard.wasPressed(pc.KEY_ENTER)){
        start = true;
    }
    if (app.keyboard.isPressed(pc.KEY_W) && (start === true)) {
        direction = ('WalkForward');
    } 
    else if (app.keyboard.isPressed(pc.KEY_A) && (start === true)) {
        direction = ('LeftWalk');
    } 
    else if (app.keyboard.isPressed(pc.KEY_D) && (start === true)) {
        direction = ('RightWalk');
    } 
    else if (app.keyboard.isPressed(pc.KEY_S) && (start === true)) {
        direction = ('WalkForward');
    } 
    else {
        direction = ('Idle');
        console.log("Idle");
    }
};

// Detecting the change of the key
PlayerAnimationHandler.prototype._keyChange = function(e) {
    var previousDirection = direction;
    
    console.log("Key Change Detected. New Direction: ", previousDirection);
    
    this._checkKey();
    
    if (previousDirection !== direction) {
        this.setState(direction);
    }
};

// Set the direction variable for animation
PlayerAnimationHandler.prototype.setDirection = function (direction) {
    this.direction = direction;
    this.entity.animation.play(direction, this.blendTime);
};