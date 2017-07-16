class UI {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    prevx: number;
    prevy: number;
    prevmap: number;
    maps: HTMLImageElement[];

    constructor(public canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.setHeight();
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = '#000';
        this.context.fill();
    }

    setHeight() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.clearCanvas();
    }

    clearCanvas(): void {
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = '#000';
        this.context.fill();
    }

    drawMap(X: number, Y: number, Map: number) {
        this.clearCanvas();
        var w = this.width;
        var h = this.height;
        var centerX = w / 2;
        var centerY = h / 2;

        var mapOriginX = (X - (w / 2))
        var mapOriginY = (Y - (h / 2))

        this.context.translate(centerX, centerY);
        this.context.rotate(45 * Math.PI / 180);
        this.context.scale(2, 2)
        this.context.translate(-centerX, -centerY);
        this.context.drawImage(this.maps[Map], mapOriginX, mapOriginY, w, h, 0, 0, w, h)
        this.context.scale(1, 1);

        this.context.font = "10px Arial";
        this.context.fillStyle = '#fff'
        this.context.fillText("N", centerX - 5, centerY - 50);
        this.context.fillText("W", centerX - 50, centerY + 5);
        this.context.fillText("E", centerX + 50, centerY + 5);
        this.context.fillText("S", centerX - 5, centerY + 50);

        this.drawLine(centerX - 3, centerY, centerX + 3, centerY);
        this.drawLine(centerX, centerY - 3, centerX, centerY + 3);

        this.context.setTransform(1, 0, 0, 1, 0, 0);

        this.prevx = X;
        this.prevy = Y;
        this.prevmap = Map;
    }

    redrawMap(): void {
        this.drawMap(this.prevx, this.prevy, this.prevmap);
    }

    drawLine(fromX: number, fromY: number, toX: number, toY: number) {
        this.context.beginPath();
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.strokeStyle = '#fff'
        this.context.stroke();
    }

    setMaps(maps: HTMLImageElement[]) {
        this.maps = maps;
    }
}

export { UI }