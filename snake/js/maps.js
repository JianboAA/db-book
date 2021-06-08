function Maps(width, height, rows, cols, container) {
    // 容器宽度
    this.width = width;
    // 容器高度
    this.height = height;
    // 总行数
    this.rows = rows;
    // 总列数
    this.cols = cols;
    // 每个单元格宽高
    this.itemWidth = this.width / this.cols;
    this.itemHeight = this.height / this.rows;
    // 容器元素
    this.container = container;
    // 二维数组，存放每一个单元格
    this.arr = [];
}
// 初始化方法
Maps.prototype.init = function() {
        // 绘制地图
        // 遍历行
        for (var i = 0; i < this.rows; i++) {
            // 创建行
            var rowDom = document.createElement('div');
            // 行数组
            var rowArr = [];
            // 遍历列
            for (var j = 0; j < this.cols; j++) {
                // 创建列
                var colDom = document.createElement('div');
                // 添加样式
                this.css(colDom, {
                        width: this.itemWidth + 'px',
                        height: this.itemHeight + 'px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        backgroundSize: 'cover',

                    })
                    // 放入行元素中
                rowDom.appendChild(colDom);
                // 放入行数组中
                rowArr.push(colDom);

            }
            // 行的样式
            this.css(rowDom, {
                    display: 'flex',
                })
                // 放在容器中
            this.container.appendChild(rowDom);
            // 把行数组放进二位数组中
            this.arr.push(rowArr);
        }
        // 给容器元素添加样式
        this.css(this.container, {
            border: '1px solid #ccc',
            width: this.width + 'px',
            height: this.height + 'px',

        })

    }
    // 设置样式的方法
Maps.prototype.css = function css(dom, key, value) {
    // 判断是否是字符串
    if (typeof key === 'string') {
        // 设置一条样式
        dom.style[key] = value;
    } else {
        // 是对象
        for (var k in key) {
            // k是样式名称 key[k] 是样式值
            // dom.style[k] = key[k];
            // 递归调用（复用逻辑）
            css(dom, k, key[k]);
        }
    }
}