layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 案例展示表管理
     */
    var ZCaseShow = {
        tableId: "zCaseShowTable"
    };

    /**
     * 初始化表格的列
     */
    ZCaseShow.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'caseShowId', hide: true, title: '主键id'},
            {field: 'picAddress', sort: true, title: '图片地址'},
            {field: 'title', sort: true, title: '标题'},
            {field: 'remark', sort: true, title: '备注'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'updateTime', sort: true, title: '更新时间'},
            {field: 'createUser', sort: true, title: '创建人'},
            {field: 'updateUser', sort: true, title: '更新人'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    ZCaseShow.search = function () {
        var queryData = {};

        queryData['caseShowId'] = $('#caseShowId').val();
        queryData['picAddress'] = $('#picAddress').val();
        queryData['title'] = $('#title').val();

        table.reload(ZCaseShow.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    ZCaseShow.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/zCaseShow/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    ZCaseShow.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/zCaseShow/edit?caseShowId=' + data.caseShowId
    };

    /**
     * 导出excel按钮
     */
    ZCaseShow.exportExcel = function () {
        var checkRows = table.checkStatus(ZCaseShow.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    ZCaseShow.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/zCaseShow/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(ZCaseShow.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("caseShowId", data.caseShowId);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + ZCaseShow.tableId,
        url: Feng.ctxPath + '/zCaseShow/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: ZCaseShow.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        ZCaseShow.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    ZCaseShow.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        ZCaseShow.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + ZCaseShow.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            ZCaseShow.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            ZCaseShow.onDeleteItem(data);
        }
    });
});
