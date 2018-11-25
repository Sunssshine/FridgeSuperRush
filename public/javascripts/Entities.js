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

    draw(ctx)
    {
        // draw object
    }

    update()
    {
        // update in cycle
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
        let rocketSize_x = 32;
        let rocketSize_y = 32;
        let rocketMove_x = this.move_x;
        let rocketMove_y = this.move_y;
        let rocketName = "rocket" + (++gameManager.fireNum);
        let rocket = new Rocket(rocketName,rocketMove_x,rocketMove_y,0,0,rocketSize_x,rocketSize_y);
        switch(this.move_x + 2*this.move_y)
        {
            case -1:
                rocket.pos_x = this.pos_x-rocket.size_x;
                rocket.pos_y = this.pos_y;
                break;
            case 1:
                rocket.pos_x = this.pos_x+this.size_x;
                rocket.pos_y = this.pos_y;
                break;
            case -2:
                rocket.pos_x = this.pos_x;
                rocket.pos_y = this.pos_y-rocket.size_y;
                break;
            case 2:
                rocket.pos_x = this.pos_x;
                rocket.pos_y = this.pos_y+this.size_y;
                break;
            default:
                return;
        }
        gameManager.entities.push(rocket);

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

    draw(ctx)
    {
        // draw object
    }

    update()
    {
        // update in cycle
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

class Rocket extends Entity
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

    draw(ctx)
    {
        // draw object
    }

    update()
    {
        // update in cycle
    }

    onTouchEntity(obj)
    {
        // collide entities handle
    }

    onTouchMap(idx)
    {
        // collide map handle
    }

    kill()
    {
        // destroy this
    }
}

class Bonus extends Entity
{
    draw(ctx)
    {
        // draw object
    }

    kill()
    {
        // destroy this
    }
}
