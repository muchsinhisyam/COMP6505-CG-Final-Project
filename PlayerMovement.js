var PlayerMovement = pc.createScript('playerMovement');

PlayerMovement.attributes.add('Speed', { type: 'number', default: 0.1 });

// Initialize game variables
PlayerMovement.prototype.initialize = function () {
    console.log("PlayerMovement Initialized");
    
    var app = this.app;
    var camera = app.root.findByName('PlayerCamera');
    this.cameraScript = camera.script.cameraMovement;
    
    var start = false;
    var Menu;
    this.Menu = app.root.findByName('Menu');
    
};

// What happen when the key button is pressed
PlayerMovement.prototype.update = function (dt) {
    var app = this.app;
    var forward = this.entity.forward;
    var right = this.entity.right;
    var x = 0;
    var z = 0; 
    var y = 0;

    if (app.keyboard.wasPressed(pc.KEY_ENTER)){
        start = true;
        this.Menu.enabled = false;
    }
    
    if (app.keyboard.isPressed(pc.KEY_A) && (start === true)) {
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D) && (start === true)) {
        x -= right.x;
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W) && (start === true)) {
        x -= forward.x;
        z -= forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S) && (start === true)) {
        x += forward.x;
        z += forward.z;
    }
    if (app.keyboard.isPressed(pc.KEY_SPACE) && (start === true)) {
        y = y + forward.x;
    }
    
    // When the player is on the horizontal state the player will reset its position   
    if (x !== 0 || z !== 0) {
        var pos = new pc.Vec3(x * dt, 0, z * dt);
        pos.normalize().scale(this.Speed);
        pos.add(this.entity.getPosition());

        var targetY = this.cameraScript.eulers.x;
        var rot = new pc.Vec3(0, targetY, 0);

        this.entity.rigidbody.teleport(pos, rot);
    } 
};