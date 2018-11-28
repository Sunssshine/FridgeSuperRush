class GameManager
{
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

    currentLevel = 0;
    levels = [];
    playInterval = null;
    scoreElem = undefined;
    infoElem = undefined;
    infoWindow = undefined;
    infoWindowTimeout = null;

    constructor(canvas, levelPaths, spritePath, spritesheetPath, scoreElem, infoElem, infoWindow)
    {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.scoreElem = scoreElem;
        this.infoElem = infoElem;
        this.infoWindow = infoWindow;
        console.log(this.infoElem);

        for(let i = 0; i<levelPaths.length; i++)
        {
            this.levels.push(levelPaths[i]);
        }

        this.mapManager = new MapManager(this.levels[this.currentLevel], this);
        this.spriteManager = new SpriteManager(spritePath, spritesheetPath, this);
        this.mapManager.parseEntities();
        this.eventsManager = new EventsManager(canvas, this);
        this.physicManager = new PhysicManager(this, 3079);

        // this.factory['Player'] = new Player(100, 10, 10,  this);
        // this.factory['Tank'] = new Tank(100, 10, 10,  this);
        // this.factory['Fireball'] = new Fireball(10, 10, 0, 0, 1, this);
        // this.factory['BonusCola'] = new BonusCola(10, 10,  this);



        this.play();



    }

    addScore(number)
    {
        this.player.score += number;
        this.scoreElem.innerHTML = this.player.score;
    }

    initPlayer(obj)
    {
        this.player = obj;
    }

    entityFactory(type, name, x, y)
    {
        let resultEntity = null;
        //console.log(type,name,x,y)
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
        if(obj.type === "Player")
        {
            let score = obj.score;
            this.player = null;
            this.scoreElem.innerHTML = "0";
            clearInterval(this.playInterval);
            this.playInterval = null;
            this.showInfo(
                `GAME OVER
                <br />
                YOUR SCORE:
                <span>${score}</span>
                <div style="font-size: large">press ENTER to restart</div>`
            , "forever")
            let self = this;
            let waitForAction = setInterval(
                function()
                {
                    if(self.eventsManager.action["restart"])
                    {
                        if(self.playInterval === null)
                        {
                            clearInterval(waitForAction);
                            console.log('RESTART');
                            self.currentLevel = -1;
                            self.goToNextLevel();
                        }
                    }
                }, 100)
        }
    }

    update()
    {
        // console.log(this.entities)


        if(this.player === null)
        {
            alert("WTF WHERE FUCKING PLAYER))0")
            return;
        }

        this.player.move_x = 0;
        this.player.move_y = 0;

        if(this.eventsManager.action["up"])
        {
            //console.log(this.player)
            if (this.player.impulse === 0)
            {
                //console.log('HEREHEREHEREHERE')
                this.player.impulse = -15;
            }
        }

        //if(this.eventsManager.action["down"])
        //    this.player.move_y = 1;

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
                if(event.type === 'Enemy')
                {
                    //console.log('THAT WAS ME DIO')
                    event.move_y = 0;
                }
                if(event.type === 'BonusCola')
                {
                    //console.log('I AM COLA BONUS YA YA')
                    event.move_y = 0;
                }
            } catch(ex) {
                //console.log(ex)
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

    showInfo(text, timeout)
    {
        if(timeout === "forever")
        {
            clearTimeout(this.infoWindowTimeout);
            this.infoWindow.style.display = "block";
            this.infoElem.innerHTML = text;
            return
        }
        let self = this;
        self.infoWindow.style.display = "block";
        self.infoElem.innerHTML = text;
        this.infoWindowTimeout = setTimeout(function()
        {
            self.infoElem.innerHTML = "";
            self.infoWindow.style.display = "none";
        },timeout);
    }

    play()
    {
        let self = this;

        //tests with start
        let tryStart = setInterval(
            function()
            {
                if(self.mapManager.jsonLoaded &&
                   self.mapManager.imgLoaded &&
                   self.spriteManager.jsonLoaded &&
                   self.spriteManager.imgLoaded)
                {
                    self.showInfo(
                        `Welcome to level ${self.currentLevel+1}
                        <br />
                        <br />
                        <div style="font-size: large">Here can be level description but... As you can see.. Spooky monsters has stole it, sorry *~*</div>`
                        , 2000);
                    self.playInterval = setInterval(function()
                    {
                        self.update();
                    },10);
                    clearInterval(tryStart);
                }
                //console.log(self.entities);
                // console.log(self.mapManager.getTilesetIdx(63,63));
                // console.log(self.mapManager.getTilesetIdx(63,64));
                // console.log(self.mapManager.getTilesetIdx(64,63));
                // console.log(self.mapManager.getTilesetIdx(64,64));
            }, 100);
    }

    goToNextLevel()
    {
        this.entities = [];
        this.player = null;
        this.currentLevel++;
        if(this.currentLevel === this.levels.length)
        {
            //
            let kek = prompt("Введите своё имя");
            alert(kek + " Your score is: " + this.scoreElem.innerHTML);
            return;
        }
        this.mapManager = new MapManager(this.levels[this.currentLevel], this);
        this.mapManager.parseEntities();
        if(this.currentLevel === 2)
        {
            this.physicManager.EMPTY_SPACE = 2960;
        }
        this.play();
    }
}