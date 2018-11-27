class Entity
{
    name = '';
    type = '';
    pos_x = 0;
    pos_y = 0;
    gameManager = null;

    constructor(type, name, pos_x, pos_y, gameManager)
    {
        this.gameManager = gameManager;
        this.type = type;
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        // empty for while
    }
}

class Player extends Entity
{
    fireBlock = false;
    impulse = 0;
    lifetime = 0;
    move_x = 0;
    move_y = 0;
    size_x = 0;
    size_y = 0;
    speed = 2;
    currentSpriteType = null;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager)
    {
        super(type, name, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.currentSpriteType = this.type;
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.lifetime = lifetime;
    }

    draw()
    {
        // draw object
        if(this.move_x > 0)
        {
            this.currentSpriteType = this.type+'_Left';
        }
        if(this.move_x < 0)
        {
            this.currentSpriteType = this.type;
        }
        this.gameManager.spriteManager.drawSprite(this.currentSpriteType,
            this.pos_x, this.pos_y);
    }

    update()
    {
        // update in cycle
        this.gameManager.physicManager.update(this)
    }

    onTouchEntity(obj)
    {
        // collide entities handle
        if(obj.type === "BonusCola")
        {
            this.lifetime += 50;
            obj.kill();
        }
        if(obj.type === "Enemy")
        {
            this.kill();
        }
    }

    onTouchMap(tileset)
    {
        const LAVA_TILE = 3023;
        const EXIT_TILE = 3361;
        if(tileset === LAVA_TILE)
        {
            this.kill();
        }
        if(tileset === EXIT_TILE)
        {
            // END LEVEL
            // TOGGLE NEXT LEVEL
            this.gameManager.goToNextLevel();
            this.kill()
        }

        if(tileset === 2824)
        {
            // END LEVEL
            // TOGGLE NEXT LEVEL
            this.gameManager.goToNextLevel();
            this.kill()
        }
    }

    kill()
    {
        // destroy this
        this.gameManager.kill(this);
    }

    fire()
    {
        // attack
        if(this.fireBlock)
            return;

        let fireballMove_x = this.move_x;
        let fireballMove_y = this.move_y;
        let fireballName = "fireball" + (++this.gameManager.fireNum);
        let fireball = new Fireball("Fireball", fireballName, fireballMove_x, fireballMove_y, 0, 0, this.gameManager);
        switch(this.move_x + 2*this.move_y)
        {
            case -1:
                fireball.pos_x = this.pos_x-fireball.size_x;
                fireball.pos_y = this.pos_y+fireball.size_y/2;
                break;
            case 1:
                fireball.pos_x = this.pos_x+this.size_x;
                fireball.pos_y = this.pos_y+fireball.size_y/2;
                break;
            case -2:
                //console.log("WHY");
                fireball.pos_x = this.pos_x+fireball.size_x;
                fireball.pos_y = this.pos_y-fireball.size_y+2;
                break;
            case 2:
                fireball.pos_x = this.pos_x+fireball.size_x;
                fireball.pos_y = this.pos_y+this.size_y;
                break;
            default:
                return;
        }
        this.fireBlock = true;
        let self = this;
        setTimeout(
            function()
            {
               self.fireBlock = false;
            },
            500
        );
        //console.log(fireball);
        this.gameManager.entities.push(fireball);

    }
}

class Tank extends Entity
{
    impulse = 0;

    lifetime = 0;
    move_x = 0;
    move_y = 0;
    speed = 1;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager)
    {
        super(type, name, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.lifetime = lifetime;
    }

    draw()
    {
        // draw object
        this.gameManager.spriteManager.drawSprite(this.type,
            this.pos_x, this.pos_y);
    }

    update()
    {
        // update in cycle
        this.gameManager.physicManager.update(this)
    }

    onTouchEntity(obj)
    {
        // collide entities handle
    }

    kill()
    {
        // destroy this
        this.gameManager.kill(this);
    }

    fire()
    {
        // attack
    }
}

class Fireball extends Entity
{
    move_x = 0;
    move_y = 0;
    speed = 4;

    constructor(name, type, move_x, move_y, pos_x, pos_y, gameManager)
    {
        super(name, type, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        this.move_x = move_x;
        this.move_y = move_y;
    }

    draw()
    {
        // draw object

        this.gameManager.spriteManager.drawSprite(this.type,
            this.pos_x, this.pos_y);
    }

    update()
    {
        // update in cycle
        this.gameManager.physicManager.update(this)
    }

    onTouchEntity(obj)
    {
        if(obj.type === "Enemy" ||
           obj.type === "Player"||
           obj.type === "Fireball")
        {
            obj.kill();
        }
        this.kill();
        // collide entities handle
    }

    onTouchMap(idx)
    {
        this.kill();
        // collide map handle
    }

    kill()
    {
        this.gameManager.kill(this);
    }
}

class BonusCola extends Entity
{
    impulse = 0;
    speed = 1;
    move_x = 0;
    move_y = 0;

    constructor(lifetime, type, name, pos_x, pos_y, gameManager)
    {
        super(type, name, pos_x, pos_y, gameManager);
        let sprite = this.gameManager.spriteManager.getSprite(this.type);
        this.size_x = sprite.w;
        this.size_y = sprite.h;
        // empty for while
    }

    draw()
    {
        // draw object
        this.gameManager.spriteManager.drawSprite(this.type,
            this.pos_x, this.pos_y);
    }

    update()
    {
        // update in cycle
        this.gameManager.physicManager.update(this)
    }

    kill()
    {
        // destroy this
        this.gameManager.kill(this);
    }
}
