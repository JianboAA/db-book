function Food(row, col, img) {
    this.row = row;
    this.col = col;
    this.img = 'url(' + img + ')';
}

Food.prototype.reset = function(row, col) {
    this.row = row;
    this.col = col;
}