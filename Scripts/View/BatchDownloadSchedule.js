$(document).ready(function () {
    _search();
});

function _search() {
    $.ajax({
        type: "GET",
        url: "/TechximBADE/ConverterResult/FindBatchDownloadSchedule",
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
            { name: "startDate", type: "text", title: "開始時間" },
            { name: "endDate", type: "text", title: "結束時間" },
            { name: "convertType", type: "text", title: "轉檔來源" },
            { name: "type", type: "text", title: "轉檔狀態" },
            { name: "status", type: "text", title: "轉檔狀態" },
            {
                title: "下載",
                itemTemplate: function (e, item) {
                    if (item.resultPath) {
                        return "<a target='_blank' href=" + item.resultPath + " download>點此下載</a>";
                    } else {
                        return "<div>等待中</div>";
                    }
                }
            }
        ]
    });
}

