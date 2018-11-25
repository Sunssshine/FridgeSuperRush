class Entity
{
    pos_x = 0;
    pos_y = 0;
    size_x = 0;
    size_y = 0;

    constructor(pos_x, pos_y, size_x, size_y)
    {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.size_x = size_x;
        this.size_y = size_y;
        // empty for while
    }
}

class Player extends Entity
{
    lifetime = 0;
    move_x = 0;
    move_y = 0;
    speed = 1;

    constructor(lifetime, pos_x, pos_y, size_x, size_y)
    {
        super(pos_x, pos_y, size_x, size_y);
        this.lifetime = lifetime;
    }

    draw(ctx, spriteManager, mapManager)
    {
        // draw object
        spriteManager.drawSprite(ctx, mapManager, "fridge_right", this.pos_x, this.pos_y);
    }

    update(physicManager, mapManager)
    {
        // update in cycle
        physicManager.update(this, mapManager)
    }

    onTouchEntity(obj)
    {
        // collide entities handle
        if(obj.name.match(/start[\d]/))
        {
            this.lifetime += 50;
            obj.kill();
        }
    }

    kill()
    {
        // destroy this
    }

    fire(gameManager)
    {
        // attack
        let fireballSize_x = 32;
        let fireballSize_y = 32;
        let fireballMove_x = this.move_x;
        let fireballMove_y = this.move_y;
        let fireballName = "fireball" + (++gameManager.fireNum);
        let fireball = new Fireball(fireballName,fireballMove_x,fireballMove_y,0,0,fireballSize_x,fireballSize_y);
        switch(this.move_x + 2*this.move_y)
        {
            case -1:
                fireball.pos_x = this.pos_x-fireball.size_x;
                fireball.pos_y = this.pos_y;
                break;
            case 1:
                fireball.pos_x = this.pos_x+this.size_x;
                fireball.pos_y = this.pos_y;
                break;
            case -2:
                fireball.pos_x = this.pos_x;
                fireball.pos_y = this.pos_y-fireball.size_y;
                break;
            case 2:
                fireball.pos_x = this.pos_x;
                fireball.pos_y = this.pos_y+this.size_y;
                break;
            default:
                return;
        }
        gameManager.entities.push(fireball);

    }
}

class Tank extends Entity
{
    lifetime = 0;
    move_x = 0;
    move_y = -1;
    speed = 1;

    constructor(lifetime, pos_x, pos_y, size_x, size_y)
    {
        super(pos_x, pos_y, size_x, size_y);
        this.lifetime = lifetime;
    }

    draw(ctx, spriteManager, mapManager)
    {
        // draw object
        spriteManager.drawSprite(ctx, mapManager, "fridge_left", this.pos_x, this.pos_y);
    }

    update(physicManager, mapManager)
    {
        // update in cycle
        physicManager.update(this, mapManager)
    }

    onTouchEntity(obj)
    {
        // collide entities handle
    }

    kill()
    {
        // destroy this
    }

    fire()
    {
        // attack
    }
}

class Fireball extends Entity
{
    name = "";
    move_x = 0;
    move_y = 0;
    speed = 4;

    constructor(name, move_x, move_y, pos_x, pos_y, size_x, size_y)
    {
        super(pos_x, pos_y, size_x, size_y);
        this.name = name;
        this.move_x = move_x;
        this.move_y = move_y;
    }

    draw(ctx, spriteManager, mapManager)
    {
        // draw object
        spriteManager.drawSprite(ctx, mapManager, "fireball", this.pos_x, this.pos_y);
    }

    update(physicManager, mapManager)
    {
        // update in cycle
        physicManager.update(this, mapManager)
    }

    onTouchEntity(obj)
    {
        if(obj.name.match(/enemy[\d*]/) ||
           obj.name.match(/player/)     ||
           obj.name.match(/fireball[\d*]/))
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
        // destroy this
    }
}

class BonusCola extends Entity
{
    draw(ctx, spriteManager, mapManager)
    {
        // draw object
        spriteManager.drawSprite(ctx, mapManager, "bonus_cola", this.pos_x, this.pos_y);
    }

    kill()
    {
        // destroy this
    }
}
