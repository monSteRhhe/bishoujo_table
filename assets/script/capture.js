'use strict';

let filename = 'bishoujo-table.png', // 导出文件名
    range = document.querySelector('div.container'),
    save_multi = 2; // 放大倍数

$('span.export-screenshot').click(() => {
    /* 获取原画布尺寸 */
    domtoimage.toCanvas(range).then((canvas) => {
        /* 放大保存 */
        domtoimage.toBlob(range, {
            width: canvas.width * save_multi,
            height: canvas.height * save_multi,
            style: {
                'transform': `scale(${save_multi})`,
                'transform-origin': 'top left'
            }
        }).then((blob) => {
            window.saveAs(blob, filename);
        });
    });
})