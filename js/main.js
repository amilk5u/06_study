"use strict";
var winW;
var winH;
var es_step = "Expo.ease";
var $window = $(window);
var winSc;
var htmlH;

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });
    studySliderFade();
});
function studySliderFade() {
    /**
     * 1. document 준비 되면
     *
     * 2. 슬라이드 갯수를 파악해서
     * 2-1. 1개 이하면 indicator, navBtn 숨김 처리
     * 2-2. 1개 이상이면 갯수 만큼 indicator 버튼을 복사
     *
     * 3. defineProperty로 현재 비쥬얼 순번을 number로 저장
     * 3-1. 순번에 따른 인터랙션을 만듬
     * 3-2. 비쥬얼 opacity를 조절해서 현재 순번은 1, 나머지는 0으로 변경
     * 3-3. 텍스트 opacity를 조절 + 상하 인터랙션
     * 3-4. 순번에 따른 인디게이터 온오프
     *
     * 4. indicator 클릭 시 해당 버튼의 순번을 생성해둔 인터랙션 함수에 적용 + 실행
     *
     * 5. nav 버튼 클릭 시 저장한 property의 넘버를 현재 값에서 left btn이면 -- right btn이면 ++ 생성해둔 인터랙션 함수에 적용
     */

    var $studySliderFade = $("#studySliderFade"),

        $imgWrap = $studySliderFade.find(".img_wrap"),
        $imgLi = $imgWrap.find("li"),

        $txtWrap = $studySliderFade.find(".txt_wrap"),
        $txtLi = $txtWrap.find("li"),

        $indicator = $studySliderFade.find(".visual_indicator"),

        $navBtn = $studySliderFade.find(".nav_btn"),
        $prevBtn = $navBtn.find(".prev_btn"),
        $nextBtn = $navBtn.find(".next_btn");

    //2
    var _visualLength = $imgLi.length;

    //2-1
    if(_visualLength <= 1){
        $indicator.css({display: "none"});
        $navBtn.css({display: "none"});
    }

    //2-2
    for ( var i=0; i<_visualLength-1; i++ ) {   // i는 0 이다. i가 현재(3) 있는 2 것보다 작을때까지 i를 ++ 해라.
        $indicator.find(".indi_wrap").append("<button type='button'><span></span></button>");
    }

    //3
    var studySliderFadeCrr = {};
    var visualDuration = 1;
    Object.defineProperty(studySliderFadeCrr, "slider", {
        get: function () {
            return this.num || 0;
        },
        set: function (_visualCrr) {
            if (!TweenMax.isTweening($imgLi)) {
                _visualCrr = _visualCrr % _visualLength;

                //3-2
                TweenMax.to($imgLi, visualDuration, {opacity:0, ease:es_step});
                TweenMax.to($imgLi.eq(_visualCrr), visualDuration, {opacity:1, ease:es_step});

                //3-3
                TweenMax.to($txtLi, visualDuration, {opacity:0, y:40, ease:es_step});
                TweenMax.to($txtLi.eq(_visualCrr), visualDuration, {opacity:1, y:0, ease:es_step});

                //3-4
                $indicator.find("button").removeClass("active");
                $indicator.find("button").eq(_visualCrr).addClass("active");
                this.num = _visualCrr;
            }
        }
    });
    //4
    $indicator.find("button").click(function () {
        var _this = $(this);
        var _index = _this.index();

        studySliderFadeCrr.slider = _index;
    });

    //5
    $prevBtn.click(function () {
        studySliderFadeCrr.slider--;
    });
    $nextBtn.click(function () {
        studySliderFadeCrr.slider++;
    });
}
