$(document).ready(function () {
    _search();
});

function _search() {
    $.ajax({
        type: "GET",
        url: "/TechximBADE/ConverterResult/FindConvertFileSchedule",
    }).done(function (data) {
        _initGrid(data);
    });
}

function _initGrid(results) {
    $("#convertedResults").jsGrid({
        width: "100%",
        height: 'auto',

        sorting: true,
        paging: true,
        pageSize: 15,

        data: results,
        fields: [
            { name: "fileName", type: "text", title: "轉檔狀態" },
            { name: "startDate", type: "text", title: "開始時間" },
            { name: "endDate", type: "text", title: "結束時間" },
            { name: "type", type: "text", title: "轉檔狀態" },
            { name: "status", type: "text", title: "轉檔狀態" }           
        ]
    });
}

