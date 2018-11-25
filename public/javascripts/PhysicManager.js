class PhysicManager
{
    update(obj, mapManager)
    {
        if(obj.move_x === 0 && obj.move_y === 0)
            return "stop";

        let newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        let newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);

        let tileset = mapManager.getTilesetIdx(newX + obj.size_x/2, newY + obj.size_y/2);
        let entity = this.entityAtXY(obj, newX, newY);

        if(entity !== null && obj.onTouchEntity)
            obj.onTouchEntity(entity);
        const EMPTY_SPACE = 7;
        if(tileset !== EMPTY_SPACE && obj.onTouchMap)
        {
            obj.onTouchMap(tileset);
        }

        if(tileset === EMPTY_SPACE && entity === null)
        {
            obj.pos_x = newX;
            obj.pos_y = newY;
        }
        else
        {
            return "break";
        }

        return "move";

    }

    entityAtXY(obj, x, y, gameManager)
    {
        for(let i = 0; i<gameManager.entities.length; i++)
        {
            let entity = gameManager.entities[i];

            if(entity.name !== obj.name)
            {
                 if((x + obj.size_x < entity.pos_x)    ||
                    (y + obj.size_y < entity.pos_y)    ||
                    (x > entity.pos_x + entity.size_x) ||
                    (y > entity.pos_x + entity.size_y))
                    continue;
                 return entity;
            }
        }
        return null;
    }
}