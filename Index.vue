<template>
    <div class="main-wrap" role="main">
        <!-- 八德區水利工程及災害防汛資訊系統 -->
        <div class="top_nav">
            <div class="nav_menu">
                <nav class="nav navbar-nav">
                    <ul class="navbar-right">
                        <li class="nav-item">
                            <img src="/Images/LOGO.png" style="width:80px; height:78px " />
                        </li>
                        <li class="nav-item">
                            <h3>八德區水利工程及災害防汛資訊系統</h3>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- 選單區 -->
        <div class="main-select-wrap card init-panel">
            <div class="main-title">
                <h2>排水檢測查詢</h2>
                <span class="main-title__line"></span>
                <a class="collapse-link" data-card-widget="collapse" data-toggle="tooltip"></a>
            </div>
            <div class="card-body init-content">
                <form id="conditionForm" class="form-wrap form">
                    <div class="form-btn-group form-btn-panel">
                        <button type="button" class="btn btn-pie btn-size--sm" id="pieChartBtn" onclick="_showPieChart()">
                            <span class="icon-pie"></span>
                            圓餅圖分析
                        </button>
                        <button type="button" class="btn btn-pdf btn-size--sm" id="pdfChk" onclick="_downloadPDF()">
                            <span class="icon-pdf"></span>
                            PDF
                        </button>
                        <button type="button" class="btn btn-excel btn-size--sm" id="wordChk" onclick="_downloadExcel()">
                            <span class="icon-excel"></span>
                            Excel
                        </button>
                        <button type="button" class="btn btn-del btn-size--sm" id="deleteAllSelected" onclick="_deleteAllSelected()">
                            <span class="icon-del"></span>
                            刪除勾選
                        </button>
                    </div>

                    <div class="form-panel">
                        <div class="form-col form-col--100">
                            <label class="form-label" for="LocalDrainingSitesList">排水名稱</label>
                            <div class="form-box">
                                <select id="LocalDrainingSitesList" multiple="multiple" name="LocalDrainingSitesList" class="select2">
                                    <option value="300">300打鐵店排水</option>
                                    <option value="301">301國防大學退水路</option>
                                    <option value="302">302連城溪支流</option>
                                    <option value="303">303皮寮溪國豐支流</option>
                                    <option value="304">304大安里排水</option>
                                    <option value="305">305楓樹腳排水</option>
                                    <option value="306">306皮寮溪廣興支流</option>
                                    <option value="307">307懷德街排水</option>
                                    <option value="308">308世紀社區排水</option>
                                    <option value="309">309福德一路支流</option>
                                    <option value="310">310埔頂直排分線</option>
                                    <option value="311">311霄裡排水1號</option>
                                    <option value="312">312霄裡排水2號</option>
                                    <option value="313">313廣興路1177巷排水</option>
                                </select>
                            </div> 
                        </div> 
                        <div class="form-col">
                            <label class="form-label" for="searchYears">年度</label>
                            <div class="form-box">
                                <select id="searchYears" name="searchYears" multiple="multiple" class="select2"></select>
                            </div>  
                        </div> 

                        <div class="form-col">
                            <label for="inspectionType" class="form-label">檢查類別</label>
                            <div class="form-box">
                                <select id="inspectionType" name="inspectionType" multiple="multiple" class="select2">
                                    <option value="1">定期</option>
                                    <option value="2">不定期</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-col">
                            <label class="form-label" for="InspectionFormList">護岸型式</label>
                            <div class="form-box">
                                <select id="InspectionFormList" multiple="multiple" name="InspectionFormList" class="select2">
                                    <option value="1">土堤</option>
                                    <option value="2">石籠護岸</option>
                                    <option value="3">混合式</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-col">
                            <label class="form-label" for="ProtectSubjectList">保全對象</label>
                            <div class="form-box">
                                <select id="ProtectSubjectList" multiple="multiple" name="ProtectSubjectList" class="select2"><option value="1">社區部落</option>
                                    <option value="2">工廠學校</option>
                                    <option value="4">農田原野</option>
                                    <option value="6">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-col">
                            <label class="form-label" for="ImprovementTypeList">改善分類</label>
                            <div class="form-box">
                                <select id="ImprovementTypeList" multiple="multiple" name="ImprovementTypeList" class="select2">
                                    <option value="1">正常</option>
                                    <option value="2">計畫改善</option>
                                    <option value="3">注意改善</option>
                                    <option value="4">立即改善</option>
                                    <option value="5">改善後正常</option>
                                    <option value="6">無</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-col">
                            <label class="form-label" for="inspectionSite">左/右岸</label>
                            <div class="form-box">
                                <select id="inspectionSite" name="inspectionSite" multiple="multiple" class="select2">
                                    <option value="2">左岸</option>
                                    <option value="1">右岸</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-btn-group">
                            <button id="showDataBtn" type="button" class="btn btn-view btn-size--md" onclick="_switchDisplayType()">
                                <span class="icon-view"></span>
                                資料檢示
                            </button>
                            <button id="showMapBtn" type="button" style="display: none;" class="btn btn-map btn-size--md" onclick="_switchDisplayType()">
                                <span class="icon-map"></span>
                                地圖檢示
                            </button>
                            <button type="button" onclick="_search()" class="btn btn-search btn-size--md">
                                <span class="icon-search"></span>
                                資料查詢
                            </button>
                            <button id="resetBtn" type="button" class="btn btn-reload btn-size--md" onclick="_resetCondition()">
                                <span class="icon-reload"></span>
                                條件重設
                            </button>
                        </div>
                </form>
            </div>
        </div>

        <!-- 資料表顯示 -->
        <div class="card" id="resultCard" style="display: none;">
            <div class="card-body">
                <div id="searchResults" class="jsgrid data-panel Index-table" style="position: relative; height: auto; width: 100%;">
                    <!-- 資料表標題 -->
                    <div class="jsgrid-grid-header jsgrid-header-scrollbar">
                        <table class="jsgrid-table">
                            <tbody>
                                <tr class="jsgrid-header-row">
                                    <th class="jsgrid-header-cell jsgrid-align-center" style="width: 3%;">
                                        <input type="checkbox" id="selectAllCheckbox">
                                    </th>
                                    <th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width: 5%;">年度</th>
                                    <th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width: 10%;">編號</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">排水名稱</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">類別</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">結果</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">燈號</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">斷面資料</th>
                                    <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 100px;">下載</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 資料表內容 -->
                    <div class="jsgrid-grid-body">
                        <table class="jsgrid-table">
                            <tbody>
                                <tr :class="[n%2 == 1?'jsgrid-row':'jsgrid-alt-row']" v-for="n in 15">
                                    <td class="jsgrid-cell jsgrid-align-center" style="width: 3%;">
                                        <input type="checkbox" class="singleCheckbox">
                                    </td>
                                    <td class="jsgrid-cell jsgrid-align-right" style="width: 5%;">107</td>
                                    <td class="jsgrid-cell jsgrid-align-right" style="width: 10%;">107-02-178-00K000-L-01</td>
                                    <td class="jsgrid-cell" style="width: 100px;">瓦窯溝排水分線</td>
                                    <td class="jsgrid-cell" style="width: 100px;">定期</td>
                                    <td class="jsgrid-cell" style="width: 100px;">正常</td>
                                    <td class="jsgrid-cell" style="width: 100px;">
                                        <div class="improvement-sight-normal" style="font-size : x-large;">●</div>
                                        <input type="hidden" class="inspectionID" value="107-02-178-00K000-L-01">
                                    </td>
                                    <td class="jsgrid-cell" style="width: 100px;">
                                        <input type="button" class="btn btn-round btn-info btn--xs" onclick="_showProfile(&quot;108-02-181-00K364-L-01&quot;)" value="顯示">
                                    </td>
                                    <td class="jsgrid-cell" style="width: 100px;">
                                        <button type="button" class="btn icon-wordc btn-icon" onclick="_downloadOneWord(&quot;107-02-178-00K000-L-01&quot;)">
                                            Word
                                        </button>
                                        <button type="button" class="btn icon-pdfc btn-icon" onclick="_downloadOnePDF(&quot;107-02-178-00K000-L-01&quot;)">
                                            PDF
                                        </button>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="jsgrid-pager-container"><div class="jsgrid-pager">頁碼: <span class="jsgrid-pager-nav-button jsgrid-pager-nav-inactive-button"><a href="javascript:void(0);">第一頁</a></span> <span class="jsgrid-pager-nav-button jsgrid-pager-nav-inactive-button"><a href="javascript:void(0);">上一頁</a></span> <span class="jsgrid-pager-page jsgrid-pager-current-page">1</span><span class="jsgrid-pager-page"><a href="javascript:void(0);">2</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">3</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">4</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">5</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">6</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">7</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">8</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">9</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">10</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">11</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">12</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">13</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">14</a></span><span class="jsgrid-pager-page"><a href="javascript:void(0);">15</a></span><span class="jsgrid-pager-nav-button"><a href="javascript:void(0);">...</a></span> <span class="jsgrid-pager-nav-button"><a href="javascript:void(0);">下一頁</a></span> <span class="jsgrid-pager-nav-button"><a href="javascript:void(0);">最後一頁</a></span> &nbsp;&nbsp; 1 of 82 &nbsp; 總計 : 1217 筆 </div></div>
                    <div class="jsgrid-load-shader" style="display: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1000;"></div>
                    <div class="jsgrid-load-panel" style="display: none; position: absolute; top: 50%; left: 50%; z-index: 1000;">請稍候...</div>
                </div>
            </div>
        </div>
        <!-- 地圖圖表顯示 -->
        <div id="resultMap" class="x_panel map-container">
            <div id="mapDiv" class="map-panel">
                <div id="map" style="min-height:800px; height:100%"></div>
            </div>
            <!-- 增加縮放按鈕 -->
            <div class="area-panel" id="collapseLayers">
                <div class="area-toggle">
                    <a href="javascript:;" class="area-toggle__btn">按鈕</a>
                </div>
                <div class="x_panel init-panel area-collapse">
                    <ul class="list-unstyled">
                        <li class="list-unstyled-box">
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" id="BADEZoneChk" class="icheckbox_flat layerBtn">
                                    <span class="list-unstyled-style"></span>
                                    <span>八德區區界</span>
                                </label>
                                <span style="background-color: #DDAE2E;">■</span>
                            </div>
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" id="BADEVillageChk" class="icheckbox_flat layerBtn">
                                    <span class="list-unstyled-style"></span>
                                    <span>八德區村里界</span>
                                </label>
                                <span style="background-color: #D2B414;">■</span>
                            </div>
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" class="icheckbox_flat layerBtn">
                                    <span class="list-unstyled-style"></span>
                                    <span>八德其他排水圖資</span>
                                </label>
                                <span style="background-color: #369CFF;">■</span>
                            </div>
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" class="icheckbox_flat layerBtn">
                                    <span class="list-unstyled-style"></span>
                                    <span>河川圖資</span>
                                </label>
                                <span style="background-color: #F00014;">■</span>
                            </div>
                        </li>                            
                        <li class="list-unstyled-box-wrap">
                            <label class="list-unstyled-label">
                                <input type="checkbox" class="icheckbox_flat layerBtn">
                                <span class="list-unstyled-style"></span>
                                <span>排水</span>
                            </label>
                            <div class="list-unstyled-box">
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn drainLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>公告區域排水圖資</span>
                                    </label>
                                    <span style="background-color: green;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn drainLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>非公告區域排水圖資</span>
                                    </label>
                                    <span style="background-color:darkgreen;">■</span>
                                </div>
                            </div>
                        </li>
                        <li class="list-unstyled-box-wrap">
                            <label class="list-unstyled-label">
                                <input type="checkbox" class="icheckbox_flat layerBtn">
                                <span class="list-unstyled-style"></span>
                                <span>雨水竣工管線</span>
                            </label>
                            <div class="list-unstyled-box">
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn pipleLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>八德地區都市計畫_雨水竣工管線</span>
                                    </label>
                                    <span style="background-color: #FF8050;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn pipleLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>大湳地區都市計畫_雨水竣工管線</span>
                                    </label>
                                    <span style="background-color: #bc6276;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn pipleLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>八德非都市計畫_雨水竣工管線</span>
                                    </label>
                                    <span style="background-color: #80ffff;">■</span>
                                </div>
                            </div>
                        </li>
                        <li class="list-unstyled-box-wrap">
                            <label class="list-unstyled-label">
                                <input type="checkbox" class="icheckbox_flat layerBtn">
                                <span class="list-unstyled-style"></span>
                                <span>雨水竣工人孔</span>
                            </label>
                            <div class="list-unstyled-box">
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn rainLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>八德地區都市計畫_雨水竣工人孔</span>
                                    </label>
                                    <span style="background-color: #FF80C8;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn rainLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>大湳地區都市計畫_雨水竣工人孔</span>
                                    </label>
                                    <span style="background-color: #bcb276;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn rainLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>八德非都市計畫_雨水竣工人孔</span>
                                    </label>
                                    <span style="background-color: #c07a52;">■</span>
                                </div>
                            </div>
                        </li>
                        
                        <li class="list-unstyled-box">
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" class="icheckbox_flat layerBtn otherLayer">
                                    <span class="list-unstyled-style"></span>
                                    <span>105_109其他排水清淤圖資</span>
                                </label>
                                <span style="background-color: #F07814;">■</span>
                            </div>
                            <div class="list-unstyled-group">
                                <label class="list-unstyled-label">
                                    <input type="checkbox" class="icheckbox_flat layerBtn otherLayer">
                                    <span class="list-unstyled-style"></span>
                                    <span>集水分區圖資</span>
                                </label>
                                <span style="background-color: #8080FF;">■</span>
                            </div>
                        </li> 
                        <li class="list-unstyled-box-wrap">
                            <label class="list-unstyled-label">
                                <input type="checkbox" class="icheckbox_flat layerBtn">
                                <span class="list-unstyled-style"></span>
                                <span>農田水路</span>
                            </label>
                            <div class="list-unstyled-box">
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>石門管理處-幹線</span>
                                    </label>
                                    <span style="background-color: #800000;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>石門管理處-支線</span>
                                    </label>
                                    <span style="background-color: #805A00;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>石門管理處-分線</span>
                                    </label>
                                    <span style="background-color: #805A6E;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>桃園管理處-幹線</span>
                                    </label>
                                    <span style="background-color: #808000;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>桃園管理處-支線</span>
                                    </label>
                                    <span style="background-color: #BCBC3C;">■</span>
                                </div>
                                <div class="list-unstyled-group">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="icheckbox_flat layerBtn fieldWaterLayer">
                                        <span class="list-unstyled-style"></span>
                                        <span>桃園管理處-分線</span>
                                    </label>
                                    <span style="background-color: #BA7E00;">■</span>
                                </div>
                            </div>
                        </li>
                        <li class="list-unstyled-box-wrap">
                            <label class="list-unstyled-label">
                                <input type="checkbox" class="flat statusBtn">
                                <span class="list-unstyled-style"></span>
                                <span>呈現檢查結果</span>
                            </label>
                            <div class="list-unstyled-box">
                                <div class="list-unstyled-group" id="status_1">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="flat statusBtn">
                                        <span class="list-unstyled-style"></span>
                                        <span>正常</span>
                                    </label>
                                    <span style="background-color: green;border-radius:50%;">●</span>
                                </div>
                                <div class="list-unstyled-group" id="status_2">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="flat statusBtn">
                                        <span class="list-unstyled-style"></span>
                                        <span>計畫改善</span>
                                    </label>
                                    <span style="background-color: blue;border-radius:50%;">●</span>
                                </div>
                                <div class="list-unstyled-group" id="status_3">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="flat statusBtn">
                                        <span class="list-unstyled-style"></span>
                                        <span>注意改善</span>
                                    </label>
                                    <span style="background-color: yellow;border-radius:50%;">●</span>
                                </div>
                                <div class="list-unstyled-group" id="status_4">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="flat statusBtn">
                                        <span class="list-unstyled-style"></span>
                                        <span>立即改善</span>
                                    </label>
                                    <span style="background-color: red;border-radius:50%;">●</span>
                                </div>
                                <div class="list-unstyled-group" id="status_5">
                                    <label class="list-unstyled-label">
                                        <input type="checkbox" class="flat statusBtn">
                                        <span class="list-unstyled-style"></span>
                                        <span>改善後正常</span>
                                    </label>
                                    <span style="background-color: grey;border-radius:50%;">●</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div id="imageModal" class="modal hide fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modalHeader">Modal title</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div id="modalBody" class="modal-body">
                        <div id="flot-placeholder" style="width:500px;height:350px"></div>
                        <div id="imageList" />
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>