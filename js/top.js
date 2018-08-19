$(function () {
    var $progress = $("#progress"),
        onReady = function () {
            $progress.fadeOut(1000, 'easeInOutQuad', function () {
                $("#logo").fadeIn(1000);
                randomshuffle();
            });
        };
    setTimeout(() => {
        invertColorRand();
    }, 5000);
    realtimeInfoUpdateLoop();
    $(".copy").glitch({ bg: "", halign: "left" });
    $(".glitch").glitch({ bg: "rgba(0,0,0,0)", halign: "left" });
    $(".section-heading").glitch({ halign: "left" });

    $(".logo-main").css({ height: $(".logo-container").width / 1920 * 277 });

    $(document).ready(function () {
        $('.drawer').drawer();
    });

    $(window).on("load", onReady());
    //nav open buttons
    $(".btn-info-open").click(function (e) {
        toggleOverlayWrapper(null);
        $("html,body").animate({ scrollTop: $('#info').offset().top });
    });
    $(".btn-access-open").click(function (e) {
        toggleOverlayWrapper(null);
        $("html,body").animate({ scrollTop: $('#access').offset().top });
    });
    $(".btn-credit-open").click(function (e) {
        toggleOverlayWrapper($("#credit-wrapper"));
    });
    $(".btn-trailer-open").click(function (e) {
        toggleOverlayWrapper($("#trailer-wrapper"));
    });
    $(".btn-story-open").click(function (e) {
        toggleOverlayWrapper(null);
        $("html,body").animate({ scrollTop: $('#story').offset().top });
        //toggleOverlayWrapper($("#story-wrapper"));
    });
    $(".btn-cast-open").click(function (e) {
        castAppearanceAnimation();
        toggleOverlayWrapper($("#cast-wrapper"));
    });

    $(".previous-cast-button").click(previousCast);
    $(".next-cast-button").click(nextCast);

    //nav close buttons
    $(".btn-wrapper-close").click(function () {
        toggleOverlayWrapper(null);
    });
    //drawer auto close
    $(".drawer-menu-item").click(function () {
        $('.drawer').drawer('close');
    });
    //text shuffle
    $(".navbar-item").hover(function (e) {
        // over
        if ($(e.target).find("span").attr("class") != "capt shuffled") {
            var text = new ShuffleText($(e.target).find("span").get(0), onNavbarCaptionFinishShuffle);
            text.start();
            $(e.target).find("span").attr("class", "capt shuffled");
        }
    }, function (e) {
        // out
    }
    );
    //cast select dots
    $('.cast-select-list ul li').click(function(){
        var index = $('.cast-select-list ul li').index(this);
        currentCastNum = index;
        updateCast();
      });
    new Vivus('logo-outline', { start: 'autostart', type: 'delayed', duration: 200, animTimingFunction: Vivus.EASE_IN }, function (car) {
        setTimeout(function () {
            $("#logo-outline").fadeOut(250, function () { $(".intro-panel").fadeOut(500) });
        }, 1000);
    });
    var bgTrigged = false;
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $("#navbar ul").attr("id", "navbar-filled");
        } else {
            $("#navbar ul").attr("id", "");
        }

    });
});
//cast
var castItems = [
    {
        name: "谷弘樹",
        caption: "Tani Hiroki",
        performer: "遠藤龍之介",
        character: "東京の高校に通う高校二年生。謎の電話主に導かれ、仲間の中に潜むAIを探し出そうと奔走する。",
        comment: "どんな人にでも楽しんでもらえる映画になっていると思います。お隣の友達と是非見に来てください。",
        bg: "images/IMGP6269-croped.jpg",
        invert: false
    },
    {
        name: "紅坂かえで",
        caption: "Kohsaka Kaede",
        performer: "清水萌",
        character: "弘樹の小学校以前よりの友人。弘樹のよき理解者。",
        comment: "かえでは常に人のことをよく見ていて、争い事に足を踏み入れられない弱さと信頼している人だけには言いたいことをしっかり言える強さを併せ持っていて、6人の中では最もまわりにいそうな現代っ子ぽいキャラクターだなと感じました。この個性が特に出ているのが主人公の弘樹を慰める2つのシーンです。ここに友達への無条件の信頼と愛情を感じ、演者として一番のお気に入りになりました。<br>たくさんの人の想いが詰まったAidentity、ぜひ見にきてください！",
        bg: "images/S_8308552227916.jpg",
        invert: false
    },
    {
        name: "相川新一",
        caption: "Aikawa Shinichi",
        performer: "岩城圭祐",
        character: "弘樹たち６人のリーダー的存在。情に厚く信頼されているが、仲間を思う故厳しい面を見せることも。",
        comment: "毎回の撮影を楽しむことができて良かったです。撮影に協力してくださった方々、ありがとうございました。クラス全員で一生懸命作り上げたこの映画を観て楽しんで頂けると幸いです。",
        bg: "images/S_8308552496818.jpg",
        invert: false
    },
    {
        name: "上村七海",
        caption: "Kamimura Nanami",
        performer: "",
        character: "弘樹のクラスを担当する教育実習生。担当は現代文。",
        comment: "",
        bg: "",
        invert: false
    },
    {
        name: "大坊歩",
        caption: "Daibou Ayumu",
        performer: "川崎文也",
        character: "弘樹の友人のひとり。実は成績がピンチだが、本人はあまり気にしていない。「裏口入学マスター」の異名を持つ。",
        comment: "カメラの前で演技するのは緊張して難しかったです<br>でも、頑張って「歩」を演じたのでぜひ見てください！",
        bg: "images/S_8308553030678.jpg",
        invert: false
    },
    {
        name: "江藤友香",
        caption: "Etoh Tomoka",
        performer: "",
        character: "弘樹の友人のひとり。頭の回転が速い。冗談が過ぎてつい嫌味を言ってしまうのが悩みの種。",
        comment: "",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: false
    },
    {
        name: "深田凛",
        caption: "Fukada Rin",
        performer: "平出倭子",
        character: "弘樹の友人のひとり。ほとんど言葉を発しないが、なぜかいつも弘樹たちのそばにいる。AIに関して何かを知っている様子。",
        comment: "深田凛、実は猿人。<br>それは迷信、なんて斬新！<br>そんな片鱗、どこにもnothing。",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: false
    },
    {
        name: "谷咲良",
        caption: "Tani Sakura",
        performer: "",
        character: "弘樹の妹。最近ゲットしたしゃべるぬいぐるみから離れられない。",
        comment: "",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: false
    },
    {
        name: "石黒",
        caption: "Ishiguro",
        performer: "",
        character: "謎に包まれた黒服の男。",
        comment: "クラスみーんなの頑張りが詰まっています！ストーリーや雰囲気から引き込まれること間違いなしですよ！<br>是非、足をお運びください！",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: true
    },
    {
        name: "漆原",
        caption: "Urushibara",
        performer: "",
        character: "謎に包まれた黒服の女。",
        comment: "",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: true
    },
    {
        name: "狂数成",
        caption: "Kurui Kazunari",
        performer: "",
        character: "AI研究で世界に名を馳せる有名な科学者。裏では黒服の研究組織のもとで暗躍する。",
        comment: "",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: true
    },
    {
        name: "校長先生",
        caption: "Fuse",
        performer: "????",
        character: "弘樹たちの通う高校の校長。",
        comment: "",
        bg: "../images/../../../../b-movie/assets/20180722/IMGP6277_720.JPG",
        invert: true
    }
]
    ;
var currentCastNum = 0;
function previousCast() {
    if (currentCastNum == 0) {
        currentCastNum = castItems.length - 1;
    } else {
        currentCastNum--;
    }
    updateCast();
}
function nextCast() {
    if (currentCastNum == castItems.length - 1) {
        currentCastNum = 0;
    } else {
        currentCastNum++;
    }
    updateCast();
}
function placeCaseIcons() {

}
function updateCast() {
    var list = $(".cast-select-list ul").children("li");
    list.each(function (v,i) {
        if(v == currentCastNum){
            if (!$(i).hasClass("cast-select-list-item-selected")) {
                $(i).addClass("cast-select-list-item-selected");
            }
        }
        else if ($(i).hasClass("cast-select-list-item-selected")) {
            $(i).removeClass("cast-select-list-item-selected");
        }
    });
    
    $(".cast-name").html(castItems[currentCastNum].name);
    $(".cast-name-caption").html(castItems[currentCastNum].caption.toUpperCase());
    //$(".cast-performer-name").html("キャスト名");
    $(".cast-performer-name").html(castItems[currentCastNum].performer);
    $(".cast-info").html(castItems[currentCastNum].character);
    $(".cast-comment-heading").html("演者からひとこと");
    $(".cast-comment").html(castItems[currentCastNum].comment);
    $("#cast-wrapper").css("background-image", "url(" + castItems[currentCastNum].bg + ")");
    castAppearanceAnimation(castItems[currentCastNum].invert);
}
function castAppearanceAnimation(invert) {
    $(".cast-shuffle").each(function (index, element) {
        var text = new ShuffleText(element, dummy);
        text.start();
    });
    $(".cast-heading-block").each(function (index, element) {
        TweenMax.fromTo(element, 0.5, { "border-right-width": "150px", opacity: 0, width: "0" }, { "border-right-width": 0, opacity: 1, width: "100%", delay: index * 0.05, ease: Expo.easeInOut });
    });
    if (invert) {
        TweenMax.to($("#cast-wrapper"), 1.0, { backgroundColor: "#000", color: "#fff" });
        TweenMax.to($(".cast-item"), 1.0, { backgroundColor: "rgba(0, 0, 0, 0.7);", color: "rgba(255, 255, 255, 0.7);" });
    } else {
        TweenMax.to($("#cast-wrapper"), 1.0, { backgroundColor: "#fff", color: "#000" });
        TweenMax.to($(".cast-item"), 1.0, { backgroundColor: "rgba(255, 255, 255, 0.7);", color: "rgba(0, 0, 0, 0.7);" });
    }
}



function onNavbarCaptionFinishShuffle(element) {
    $(element).attr("class", "capt");
}
function toggleOverlayWrapper(wrapper) {
    var overlayWrappers = [
        $("#trailer-wrapper"),
        $("#credit-wrapper"),
        $("#cast-wrapper")
    ];
    overlayWrappers.forEach(function (v) {
        if (wrapper != null) {
            if (v[0].id == wrapper[0].id) {
                wrapper.fadeIn(300);
            } else {
                v.fadeOut(200);
            }
        } else {
            v.fadeOut(200);
        }
    });
    if (wrapper != null && wrapper[0].id == "cast-wrapper") {
        $("#wrapper").css({ position: "fixed", width: "100%" });
    } else {
        $("#wrapper").css({ position: "static", width: "auto" });
    }
}
function realtimeInfoUpdateLoop() {
    var schedule = {
        screenings: [
            {
                time: new Date(2018, 9 - 1, 8, 9, 15, 0, 0),
                theater: "化学講義室 (4F)"
            },
            {
                time: new Date(2018, 9 - 1, 8, 12, 30, 0, 0),
                theater: "物理講義室 (4F)"
            },
            {
                time: new Date(2018, 9 - 1, 8, 15, 30, 0, 0),
                theater: "生物講義室 (3F)"
            },
            {
                time: new Date(2018, 9 - 1, 9, 11, 0, 0, 0),
                theater: "講堂 (1F)"
            },
            {
                time: new Date(2018, 9 - 1, 9, 14, 0, 0, 0),
                theater: "化学講義室 (4F)"
            },
            {
                time: new Date(2018, 9 - 1, 10, 9, 30, 0, 0),
                theater: "生物講義室 (3F)"
            }
        ]
    };

    var now = new Date();
    var next;
    var flg = false;
    var cnt = 0;
    var beforeFest = false;
    schedule.screenings.forEach(function (v) {
        if (v.time > now && !flg) {
            //まだ来ていない上映にでくわした

            $("#realtimeinfo-none").hide();
            if (cnt == 0) beforeFest = true;
            next = v;
            flg = true;
        }
        cnt++;
    });
    if (next == undefined) {
        //全部終わってる
        $("#realtimeinfo-finished").show();
        $("#realtimeinfo-remain").hide();

        $("#realtimeinfo-none").hide();
    } else {
        if (beforeFest) {
            $(".until-next").html("最初の上映まで");
        } else {
            $(".until-next").html("次の上映まで");
        }
        var fullRemain = next.time - now;
        var day_in_milliseconds = 24 * 60 * 60 * 1000;
        var hour_in_milliseconds = 60 * 60 * 1000;
        var minute_in_milliseconds = 60 * 1000;
        var second_in_milliseconds = 1000;
        var remain_days = Math.floor(fullRemain / day_in_milliseconds);
        if (remain_days >= 1) {
            //1日以上
            var mnInNextDayOfNext = next.time;
            mnInNextDayOfNext.setHours(23, 59, 59, 999);
            var fullRemainAdjusted = mnInNextDayOfNext - now;
            remain_days = Math.floor(fullRemainAdjusted / day_in_milliseconds);
            $(".remain").html(remain_days + "日");
        } else {
            var remain_hours = Math.floor((fullRemain - remain_days * day_in_milliseconds) / hour_in_milliseconds);
            var remain_minutes = Math.floor((fullRemain - remain_days * day_in_milliseconds - remain_hours * hour_in_milliseconds) / minute_in_milliseconds);
            var remain_seconds = Math.floor((fullRemain - remain_days * day_in_milliseconds - remain_hours * hour_in_milliseconds - remain_minutes * minute_in_milliseconds) / second_in_milliseconds);

            $(".remain").html(remain_hours + "時間 " + remain_minutes + "分 " + remain_seconds + "秒");

        }
        $(".theater-name").html(next.theater);
        $("#realtimeinfo-finished").hide();
        $("#realtimeinfo-remain").show();
    }
    setTimeout(function () {
        realtimeInfoUpdateLoop();
    }, 100);
}

function randomshuffle() {
    var text = new ShuffleText($(".copy").get(1), dummy);
    text.start();
    var text1 = new ShuffleText($(".section-heading").get(1), dummy);
    text1.start();
    setTimeout(() => {
        randomshuffle();
    }, 3000);
}
function dummy() { }
function invertColorRand() {
    if (Math.random() > 0.9) {

        $("#mainvision").css({ filter: "invert(100%)" });
        setTimeout(() => {
            $("#mainvision").css({ filter: "invert(0%)" });
        }, 10000);
    }
    setTimeout(() => {
        invertColorRand();
    }, 5000);

}
/*!
 * $ Simple glitching plugin
 * Author: Igor Brkic <igor@hyperglitch.com>
 * Version 0.0.1
 * Licensed under the MIT license
 */
(function ($) {
    $.fn.glitch = function (options) {
        var s = $.extend({
            bg: "",    // background color
            maxint: 3,     // max interval between glitchings
            minint: 1,      // min interval between glitchings
            maxglitch: 10,   // max number of twitches
            hshift: 5,      // max horizontal shift 
            vshift: 5,      // max vertical shift
            direction: 'random', // 'horizontal', 'vertical' or 'random'
            halign: "right",
            hdist: 0
        }, options);

        return this.each(function () {
            $t = $(this);
            $t.wrap('<span style="display:inline-block;position:relative">');
            var $s = $t.closest('span');
            var $c = $t.clone();
            //$c.css({ filter: "invert(100%)" });
            var height = $t.height();
            var width = $t.width();
            var $span = $t;

            if (s.bg === null) {
                s.bg = $t.css('background-color');
            }

            $c.css({
                position: 'absolute',
                top: 0,
                height: height,
                width: width,
                overflow: 'hidden',
                'background-color': s.bg
            });
            $s.append($c);
            var rnd = function (a) { return Math.floor(Math.random() * (a + 1)); }
            var g = function () {
                $(".logo-bound .logo-main").width($(".logo-container").width());
                $(".logo-bound .logo-caption").width($(".logo-container").width() * 0.65);
                var i;
                for (i = 0; i < rnd(s.maxglitch) + 1; i++) {
                    setTimeout(function () {
                        var css, dir;
                        if (s.direction == 'random') dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                        else dir = s.direction;
                        if (dir == 'vertical') css = { top: rnd(s.vshift + 1), width: rnd(Math.floor($span.width() * 0.8)) + 2, height: $span.height() };
                        else {
                            if (s.halign == "left") {
                                css = { right: "auto", left: rnd(s.hshift + 1), height: rnd(Math.floor($span.height() * 0.8)) + 2, width: $span.width() };
                            } else {
                                css = { left: "auto", right: rnd(s.hshift + 1)/* - $span.width()*/, height: rnd(Math.floor($span.height() * 0.8)) + 2, width: $span.width() };
                            }
                        }
                        $c.css(css)
                    }, rnd(300));
                }
                setTimeout(function () {
                    if (s.halign == "left") {
                        $c.css({ right: "auto", left: 0, top: 0 });
                    } else {
                        $c.css({ left: "auto", right: 0/* - $span.width()*/, top: 0 });
                    }
                }, 300);
                setTimeout(function () { $c.css({ width: 0, height: 0 }) }, 1500);
                setTimeout(g, (rnd((s.maxint - s.minint)) + s.minint) * 1000);
            }
            setTimeout(g, 3000);
        });
    }
})(jQuery);