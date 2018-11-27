class PhysicManager
{
    gameManager = null;

    constructor(gameManager)
    {
        this.gameManager = gameManager;
    }

    update(obj)
    {
        const EMPTY_SPACE = 2481;
        let isInAir = this.gameManager.mapManager.getTilesetIdx(obj.pos_x, obj.pos_y+64);

        if((isInAir === EMPTY_SPACE) && (obj.type !== "Fireball"))
        {
            if(this.gameManager.mapManager.getTilesetIdx(obj.pos_x+64, obj.pos_y+64) === EMPTY_SPACE)
            {
                obj.move_y = 1;
                if(obj.type === 'bonus_cola')
                {

                }
            }
        }

        /*if(obj.impulse !== 0)
        {
            obj.move_y = 1;
            obj.speed = obj.impulse;
            if(obj.impulse > 0)
            {
                obj.impulse -= 0.3;
            }

            if(obj.impulse < 0)
            {
                obj.impulse += 0.3;
            }
        }*/

        if (obj.move_x === 0 && obj.move_y === 0)
        {
            return "stop";
        }

        let newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        let newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);

        let deltaSize_x = 0;
        let deltaSize_y = 0;


        // if(obj.move_x > 0)
        // {
        //     deltaSize_x = obj.size_x;
        // }
        //
        // if(obj.move_y > 0)
        // {
        //     deltaSize_y = obj.size_y;
        // }




        let tileset = this.gameManager.mapManager.getTilesetIdx(newX, newY);
        let entity = this.entityAtXY(obj, newX, newY);

        if(tileset === EMPTY_SPACE)
        {
            tileset = this.gameManager.mapManager.getTilesetIdx(newX + obj.size_x-1 + deltaSize_x, newY + obj.size_y-1 + deltaSize_y);
        }

        if(tileset === EMPTY_SPACE)
        {
            tileset = this.gameManager.mapManager.getTilesetIdx(newX + deltaSize_x, newY + obj.size_y-1 + deltaSize_y);
        }

        if(tileset === EMPTY_SPACE)
        {
            tileset = this.gameManager.mapManager.getTilesetIdx(newX + obj.size_x-1 + deltaSize_x, newY  + deltaSize_y);
        }

        console.log(obj.name)
        console.log(`tileset forward is ${tileset} and entity forward is ${entity}`)
        if(entity !== null && obj.onTouchEntity)
        {
            obj.onTouchEntity(entity);
            console.log('entity forward')
            console.log(entity);
        }
        if(tileset !== EMPTY_SPACE && obj.onTouchMap)
        {
            console.log('map forward')
            obj.onTouchMap(tileset);
        }

        if(tileset === EMPTY_SPACE && entity === null)
        {
            console.log('nothing forward')
            console.log(obj)
            console.log(`before move`)
            obj.pos_x = newX;
            obj.pos_y = newY;
            console.log(obj)
            console.log(`after move`)
        }
        else
        {
            return "break";
        }

        return "move";

    }

    entityAtXY(obj, x, y)
    {
        for(let i = 0; i<this.gameManager.entities.length; i++)
        {
            let entity = this.gameManager.entities[i];

            if(entity.name !== obj.name)
            {
                 if((x + obj.size_x < entity.pos_x)    ||
                    (y + obj.size_y < entity.pos_y)    ||
                    (x > entity.pos_x + entity.size_x) ||
                    (y > entity.pos_y + entity.size_y))
                    continue;
                 console.log(x, y, obj.size_x, obj.size_y, entity.pos_x, entity.pos_y, entity.size_x, entity.size_y, entity.name);
                 return entity;
            }
        }
        return null;
    }
}