'use strict';

let filename = 'bishoujo-table.png', // 导出文件名
    table = document.querySelector('div.container'),
    save_multi = 2; // 放大倍数

$('span.export-screenshot').click(function() {
    /* 获取原画布尺寸 */
    domtoimage.toCanvas(table).then(function(canvas) {
        /* 放大保存 */
        domtoimage.toBlob(table, {
            width: canvas.width * save_multi,
            height: canvas.height * save_multi,
            style: {
                'transform': `scale(${save_multi})`,
                'transform-origin': 'top left'
            }
        }).then(function (blob) {
            window.saveAs(blob, filename);
        });
    });
})