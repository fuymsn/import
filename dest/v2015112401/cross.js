// 页面模块
var crossList = {
    'libJs.js': [
        'vendor/jquery/jquery.min.js'
    ],
    'commonCss.css' : [
        'style/module/reset.css',
        'style/module/module-a.less',
        'style/module/module-b.less',
        'style/widget/widget-a.less',
        'style/widget/widget-b.less',
        'style/module/common.less'
    ],
    'commonJs.js' : [
        'js/widget/widget-a.js',
        'js/widget/widget-b.js',
        'js/module/module-a.js',
        'js/module/module-b.js',
        'service/service-a.js'
    ],
    //page a
    'pageaCss.css' : [
        'style/widget/widget-c.less',
        'style/module/module-c.less',
        'style/page/page-a.less'
    ],
    'pageaJs.js' : [
        'js/module/module-c.js',
        'js/widget/widget-c.js',
        'js/page/page-a.js'
    ],
    
    //page b
    'pagebCss.css' : [
        'style/page/page-b.less'
    ],
    'pagebJs.js' : [
        'js/module/module-c.js',
        'js/page/page-b.js'
    ],
    
    //page c
    'pagecCss.css' : [
        'style/page/page-c.less'
    ],

    'pagecJs.js' : [
        'js/module/module-b.js',
        'js/page/page-c.js'
    ]
};
//cdn 数组
var cdnPathArr = [
	'http://s.1.com'
];

/**
 * 随机切换CDN方法
 * @param  {[type]} arr [cdn数组]
 * @return {[type]}     [返回cdn中的一个值]
 */
var __randomSeedFromArr = function(arr){
    var arrLen = arr.length;
    var randomNum = Math.floor(Math.random()*arrLen);
    return arr[randomNum];
}

//优化目的将ued_config 改为了 Config
var __cdn = __randomSeedFromArr(cdnPathArr);

var Config = {
    publishVersion: "v2015112401",
    subPublishVersion: "1.0",
    resource: typeof crossList == "undefined" ? {}: crossList,
    //language: navigator.language || navigator.browserLanguage,
    cdnPath: __cdn,
    imagePath: __cdn + '/src/img',
    mode: 'online' // dev/online/onlinedev
};
/**
 * 静态文件加载器 - v0.1.2 - 2015-11-25
 * Copyright (c) 2015 Young Foo
 */

var Application = function(config){

    //私有变量less，css，js模板
    var __jsTemplate = '<script src="${src}" charset="utf-8" type="text/javascript" itemid="${itemid}"><\/script>',
    __cssTemplate = '<link rel="stylesheet" type="text/css" href="${href}" itemid="${itemid}" />';

    //容器
    //this.container = this;

    //配置
    this.config = {}

    //cdn path
    this.cdnPath = "";

    //dest path
    this.destPath = "";

    /**
     * 装载配置文件
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.configure = function(conf){
        this.config = conf;
    }

    this.make = function(){

    }

    /**
     * 初始化导入
     * @return {[type]} [description]
     */
    this.initImport = function(){

        this.cdnPath = this.config.cdnPath || "/";
        this.destPath = this.config.cdnPath + "/dest/" + this.config.publishVersion + "/";

        /**
         * 根据是否是开发版修改cdn路径和判断加载less编译文件
         */
        if (this.config.mode == "dev") {

            //dev环境路径配置
            this.cdnPath = this.cdnPath + "/";

        };

    };

    /**
     * [__importdest 导入压缩文件]
     * @param  {[type]} file     [文件]
     * @param  {[type]} fileType [文件类型]
     * @param  {[type]} id       [文件id]
     * @return {[type]}          [null]
     */
    var __importDest = function(file, fileType, ins, isHead){

        var outStr = '';
        var fileDest = '';
        
        if(ins.config.mode == "onlinedev"){
            fileDest = file;
        }
        
        if(ins.config.mode == "online"){
            fileDest = file.split(".")[0] + "-min." + fileType;
        }
        
        if (fileType == "js") {
            
            outStr = __jsTemplate.replace("${src}", ins.destPath + "js/" + fileDest + "?v=" + ins.config.subPublishVersion).replace("${itemid}", file);
        
        } else if (fileType == "css") {

            outStr = __cssTemplate.replace("${href}", ins.destPath + "css/" + fileDest + "?v=" + ins.config.subPublishVersion).replace("${itemid}", file);
        
        }

        if(isHead){
            ins.asyncImportJs(ins.cdnPath + file);
        }else{
            document.write(outStr);
        }
    }

    /**
     * [__importDest 导入debug文件]
     * @param  {[type]} files    [文件数组]
     * @param  {[type]} fileType [文件类型]
     * @param  {[type]} id       [文件id]
     * @return {[type]}          [null]
     */
    var __importDev = function(files, fileType, ins, isHead) {

        for(var i = 0; i < files.length; i++) {

            var outStr = '';

            if (fileType == "js") {

                outStr = __jsTemplate.replace("${src}", ins.cdnPath + "src/" + files[i]).replace("${itemid}", files[i]);

            } else if (fileType == "css") {

                outStr = __cssTemplate.replace("${href}", ins.cdnPath + "dev/" + files[i]).replace("${itemid}", files[i]).replace(".less", ".css");
            
            };

            if(isHead){
                ins.asyncImportJs(ins.cdnPath + files[i]);
            }else{
                document.write(outStr);
            }
        }

    }

    /**
     * @function importFile 导入文件
     * @param id 静态文件的id名称
     * @param fileType  文件类型  js/css
     * @param mode 运行环境 dev/online dev表示环境加载多个源码文件 online代表线上环境 加载单个合并压缩后的文件
    */
    this.importFile = function(id, fileType, mode, isHead) {

        var __mode = this.config.mode,
            __id = id +'.' + fileType;

        //判断是否有指定模式
        if (mode) {
            __mode = mode;
        }

        //判断resource数组是否为空
        if (!this.config.resource[__id]) {
            return false;
        }

        //通过不同的模式导入不同的文件
        if (__mode == "online" || __mode == "onlinedev") {

            //线上模式导入
            __importDest(__id, fileType, this, isHead);

        } else if (__mode == "dev") {

            //调试模式导入
            __importDev(this.config.resource[__id], fileType, this, isHead);
        }
    }

    /** 
     * @function asyncImport 异步导入
     * @param src js的路径
    */
    this.asyncImportJs = function(src, charset) {
        
        var head = document.getElementsByTagName("head")[0];

        //创建script
        var script = document.createElement("script");
        script.type = "text/javascript";

        //设置为异步
        script.async = true;
        script.src = src;


        //charset设置
        if (charset) {
            script.charset = charset;
        }

        //防止没有head标签的情况
        if (!head) {
            document.body.insertBefore(script, document.body.firstChild);
        } else {
            head.appendChild(script);
        }
    }

    /**
     * 构造函数
     * @return {[type]} [description]
     */
    this.init = function(conf){

        //初始化配置文件
        this.configure(conf);

        //导入配置文件
        this.initImport();

    }

    //初始化
    this.init(config);

}

var cross = new Application(window.Config);

