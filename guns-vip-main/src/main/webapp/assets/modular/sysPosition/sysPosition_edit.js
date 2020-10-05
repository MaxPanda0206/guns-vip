/**
 * 详情对话框
 */
var SysPositionInfoDlg = {
    data: {
        positionId: "",
        name: "",
        code: "",
        sort: "",
        status: "",
        remark: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        createUser: ""
    }
};

layui.use(['form', 'admin', 'ax','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;

















    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/sysPosition/detail?positionId=" + Feng.getUrlParam("positionId"));
    var result = ajax.start();
    form.val('sysPositionForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/sysPosition/editItem", function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/sysPosition'
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/sysPosition'
    });
});