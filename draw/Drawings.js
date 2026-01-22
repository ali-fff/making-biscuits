class Drawings {
    constructor(x, y, sizex, sizey, img) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.img = img;
    }

    draw() {
        image(this.img, this.x, this.y, this.sizex, this.sizey);
    }
}

