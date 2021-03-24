<template>
    <div class="flex-col menu-wrap">
        <div class="nav toggle menu__toggle">
            <a id="menu_toggle" class="menu__btn" data-widget="pushmenu"></a>
        </div>
        <div class="scroll-view menu__list-wrap">
            <ul class="side-menu menu__list" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item has-treeview menu__li">
                    <a class="menu__link nav-link">
                        <span class="icon-water"></span>
                        <span class="menu__text">排水</span>
                        <span class="icon-slide"></span>
                    </a>
                    <ul class="nav child_menu nav-treeview">
                        <li><a href="/Home/Index">排水檢視</a></li>
                        <li><a href="/FileConverter/UploadFile">排水資料上傳</a></li>
                    </ul>
                </li>
                <li class="menu__li">
                    <a class="menu__link" href="/ConverterResult/BatchDownloadSchedule">
                        <span class="icon-downloadview"></span>
                        <span class="menu__text">批次下載排程檢視</span>
                    </a>
                </li>
                <li class="menu__li">
                    <a class="menu__link" href="/ConverterResult/ConvertFileSchedule">
                        <span class="icon-uploadview"></span>
                        <span class="menu__text">資料上傳轉檔排程檢視</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
module.exports={

}
</script>