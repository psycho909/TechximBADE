var map, BADEPipleLayer, BADELayer, DANANPipleLayer, DANANLayer, OtherLayer, BADEZoneLayer, BADEVillageLayer, AnnLocalDrainage, NonAnnLocalDrainage, RiverLayer, OtherDrainCleanLayer109, WatershedLayer, TaoyuanWatersedLayer1, TaoyuanWatersedLayer2, TaoyuanWatersedLayer3, ShimenWatersedLayer1, ShimenWatersedLayer2, ShimenWatersedLayer3, BADENoneUrbanPlanPipleLayer, BADENoneUrbanPlanPipleLayer, BADENoneUrbanPlanLayer;
var needUpdate = true;
var NEW = "new", ADD = "add", REMOVE = "remove";
var markers = [];
var labelList = [];
var villageLabelList = [];
var hostIP;
var layverName = ["BADEPipleLayer", "BADELayer", "DANANPipleLayer", "DANANLayer", "OtherLayer", "BADEZoneLayer", "BADEVillageLayer", "AnnLocalDrainage", "NonAnnLocalDrainage", "RiverLayer", "OtherDrainCleanLayer109", "WatershedLayer", "TaoyuanWatersedLayer1", "TaoyuanWatersedLayer2", "TaoyuanWatersedLayer3", "ShimenWatersedLayer1", "ShimenWatersedLayer2", "ShimenWatersedLayer3", "BADENoneUrbanPlanPipleLayer", "BADENoneUrbanPlanLayer"];

function _initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 24.9469059, lng: 121.2912463 },
        zoom: 14
    });
    $.ajax({
        url: '/TechximBADE/Home/GetHostIp',
        type: "GET",
        success: function (ip) {
            hostIP = ip;
        }
    });
}

function _initDataForMap() {
    $.ajax({
        url: '/TechximBADE/GoogleMap/FindInspectionDataForMap',
        type: "POST",
        data: $("#conditionForm").serialize(),
        dataType: 'json',
        success: function (inspectionData) {
            if (inspectionData) {
                _initMapMarkersAndInfoWindows(inspectionData);
            }
        }
    });
}

function _getTwd97towgs84(twd97X, twd97Y) {
    var tf = new Transformation();
    var point;
    tf.twd97towgs84(twd97X, twd97Y, function (result, status) {
        if (result != "" && result != null) {
            point = result;
        }
    });
    return point;
}

function _initMapMarkersAndInfoWindows(inspectionData) {
    _clearMarkers();
    for (var i = 0; i < inspectionData.length; i++) {
        data = inspectionData[i];
        var pointtTarget = _getTwd97towgs84(data.location_E, data.location_N);

        var iconColor = _getStatusIconColor(data.improvementStatusName);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(pointtTarget.getY(), pointtTarget.getX()),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                fillColor: iconColor,
                fillOpacity: 1,
                strokeColor: iconColor,
                strokeWidth: 3
            },
            map: map
        });
        markers.push(marker);

        var gridTitle = _formatInt(data.pilenumber_K, 3) + 'K+' + _formatInt(data.pilenumber_m, 3)
        var gridId = 'markerInfo_' + i;
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading">' + data.localDrainingSite + '</h4> ' +
            '<a>' + gridTitle + '(' + data.inspectionSiteName + ')</a> ' +
            '<div id="bodyContent">' +
            '<div id=' + gridId + ' />'
        '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow, gridId, data) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
                setTimeout(function () {
                    _initInspectionDataGrid(gridId, data)
                }, 200);
            };
        })(marker, contentString, infowindow, gridId, data.details));
    }
}

function _showImprovementStatusData(spanText, checked) {

    if (spanText == "正常") {
        _findAndSetMapTOMarker(checked, "#00AA00");
    } else if (spanText == "計畫改善") {
        _findAndSetMapTOMarker(checked, "#0000FF");
    } else if (spanText == "注意改善") {
        _findAndSetMapTOMarker(checked, "#FFFF00");
    } else if (spanText == "立即改善") {
        _findAndSetMapTOMarker(checked, "#FF0000");
    } else if (spanText == "改善後正常") {
        _findAndSetMapTOMarker(checked, "#808080");
    } else if (spanText == "呈現檢查結果") {
        _findAndSetMapTOMarker(checked, "#00AA00");
        _findAndSetMapTOMarker(checked, "#0000FF");
        _findAndSetMapTOMarker(checked, "#FFFF00");
        _findAndSetMapTOMarker(checked, "#FF0000");
        _findAndSetMapTOMarker(checked, "#808080");
        if (checked) {
            $('input.statusBtn').iCheck("check");
        } else {
            $('input.statusBtn').iCheck("uncheck");
        }
    }
}

function _findAndSetMapTOMarker(checked, color) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].icon.fillColor == color) {
            if (checked) {
                markers[i].setMap(map);
            } else {
                markers[i].setMap(null);
            }
        }
    }
}

function _initInspectionDataGrid(gridId, result) {
    $("#" + gridId).jsGrid({
        sorting: true,
        paging: true,
        pageSize: 10,
        data: result,
        fields: [
            //{ name: "inspectionYear", type: "number", title: "年度", width: "50px" },
            { name: "inspectionYear", type: "number", title: "年度" },
            {
                title: "檢查日期",
                itemTemplate: function (e, item) {
                    return "<span>" + _parseJsonDate(item.inspectionDate) + "</span>";
                }
            },
            { name: "inspectionTypeName", type: "string", title: "定期/不定期" },
            {
                title: "檢查結果",
                itemTemplate: function (e, item) {
                    return "<div class='" + _getSight(item.improvementStatusName) + "'>" + item.improvementStatusName + "</div>";
                }
            },
            {
                title: "下載",
                itemTemplate: function (e, item) {
                    return "<input type='button' class='btn btn-default' onclick='_downloadOneWord(\"" + item.inspectionId + "\")' value='Word'/>";
                }
            },
            {
                title: "照片",
                itemTemplate: function (e, item) {
                    return "<a onclick='_showImage(\"" + item.inspectionId + "\")'>" + "檢視照片" + "</a>";
                }
            },
            {
                title: "斷面資料",
                itemTemplate: function (e, item) {
                    if (item.profilepath) {
                        return "<input type='button' class='btn btn-default' onclick='_showProfile(\"" + item.inspectionId + "\")' value='顯示'/>";
                    }
                }
            },
            {
                title: "相關資料",
                itemTemplate: function (e, item) {
                    if (item.relativefile) {
                        return "<input type='button' class='btn btn-default' onclick='_downloadFile(\"" + item.inspectionId + "\")' value='下載'/>";
                    } else {
                        return "";
                    }
                }
            }
        ]
    });
}

function _showImage(inspectionId) {
    $.ajax({
        url: '/TechximBADE/Inspection/ShowImages',
        type: "POST",
        data: { inspectionId: inspectionId },
        dataType: 'json',
        success: function (imageList) {
            if (imageList) {
                _showImageModal(imageList);
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function _showImageModal(imageList) {
    $("#imageModal").modal();
    $("#pieChart").hide();
    $("#flot-placeholder").hide();
    $("#imageList").show();
    $('#modalHeader').text('照片資料');
    $("#imageList").jsGrid({
        width: "100%",
        height: "80%",

        paging: true,
        pageSize: 10,
        data: imageList,
        fields: [
            //{
            //    title: "刪除",
            //    width: "15%",
            //    itemTemplate: function (e, item) {
            //        return "<input type='button' class='btn btn-danger' onclick='_deleteImage(\"" + item.inspectionId + "\")' value='刪除'/>";
            //    }
            //},
            {
                title: "圖片",
                width: "85%",
                itemTemplate: function (e, item) {
                    return '<img src="' + item.imagePath + '" width="300px" height="300px">';
                }
            }
        ]
    });
    $("#imageModal").find(".jsgrid-grid-body")[0].style.height = "350px";
}

function _addKMLLayerToMap(spanText, checked) {
    if (checked) {
        if (spanText == "八德地區都市計畫_雨水竣工管線") {
            _showLayerInMap(layverName[0]);
        } else if (spanText == "大湳地區都市計畫_雨水竣工管線") {
            _showLayerInMap(layverName[2]);
        } else if (spanText == "八德地區都市計畫_雨水竣工人孔") {
            _showLayerInMap(layverName[1]);
        } else if (spanText == "大湳地區都市計畫_雨水竣工人孔") {
            _showLayerInMap(layverName[3]);
        } else if (spanText == "八德其他排水圖資") {
            _showLayerInMap(layverName[4]);
        } else if (spanText == "雨水竣工管線") {
            _showLayerInMap(layverName[0]);
            _showLayerInMap(layverName[2]);
            _showLayerInMap(layverName[18]);
            $('input.pipleLayer').iCheck("check");
        } else if (spanText == "雨水竣工人孔") {
            _showLayerInMap(layverName[1]);
            _showLayerInMap(layverName[3]);
            _showLayerInMap(layverName[19]);
            $('input.rainLayer').iCheck("check");
        } else if (spanText == "八德區村里界") {
            _showLayerInMap(layverName[6]);
        } else if (spanText == "八德區區界") {
            _showLayerInMap(layverName[5]);
        } else if (spanText == "公告區域排水圖資") {
            _showLayerInMap(layverName[7]);
        } else if (spanText == "非公告區域排水圖資") {
            _showLayerInMap(layverName[8]);
        } else if (spanText == "排水") {
            _showLayerInMap(layverName[7]);
            _showLayerInMap(layverName[8]);
            $('input.drainLayer').iCheck("check");
        } else if (spanText == "河川圖資") {
            _showLayerInMap(layverName[9]);
        } else if (spanText == "105_109其他排水清淤圖資") {
            _showLayerInMap(layverName[10]);
        } else if (spanText == "集水分區圖資") {
            _showLayerInMap(layverName[11]);
        } else if (spanText == "農田水路") {
            _showLayerInMap(layverName[12]);
            _showLayerInMap(layverName[13]);
            _showLayerInMap(layverName[14]);
            _showLayerInMap(layverName[15]);
            _showLayerInMap(layverName[16]);
            _showLayerInMap(layverName[17]);
            $('input.fieldWaterLayer').iCheck("check");
        } else if (spanText == "桃園管理處-幹線") {
            _showLayerInMap(layverName[12]);
        } else if (spanText == "桃園管理處-支線") {
            _showLayerInMap(layverName[13]);
        } else if (spanText == "桃園管理處-分線") {
            _showLayerInMap(layverName[14]);
        } else if (spanText == "石門管理處-幹線") {
            _showLayerInMap(layverName[15]);
        } else if (spanText == "石門管理處-支線") {
            _showLayerInMap(layverName[16]);
        } else if (spanText == "石門管理處-分線") {
            _showLayerInMap(layverName[17]);
        } else if (spanText == "八德非都市計畫_雨水竣工管線") {
            _showLayerInMap(layverName[18]);
        } else if (spanText == "八德非都市計畫_雨水竣工人孔") {
            _showLayerInMap(layverName[19]);
        } 
    } else {
        if (spanText == "八德地區都市計畫_雨水竣工管線") {
            BADEPipleLayer.setMap(null);
        } else if (spanText == "大湳地區都市計畫_雨水竣工管線") {
            DANANPipleLayer.setMap(null);
        } else if (spanText == "八德地區都市計畫_雨水竣工人孔") {
            BADELayer.setMap(null);
            _clearLabels("八德(八德地區)都市計畫-_雨水竣工人孔20201020.kml");
        } else if (spanText == "大湳地區都市計畫_雨水竣工人孔") {
            DANANLayer.setMap(null);
            _clearLabels("八德(大湳地區)都市計畫-_雨水竣工人孔20201020.kml");
        } else if (spanText == "八德非都市計畫_雨水竣工管線") {
            BADENoneUrbanPlanPipleLayer.setMap(null);
        } else if (spanText == "八德非都市計畫_雨水竣工人孔") {
            BADENoneUrbanPlanLayer.setMap(null);
            _clearLabels("八德非都市計畫區_雨水竣工人孔20210109.kml");
        } else if (spanText == "八德其他排水圖資") {
            OtherLayer.setMap(null);
        } else if (spanText == "雨水竣工管線") {
            BADEPipleLayer.setMap(null);
            DANANPipleLayer.setMap(null);
            BADENoneUrbanPlanPipleLayer.setMap(null);
            $('input.pipleLayer').iCheck("uncheck");
        } else if (spanText == "雨水竣工人孔") {
            BADELayer.setMap(null);
            DANANLayer.setMap(null);
            BADENoneUrbanPlanLayer.setMap(null);
            _clearLabels("八德(八德地區)都市計畫-_雨水竣工人孔20201020.kml");
            _clearLabels("八德(大湳地區)都市計畫-_雨水竣工人孔20201020.kml");
            _clearLabels("八德非都市計畫區_雨水竣工人孔20210109.kml");            
            $('input.rainLayer').iCheck("uncheck");
        } else if (spanText == "八德區村里界") {
            BADEVillageLayer.setMap(null);
            _clearVillageLabels();
        } else if (spanText == "八德區區界") {
            BADEZoneLayer.setMap(null);
        } else if (spanText == "公告區域排水圖資") {
            AnnLocalDrainage.setMap(null);
        } else if (spanText == "非公告區域排水圖資") {
            NonAnnLocalDrainage.setMap(null);
        } else if (spanText == "排水") {
            AnnLocalDrainage.setMap(null);
            NonAnnLocalDrainage.setMap(null);
            $('input.drainLayer').iCheck("uncheck");
        } else if (spanText == "河川圖資") {
            RiverLayer.setMap(null);
        } else if (spanText == "105_109其他排水清淤圖資") {
            OtherDrainCleanLayer109.setMap(null);
        } else if (spanText == "集水分區圖資") {
            WatershedLayer.setMap(null);
        } else if (spanText == "農田水路") {
            TaoyuanWatersedLayer1.setMap(null);
            TaoyuanWatersedLayer2.setMap(null);
            TaoyuanWatersedLayer3.setMap(null);
            ShimenWatersedLayer1.setMap(null);
            ShimenWatersedLayer2.setMap(null);
            ShimenWatersedLayer3.setMap(null);
            $('input.fieldWaterLayer').iCheck("uncheck");
        } else if (spanText == "桃園管理處-幹線") {
            TaoyuanWatersedLayer1.setMap(null);
        } else if (spanText == "桃園管理處-支線") {
            TaoyuanWatersedLayer2.setMap(null);
        } else if (spanText == "桃園管理處-分線") {
            TaoyuanWatersedLayer3.setMap(null);
        } else if (spanText == "石門管理處-幹線") {
            ShimenWatersedLayer1.setMap(null);
        } else if (spanText == "石門管理處-支線") {
            ShimenWatersedLayer2.setMap(null);
        } else if (spanText == "石門管理處-分線") {
            ShimenWatersedLayer3.setMap(null);
        } 
    }
}
function bindDownloadEvent(kmlEvent) {
    setTimeout(function () {
        var btns = $('input[name="kmlbtn1"]');
        if (btns.length > 0) {
            for (var i = 0; i < btns.length; i++) {
                var btn = btns[i]
                btn.onclick = function () {
                    var targetPath = "";
                    if (btn.parentElement.firstElementChild.value.toString().endsWith('.pdf')) {

                        targetPath = btn.parentElement.firstElementChild.value;
                    } else {
                        targetPath = btn.parentElement.firstElementChild.value + ".pdf";
                    }
                    if (btn.parentElement.firstElementChild.value.toString().startsWith('\\data\\') || btn.parentElement.firstElementChild.value.toString().startsWith('/data/')) {
                        targetPath = "https://www.lshydraulic.com/TechximBADE" + targetPath;
                    } else {
                        targetPath = "https://www.lshydraulic.com/TechximBADE/data" + targetPath;
                    }
                    window.open(
                        targetPath
                    );
                }
            }
        }

        var btn1s = $('input[name="kmlbtn2"]');
        if (btn1s.length > 0) {
            for (var i = 0; i < btn1s.length; i++) {
                var btn1 = btn1s[i];
                btn1.onclick = function () {
                    var targetPath = "";
                    if (btn1.parentElement.firstElementChild.value.toString().endsWith('.pdf')) {
                        targetPath = btn1.parentElement.firstElementChild.value;
                    } else {
                        targetPath = btn1.parentElement.firstElementChild.value + ".pdf";
                    }
                    if (btn1.parentElement.firstElementChild.value.toString().startsWith('\\data\\') || btn1.parentElement.firstElementChild.value.toString().startsWith('/data/')) {
                        targetPath = "https://www.lshydraulic.com/TechximBADE" + targetPath;
                    } else {
                        targetPath = "https://www.lshydraulic.com/TechximBADE/data" + targetPath;
                    }
                    window.open(
                        targetPath
                    );
                }
            }

        }

    }, 500);
}

//"riverLayer", "localDrainLayer", "otherDrainLayer", "fieldDrainLayer", "rainSewerLayer", "nonAnnouncementLocalDrainLayer"
function _showLayerInMap(layerName) {
    var sourceURL;
    switch (layerName) {
        case "BADEPipleLayer":
            if (BADEPipleLayer) {
                BADEPipleLayer.setMap(map);
            } else {
                BADEPipleLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德(八德地區)都市計畫-_雨水竣工管線20201019.kml',
                    map: map
                });
                BADEPipleLayer.addListener("click", bindDownloadEvent);
            }
            break;
        case "BADELayer":
            if (BADELayer) {
                BADELayer.setMap(map);
            } else {
                BADELayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德(八德地區)都市計畫-_雨水竣工人孔20201020.kml',
                    map: map
                });
                BADELayer.addListener("click", bindDownloadEvent);
            }
            _setLabels("八德(八德地區)都市計畫-_雨水竣工人孔20201020.kml");
            break;
        case "DANANPipleLayer":
            if (DANANPipleLayer) {
                DANANPipleLayer.setMap(map);
            } else {
                DANANPipleLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德(大湳地區)都市計畫-_雨水竣工管線20201021.kml',
                    map: map
                });
                DANANPipleLayer.addListener("click", bindDownloadEvent);
            }
            break;
        case "DANANLayer":
            if (DANANLayer) {
                DANANLayer.setMap(map);
            } else {
                DANANLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德(大湳地區)都市計畫-_雨水竣工人孔20201020.kml',
                    map: map
                });
                DANANLayer.addListener("click", bindDownloadEvent);
            }
            _setLabels("八德(大湳地區)都市計畫-_雨水竣工人孔20201020.kml");
            break;
        case "OtherLayer":
            if (OtherLayer) {
                OtherLayer.setMap(map);
            } else {
                OtherLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德其他排水路20201126.kml',
                    map: map
                });
                OtherLayer.addListener("click", bindDownloadEvent);
            }
            break;
        case "BADEZoneLayer":
            if (BADEZoneLayer) {
                BADEZoneLayer.setMap(map);
            } else {
                BADEZoneLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德區區界20201126.kml',
                    map: map
                });
            }
            break;
        case "BADEVillageLayer":
            if (BADEVillageLayer) {
                BADEVillageLayer.setMap(map);
            } else {
                BADEVillageLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德區村里界20201126.kml',
                    map: map
                });
            }
            _setVillageLabels("八德區村里界20201126.kml");
            break;
        case "AnnLocalDrainage":
            if (AnnLocalDrainage) {
                AnnLocalDrainage.setMap(map);
            } else {
                AnnLocalDrainage = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德公告區域排水20201115.kml',
                    map: map
                });
            }
            break;
        case "NonAnnLocalDrainage":
            if (NonAnnLocalDrainage) {
                NonAnnLocalDrainage.setMap(map);
            } else {
                NonAnnLocalDrainage = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德非公告區域排水20201115.kml',
                    map: map
                });
            }
            break;
        case "RiverLayer":
            if (RiverLayer) {
                RiverLayer.setMap(map);
            } else {
                RiverLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德河川圖資20201115.kml',
                    map: map
                });
            }
            break;
        case "OtherDrainCleanLayer109":
            if (OtherDrainCleanLayer109) {
                OtherDrainCleanLayer109.setMap(map);
            } else {
                OtherDrainCleanLayer109 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德清淤105_10920201115.kml',
                    map: map
                });
            }
            break;
        case "WatershedLayer":
            if (WatershedLayer) {
                WatershedLayer.setMap(map);
            } else {
                WatershedLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德集水分區20201115.kml',
                    map: map
                });
            }
            break;
        case "TaoyuanWatersedLayer1":
            if (TaoyuanWatersedLayer1) {
                TaoyuanWatersedLayer1.setMap(map);
            } else {
                TaoyuanWatersedLayer1 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/桃園管理處-幹線20201201.kml',
                    map: map
                });
            }
            break;
        case "TaoyuanWatersedLayer2":
            if (TaoyuanWatersedLayer2) {
                TaoyuanWatersedLayer2.setMap(map);
            } else {
                TaoyuanWatersedLayer2 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/桃園管理處-支線20201201.kml',
                    map: map
                });
            }
            break;
        case "TaoyuanWatersedLayer3":
            if (TaoyuanWatersedLayer3) {
                TaoyuanWatersedLayer3.setMap(map);
            } else {
                TaoyuanWatersedLayer3 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/桃園管理處-分線20201201.kml',
                    map: map
                });
            }
            break;
        case "ShimenWatersedLayer1":
            if (ShimenWatersedLayer1) {
                ShimenWatersedLayer1.setMap(map);
            } else {
                ShimenWatersedLayer1 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/石門管理處-幹線20201201.kml',
                    map: map
                });
            }
            break;
        case "ShimenWatersedLayer2":
            if (ShimenWatersedLayer2) {
                ShimenWatersedLayer2.setMap(map);
            } else {
                ShimenWatersedLayer2 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/石門管理處-支線20201201.kml',
                    map: map
                });
            }
            break;
        case "ShimenWatersedLayer3":
            if (ShimenWatersedLayer3) {
                ShimenWatersedLayer3.setMap(map);
            } else {
                ShimenWatersedLayer3 = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/石門管理處-分線20201201.kml',
                    map: map
                });
            }
            break;
        case "BADENoneUrbanPlanPipleLayer":
            if (BADENoneUrbanPlanPipleLayer) {
                BADENoneUrbanPlanPipleLayer.setMap(map);
            } else {
                BADENoneUrbanPlanPipleLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德非都市計畫_雨水竣工管線20210109.kml',
                    map: map
                });
            }
            break;
        case "BADENoneUrbanPlanLayer":
            if (BADENoneUrbanPlanLayer) {
                BADENoneUrbanPlanLayer.setMap(map);
            } else {
                BADENoneUrbanPlanLayer = new google.maps.KmlLayer({
                    url: 'https://' + hostIP + '/TechximBADE/KMLData/八德非都市計畫區_雨水竣工人孔20210109.kml',
                    map: map
                });
            }
            _setLabels("八德非都市計畫區_雨水竣工人孔20210109.kml");
            break;
        default: return;

    }
}

function _setLabels(filePath) {
    $.ajax({
        url: '/TechximBADE/KML/GetKML',
        type: "POST",
        data: { name: filePath },
        success: function (result) {
            if (result) {
                var labels = [];
                var lableContent = "";
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(result, "text/xml");
                var placemarks = xmlDoc.getElementsByTagName("Placemark");
                for (var k = 0; k < placemarks.length; k++) {
                    var placemark = placemarks[k];
                    var extendedDatas = placemark.getElementsByTagName("ExtendedData");
                    for (var i = 0; i < extendedDatas.length; i++) {
                        var extendedData = extendedDatas[i];
                        var datas = extendedData.getElementsByTagName("Data");
                        for (var j = 0; j < datas.length; j++) {
                            var data = datas[j];
                            if (data.getAttribute("name") == "人孔編號(八德區公所)") {
                                lableContent = data.getElementsByTagName("value")[0].innerHTML;
                                var coordinates = placemark.getElementsByTagName("coordinates")[0].innerHTML;
                                var coor = coordinates.split(",");

                                var marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(coor[1], coor[0]),
                                    label: {
                                        text: lableContent,
                                        fontWeight: "bold"
                                    },
                                    icon: {
                                        path: google.maps.SymbolPath.CIRCLE,
                                        fillColor: '#00CCBB',
                                        fillOpacity: 1,
                                        strokeColor: '',
                                        strokeWeight: 0
                                    },
                                    map: map
                                });

                                marker.set("id", filePath);
                                //var val = marker.get("id");
                                labels.push(marker);
                            }
                        }
                    }
                }
                labelList.push(labels);
            }
        }
    });
}
// Removes the markers from the map, but keeps them in the array.
function _clearMarkers() {
    _setMapOnAll(null);
    markers = [];
}

// Sets the map on all markers in the array.
function _setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function _clearLabels(fileName) {
    _setMapOnAll(null);
    var found = false;
    var deleteTarget;
    for (var i = 0; i < labelList.length; i++) {
        var target = labelList[i];
        for (var j = 0; j < target.length; j++) {
            var label = target[j];
            var labelId = label.get("id");
            if (labelId == fileName) {
                label.setMap(null);
                found = true;
                deleteTarget = i;
            } else {
                break;
            }
        }
    }
    if (found) {
        labelList[deleteTarget] = [];
    }
    if (found) {
        var tempList = [];
        for (var i = 0; i < labelList.length; i++) {
            if (labelList[i].length > 0) {
                tempList.push(labelList[i]);
            }
        }
        labelList = tempList;
        tempList = [];
    }
}

function _formatInt(number, len) {
    var mask = "";
    var returnVal = "";
    for (var i = 0; i < len; i++) mask += "0";
    returnVal = mask + number;
    returnVal = returnVal.substr(returnVal.length - len, len);
    return returnVal;
}

function _parseJsonDate(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    date = d.getDate() + 1;
    date = date < 10 ? "0" + date : date;
    mon = d.getMonth() + 1;
    mon = mon < 10 ? "0" + mon : mon;
    year = d.getFullYear();
    return (year + "/" + mon + "/" + date);
};

function _getStatusIconColor(improvementStatusName) {
    switch (improvementStatusName) {
        case "正常":
            return '#00AA00';
        case "計畫改善":
            return '#0000FF';
        case "注意改善":
            return '#FFFF00';
        case "立即改善":
            return '#FF0000';
        case "改善完成":
            return "#808080"
        default:
            return '#00AA00';
    }

}

function _resetConditionForMap() {
    $("#searchYears").val('').trigger('change');
    $("#LocalDrainingSitesList").val('').trigger('change');
    $("#inspectionType").val('').trigger('change');
    $("#InspectionFormList").val('').trigger('change');
    $("#ProtectSubjectList").val('').trigger('change');
    $("#ImprovementTypeList").val('').trigger('change');
    $("#inspectionSite").val('').trigger('change');
    _clearMarkers();
}
function _setVillageLabels(filePath) {
    if (villageLabelList.length > 0) {
        _setMapOnAll(null);
        for (var i = 0; i < villageLabelList.length; i++) {
            villageLabelList[i].setMap(map);
        }
    } else {
        $.ajax({
            url: '/TechximBADE/KML/GetKML',
            type: "POST",
            data: { name: filePath },
            success: function (result) {
                if (result) {
                    var lableContent = "";
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(result, "text/xml");
                    var placemarks = xmlDoc.getElementsByTagName("Placemark");
                    for (var k = 0; k < placemarks.length; k++) {
                        var placemark = placemarks[k];
                        var extendedDatas = placemark.getElementsByTagName("SchemaData");
                        for (var i = 0; i < extendedDatas.length; i++) {
                            var extendedData = extendedDatas[i];
                            var datas = extendedData.getElementsByTagName("SimpleData");
                            for (var j = 0; j < datas.length; j++) {
                                var data = datas[j];
                                if (data.getAttribute("name") == "村里界") {
                                    lableContent = data.innerHTML;
                                    var req = /\s+/g;
                                    var coordinates = placemark.getElementsByTagName("coordinates")[0].innerHTML.trim().replace(req, ',');
                                    var coor = coordinates.split(",");
                                    const polygonCoords = [];

                                    for (var i = 0; i < coor.length; i++) {
                                        polygonCoords.push(new google.maps.LatLng(coor[i + 1], coor[i]));
                                        i++;
                                    }
                                    var bounds = new google.maps.LatLngBounds();
                                    for (i = 0; i < polygonCoords.length; i++) {
                                        bounds.extend(polygonCoords[i]);
                                    }

                                    var marker = new google.maps.Marker({
                                        label: {
                                            text: lableContent,
                                            fontWeight: "bold",
                                            color: "red"
                                        },
                                        icon: {
                                            path: google.maps.SymbolPath.CIRCLE,
                                            fillColor: '#00CCBB',
                                            fillOpacity: 1,
                                            strokeColor: '',
                                            strokeWeight: 0
                                        },
                                        map: map
                                    });

                                    if (lableContent == "廣隆里") {
                                        marker.setPosition(polygonCoords[0]);
                                    } else {
                                        marker.setPosition(bounds.getCenter());
                                    }


                                    marker.set("id", filePath);
                                    //var val = marker.get("id");
                                    villageLabelList.push(marker);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

function _clearVillageLabels() {
    for (var i = 0; i < villageLabelList.length; i++) {
        var label = villageLabelList[i];
        label.setMap(null);
    }
}