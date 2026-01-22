class Recipe {
    constructor(x, y, sizex, sizey, img) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.img = img;
        this.visible = false;
    }

    draw() {
        if (this.visible) {
            image(this.img, this.x, this.y, this.sizex, this.sizey);
        }
    }
}