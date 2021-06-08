function Block(img) {
    this.img = 'url(' + img + ')';
    this.arr = [
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 6, col: 7 },
        { row: 6, col: 8 },
    ]
}

Block.prototype.reset = function(row, col) {
    // 重置位置
    this.obj = {
        row: row,
        col: col
    }
    this.arr.push(this.obj);
}