'use strict';

var menuItems = [{
    link: '/home',
    name: 'HOME'
}, {
    link: '/news',
    name: 'NEWS'
}, {
    link: '/story',
    name: 'STORY'
}, {
    link: '/keyword',
    name: 'KEYWORD'
}, {
    link: '/character',
    name: 'CHARACTER'
}, {
    link: '/mechanics',
    name: 'MECHANICS'
}, {
    link: 'cast',
    name: 'STAFF&CAST'
}, {
    link: 'goods',
    name: 'GOODS'
}];

/* common */

var pageTop = {
    template: '#header',
    data: function data() {

        return {
            menuItems: menuItems

        };
    }
};

Vue.component('page-top', pageTop);

var pageBottom = {
    template: '#page-bottom'
};

Vue.component('page-bottom', pageBottom);

var page = {
    template: '#page',
    components: {
        pageTop: pageTop,
        pageBottom: pageBottom
    }
};

var popup = {
    template: '#popup',
    props: ['html', 'show'],
    watch: {
        show: function show(v) {
            if (v) {
                this.open();
            } else {
                this.close();
            }
        }
    },
    data: function data() {
        return {};
    },
    mounted: function mounted() {},
    methods: {
        open: function open() {
            // $(this.$el).show();
            // alert()
            $('body').css({ overflow: 'hidden' });
        },
        close: function close() {
            this.$emit('before-close');
            $('body').css({ overflow: 'auto' });
        },
        stopClose: function stopClose(event) {
            event.stopPropagation();
        }
    }

    /* pages */

};var home = {
    template: '#home',
    components: {
        page: page,
        popup: popup
    },
    beforeCreate: function beforeCreate() {

        setTimeout(function () {
            $('#app').css({ height: '100%' });
        });
    },
    created: function created() {
        this.video = this.videos[0];
    },
    mounted: function mounted() {

        var bg1 = new Image();
        // bg1.src = '../picture/mainvisual.png';
        bg1.onload = function () {
            $('#app .bg-1').css({ opacity: 1 });
        };

        $('#app .menu a').eq(0).addClass('router-link-active');

        setTimeout(function () {
            $('#app .page-home').addClass('init');
        }, 0);
        setTimeout(function () {
            $('#app .menu').css({
                overflow: 'visible'
            });
        }, 2200);

        setTimeout(function () {
            var video = document.getElementById('video-small');
            video.volume = 0;
            video.play();
        }, 3000);
    },
    destroyed: function destroyed() {
        $('#app').css({ height: 'auto' });
    },
    data: function data() {

        return {
            videoPopupShow: false,
            videoPopupHtml: '',
            newsPopupShow: false,
            newsPopupHtml: '',
            sharePopupShow: false,
            sharePopupHtml: '\n\t\t\t\t<div class="popup-share">\n\t\t\t\t\t<div class="weibo">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t- \u65B0\u6D6A\u5FAE\u535A -\n\t\t\t\t\t\t\t<img src="/img/weibo-qrcode.png">\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div><div class="weixin">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t- \u5FAE\u4FE1 -\n\t\t\t\t\t\t\t<img src="/img/weixin-qrcode.jpg">\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t',
            menuItems: menuItems,
            videos: [{
                title: 'PV',
                preview: '/img/18-preview.png',
                // src: '/video/pv-small.mp4',
                src: 'http://video.project-pandora.cn/db5766046ff94291ab43bf7ddc617957/6a2a358009534e11b161b5f94368c233-5287d2089db37e62345123a1be272f8b.mp4'
            }],
            video: {},
            newsList: newsList.concat([])
        };
    },
    methods: {
        switchVideo: function switchVideo(index, event) {

            if (!this.videos[index]) {
                return;
            }
            this.video = this.videos[index];

            $('.visual.active').removeClass('active');
            console.log(event);
            $('.visual').eq(index).addClass('active');
        },
        openVideoPopup: function openVideoPopup() {

            var html = '\n\t\t\t\t<video class="popup-video" id="popup-video" src="' + this.video.src + '" autoplay controls></video>';
            // var html = `<div class="popup-video" id = 'J_prismPlayer' style='width: 1920px;height: 1280px;' class='prism-player'></div >`;


            this.videoPopupHtml = html;
            this.videoPopupShow = true;

            // setTimeout(function () {
            // 	new window.prismplayer({id: "J_prismPlayer",autoplay: true,width: "1920px",height: "1280px",vid: "db5766046ff94291ab43bf7ddc617957",playauth: "客户调用接口生成",});
            // }, 1000)
        },
        openNewsPopup: function openNewsPopup(news) {

            var html = getNewsPopupHtml(news);
            this.newsPopupHtml = html;
            this.newsPopupShow = true;
        },
        openSharePopup: function openSharePopup() {

            this.sharePopupShow = true;
        },
        videoPopupBeforeClose: function videoPopupBeforeClose() {

            var video = document.getElementById('popup-video');
            video.pause();
            this.videoPopupShow = false;
        },
        newsPopupBeforeClose: function newsPopupBeforeClose() {

            this.newsPopupShow = false;
        },
        sharePopupBeforeClose: function sharePopupBeforeClose() {

            this.sharePopupShow = false;
        }
    }
};

var newsList = [{
    title: '《重神机潘多拉》第2弹角色叶坤灵（CV:花泽香菜）公布！',
    time: '2017.11.27',
    desc: '2018年春季开播的TV动画『重神机潘多拉』公布第2弹角色！这次公布的是『失去一切的冷艳战士』叶坤灵。在寻仇之旅中以赏金猎人为业。此角色由花泽香菜出演！本次曝光的概念海报描绘的是黄昏中坤灵威风凛凛的身姿，若有所思……。今后还将公布更多细节！官方微博（@重神机潘多拉）也会发布更多动态。敬请期待。',
    content: '\n<p>2018\u5E74\u6625\u5B63\u5F00\u64AD\u7684TV\u52A8\u753B\u300E\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300F\u516C\u5E03\u7B2C2\u5F39\u89D2\u8272\uFF01\n<br>\u8FD9\u6B21\u516C\u5E03\u7684\u662F\u300E\u5931\u53BB\u4E00\u5207\u7684\u51B7\u8273\u6218\u58EB\u300F\u53F6\u5764\u7075\u3002\u5728\u5BFB\u4EC7\u4E4B\u65C5\u4E2D\u4EE5\u8D4F\u91D1\u730E\u4EBA\u4E3A\u4E1A\u3002\n<br>\u6B64\u89D2\u8272\u7531\u82B1\u6CFD\u9999\u83DC\u51FA\u6F14\uFF01\n<br>\u672C\u6B21\u66DD\u5149\u7684\u6982\u5FF5\u6D77\u62A5\u63CF\u7ED8\u7684\u662F\u9EC4\u660F\u4E2D\u5764\u7075\u5A01\u98CE\u51DB\u51DB\u7684\u8EAB\u59FF\uFF0C\u82E5\u6709\u6240\u601D\u2026\u2026\u3002\n<br>\u4ECA\u540E\u8FD8\u5C06\u516C\u5E03\u66F4\u591A\u7EC6\u8282\uFF01\u5B98\u65B9\u5FAE\u535A\uFF08@\u91CD\u795E\u673A\u6F58\u591A\u62C9\uFF09\u4E5F\u4F1A\u53D1\u5E03\u66F4\u591A\u52A8\u6001\u3002\u656C\u8BF7\u671F\u5F85\u3002</p>\n\n\n\n<p><b>\uFF1C\u7B2C2\u5F39\u6982\u5FF5\u6D77\u62A5\u4ECA\u65E5\u66DD\u5149\uFF01\uFF1E</b>\n<br>\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u7B2C2\u5F39\u6982\u5FF5\u6D77\u62A5\u4E8E11\u670827\u65E5\u4ECA\u65E5\u66DD\u5149\uFF01\n<br>\u7B2C2\u5F39\u6982\u5FF5\u6D77\u62A5\u8868\u73B0\u7684\u662F\u672C\u52A8\u753B\u4E3B\u89D2\u4E4B\u4E00\uFF1A\n<br>\u300E\u5931\u53BB\u4E00\u5207\u7684\u51B7\u8273\u6218\u58EB\u300F\u53F6\u5764\u7075\u3002\n<br>\u9EC4\u660F\u4E0B\uFF0C\u72EC\u7ACB\u98CE\u4E2D\uFF0C\u82E5\u6709\u6240\u601D\u2026\u2026\u3002</p>\n\n<p>\u540C\u65F6\u516C\u5F00\u7684\u8FD8\u6709\u4EE5\u53F6\u5764\u7075\u4E3A\u4E3B\u7EBF\u7684\u60C5\u8282\u4ECB\u7ECD\uFF0C\u201C\u91CD\u795E\u673A\u6F58\u591A\u62C9\u201D\u7684\u4E16\u754C\u6B63\u4E00\u6B65\u6B65\u63ED\u5F00\u795E\u79D8\u9762\u7EB1\u3002\n<br>\u660E\u5E74\u6625\u5B63\u5F00\u64AD\u524D\u5C06\u4F1A\u9646\u7EED\u516C\u5E03\u66F4\u591A\u4FE1\u606F\uFF01\n<br>\u656C\u8BF7\u5173\u6CE8\uFF01</p>\n\n<p><img src="/img/news-3-1.jpg"></p>\n\n<p><b>\uFF1C\u9686\u91CD\u4ECB\u7ECD\u4E3B\u8981\u89D2\u8272\u53CA\u914D\u97F3\u6F14\u5458\uFF01\uFF1E</b>\n<br>\u672C\u6B21\u51FA\u6F14\u4E3B\u8981\u89D2\u8272\u4E4B\u4E00\u53F6\u5764\u7075\u7684\u58F0\u4F18\uFF0C\u6B63\u662F\u82B1\u6CFD\u9999\u83DC\uFF01\n<br>\u5979\u5C06\u534E\u4E3D\u6F14\u7ECE\u8FD9\u4E2A\uFF1C\u7F8E\u8C8C\uFF1E\u4E0E\uFF1C\u5F3A\u5927\uFF1E\u5E76\u5B58\u7684\u89D2\u8272\uFF01</p>\n\n<p>\u25EF\u53F6\u5764\u7075\u3000<CV:\u82B1\u6CFD\u9999\u83DC>\n<br>\u201C\u5931\u53BB\u4E00\u5207\u7684\u51B7\u8273\u6218\u58EB\u201D \n<br>\u8D4F\u91D1\u730E\u4EBA\u3002\u6280\u827A\u9AD8\u5F3A\u7684\u51B7\u9762\u6B66\u672F\u5BB6\u3002\n<br>\u66FE\u5728\u6DF1\u5C71\u4E2D\u7684\u9053\u573A\u523B\u82E6\u4FEE\u7EC3\u7A7A\u795E\u62F3\u3002\n<br>\u4E3A\u4E86\u5BFB\u4EC7\u800C\u56DB\u5904\u6E38\u8D70\u3002</p>\n\n<p>\u4ECA\u540E\u8FD8\u5C06\u9646\u7EED\u516C\u5E03\u66F4\u591A\u8C6A\u534E\u58F0\u4F18\u9635\u5BB9\uFF01\u4E0D\u5BB9\u9519\u8FC7\uFF01</p>\n\n<p><img src="/img/news-3-2.jpg" height="400">\n<img src="/img/news-3-3.jpg" height="400"></p>\n\n<p><b>\uFF1C\u5764\u7075\u6240\u9A7E\u9A6D\u7684MOEV\u89C6\u89C9\u56FE\u4E00\u5E76\u66DD\u5149\uFF01\uFF1E</b>\n<br>\u4F5C\u54C1\u4E2D\u5764\u7075\u6240\u9A7E\u9A6D\u7684MOEV\u89C6\u89C9\u56FE\u4E00\u5E76\u66DD\u5149\u3002\n<br>\u673A\u7532\u7531\u6CB3\u68EE\u6B63\u6CBB\u4EB2\u81EA\u64CD\u5200\uFF0C\u636E\u79F0\u8BBE\u8BA1\u7075\u611F\u7ADF\u662F\u6765\u81EA\u4E8E\u65E0\u4EBA\u673A\u3002\n<br>\u6CB3\u68EE\u6B63\u6CBB\u5BFC\u6F14\u4F5C\u4E3A\u53D8\u5F62\u673A\u7532\u4E4B\u7236\uFF0C\u4EBA\u79F0\u201C\u53D8\u5F62\u7684\u6CB3\u68EE\u201D\uFF0C\n<br>\u65E0\u4EBA\u673A\u5C06\u4F1A\u5982\u4F55\u53D8\u5316\uFF1F\u5B83\u7684\u5168\u8C8C\u53C8\u662F\u5982\u4F55\uFF1F\n<br>\u656C\u8BF7\u671F\u5F85\uFF01</p>\n\n<p><img src="/img/news-3-4.jpg"></p>\n\n<p><b>\uFF1C\u62C5\u4EFB\u539F\u4F5C\u548C\u603B\u5BFC\u6F14\u7684\u6CB3\u68EE\u6B63\u6CBB\u5BFC\u6F14\u548C\u5764\u7075\u58F0\u4F18\u82B1\u6CFD\u9999\u83DC\u7684\u5BC4\u8BED\uFF1E</b>\n<br>\u3010\u539F\u4F5C\u3001\u603B\u5BFC\u6F14\u6CB3\u68EE\u6B63\u6CBB\u5BC4\u8BED\u3011\n<br>\uFF1C\u8BF7\u7B80\u5355\u4ECB\u7ECD\u4E00\u4E0B\u8FD9\u6B21\u516C\u5E03\u7684\u53F6\u5764\u7075\u8FD9\u4E2A\u89D2\u8272\u3002\uFF1E\n<br>\u5764\u7075\u662F\u5B64\u9AD8\u7684\u6B66\u672F\u5BB6\u3002\u8EAB\u4E3A\u8D4F\u91D1\u730E\u4EBA\uFF0C\u6F02\u6CCA\u8352\u91CE\uFF0C\u72E9\u730E\u5F3A\u654CB.R.A.I\u3002\n<br>\u8FD9\u6B21\u9080\u8BF7\u7684\u662F\u5DF2\u7ECF\u5408\u4F5C\u591A\u6B21\u7684\u82B1\u6CFD\u9999\u83DC\u5C0F\u59D0\u3002\n<br>\u4EE5\u524D\u8BF7\u5979\u6F14\u7ECE\u8FC7\u611F\u60C5\u7EC6\u817B\uFF0C\u6216\u6D3B\u6CFC\u53EF\u7231\u7684\u89D2\u8272\uFF0C\u4F46\u8FD9\u6B21\u53E6\u8F9F\u8E4A\u5F84\uFF0C\u8BF7\u5979\u6311\u6218\u90A3\u79CD\u51B7\u9177\u7280\u5229\u7684\u5B64\u72FC\uFF0C\u9AA8\u5B50\u91CC\u5374\u6709\u7740\u7EAF\u7CB9\u7684\u5973\u6027\u611F\u7684\u89D2\u8272\u3002\n<br>\u5979\u5F88\u597D\u7684\u6F14\u51FA\u4E86\u4E0D\u540C\u4E8E\u4EE5\u5F80\u7684\u6709\u7740\u5145\u6EE1\u9B45\u529B\u7684\u9C9C\u660E\u4E2A\u6027\u7684\u89D2\u8272\u3002\n<br>\uFF1C\u8BF7\u95EE\u5728\u521B\u9020\u5764\u7075\u8FD9\u4E2A\u89D2\u8272\u4E0A\u6709\u4E9B\u4EC0\u4E48\u7279\u522B\u7684\u5730\u65B9\uFF1F\uFF1E\n<br>\u5B9E\u529B\u5F3A\u5927\u7684\u51B7\u8273\u7F8E\u4EBA\u3002\u6709\u70B9\u5E26\u523A\u73AB\u7470\u7684\u611F\u89C9\u3002\n<br>\u800C\u5979\u7684\u5185\u5FC3\u4E2D\u5374\u9690\u85CF\u7740\u51B0\u51B7\u7684\u6597\u5FD7\u3002\n<br>\u8BF7\u8D1F\u8D23\u89D2\u8272\u539F\u6848\u7684\u6C5F\u7AEF\u91CC\u6C99\u5728\u53D1\u578B\u4E0A\u52A0\u4E86\u70B9\u7279\u5F81\uFF0C\u8FD8\u6DFB\u52A0\u4E86SF\u5143\u7D20\uFF0C\u6709\u4E9B\u8FD1\u672A\u6765\u611F\u3002\u540C\u65F6\u53C8\u6709\u70B9\u6E38\u8D70\u5728\u6CD5\u5F8B\u8FB9\u7F18\u7684\u8D4F\u91D1\u730E\u4EBA\u7684\u8BBE\u8BA1\u8981\u7D20\u5728\u91CC\u9762\u3002</p>\n\n<p>\u3010\u53F6\u5764\u7075\uFF1A\u82B1\u6CFD\u9999\u83DC\u5BC4\u8BED\u3011\n<br>\uFF1C\u88AB\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u9009\u4E0A\u65F6\u662F\u600E\u4E48\u6837\u7684\u5FC3\u60C5\uFF1E\n<br>\u542C\u8BF4\u80FD\u518D\u6B21\u548C\u6CB3\u68EE\u5BFC\u6F14\u3001\u4F50\u85E4\u5BFC\u6F14\u4E00\u8D77\u5171\u4E8B\u5341\u5206\u5F00\u5FC3\u3002\n<br>\u6211\u6240\u51FA\u6F14\u7684\u5764\u7075\u4E00\u89D2\uFF0C\u662F\u4E2A\u4F1A\u628A\u6124\u6012\u548C\u60B2\u4F24\u7684\u60C5\u7EEA\u85CF\u5728\u5FC3\u5E95\u7684\u4E60\u6B66\u7684\u5973\u5B69\u3002\u770B\u8D77\u6765\u65E0\u61C8\u53EF\u51FB\u4F46\u662F\u53C8\u6709\u610F\u5916\u7684\u4E00\u9762\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A\u968F\u7740\u6DF1\u5165\u4E86\u89E3\u4F1A\u8D8A\u6765\u8D8A\u559C\u6B22\u7684\u89D2\u8272\u3002\n<br>\uFF1C\u6709\u4EC0\u4E48\u8BDD\u60F3\u9001\u7ED9\u7B49\u5F85\u9996\u64AD\u7684\u5404\u4F4D\u89C2\u4F17\u5417\uFF1F\uFF1E\n<br>\u4E2A\u6027\u5341\u8DB3\u7684\u89D2\u8272\u4EEC\uFF0C\u597D\u50CF\u6709\u70B9\u597D\u5403\u7684\u5DE8\u578B\u751F\u7269B.R.A.I\uFF0C\u6478\u4E0D\u6E05\u7684\u654C\u519B\u5957\u8DEF\u2026\u2026\u770B\u70B9\u771F\u7684\u592A\u591A\uFF0C\u656C\u8BF7\u5927\u5BB6\u671F\u5F85\u9996\u64AD\u5427\uFF01\uFF01\uFF01</p>\n\n<p><b>\uFF1CTV\u52A8\u753B\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u5185\u5BB9\u6982\u8981\uFF1E</b>\n<br>\u3008\u7B80\u4ECB\u3000\u5764\u7075\u7BC7\u3009\n<br>2031\u5E74\uFF0C\u53D7\u201C\u7FD4\u9F99\u5371\u673A\u201D\u5F71\u54CD\uFF0C\u4EBA\u7C7B\u6FD2\u4E34\u706D\u7EDD\uFF0C\u5728\u9053\u573A\u4E0E\u4F17\u540C\u95E8\u523B\u82E6\u4FEE\u884C\u3001\u65E5\u591C\u8FFD\u6C42\u529F\u529B\u7CBE\u8FDB\u7684\u53F6\u5764\u7075\uFF0C\u7A81\u7136\u95F4\u5931\u53BB\u4E86\u4E00\u5207\u3002\n<br>\u201C\u6CA1\u80FD\u4FDD\u62A4\u540C\u95E8\u5E78\u514D\u4E8E\u96BE\u201D\uFF0C\u8FD9\u8BA9\u5979\u5FC3\u5982\u5200\u7EDE\u3002</p>\n\n<p>7\u5E74\u540E\uFF0C\u5764\u7075\u6210\u4E3A\u8D4F\u91D1\u730E\u4EBA\u3002\n<br>\u76F4\u9762\u4E00\u95E8\u5C3D\u5931\u7684\u73B0\u5B9E\uFF0C\u4ECA\u5929\uFF0C\u5979\u4ECD\u5B64\u8EAB\u8352\u91CE\u524D\u884C\xAC\xAC\u2014\u2014\u53EA\u4E3A\u8FFD\u5BFB\u201C\u654C\u201D\u8E2A\u3002</p>\n\n\n<p>\uFF1C\u5236\u4F5C\u4EBA\u5458\uFF1E\n<br>\u539F\u4F5C\uFF1A\u6CB3\u68EE\u6B63\u6CBB/Satelight \n<br>\u603B\u5BFC\u6F14\uFF1A\u6CB3\u68EE\u6B63\u6CBB\n<br>\u5BFC\u6F14\uFF1A\u4F50\u85E4\u82F1\u4E00 \n<br>\u7CFB\u5217\u6784\u6210\uFF1A\u6839\u5143\u5C81\u4E09\n<br>\u89D2\u8272\u539F\u6848\uFF1A\u6C5F\u7AEF\u91CC\u6C99 \n<br>\u91CD\u795E\u673A\u8BBE\u8BA1\uFF1A\u6CB3\u68EE\u6B63\u6CBB\n<br>\u52A8\u753B\u5236\u4F5C\uFF1ASatelight </p>\n\n<p>\uFF1C\u914D\u97F3\uFF1E\n<br>\u5218\u96F7\u6602\uFF1A\u524D\u91CE\u667A\u662D\n<br>\u5218\u53EF\u4F9D\uFF1A\u4E1C\u5C71\u5948\u592E\n<br>\u53F6\u5764\u7075\uFF1A\u82B1\u6CFD\u9999\u83DC</p>\n\n<p>\uFF1C\u4E2D\u6587\u5B98\u7F51\uFF1Ehttp://project-pandora.cn\n<br>\uFF1C\u65E5\u6587\u5B98\u7F51\uFF1Ehttp://project-pandora.jp\n<br>\uFF1C\u5B98\u65B9\u5FAE\u535A\uFF1E @\u91CD\u795E\u673A\u6F58\u591A\u62C9\n<br>< \u7B2C1\u5F39PV >http://www.bilibili.com/video/av15483089/</p>\n\n\n'
}, {
    title: '游族宣布投资动画《重神机潘多拉》',
    time: '2017.11.17',
    desc: '11月17日，游族网络正式宣布投资中日合作动画连续剧《重神机潘多拉》，成为该项目最大投资商之一。游族网络作为制作委员会的一员，拥有本IP游戏研发方面的全球范围授权，计划推出由《重神机潘多拉》改编的游戏产品，实施影游联动，同时也在寻求有意向的合作方共同打造新的游戏产品。',
    content: '\n<p><img src="/img/news-2-1.png" alt=""></p>\n<p>11\u670817\u65E5\uFF0C\u6E38\u65CF\u7F51\u7EDC\u6B63\u5F0F\u5BA3\u5E03\u6295\u8D44\u4E2D\u65E5\u5408\u4F5C\u52A8\u753B\u8FDE\u7EED\u5267\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\uFF0C\u6210\u4E3A\u8BE5\u9879\u76EE\u6700\u5927\u6295\u8D44\u5546\u4E4B\u4E00\u3002\u6E38\u65CF\u7F51\u7EDC\u4F5C\u4E3A\u5236\u4F5C\u59D4\u5458\u4F1A\u7684\u4E00\u5458\uFF0C\u62E5\u6709\u672CIP\u6E38\u620F\u7814\u53D1\u65B9\u9762\u7684\u5168\u7403\u8303\u56F4\u6388\u6743\uFF0C\u8BA1\u5212\u63A8\u51FA\u7531\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u6539\u7F16\u7684\u6E38\u620F\u4EA7\u54C1\uFF0C\u5B9E\u65BD\u5F71\u6E38\u8054\u52A8\uFF0C\u540C\u65F6\u4E5F\u5728\u5BFB\u6C42\u6709\u610F\u5411\u7684\u5408\u4F5C\u65B9\u5171\u540C\u6253\u9020\u65B0\u7684\u6E38\u620F\u4EA7\u54C1\u3002</p>\n\n<p>\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u662F\u7531\u65E5\u672C\u52A8\u753B\u516C\u53F8SATELIGHT\u8D1F\u8D23\u5236\u4F5C\uFF0C\u6E38\u65CF\u7F51\u7EDC\u53C2\u4E0E\u6295\u8D44\uFF0C\u4E2D\u56FD\u6D77\u5929\u4E91\u9F99\u6587\u5316\u4F20\u5A92\u53C2\u4E0E\u7B56\u5212\u3001\u6295\u8D44\u3001\u51FA\u54C1\u7684\u4E2D\u65E5\u5408\u4F5C\u52A8\u753B\u9879\u76EE\uFF0C\u9884\u5B9A2018\u5E744\u6708\u5168\u7403\u540C\u6B65\u64AD\u51FA\u3002\u8BE5\u52A8\u753B\u9879\u76EE\u4E3A\u300A\u8D85\u65F6\u7A7A\u8981\u585E\u300B\u7CFB\u5217\u7F14\u9020\u8005\u6CB3\u68EE\u6B63\u6CBB\u7684\u6700\u65B0\u539F\u521B\u4F01\u5212\uFF0C\u5E76\u7531\u5176\u672C\u4EBA\u62C5\u4EFB\u539F\u4F5C\u3001\u603B\u5BFC\u6F14\u4EE5\u53CA\u673A\u4F53\u8BBE\u5B9A\uFF0C\u5177\u5907\u6781\u5927\u7684IP\u6F5C\u529B\u3002SATELIGHT\u662F\u65E5\u672C\u77E5\u540D\u52A8\u753B\u516C\u53F8\uFF0C\u4EE3\u8868\u4F5C\u54C1\u5305\u62EC\u300A\u8D85\u65F6\u7A7A\u8981\u585E\u300B\u7CFB\u5217\u3001\u300A\u521B\u5723\u7684\u5927\u5929\u4F7F\u300B\u7CFB\u5217\u3001\u300A\u6218\u59EC\u7EDD\u5531\u300B\u7CFB\u5217\u7B49\uFF0C\u5177\u5907\u5F3A\u5927\u7684\u52A8\u753B\u5236\u4F5C\u5B9E\u529B\uFF0C\u4EBA\u6C14\u58F0\u4F18\u4E1C\u5C71\u5948\u592E\u3001\u524D\u91CE\u667A\u662D\u62C5\u7EB2\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u4E3B\u8981\u89D2\u8272\u914D\u97F3\uFF0C\u540E\u7EED\u8FD8\u5C06\u516C\u5E03\u5176\u4ED6\u4E00\u7EBF\u58F0\u4F18\u548C\u4E13\u4E1A\u97F3\u4E50\u56E2\u961F\uFF0C\u5236\u4F5C\u6F14\u51FA\u73ED\u5E95\u582A\u79F0\u8C6A\u534E\u3002\n\n<p>\u8FD1\u5E74\u6765\uFF0C\u52A8\u753B\u5236\u4F5C\u7684\u4E2D\u65E5\u5408\u4F5C\u6A21\u5F0F\u4ECE\u63A2\u7D22\u8D70\u5411\u6210\u719F\uFF0C\u6240\u521B\u4F5C\u7684\u52A8\u753B\u4EA7\u54C1\u7684\u8D28\u91CF\u4E0E\u4EBA\u6C14\u9010\u6B65\u63D0\u9AD8\uFF0C\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u4F5C\u4E3A\u5728\u6B64\u57FA\u7840\u4E4B\u4E0A\u6253\u9020\u7684\u4E2D\u65E5\u5927\u578B\u5408\u4F5C\u9879\u76EE\u66F4\u662F\u7279\u70B9\u9C9C\u660E\u3002\u4F5C\u4E3A\u8BE5\u52A8\u753B\u8FDE\u7EED\u5267\u7684\u7B56\u5212\u51FA\u54C1\u65B9\uFF0C\u6D77\u5929\u4E91\u9F99\u9664\u4E86\u9009\u62E9\u4E0E\u4E1A\u754C\u9876\u7EA7\u5BFC\u6F14\u76F4\u63A5\u5BF9\u63A5\uFF0C\u8FD8\u4E3A\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u9009\u5B9A\u6781\u5177\u7279\u8272\u7684\u4E2D\u56FD\u5C71\u5DDD\u57CE\u5E02\u4F5C\u4E3A\u5267\u60C5\u5C55\u5F00\u7684\u5927\u821E\u53F0\uFF0C\u5728\u4F5C\u54C1\u4E2D\u878D\u5165\u66F4\u591A\u7684\u4E2D\u56FD\u6587\u5316\u5143\u7D20\uFF0C\u5B9E\u73B0\u4E2D\u56FD\u6587\u5316\u5411\u6D77\u5916\u8F93\u51FA\u4E0E\u672C\u571F\u5E02\u573A\u62D3\u5C55\u7684\u201C\u53CC\u8D62\u201D\u3002\u6E38\u65CF\u7F51\u7EDC\u4F5C\u4E3A\u4E2D\u56FD\u9886\u5148\u7684\u4E92\u52A8\u5A31\u4E50\u4F9B\u5E94\u5546\uFF0C\u5219\u4F1A\u5229\u7528\u65E2\u6709\u7684IP\u7BA1\u7406\u5DE5\u7A0B\u53CA\u8D44\u6E90\u4F18\u52BF\uFF0C\u901A\u8FC7\u7814\u53D1\u6CDB\u5A31\u4E50IP\u4EA7\u54C1\u7B49\u65B9\u5F0F\uFF0C\u52A9\u529B\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u7684IP\u5316\u6253\u9020\u3002\n\n<p>\u6E38\u65CF\u9996\u5E2D\u8FD0\u8425\u5B98\u9648\u793C\u6807\u66FE\u8868\u793A\uFF1A\u201C\u4E2D\u56FD\u4F5C\u4E3A\u5168\u7403\u6700\u5927\u7684\u6E38\u620F\u5E02\u573A\uFF0C\u4EFB\u4F55\u4E16\u754C\u9876\u7EA7IP\u90FD\u4E0D\u5BB9\u9519\u8FC7\uFF0C\u7279\u522B\u662F\u5728\u6E38\u620F\u4E0EIP\u6DF1\u5EA6\u5408\u4F5C\u5E38\u6001\u5316\u7684\u5F53\u4E0B\uFF0C\u8DE8\u56FDIP\u5408\u4F5C\u6A21\u5F0F\u65E5\u6E10\u6210\u719F\uFF0C\u4E3A\u8FD9\u4E9BIP\u8FDB\u5165\u4E2D\u56FD\u5E02\u573A\uFF0C\u7275\u624B\u672C\u571F\u6E38\u620F\u5382\u5546\u5960\u5B9A\u4E86\u826F\u597D\u7684\u4EA7\u4E1A\u57FA\u7840\u3002\u201D\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u662F\u77E5\u540D\u52A8\u753B\u5BFC\u6F14\u64CD\u5200\u7684\u539F\u521B\u4F5C\u54C1\uFF0C\u4E0E\u6E38\u65CF\u7F51\u7EDC\u4F18\u9009\u3001\u9876\u7EA7\u4E0E\u5168\u7403\u5316\u7684IP\u9009\u62E9\u6807\u51C6\u4E0D\u8C0B\u800C\u5408\u3002\u6B64\u5916\uFF0C\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u4F5C\u4E3A\u65E5\u7CFB\u52A8\u753B\u4F5C\u54C1\u6240\u5177\u5907\u7684\u4E8C\u6B21\u5143\u5C5E\u6027\u53CA\u4E8C\u6B21\u5143\u53D7\u4F17\uFF0C\u4E5F\u5C06\u5BF9\u6E38\u65CF\u7F51\u7EDC\u4E8C\u6B21\u5143\u6218\u7565\u5E03\u5C40\u8D77\u5230\u91CD\u8981\u7684\u62D3\u5C55\u5EF6\u4F38\u4F5C\u7528\u3002\n\n<p>\u6E38\u65CF\u7F51\u7EDC\u4ECE2016\u5E74\u5BA3\u5E03\u4EE3\u7406\u65E5\u7CFB\u5973\u6027\u5411\u6E38\u620F\u300A\u5200\u5251\u4E71\u821E-ONLINE-\u300B\u6B63\u5F0F\u5165\u5C40\u4E8C\u6B21\u5143\uFF0C\u5E76\u5728\u8BE5\u9886\u57DF\u6210\u679C\u9887\u4E30\u3002\u9664\u4E86\u6210\u529F\u5C06\u300A\u5200\u5251\u4E71\u821E-ONLIN\u300B\u8FD0\u8425\u81F3\u5973\u6027\u5411\u5934\u90E8\u4EA7\u54C1\u5916\uFF0C\u672A\u6765\u8FD8\u5C06\u63A8\u51FA\u300A\u730E\u9F99\u8BA1\u5212\u300B\u300A\u5623\u6218\u7EAA\u300B\u7B49\u591A\u6B3E\u4E8C\u6B21\u5143\u7EC6\u5206\u7CBE\u54C1\u3002\u672C\u6B21\u6295\u8D44\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u52A8\u753B\u9879\u76EE\uFF0C\u4E0D\u4EC5\u662F\u770B\u91CD\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u672C\u8EAB\u6240\u5177\u5907\u7684IP\u4EF7\u503C\uFF0C\u66F4\u4F5C\u4E3A\u516C\u53F8\u4E8C\u6B21\u5143\u5E03\u5C40\u5728\u6E38\u620F\u4EE5\u5916\u9886\u57DF\u7684\u9996\u6B21\u62D3\u5C55\u800C\u610F\u4E49\u975E\u51E1\u3002\n\n<p><b>\u6E38\u65CF\u7F51\u7EDC\u80A1\u4EFD\u6709\u9650\u516C\u53F8\uFF08SZ.002174\uFF09\u7B80\u4ECB\uFF1A</b><br>\n\u6E38\u65CF\u7F51\u7EDC\u80A1\u4EFD\u6709\u9650\u516C\u53F8\uFF08SZ.002174\uFF09\u6210\u7ACB\u4E8E2009\u5E74\uFF0C\u662F\u5168\u7403\u9886\u5148\u7684\u4E92\u52A8\u5A31\u4E50\u4F9B\u5E94\u5546\uFF0C\u5F00\u53D1\u4E86\u5305\u62EC\u300A\u5C11\u5E74\u4E09\u56FD\u5FD7\u300B\u3001\u300A\u4E09\u5341\u516D\u8BA1\u300B\u3001\u300A\u5927\u7687\u5E1D\u300B\u3001\u300A\u5973\u795E\u8054\u76DF\u300B\u548C\u300A\u76D7\u5893\u7B14\u8BB0\u300B\u5728\u5185\u7684\u591A\u6B3E\u6536\u5165\u8FC7\u4EBF\u7684\u6E38\u620F\u3002\u5176\u4E2D\u300A\u5973\u795E\u8054\u76DF\u300B\u7CFB\u5217\u4F5C\u54C1\u57282014\u5E74\u548C2016\u5E74\u88ABFacebook\u8BC4\u4E3A\u201C\u5E74\u5EA6\u6700\u4F73\u6E38\u620F\u201D\u3002\u897F\u65B9\u9B54\u5E7B\u9898\u6750\u624B\u6E38\u300A\u72C2\u66B4\u4E4B\u7FFC\u300B\u5728\u5168\u7403104\u4E2A\u56FD\u5BB6\u53CA\u5730\u533A\u8FDB\u5165\u7545\u9500\u699C\u524D10\uFF0C\u76EE\u524D\u5DF2\u662F\u7531\u4E2D\u56FD\u7814\u53D1\u7684\u6D77\u5916\u5E02\u573A\u6536\u5165\u6700\u9AD8\u7684ARPG\u6E38\u620F\u3002</p>\n\n<p><b>\u4E2D\u56FD\u6D77\u5929\u4E91\u9F99\uFF08\u53A6\u95E8\uFF09\u6587\u5316\u4F20\u5A92\u6709\u9650\u516C\u53F8\u7B80\u4ECB\uFF1A</b><br>\n\u6D77\u5929\u4E91\u9F99\u662F\u56FD\u9645\u5316\u52A8\u6F2B\u4EA7\u4E1A\u96C6\u6210\u5F00\u53D1\u5546\uFF0C\u901A\u8FC7\u5E7F\u6CDB\u7684\u56FD\u9645\u5408\u4F5C\uFF0C\u6574\u5408\u5404\u81EA\u7684\u4F18\u52BF\u8D44\u6E90\uFF0C\u63A8\u52A8\u4E2D\u56FD\u539F\u521B\u52A8\u6F2B\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u6C11\u65CF\u52A8\u6F2B\u4F5C\u54C1\u8D70\u5411\u4E16\u754C\u3002\u516C\u53F8\u62E5\u6709\u9AD8\u7AEF\u4E13\u4E1A\u521B\u4F5C\u56E2\u961F\uFF0C\u96C6\u521B\u610F\u7B56\u5212\u3001\u5F71\u89C6\u5236\u4F5C\u53D1\u884C\u3001\u54C1\u724C\u6388\u6743\u3001\u52A8\u753B\u884D\u751F\u54C1\u5F00\u53D1\u5236\u9020\u9500\u552E\u4E3A\u4E00\u4F53\uFF0C\u8986\u76D6\u52A8\u6F2B\u5168\u4EA7\u4E1A\u94FE\u3002\u5DF2\u4E0E\u56FD\u5185\u53CA\u65E5\u7F8E\u4E1A\u754C\u77E5\u540D\u4F01\u4E1A\u5C24\u5176\u662F\u4F17\u591A\u7684\u77E5\u540D\u5BFC\u6F14\u3001\u5267\u672C\u5BB6\u3001\u5236\u7247\u4EBA\u5EFA\u7ACB\u957F\u671F\u7A33\u5B9A\u53CB\u597D\u5408\u4F5C\u5173\u7CFB\uFF0C\u81F4\u529B\u4E8E\u6253\u9020\u8DE8\u56FD\u4F18\u8D28\u8D44\u6E90\u6DF1\u5EA6\u7ED3\u5408\u53CA\u52A8\u6F2B\u89C4\u6A21\u5316\u751F\u4EA7\u7684\u5E73\u53F0\uFF0C\u501F\u4EE5\u63D0\u5347\u56FD\u4EA7\u52A8\u6F2B\u54C1\u8D28\uFF0C\u589E\u8FDB\u4EA7\u91CF\u4EA7\u80FD\u4EE5\u5E94\u5BF9\u6025\u901F\u53D1\u5C55\u7684\u5E02\u573A\u9700\u6C42\uFF0C\u6210\u4E3A\u4FC3\u8FDB\u4E2D\u56FD\u52A8\u6F2B\u5E02\u573A\u7E41\u8363\u3001\u63A8\u52A8\u66F4\u591A\u4E2D\u56FD\u4F18\u79C0\u4F5C\u54C1\u626C\u5E06\u51FA\u6D77\u8D70\u5411\u4E16\u754C\u7684\u91CD\u8981\u529B\u91CF\u3002\u7EE7\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u7CFB\u5217\u4E4B\u540E\uFF0C\u6D77\u5929\u4E91\u9F99\u7684\u4E0B\u90E8\u4E0E\u56FD\u9645\u77E5\u540D\u5BFC\u6F14\u7684\u5408\u4F5C\u7CFB\u5217\u52A8\u753B\u4E1A\u5DF2\u8FDB\u5165\u7B56\u5212\uFF0C\u5C06\u4EE5\u6BCF\u5E74\u521B\u4F5C\u4E00\u81F3\u4E24\u90E8\u5927\u578B\u4F5C\u54C1\u7684\u9891\u5EA6\u5411\u4E8C\u6B21\u5143\u4E16\u754C\u505A\u51FA\u81EA\u5DF1\u7684\u8D21\u732E\u3002</p>\n\n<p>\u91CD\u795E\u673A\u6F58\u591A\u62C9\u4E2D\u6587\u5B98\u7F51\uFF1A<a href="http://www.project-pandora.cn">www.project-pandora.cn</a></p>\n\n<p>\u91CD\u795E\u673A\u6F58\u591A\u62C9\u5B98\u65B9\u5FAE\u535A\uFF1A<br><img src="/img/news-2-2.png"></p>\n\n\n<p>\u91CD\u795E\u673A\u6F58\u591A\u62C9\u5B98\u65B9\u5FAE\u4FE1\u516C\u4F17\u53F7\uFF1A<br><img src="/img/news-2-3.jpg"></p>\n'
}, {
    title: '河森正治最新力作《重神机潘多拉》正式发布',
    time: '2017.10.27',
    desc: '10月17号，日本动画导演河森正治在东京六本木NICOFARRE演出会场举办了新作片名发布会，宣告将于2018年春季开播的TV动画系列片定名为《重神机潘多拉》。2016年河森正治导演曾在美国Anime Expo发布要与中国海天云龙（厦门）文化传媒合作一个大型动画连续剧，至此新作终于揭开了盖头。',
    content: '\n<p style="font-size: 20px; text-align: center; opacity: 1;">\u6CB3\u68EE\u6B63\u6CBB\u5BFC\u6F14\u6700\u65B0TV\u52A8\u753B\u7CFB\u5217\u7247\u540D\u7EC8\u4E8E\u63ED\u6653\uFF01</p>\n<p style="font-size: 34px; text-align: center; opacity: 1;">\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u6A2A\u7A7A\u51FA\u4E16\uFF01</p>\n<p style="font-size: 20px; text-align: center; opacity: 1;">\u524D\u91CE\u667A\u662D\u4E3A\u672C\u7247\u7537\u4E3B\u89D2\u5218\u96F7\u6602\u732E\u58F0\uFF0C\u4E1C\u5C71\u5948\u592E\u51FA\u6F14\u7537\u4E3B\u89D2\u7684\u59B9\u59B9\u5218\u53EF\u4F9D\uFF01\n\u6982\u5FF5\u6D77\u62A5\u4E0EPV\u4E5F\u540C\u65F6\u66DD\u5149\uFF01</p>\n\n<p>10\u670817\u53F7\uFF0C\u65E5\u672C\u52A8\u753B\u5BFC\u6F14\u6CB3\u68EE\u6B63\u6CBB\u5728\u4E1C\u4EAC\u516D\u672C\u6728NICOFARRE\u6F14\u51FA\u4F1A\u573A\u4E3E\u529E\u4E86\u65B0\u4F5C\u7247\u540D\u53D1\u5E03\u4F1A\uFF0C\u5BA3\u544A\u5C06\u4E8E2018\u5E74\u6625\u5B63\u5F00\u64AD\u7684TV\u52A8\u753B\u7CFB\u5217\u7247\u5B9A\u540D\u4E3A\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u30022016\u5E74\u6CB3\u68EE\u6B63\u6CBB\u5BFC\u6F14\u66FE\u5728\u7F8E\u56FDAnime Expo\u53D1\u5E03\u8981\u4E0E\u4E2D\u56FD\u6D77\u5929\u4E91\u9F99\uFF08\u53A6\u95E8\uFF09\u6587\u5316\u4F20\u5A92\u5408\u4F5C\u4E00\u4E2A\u5927\u578B\u52A8\u753B\u8FDE\u7EED\u5267\uFF0C\u81F3\u6B64\u65B0\u4F5C\u7EC8\u4E8E\u63ED\u5F00\u4E86\u76D6\u5934\u3002</p>\n<p>\u53D1\u5E03\u4F1A\u4E0A\uFF0C\u9664\u62C5\u4EFB\u539F\u6848\u3001\u603B\u5BFC\u6F14\u548C\u201C\u91CD\u795E\u673A\u201D\u673A\u7532\u8BBE\u8BA1\u7684\u6CB3\u68EE\u5BFC\u6F14\u5916\uFF0C\u51FA\u6F14\u4E3B\u89D2\u7684\u4E24\u4F4D\u58F0\u4F18\u2014\u2014\u524D\u91CE\u667A\u662D\u548C\u4E1C\u5C71\u5948\u592E\u4E5F\u4E00\u540C\u767B\u53F0\u4EAE\u76F8\u3002\u9762\u5BF9\u5728\u573A\u7684100\u591A\u540D\u7C89\u4E1D\u53CA\u901A\u8FC7\u7F51\u7EDC\u89C2\u770B\u76F4\u64AD\u7684\u6570\u4E07\u540D\u7C89\u4E1D\uFF0C\u4ED6\u4EEC\u4E0E\u6CB3\u68EE\u5BFC\u6F14\u4E00\u8D77\u4ECB\u7ECD\u4E86\u521B\u4F5C\u53CA\u8868\u6F14\u4E2D\u7684\u611F\u60F3\u4E0E\u62B1\u8D1F\uFF0C\u73B0\u573A\u6C14\u6C1B\u5341\u5206\u70ED\u70C8\u3002</p>\n<p>\u4E3B\u529E\u65B9\u8FD8\u5728\u53D1\u5E03\u4F1A\u4E0A\u9686\u91CD\u63A8\u51FA\u4E86\u300A\u91CD\u795E\u673A\u6F58\u591A\u62C9\u300B\u7684\u9996\u5F20\u4E3B\u9898\u6D77\u62A5\u548C\u9996\u90E8PV\uFF0C\u4E3B\u9898\u6D77\u62A5\u63ED\u79D8\u4E86\u52A8\u753B\u7684\u4E24\u4E2A\u91CD\u8981\u89D2\u8272\uFF0C\u5206\u522B\u662F\u4E3B\u89D2\u5218\u96F7\u6602\u548C\u201C\u59B9\u59B9\u201D\u5218\u53EF\u4F9D\u3002PV\u5219\u76F4\u63A5\u4F7F\u7528\u4E86\u90E8\u5206\u52A8\u753B\u6B63\u7247\u7684\u7247\u6BB5\uFF0C\u5728\u6C14\u52BF\u78C5\u7934\u7684\u97F3\u4E50\u58F0\u4E2D\uFF0C\u53D8\u5F62\u673A\u7532\u547C\u5578\u800C\u6765\uFF0C\u6218\u6597\u573A\u666F\u5A01\u529B\u7206\u68DA\uFF0C\u5F15\u5F97\u53F0\u4E0B\u8D5E\u58F0\u4E00\u7247\u3002</p>\n<p>\u6D77\u62A5\u548CPV\u4ECE17\u65E521\u70B915\u8D77\u5373\u53EF\u5728\u52A8\u753B\u5B98\u7F51\uFF08http://project-pandora.cn\uFF09\u4E0A\u89C2\u770B\uFF0C\u5B98\u65B9\u5FAE\u535A\u4E5F\u5C06\u9646\u7EED\u53D1\u5E03\u4F5C\u54C1\u7684\u52A8\u6001\u548C\u8FDB\u5C55\u3002</p>\n'
}];

var news = {
    template: '#news',
    components: {
        page: page,
        popup: popup
    },
    mounted: function mounted() {},
    data: function data() {

        return {
            newsPopupShow: false,
            newsPopupHtml: '',
            newsList: newsList
        };
    },
    methods: {
        showArticle: function showArticle(news) {

            var html = getNewsPopupHtml(news);
            this.$children[2].open(html);
        },
        goto: function goto(i) {
            $('body').animate({ scrollTop: $('[name="news-' + i + '"]').offset().top - 20 }, 600);
        },
        openNewsPopup: function openNewsPopup(news) {

            var html = getNewsPopupHtml(news);
            this.newsPopupHtml = html;
            this.newsPopupShow = true;
        },
        newsPopupBeforeClose: function newsPopupBeforeClose() {

            this.newsPopupShow = false;
        }
    }
};

function getNewsPopupHtml(news) {
    return '\n\t\t<div class="popup-article">\n\t\t\t<div class="article-title">&gt;&gt;&nbsp;' + news.title + '\n\t\t\t\t<div class="article-time">POST TIME - [ ' + news.time + ' ]&nbsp;&lt;&lt;</div>\n\t\t\t</div>\n\t\t\t<div class="article-content">\n\t\t\t\t' + news.content + '\n\t\t\t</div>\n\t\t</div>';
}

var keyword = {
    template: '#keyword',
    data: function data() {
        return {
            keywords: [{
                title: '新翔龙市',
                content: '翔龙危机后，新翔龙市作为绝对防御都市之一，是人类为数不多的希望堡垒。虽地处翔龙危机的中心地带，但是并没有对城市和居民造成太大影响，现在仍依靠反应堆输出的微弱能源维持着事故前的生活水平。作为天然气产地,该地的生活质量本就高于其他城市。而军事力量相比其他城市也较为强大，治安稳定。因此城市外聚集许多梦想能迁往市内居住的人们。'
            }, {
                title: '绝对防卫都市',
                content: '是对于有着可对抗B.R.A.I的防御体系（军队和设备），有着可以自给自足能源或电力的大规模城市的统称。由于B.R.A.I的出现导致国家概念的消失，多数城市沦为废墟，现存的绝对防御都市仅剩数十个。'
            }, {
                title: '翔龙反应堆',
                content: '翔龙反应堆（量子反应堆）。作为新一代清洁能源而被开发出来的多重次元反应堆。刘雷昂在2031年进行启动该反应堆的相关实验时引发反应堆的失控事故是导致各地出现B.R.A.I的主要原因。内部构造属于机密。'
            }, {
                title: '翔龙危机',
                content: '2031年新翔龙市发生的反应堆失控事故。是导致世界各地出现B.R.A.I的主要原因。该事故导致过往的国家概念的瓦解。'
            }, {
                title: 'B.R.A.I',
                content: "B.R.A.I（Biological evolution's of Reinforcement with Accelerated Intellect)。是跨越生物，机械，植物的范畴而实现了融合，并独自完成进化的生物。大小不一，有小到虫子，大到百米以上的巨大的个体。大型B.R.A.I的巨大身躯使时常导致其活动范围内的城市的破坏，从而给人类造成巨大的损失。"
            }, {
                title: '可变形交通工具',
                content: "可变形交通工具＝MOEV Multipurpose Organic Evolution Vehicle。从翔龙危机之前就由多国联合开发研制的多功能可变形交通工具的总称。具备交通工具和攻击模式这两种可自由变换的结构。在翔龙危机后，通过将B.R.A.I零部件组装进去而实现了实用化。现已作为对抗B.R.A.I的武器而获得广泛的普及。"
            }, {
                title: '赏金猎人',
                content: "凭借自身高度驾驶技巧捕猎B.R.A.I，从而获取高额佣金的自由佣兵。只有和都市防卫军签订合同获取执照的人，才具备狩猎资格。他们把从军队订购的机甲亲手做了个性化改造，所以每个机甲均不相同。"
            }]
        };
    },
    methods: {
        goto: function goto(i) {
            $('body').animate({ scrollTop: $('[name="keyword-' + i + '"]').offset().top - 20 }, 600);
        }
    }
};

var goods = {
    template: '#goods',
    data: function data() {
        return {
            goods: [{
                title: 'COMING SOON',
                picture: '',
                content: ''
            }, {
                title: 'COMING SOON',
                picture: '',
                content: ''
            }]
        };
    },
    methods: {
        goto: function goto(i) {
            $('body').animate({ scrollTop: $('[name="good-' + i + '"]').offset().top - 20 }, 600);
        }
    }
};

var cast = {
    template: '#cast',
    data: function data() {
        return {
            staffs: [{
                position: '原作',
                name: '河森正治·Satelight'
            }, {
                position: '总导演',
                name: '河森正治'
            }, {
                position: '导演',
                name: '佐藤英一'
            }, {
                position: '总编剧',
                name: '根元岁三'
            }, {
                position: '角色原案',
                name: '江端里沙'
            }],
            casts: [{
                position: '刘雷昂',
                name: '前野智昭'
            }, {
                position: '刘可依',
                name: '东山奈央'
            }, {
                position: '叶坤灵',
                name: '花泽香菜'
            }]
        };
    }
};

var character = {
    template: '#character',
    data: function data() {
        return {
            character: {},
            characters: [{
                title: '刘雷昂',
                picture: '/img/character-1.png',
                nav: '/img/character-nav-1.png'
            }, {
                title: '刘可依',
                picture: '/img/character-2.png',
                nav: '/img/character-nav-2.png'
            }, {
                title: '叶坤灵',
                picture: '/img/character-3.png',
                nav: '/img/character-nav-3.png'
            }, {
                title: '- [ COMING SOON ] -',
                picture: '',
                nav: ''
            }, {
                title: '- [ COMING SOON ] -',
                picture: '',
                nav: ''
            }, {
                title: '- [ COMING SOON ] -',
                picture: '',
                nav: ''
            }, {
                title: '- [ COMING SOON ] -',
                picture: '',
                nav: ''
            }, {
                title: '- [ COMING SOON ] -',
                picture: '',
                nav: ''
            }]
        };
    },
    beforeUpdate: function beforeUpdate() {
        var intro = $('#app .intro');
        intro.find('img').hide();
        intro.animate({
            width: 4
        }, 400);
    },
    updated: function updated() {
        setTimeout(function () {
            var intro = $('#app .intro');

            intro.animate({
                width: 910
            }, 400, function () {
                intro.find('img').slideDown(400);
            });
        }, 400);
    },
    created: function created() {
        this.character = this.characters[0];
    },
    mounted: function mounted() {
        this.switchCharacter(this.characters[0], 0);
    },
    methods: {
        switchCharacter: function switchCharacter(character, i) {

            if (!character.picture) {
                return;
            }
            this.character = character;
            $('#app .nav-item.active').removeClass('active');
            $('#app .nav-item').eq(i).addClass('active');
        }
    }
};

var mechanic = {
    template: '#mechanic',
    data: function data() {
        return {
            mechanic: {},
            mechanics: [{
                title: '雷昂机',
                picture: '/img/robot-1.png',
                nav: '/img/robot-nav-1.png'
            }, {
                title: '坤灵机',
                picture: '/img/robot-2.png',
                nav: '/img/robot-nav-2.png'
            }, { title: '- [ COMING SOON ] -' }, { title: '- [ COMING SOON ] -' }, { title: '- [ COMING SOON ] -' }, { title: '- [ COMING SOON ] -' }, { title: '- [ COMING SOON ] -' }, { title: '- [ COMING SOON ] -' }]
        };
    },
    beforeUpdate: function beforeUpdate() {
        var intro = $('#app .intro');
        intro.find('img').hide();
        intro.animate({
            width: 4
        }, 400);
    },
    updated: function updated() {
        setTimeout(function () {
            var intro = $('#app .intro');

            intro.animate({
                width: 910
            }, 400, function () {
                intro.find('img').slideDown(400);
            });
        }, 400);
    },
    created: function created() {
        this.mechanic = this.mechanics[0];
    },
    mounted: function mounted() {
        this.switchMechanic(this.mechanics[0], 0);
    },
    methods: {
        switchMechanic: function switchMechanic(mechanic, i) {

            if (!mechanic.picture) {
                return;
            }
            this.mechanic = mechanic;
            $('#app .nav-item.active').removeClass('active');
            $('#app .nav-item').eq(i).addClass('active');
        }
    }
};

var story = {
    template: '#story',
    beforeUpdate: function beforeUpdate() {},
    updated: function updated() {},
    data: function data() {
        return {
            story: {},
            preview: '',
            storys: [{
                title: 'EPISODE 01',
                desc: '第1集 精彩内容即将更新',
                nav: '/img/story-default-nav.jpg',
                imgs: ['/img/story-default-nav.jpg', '/img/story-1-2.png'],
                content: '\n<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>\n'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }, {
                title: 'EPISODE XX',
                desc: '精彩内容即将更新',
                nav: '',
                imgs: [],
                content: '<p>\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9\uFF0C\u656C\u8BF7\u6301\u7EED\u5173\u6CE8\u300A\u91CD\u673A\u795E\u6F58\u591A\u62C9\u300B\u5B98\u7F51\u3002</p>'
            }]
        };
    },
    created: function created() {
        this.story = this.storys[0];
        this.preview = this.story.imgs[0];
    },
    methods: {
        switchStory: function switchStory(story) {

            var intro = $('#app .intro');
            var title = intro.find('.title');
            var thisVue = this;

            intro.stop();
            intro.animate({
                opacity: 0,
                top: '1000px'
            }, 400, function () {

                thisVue.story = story;
                thisVue.preview = thisVue.story.imgs[0];
                intro.css({
                    top: 0,
                    left: '1000px',
                    opacity: 0
                });
                title.css({
                    width: 0,
                    height: 3
                });
                intro.animate({
                    left: '0px',
                    opacity: 1
                }, 400, function () {
                    title.animate({
                        width: 840
                    }, 600, function () {
                        title.animate({
                            height: 84
                        }, 600);
                    });
                });
            });
        },
        switchPreview: function switchPreview(src) {
            $('#app .preview').hide();
            this.preview = src;
            $('#app .preview').fadeIn(400);
        }
    }

    /* app */

};var routes = [{
    path: '*',
    component: home
}, {
    path: '/news',
    component: news
}, {
    path: '/home',
    component: home
}, {
    path: '/keyword',
    component: keyword
}, {
    path: '/character',
    component: character
}, {
    path: '/mechanics',
    component: mechanic
}, {
    path: '/story',
    component: story
}, {
    path: '/cast',
    component: cast
}, {
    path: '/goods',
    component: goods
}];

var router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
});

window.onload = function () {

    var bg2 = new Image();
    // bg2.src = '../picture/mainvisual2.png';
    bg2.onload = function () {
        var app = new Vue({
            router: router,
            updated: function updated() {
                initBox();
                initPage();
            },
            mounted: function mounted() {
                // alert(1);
                initBox();
                initPage();
            }
        }).$mount('#app');
    };

    /*	$.ajax({
         url: 'http://vod.cn-shanghai.aliyuncs.com',
         data: {
             Action: 'GetPlayInfo',
             VideoId: '93ab850b4f6f44eab54b6e91d24d81d4',
             Format: 'JSON',
             Version: '2017-03-21',
             Signature: 'vpEEL0zFHfxXYzSFV0n7%2FZiFL9o%3D',
             SignatureMethod: 'Hmac-SHA1',
             SignatureNonce: '9166ab59-f445-4005-911d-664c1570df0f',
             SignatureVersion: '1.0',
             AccessKeyId: 'tkHh5O7431CgWayx',
             Timestamp: '2017-03-29T09%3A22%3A32Z'
         }
     });*/
};

// $(window).on('load', function() {
// 	alert();
// 	var app = new Vue({
// 		router: router,
// 		updated: function() {
// 			initBox();
// 			initPage();
// 		},
// 		mounted: function() {
// 			// alert(1);
// 			initBox();
// 			initPage();
// 		}
// 	}).$mount('#app');
// });

// var app = new Vue({
// 	router: router,
// 	updated: function() {
// 		initBox();
// 		initPage();
// 	},
// 	mounted: function() {
// 		// alert(1);
// 		initBox();
// 		initPage();
// 	}
// }).$mount('#app');

function initBox() {

    $('#app').find('.box').each(function () {

        $(this).append('<div class="top-left"></div><div class="top-right"></div><div class="bottom-left"></div><div class="bottom-right"></div>');
    });
}

function initPage() {

    var page = $('#app > .page');

    setTimeout(function () {
        page.find('> .page-content').css({
            minHeight: $('body').height() - 200
        });
        page.find('> .page-content').addClass('init');

        page.find('> .page-top').addClass('init');
    }, 0);
}