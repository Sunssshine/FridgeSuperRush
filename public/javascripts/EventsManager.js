class EventsManager
{
    bind = new Array();
    action = new Array();

    constructor(canvas)
    {
        this.bind[87]='up';
        this.bind[83]='down';
        this.bind[65]='left';
        this.bind[68]='right';
        this.bind[32]='fire';

        let self = this;

        canvas.addEventListener("mousedown", function(event)
        {
            self.onMouseDown(event,self)
        });
        canvas.addEventListener("mouseup", function(event)
        {
            self.onMouseUp(event,self)
        });

        document.body.addEventListener("keydown", function(event)
        {
            self.onKeyDown(event,self)
        });
        document.body.addEventListener("keyup", function(event)
        {
            self.onKeyUp(event,self)
        });
    }

    onMouseDown(event, self)
    {
        self.action["fire"] = true;
    }

    onMouseUp(event, self)
    {
        self.action["fire"] = false;
    }

    onKeyDown(event, self)
    {
        let willDo = self.bind[event.key];
        if(willDo)
        {
            self.action[willDo] = true;
        }
    }

    onKeyUp(event, self)
    {
        let willDo = self.bind[event.key];
        if(willDo)
        {
            self.action[willDo] = false;
        }
    }

}