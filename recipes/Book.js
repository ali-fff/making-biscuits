class Book {
    constructor(x, y, sizex, sizey, img) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.img = img;
        this.visible = true;
    }

    draw() {
        if (this.visible) {
            image(this.img, this.x, this.y, this.sizex, this.sizey);
        }
    }

    collide(mx, my) {
        let x = this.x - this.sizex / 2;
        let y = this.y - this.sizey / 2;
        return (x <= mx) && (y <= my) && (x + this.sizex >= mx) && (y + this.sizey >= my);
    }
}
