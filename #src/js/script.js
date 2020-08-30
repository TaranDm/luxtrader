"use strict";




/*код для плавного перемещения якорей с плагином jQuery Creep.js****/
$(function(){
    $("a[href*=\"#\"]").creep({
        speed: 1000,
        offset: -50 /*дальность прокрутик(регулировка отступов)*/

    });
});

// Dynamic Adapt v.1
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020
var move_array = [];
var move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
    for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
        var _el6 = move_objects[_index10];

        var data_move = _el6.getAttribute("data-move");

        if (data_move != "" || data_move != null) {
            _el6.setAttribute("data-move-index", _index10);

            move_array[_index10] = {
                parent: _el6.parentNode,
                index: index_in_parent(_el6)
            };
        }
    }
}

function dynamic_adapt() {
    var w = document.querySelector("body").offsetWidth;

    if (move_objects.length > 0) {
        for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
            var _el7 = move_objects[_index11];

            var _data_move = _el7.getAttribute("data-move");

            if (_data_move != "" || _data_move != null) {
                var data_array = _data_move.split(",");

                var data_parent = document.querySelector("." + data_array[0]);
                var data_index = data_array[1];
                var data_bp = data_array[2];

                if (w < data_bp) {
                    if (!_el7.classList.contains("js-move_done_" + data_bp)) {
                        if (data_index > 0) {
                            //insertAfter
                            var actual_index = index_of_elements(data_parent)[data_index];
                            data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
                        } else {
                            data_parent.insertBefore(_el7, data_parent.firstChild);
                        }

                        _el7.classList.add("js-move_done_" + data_bp);
                    }
                } else {
                    if (_el7.classList.contains("js-move_done_" + data_bp)) {
                        dynamic_adaptive_back(_el7);

                        _el7.classList.remove("js-move_done_" + data_bp);
                    }
                }
            }
        }
    }

    custom_adapt(w);
}

function dynamic_adaptive_back(el) {
    var index_original = el.getAttribute("data-move-index");
    var move_place = move_array[index_original];
    var parent_place = move_place["parent"];
    var index_place = move_place["index"];

    if (index_place > 0) {
        //insertAfter
        var actual_index = index_of_elements(parent_place)[index_place];
        parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
    } else {
        parent_place.insertBefore(el, parent_place.firstChild);
    }
}

function index_in_parent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;

    for (var _i2 = 0; _i2 < children.length; _i2++) {
        if (children[_i2] == node) return num;
        if (children[_i2].nodeType == 1) num++;
    }

    return -1;
}

function index_of_elements(parent) {
    var children = [];

    for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
        if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
            children.push(_i3);
        }
    }

    return children;
}

window.addEventListener("resize", function (event) {
    dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) { }

/*===========================================================================*/

/*user-menu при клике по иконке в блоке .user-header__icon, блоку user-header__menu будет добавляться/удаляться (togle) класс _active, заставляя исчезать и появляться меню*/
let user_icon = document.querySelector(".user-header__icon");
let user_menu = document.querySelector(".user-header__menu");
let overlay_user_menu = document.querySelector(".overlay");

user_icon.addEventListener("click", function (e) {
    user_menu.classList.toggle('_active');
    overlay_user_menu.classList.toggle('overlay-show');/*переключает класс*/

});

/*функция при клике на блок overlay заставит закрыть меню и закрыть блок */
overlay_user_menu.addEventListener("click", function (e) {
    overlay_user_menu.classList.remove('overlay-show');
    user_menu.classList.remove('_active');

});

/*по нажати "esc" окно закроется*/
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        user_menu.classList.remove("_active");
        evt.preventDefault();
        user_menu.classList.remove("_active");
        overlay_user_menu.classList.remove('overlay-show');

    }
});
/*-------------------Кнопка бургер меню------------------------*/
let burger_link = document.querySelector(".icon-menu");
let nav_text = document.querySelector(".menu__body");
let scroll = document.querySelector ("body");
burger_link.addEventListener("click", function (e) {
    e.preventDefault();
    burger_link.classList.toggle("_active");
    nav_text.classList.toggle("_active");

    if (nav_text.classList.contains('_active')) {
        scroll.style.overflow = "hidden";
    }
    else {
        scroll.style.overflow = "visible";
    }

});
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        burger_link.classList.remove("_active");
        nav_text.classList.remove("_active");
        scroll.style.overflow = "visible"
    }

});

function ibg(){

    let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}

ibg();

/*функция открывает бургер меню*/
/*слайдер*/
$(document).ready(function () {
    $('.slider').slick({
        arrows: true,/*показывать, отключить кнопки*/
        dots: false, /*показывать /не показывать точки*/
        adaptiveHeight: false,/*адаптивная высота по картинке*/
        slidesToShow: 1,/*кол-во картинок за 1 раз*/
        slidesToScroll: 1,/*вол-во изображений пролистываемых за 1 раз*/
        speed: 1000, /*скорость пролистывания изображения*/
        easing: 'ease', /*тип анимации(не разобрался)*/
        infinite: true, /*бесконечный иил нет слайдер*/
        // initialSlide: 0,
        autoplay:true, /*автоперелистывание*/
        autoplaySpeed: 5000,/*задержка автопролистывания*/
        //    настройки автопролистывания
        pauseOnFocus: true,/*пауза при фокусе*/
        pauseOnHover: true,/*при наведении*/
        pauseOnDotsHover: true, /*пауза при наведении на точки*/
        //
        draggable: true, /*отключение перелистывания слайда потянув за картинку НА ПК*/
        swipe: true, /*отключение перелистывания слайда потянув за картинку НА ТАЧСКРИНАХ*/
        //НАСТРОЙКИ ТАЧСКРИНОВ
        touchThreshold:5, /*момент срабатывания слайда при свайпе*/
        touchMove: true,/*при отключении листать можно будет только нажав на кнопки а не свайпом*/
        //
        waitForAnimate: true, /*следующий слайд будет толкьо полсе завершения предыдущего. при отключении можно листать быстрее*/
        centerMode:false,/*настройка прозрачности дополнительным классам .slick-center*/
        variableWidth: false,/*слайды все видны сразу в одной ленте + слайды будут в своей родной ширине*/
        /*ряды слайдов*/
        rows:1,/*кол-во рядов слайдов*/
        slidesPerRow:1, /*кол-во слайдов в ряду*/
        vertical:false,/*вертикальные слайды(слайды буудт прокручиваться вертикально./ .slick-track-)display: block;*/
        nextArrow: $('.slick-next'),
        prevArrow: $('.slick-prev')

    });
});

/*нижний слайдер*/
$(document).ready(function(){
    $('.slider-lots__body').slick({
        arrows: true,/*показывать, отключить кнопки*/
        dots: false, /*показывать /не показывать точки*/
        adaptiveHeight: false,/*адаптивная высота по картинке*/
        slidesToShow: 3,/*кол-во картинок за 1 раз*/
        responsive: [
            {
                breakpoint:768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint:550,
                settings: {
                    slidesToShow: 1,
                }
            }

        ],

        slidesToScroll: 1,/*вол-во изображений пролистываемых за 1 раз*/
        speed: 1000, /*скорость пролистывания изображения*/
        easing: 'ease', /*тип анимации(не разобрался)*/
        infinite: true, /*бесконечный иил нет слайдер*/
        // initialSlide: 0,
        autoplay:false, /*автоперелистывание*/
        autoplaySpeed: 3000,/*задержка автопролистывания*/
        //    настройки автопролистывания
        pauseOnFocus: true,/*пауза при фокусе*/
        pauseOnHover: true,/*при наведении*/
        pauseOnDotsHover: true, /*пауза при наведении на точки*/
        //
        draggable: true, /*отключение перелистывания слайда потянув за картинку НА ПК*/
        swipe: true, /*отключение перелистывания слайда потянув за картинку НА ТАЧСКРИНАХ*/
        //НАСТРОЙКИ ТАЧСКРИНОВ
        touchThreshold:5, /*момент срабатывания слайда при свайпе*/
        touchMove: true,/*при отключении листать можно будет только нажав на кнопки а не свайпом*/
        //
        waitForAnimate: true, /*следующий слайд будет толкьо полсе завершения предыдущего. при отключении можно листать быстрее*/
        centerMode:false,/*настройка прозрачности дополнительным классам .slick-center*/
        variableWidth: false,/*слайды все видны сразу в одной ленте + слайды будут в своей родной ширине*/
        /*ряды слайдов*/
        rows:1,/*кол-во рядов слайдов*/
        slidesPerRow:1, /*кол-во слайдов в ряду*/
        vertical:false,/*вертикальные слайды(слайды буудт прокручиваться вертикально./ .slick-track-)display: block;*/
        nextArrow: $('.control-slider-lots__arrow_next'),
        prevArrow: $('.control-slider-lots__arrow_prev'),


    });
});

/*слайдер с цитатами*/
$(document).ready(function () {
    $('.slider-quotes__body').slick({
        arrows: true,/*показывать, отключить кнопки*/
        dots: false, /*показывать /не показывать точки*/
        adaptiveHeight: false,/*адаптивная высота по картинке(не работает)*/
        slidesToShow: 1,/*кол-во картинок за 1 раз*/
        slidesToScroll: 1,/*вол-во изображений пролистываемых за 1 раз*/
        fade:true,
        cssEase: 'linear',
        speed: 1500, /*скорость пролистывания изображения*/
        easing: 'ease', /*тип анимации(не разобрался)*/
        infinite: true, /*бесконечный иил нет слайдер*/
        // initialSlide: 0,
        autoplay:false, /*автоперелистывание*/
        autoplaySpeed: 5000,/*задержка автопролистывания*/
        //    настройки автопролистывания
        pauseOnFocus: true,/*пауза при фокусе*/
        pauseOnHover: true,/*при наведении*/
        pauseOnDotsHover: true, /*пауза при наведении на точки*/
        //
        draggable: true, /*отключение перелистывания слайда потянув за картинку НА ПК*/
        swipe: true, /*отключение перелистывания слайда потянув за картинку НА ТАЧСКРИНАХ*/
        //НАСТРОЙКИ ТАЧСКРИНОВ
        touchThreshold:5, /*момент срабатывания слайда при свайпе*/
        touchMove: true,/*при отключении листать можно будет только нажав на кнопки а не свайпом*/
        //
        waitForAnimate: true, /*следующий слайд будет толкьо полсе завершения предыдущего. при отключении можно листать быстрее*/
        centerMode:false,/*настройка прозрачности дополнительным классам .slick-center*/
        variableWidth: false,/*слайды все видны сразу в одной ленте + слайды будут в своей родной ширине*/
        /*ряды слайдов*/
        rows:1,/*кол-во рядов слайдов*/
        slidesPerRow:1, /*кол-во слайдов в ряду*/
        vertical:false,/*вертикальные слайды(слайды буудт прокручиваться вертикально./ .slick-track-)display: block;*/
        nextArrow: $('.control-slider-quotes__circle'),

    });

});
//


// /*код для плавного перемещения якорей*/
//  const anchors = document.querySelectorAll('a[href^="#"]');
//  for (let anchor of anchors) {
//      anchor.addEventListener("click", function (event) {
//          event.preventDefault();
//          const blockID = anchor.getAttribute('href')
//          document.querySelector('' +  blockID).scrollIntoView({
//              behavior: "smooth", /*плавное перемещение*/
//              block: "start"
//          })
//      })
//  }

