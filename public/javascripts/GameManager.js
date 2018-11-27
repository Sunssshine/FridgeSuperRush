class GameManager
{
    factory = {};
    entities = [];
    fireNum = 0;
    player = null;
    laterKill = [];

    spriteManager = null;
    eventsManager = null;
    physicManager = null;
    mapManager = null;
    canvas = null;
    ctx = null;

    constructor(canvas, levelPath, spritePath, spritesheetPath)
    {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.mapManager = new MapManager(levelPath, this);
        this.spriteManager = new SpriteManager(spritePath, spritesheetPath, this);
        this.mapManager.parseEntities();
        this.eventsManager = new EventsManager(canvas, this);
        this.physicManager = new PhysicManager(this);

        // this.factory['Player'] = new Player(100, 10, 10,  this);
        // this.factory['Tank'] = new Tank(100, 10, 10,  this);
        // this.factory['Fireball'] = new Fireball(10, 10, 0, 0, 1, this);
        // this.factory['BonusCola'] = new BonusCola(10, 10,  this);



        this.play();

        let self = this;


        //tests with start
        setInterval(
            function()
            {
                //console.log(self.entities);
                // console.log(self.mapManager.getTilesetIdx(63,63));
                // console.log(self.mapManager.getTilesetIdx(63,64));
                // console.log(self.mapManager.getTilesetIdx(64,63));
                // console.log(self.mapManager.getTilesetIdx(64,64));
            },
        100);

    }

    initPlayer(obj)
    {
        this.player = obj;
    }

    entityFactory(type, name, x, y)
    {
        let resultEntity = null;
        console.log(type,name,x,y)
        switch(type)
        {
            case "Player":
                resultEntity = new Player(100, type, name, x, y, this);
                break;
            case "Enemy":
                resultEntity = new Tank(100, type, name, x, y, this);
                break;
            case "BonusCola":
                resultEntity = new BonusCola(100, type, name, x, y, this);
                break;
            default:
                resultEntity = null;

        }
        return resultEntity;
    }

    kill(obj)
    {
        this.laterKill.push(obj);
    }

    update()
    {
        if(this.player === null)
        {
            return;
        }

        this.player.move_x = 0;
        this.player.move_y = 0;

        if(this.eventsManager.action["up"])
            this.player.move_y = -1;

        if(this.eventsManager.action["down"])
            this.player.move_y = 1;

        if(this.eventsManager.action["left"])
            this.player.move_x = -1;

        if(this.eventsManager.action["right"])
            this.player.move_x = 1;

        if(this.eventsManager.action["fire"])
            this.player.fire();

        //console.log(this.entities);

        this.entities.forEach(function(event)
        {
            try {
                event.update();
                if(event.type === 'enemy')
                {
                    //console.log('THAT WAS ME DIO')
                    event.move_y = 0;
                }
                if(event.type === 'bonus_cola')
                {
                    //console.log('I AM COLA BONUS YA YA')
                    event.move_y = 0;
                }
            } catch(ex) {
                console.log(ex)
            }
        });

        for(let i = 0; i<this.laterKill.length; i++)
        {
            let idx = this.entities.indexOf(this.laterKill[i]);
            if(idx > -1)
            {
                this.entities.splice(idx, 1);
            }
        }

        if(this.laterKill.length > 0)
            this.laterKill.length = 0;

        this.mapManager.draw(this.ctx);
        this.mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(this.ctx);

    }

    draw()
    {
        for(let entityNum = 0; entityNum < this.entities.length; entityNum++)
        {
            this.entities[entityNum].draw();
        }
    }

    play()
    {
        let self = this;
        setInterval(function()
        {
            self.update();
        },30);
    }
}