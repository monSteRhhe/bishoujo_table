'use strict';

let filename = 'bishoujo-table.png', // 导出文件名
    table = document.querySelector('div.root'),
    save_multi = 2; // 放大倍数

$('span.export-screenshot').click(function() {
    /* 放大保存 */
    domtoimage.toBlob(table, {
        width: 1466 * save_multi,
        height: 774 * save_multi,
        style: {
            'transform': `scale(${save_multi})`,
            'transform-origin': 'top left'
        }
    })
    .then(function (blob) {
        window.saveAs(blob, filename);
    });
})