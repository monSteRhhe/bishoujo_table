'use strict';

/**
 * 返回json文件内容
 * @param {string} path 文件路径
 * @returns {Object} json数据
 */
function loadJSON(path) {
    let json = '';
    $.ajax({
        url: path,
        dataType: 'json',
        async: false,
        success: function(data) {
            json = data;
        }
    })
    return json;
}

let table_frame = loadJSON('table_frame.json'),
    character_hs = loadJSON('character_hs.json'),
    row = table_frame['row_characters'],
    column = table_frame['col_types'],
    characters_num = row.length, // 角色数
    column_num = column.length; // h类型数

/**
 * 加载对应语言内容
 * @param {string} lang 选择语言 'jp'/'cn'
 */
function loadData(lang) {
    let tr0 = document.createElement('tr');
    tr0.innerHTML += '<th></th>'; // 空1格
    let tr1 = document.createElement('tr');
    tr1.innerHTML += '<th></th>';
    for (let item of row) {
        /* 立绘 */
        if (item.tachie !== '') {
            tr0.innerHTML += `<th><image class="display-tachie" src="assets/tachie/${item.tachie}"/></th>`;
        } else {
            tr0.innerHTML += `<th></th>`;
        }
        $('table#bishoujo-table').append(tr0);

        /* 角色名 */
        tr1.innerHTML += `<th>${item[lang]}</th>`;
        $('table#bishoujo-table').append(tr1);
    }

    /* 对应 */
    for (let i = 0; i < column_num; i++) {
        let _tr = document.createElement('tr');
        _tr.className += 'th-spacing';
        _tr.innerHTML += `<th>${column[i][lang]}</th>`; // 第1列: hs类型

        let key = column[i]['jp'];
        if (key != '') {
            for (let j = 0; j < characters_num; j++) {
                let jp_name = row[j]['jp'];
                if (character_hs[key][jp_name] == 1) {
                    _tr.innerHTML += '<th class="dot">●</th>'; // ●
                } else {
                    _tr.innerHTML += '<th></th>'; // 空内容
                }
            }
        } else {
            _tr.innerHTML += '<th class="blank"></th>'; // 中间的空行
        }
        $('table#bishoujo-table').append(_tr);
    }
}

/* 默认先加载jp */
loadData('jp');

/* 切换中文 */
$('span.switch-cn').click(function() {
    $('table#bishoujo-table').empty(); // 清空内容
    loadData('cn');
})