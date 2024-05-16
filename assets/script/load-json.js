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
        success: (data) => {
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
    let tr0 = document.createElement('tr'),
        tr1 = document.createElement('tr'),
        empty_td = '<td></td>';
        
    $(tr0).append(empty_td); // 空1格
    $(tr1).append(empty_td);

    for (let item of row) {
        /* 立绘 */
        if (item.tachie !== '') {
            $(tr0).append(`<td><image class="display-tachie" src="assets/tachie/${item.tachie}"/></td>`);
        } else {
            $(tr0).append(empty_td);
        }
        $('table.bishoujo-table').append(tr0);

        /* 角色名 */
        $(tr1).append(`<td>${item[lang]}</td>`);
        $('table.bishoujo-table').append(tr1);
    }

    /* 对应 */
    for (let i = 0; i < column_num; i++) {
        let _tr = document.createElement('tr');
        $(_tr).addClass('td-spacing');
        $(_tr).append(`<td>${column[i][lang]}</td>`); // 第1列: hs类型

        let key = column[i]['jp'];
        if (key != '') {
            for (let j = 0; j < characters_num; j++) {
                let jp_name = row[j]['jp']; // 对应日文名称
                if (character_hs[key][jp_name] == 1) {
                    $(_tr).append('<td class="dot">●</td>'); // ●
                } else {
                    $(_tr).append(empty_td);
                }
            }
        } else {
            $(_tr).append('<td class="blank"></td>'); // 中间的空行
        }
        $('table.bishoujo-table').append(_tr);
    }
}

/* 默认先加载jp */
loadData('jp');

/* 语言切换 */
let switcher = 'span.lang-switch',
    icon = '<img class="svg-icon" src="assets/icon/lang-switch.svg"/>';
$(switcher).click(() => {
    $('table.bishoujo-table').empty(); // 清空内容

    if ($(switcher).hasClass('cn')) {
        // 切换为日文
        $(switcher).removeClass('cn').html(icon + '切换中文');
        loadData('jp');
    } else {
        // 切换为中文
        $(switcher).addClass('cn').html(icon + '切换日文');
        loadData('cn');
    }
})