"use strict";

$(window).on('load', function () {
  $('body').removeClass('loaded');
});
$(function () {
  $('.catalog-product__col').on('click', function (e) {
    e.preventDefault();

    var _this = $(this);

    _this.toggleClass('flipped');

    if (_this.hasClass('flipped')) {
      _this.find(".catalog-product__btn").hide();
    } else {
      _this.find(".catalog-product__btn").show();
    }
  });
  $(".card-center__link").on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000, 'linear');
  });

  if (window.matchMedia("(max-width: 575px)").matches) {
    $(".footer__form_input").attr("placeholder", "E-mail");
  }

  $(".footer__form_input").on('focus', function () {
    $(this).addClass('active').removeAttr("placeholder");
  });
  $(".footer__form_input").on('blur', function () {
    $(this).removeClass('active').attr("placeholder", "Поиск...");
  });
  $(".map-sidebar__toggle").on('click', function () {
    $(".map-block__category #map").toggleClass('active');
  }); // rubricator: active element

  $(".rubricator__lv2_link").on('click', function () {
    $(this).addClass('active').parent().siblings().find(".rubricator__lv2_link").removeClass('active');
  });

  if (window.matchMedia("(min-width: 767px)").matches) {
    // search in header
    $(".search-form__input").on('focus', function () {
      $(this).addClass('active').removeAttr("placeholder");
    });
    $(".search-form__input").on('blur', function () {
      $(this).removeClass('active').attr("placeholder", "Поиск...");
    });
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    // search in header
    $(".search-form__input").on('focus', function () {
      $(this).removeAttr("placeholder");
    });
    $(".search-form__input").on('blur', function () {
      $(this).attr("placeholder", "Поиск...");
    }); // radio/checkbox in map sidebar

    $(".map-sidebar .radio").on('click', function () {
      $(this).find("input").attr("checked", true);
    });
    $(".map-sidebar .checkbox").on('click', function () {
      var $checkbox = $(this).find("input");
      $(this).find(".checkbox__figure").toggleClass('active');

      if ($checkbox.is(":checked")) {
        $checkbox.removeAttr("checked");
      } else {
        $checkbox.attr("checked", true);
      }
    });
  } // hide filter popup


  $(".btn-arrow").on('click', function () {
    $(this).toggleClass('active');
    $(".popup__body .map-block .map-sidebar").toggleClass('slideLeft');
  });
  $(".filter-remove").on('click', function (e) {
    e.preventDefault();
    $(".map-sidebar").toggleClass('active');
  }); // rubricator accordion

  $(".rubricator__lv1_item").on('click', function () {
    $(this).siblings(".rubricator__lv2").slideToggle(300);
  }); //sorting

  $(".select-sorting__item").on('click', function () {
    $(this).toggleClass('active');
    $(".select-sorting__dropdown").toggleClass('active');
  });
  $(".select-sorting__option").on('click', function () {
    var optionText = $(this).text();
    var itemSelected = $(this).closest(".select-sorting").find(".select-sorting__item");
    $(this).addClass('active').siblings().removeClass('active');
    itemSelected.text(optionText);
    itemSelected.removeClass('active');
    $(this).closest(".select-sorting").find(".select-sorting__dropdown").removeClass('active');
  }); // Rating

  var curW = 0;
  $('.rating-list__count').each(function () {
    if (+$(this).width() > curW) {
      curW = +$(this).width();
    }
  });
  $('.rating-list__count').each(function () {
    $(this).width(curW);
  });

  function calcRatingLineWidht() {
    $('.rating-list__line').each(function () {
      var valRatingPercent = +$(this).data('percent') || 0;
      var valRating = +$(this).width() * valRatingPercent / 100;

      if (valRating > +$(this).width()) {
        valRating = +$(this).width();
      } else if (valRating < 0) {
        valRating = 0;
      }

      var ratingEl = $(this).find('.rating-list__line-value');
      ratingEl.width(valRating);
    });
  }

  ;
  calcRatingLineWidht();

  if ($('.category-tags').length) {
    $('.category-tags').slick({
      arrows: true,
      dots: false,
      variableWidth: true,
      infinite: true,
      responsive: [{
        breakpoint: 576,
        settings: {
          arrows: false
        }
      }]
    });
    $('.category-tags .slick-prev').addClass('slick-disabled');
    $('.category-tags').on('afterChange', function () {
      $('.category-tags .slick-prev').removeClass('slick-disabled');
    });
  }

  var $input = $('.counter__input_input');
  var $buffer = $('.counter__input_buffer');

  function setWidthInput() {
    $buffer.text($input.val());
    $input.width($buffer.width() + 5);
  }

  setWidthInput();
  $input.on('input', function () {
    setWidthInput();
  });
  $('.counter__input').on('click', function () {
    $input.focus();
  });
  /* Burger */

  /* ---------------------------------------------- */

  $(".toggle-menu").on('click', function () {
    $(this).toggleClass('is-active');
    $('.navbar').toggleClass("is-open");
    $('.overlay').toggleClass("is-open");
    $('.header').toggleClass("index");
  });
  $(".navbar__close").on('click', function () {
    $(".toggle-menu").removeClass('is-active');
    $('.navbar').removeClass("is-open");
    $('.header').removeClass("index");
    $('.overlay').removeClass("is-open");
  });
  $(".overlay").on('click', function () {
    $(".toggle-menu").removeClass('is-active');
    $('.navbar').removeClass("is-open");
    $('.filter').removeClass("is-open");
    $('.header').removeClass("index");
    $(this).removeClass("is-open");
    $('body').removeClass("lock");
  });
  $(".b-drop__link").on('click', function () {
    var th = $(this);
    th.parents('.b-drop').toggleClass('is-open');

    if (th.hasClass('b-drop__link_tab')) {
      var textNew = th.data('text');
      var textOld = th.text();
      th.text(textNew);
      th.data('text', textOld);
    }

    return false;
  });
  $(".i-like").on('click', function () {
    if ($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
    } else {
      $(this).addClass('is-active');
    }

    return false;
  });
  $(".open-sb-dropdown").on('click', function () {
    $(this).next('.sb-dropdown').toggleClass('is-open');
    return false;
  });
  $(".sb-dropdown__close").on('click', function () {
    $(this).parents('.sb-dropdown').removeClass('is-open');
    return false;
  });
  $(".open-informer").on('click', function () {
    $(this).next('.informer-dropdown').toggleClass('is-open');
    return false;
  });
  $(".informer-dropdown__close").on('click', function () {
    $(this).parents('.informer-dropdown').removeClass('is-open');
    return false;
  });
  $(".map-window__close").on('click', function () {
    $(this).parents('.map-window').hide();
    return false;
  });
  $(".dropdown-link").on('click', function () {
    $(this).next('.dropdown-menu').toggleClass('is-open');
    return false;
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".dropdown").length) return;
    $('.dropdown-menu').removeClass('is-open');
    event.stopPropagation();
  });
  $(".dropdown-menu a").on('click', function () {
    var thisText = $(this).text();
    $(".dropdown-menu li").removeClass('is-active');
    $(this).parents('li').addClass('is-active');
    $(this).parents('.dropdown').find('.dropdown-link span').text(thisText);
    $(this).parents('.dropdown-menu').removeClass('is-open');
    return false;
  });
  $(document).on('click', function (event) {
    var openSelect = $('.select .select-dropdown.is-open');
    var btnSelect = openSelect.siblings('.select__button');

    if (openSelect.length > 0 && !btnSelect.is(event.target)) {
      if (!(openSelect.has(event.target).length > 0)) {
        openSelect.removeClass('is-open');
        btnSelect.removeClass('is-open');
      }
    }
  }); //  Открыть фильтр карты

  $(".select").on('click', function (evt) {
    $(this).addClass('rotate-arrow').siblings().removeClass('rotate-arrow'); // evt.preventDefault();

    if (!!$(this).data('s-selcet')) {
      var thisData = $(this).data('s-selcet');
      var thisDataTitle = $(this).data('s-select-title');
      $('[data-s-dropdown= ' + thisData + ']').siblings('.map-filter__close').find('.map-filter__close-title').text(thisDataTitle);
      $('[data-s-dropdown= ' + thisData + ']').show();
      $('.map-filter').show();
      $('.select-dropdown').not('[data-s-dropdown= ' + thisData + ']').hide();
      return false;
    } else if (!!$(this).data('select') && $(this).data('select') === 'filter') {
      if (evt.target.classList.contains('select__button')) {
        var selectDropDown = $(this).find('.select-dropdown');
        var selectBtn = $(this).find('.select__button');

        if (!!selectDropDown && selectDropDown.hasClass('is-open')) {
          selectDropDown.removeClass('is-open');
          selectBtn.removeClass('is-open');
        } else {
          $('.select-dropdown').removeClass('is-open');
          $('.select__button').removeClass('is-open');
          selectDropDown.addClass('is-open');
          selectBtn.addClass('is-open');
        }
      }
    }

    ;
  }); //  Закрыть фильтр карты

  $(".map-filter__close .icon-close").on('click', function () {
    var thisData = $(this).data('s-selcet');
    $('.map-filter').hide();
    $('.select-dropdown').hide();
    $(".select").removeClass('rotate-arrow');
    return false;
  });
  $(".fb-toggle").on('click', function () {
    $(this).parents('.filter-block').toggleClass('is-open').find('.filter-block__body').slideToggle();
    $('.filter-fix-message').hide();
    return false;
  });
  $(".mp-toggle").on('click', function () {
    $('.styler').trigger('refresh');
    $(this).toggleClass('is-active').parents('.map-sidebar').toggleClass('is-open').find('.map-sidebar__body').slideToggle();
    return false;
  });
  $(".calc-close").on('click', function () {
    $(this).parents('.calc').hide();
    $('.calc-btn').show();
    return false;
  });
  $(".open-filter").on('click', function () {
    $('.filter').toggleClass("is-open");
    $('.overlay').toggleClass("is-open");
    $('body').toggleClass("lock");
  });
  $(".close-filter").on('click', function () {
    $('.filter').removeClass("is-open");
    $('.overlay').removeClass("is-open");
    $('body').removeClass("lock");
  });
  $(".open-search").on('click', function () {
    $('.header .search').toggleClass("is-open");
  });
  $(".bc-all a ").on('click', function () {
    $(this).parents('.bread-crambs').find('li').not($(this)).toggleClass("is-open");
    namebl = $(this).text();

    if (namebl == 'Все') {
      $(this).text('Cвернуть');
    } else {
      $(this).text('Все');
    }
  });

  function openAllCategoryTags() {
    $('.category-all').on('click', function () {
      namebl = $(this).html();
      dataNameBl = $(this).data('title');

      if (namebl == dataNameBl) {
        $(this).addClass('is-active').html('Cвернуть');
        $(this).parents('.category-tags').find('.i-hidden').removeClass('i-hidden').addClass('i-visible');
      } else {
        $(this).removeClass('is-active').html(dataNameBl);
        $(this).parents('.category-tags').find('.i-visible').removeClass('i-visible').addClass('i-hidden');
      }

      return false;
    });
  }

  openAllCategoryTags();

  function openToggleAll() {
    $('.toggle-link').on('click', function () {
      namebl = $(this).html();
      dataNameBl = $(this).data('title');

      if (namebl == dataNameBl) {
        $(this).addClass('is-active').html('Cвернуть');
        $(this).parents('.toggle-contanier').find('.i-hidden').removeClass('i-hidden').addClass('i-visible');
      } else {
        $(this).removeClass('is-active').html(dataNameBl);
        $(this).parents('.toggle-contanier').find('.i-visible').removeClass('i-visible').addClass('i-hidden');
      }

      return false;
    });
  }

  openToggleAll();

  function openAllNavFilter() {
    $('.filter-link').on('click', function () {
      namebl = $(this).html();
      dataNameBl = $(this).data('title');
      console.log(dataNameBl);

      if (namebl == dataNameBl) {
        $(this).addClass('is-active').html('Cвернуть');
        $(this).parents('.filter-block__body').find('.i-hidden').removeClass('i-hidden').addClass('i-visible');
      } else {
        $(this).removeClass('is-active').html(dataNameBl);
        $(this).parents('.filter-block__body').find('.i-visible').removeClass('i-visible').addClass('i-hidden');
      }

      return false;
    });
  }

  openAllNavFilter();

  function openAllCollection() {
    $('.cl-toggle').on('click', function () {
      namebl = $(this).html();
      dataNameBl = $(this).data('title');

      if (namebl == dataNameBl) {
        $(this).html('Cвернуть');
        $(this).parents('.collection-wrap__item').find('.i-hidden').removeClass('i-hidden').addClass('i-visible');
        $(this).parents('.collection-wrap__item').find('.cl-toggle').not($(this)).html('Cвернуть');
        $(this).parents('.collection-wrap__item').find('.material-list').hide();
      } else {
        $(this).html(dataNameBl);
        $(this).parents('.collection-wrap__item').find('.i-visible').removeClass('i-visible').addClass('i-hidden');
        $(this).parents('.collection-wrap__item').find('.cl-toggle').not($(this)).html(dataNameBl);
        $(this).parents('.collection-wrap__item').find('.material-list').show();
      }

      return false;
    });
  }

  openAllCollection();

  function sortingGridProduct() {
    $('.sorting-grid__item').on('click', function () {
      $('.sorting-grid__item').removeClass('is-active');
      $(this).addClass('is-active');

      if ($(this).hasClass('sorting-grid__item--grid')) {
        $('.products-list').hide();
        $('.products-grid').show();
        $(".catalog-item").removeClass("list");
      } else {
        $('.products-list').show();
        $('.products-grid').hide();
        $(".catalog-item").addClass("list");
      }

      return false;
    });
  }

  sortingGridProduct();

  function openNavDropdown() {
    $('.is-dropdown > a').on('click', function () {
      $(this).parent().toggleClass('is-open');
      return false;
    });
  }

  openNavDropdown();

  function openMapFilterDropdown() {
    $('.sl-dropdown').on('click', function () {
      $(this).parents('.select-dropdown__body').find('.select-list__item > ul').not($(this).next()).slideUp(200);
      $(this).parents('.select-dropdown__body').find('.sl-dropdown').not($(this)).removeClass('is-open');
      $(this).toggleClass('is-open').next().slideToggle(200);
      return false;
    });
    $('.sl-sub-dropdown').on('click', function () {
      $(this).parents('.select-dropdown__body').find('.select-sub-list__item > ul').not($(this).next()).slideUp(200);
      $(this).parents('.select-dropdown__body').find('.sl-sub-dropdown').not($(this)).removeClass('is-open');
      $(this).toggleClass('is-open').next().slideToggle(200);
      return false;
    });
  }

  openMapFilterDropdown();
  $('.go-map').bind('click.smoothscroll', function () {
    $('#tabs_2').parents('.tab-wrap').find('.nav-tab__item').removeClass('is-active');
    $('#tabs_2').parents('.tab-wrap').find('.nav-tab__link[href="#tabs_2"]').parent().addClass('is-active');
    $('#tabs_2').parents('.box-tab').find('.tab-cont').addClass('is-hidden');
    $('#tabs_2').removeClass('is-hidden');
    setTimeout(function () {
      var bl_top = $('#tabs_2').offset().top;
      $('body,html').animate({
        scrollTop: bl_top
      }, 600);
    }, 100);
    return false;
  });

  function filterFixMessage() {
    $('.fxm').on('click', function () {
      var checkblock = $(this).find('input');
      var obj = $(this).position().top;

      if (checkblock.is(':checked')) {
        $('.filter-fix-message').show().css({
          'top': obj
        });
      } else {
        $('.filter-fix-message').hide();
      }
    });
    $(document).click(function (event) {
      if ($(event.target).closest(".filter-block__body").length) return;
      $('.filter-fix-message').hide();
      event.stopPropagation();
    });
  }

  filterFixMessage();
  $(window).resize(function (event) {
    adaptive_function();
    calcRatingLineWidht();
  });

  function adaptive_header(w, h) {
    var headerMenu = $('.header');
    var headerWrap = $('.navbar');
    var headerNnavbar = $('.n-navbar');

    if (w < 991) {
      if (!headerWrap.hasClass('done')) {
        headerWrap.addClass('done').insertAfter(headerMenu);
      }
    } else {
      if (headerWrap.hasClass('done')) {
        headerWrap.removeClass('done').insertBefore(headerNnavbar);
      }
    }
  }

  function adaptive_function() {
    var w = $(window).outerWidth();
    var h = $(window).outerHeight();
    adaptive_header(w, h);
  }

  adaptive_function();
  /* Tabs */

  /* ---------------------------------------------- */

  $('.tabs a').on('click', function (evt) {
    evt.preventDefault();

    if (!!$(this).data('go')) {
      var trgt = $('#' + $(this).data('go'));
      var h = trgt.offset().top;
      $('html, body').stop().animate({
        'scrollTop': h
      }, 500, 'linear');
    } else {
      $(this).parents('.tab-wrap').find('.tab-cont').addClass('is-hidden');
      $(this).parent().siblings().removeClass('is-active');
      var id = $(this).attr('href');
      $(id).removeClass('is-hidden');
      $(this).parent().addClass('is-active');
      $('.tab-wrap .slick-slider').slick('setPosition');
      $('.tab-wrap .styler').trigger('refresh');
      return false;
    }
  });
  $('.tabs-s a').on('click', function () {
    $(this).parents('.tab-s-wrap').find('.tab-s-cont').addClass('is-hidden');
    $(this).parent().siblings().removeClass('is-active');
    var id = $(this).attr('href');
    $(id).removeClass('is-hidden');
    $(this).parent().addClass('is-active');
    return false;
  });
  /* Plugins */

  /* ---------------------------------------------- */

  /* Styler */

  if ($('.styler').length) {
    $('.styler').styler({
      singleSelectzIndex: 10
    });
  }
  /* Slick */
  // if (window.matchMedia("(max-width: 1259px)").matches) {
  //     $(".catalog-product").unslick();
  // }


  if (window.matchMedia("(max-width: 992px)").matches) {
    $(".slider-into-card").unslick();
  }

  if ($('.slider').length) {
    $('.slider').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true,
      appendArrows: '.slider-pagination',
      prevArrow: '<button class="slick-arrow slick-prev"><img src="img/next.svg" alt="" /></button>',
      nextArrow: '<button class="slick-arrow slick-next"><img src="img/next.svg" alt="" /></button>',
      responsive: [{
        breakpoint: 1366,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          variableWidth: true,
          infinite: true
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
          infinite: true
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
          variableWidth: true,
          infinite: true
        }
      }, {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          // centerMode: true,
          arrows: false,
          variableWidth: true,
          infinite: true
        }
      }]
    });
  }

  if ($('.slider-hit').length) {
    $('.slider-hit').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      appendArrows: '.slider-hit-pagination',
      prevArrow: '<button class="slick-arrow slick-prev"><img src="img/slick-arrow.png" alt="" /></button>',
      nextArrow: '<button class="slick-arrow slick-next"><img src="img/slick-arrow-next.png" alt="" /></button>',
      responsive: [{
        breakpoint: 1366,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
          arrows: false
        }
      }, {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          arrows: false
        }
      }]
    });
  }

  if ($('.slider-sale').length) {
    $('.slider-sale').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      appendArrows: '.slider-sale-pagination',
      prevArrow: '<button class="slick-arrow slick-prev"><img src="img/slick-arrow.png" alt="" /></button>',
      nextArrow: '<button class="slick-arrow slick-next"><img src="img/slick-arrow-next.png" alt="" /></button>',
      responsive: [{
        breakpoint: 1366,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
          arrows: false
        }
      }, {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          arrows: false
        }
      }]
    });
  }

  if ($('.banner-slider').length) {
    $('.banner-slider').slick({
      slidesToShow: 1,
      arrows: false,
      dots: true,
      fade: true
    });
  }
  /* Range */


  if ($("#range").length > 0) {
    $("#range").slider({
      range: true,
      min: 0,
      max: 12398,
      values: [350, 10398],
      slide: function slide(event, ui) {
        $('#rangefrom').val(ui.values[0].toLocaleString());
        $('#rangeto').val(ui.values[1].toLocaleString());
      },
      stop: function stop(event, ui) {
        var obj = $(this).position().top;
        $('.filter-fix-message').show().css({
          'top': obj - 11
        });
      }
    });
    $("#rangefrom").on('change', function () {
      $("#range").slider('values', 0, $(this).val());
    });
    $("#rangeto").on('change', function () {
      $("#range").slider('values', 1, $(this).val());
    });
  }

  $(".catalog-product").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [{
      breakpoint: 1259,
      settings: {
        slidesToShow: 3
      }
    }]
  }); // Sticky header
  // if ($(".header").length > 0 && $(".filter-anchors").length > 0) {
  //     let headerTopOffset = $(".header").offset().top;
  //     let anchorsTopOffset = $(".filter-anchors").offset().top;
  //     if ($(window).width() > 767) {
  //         $(window).scroll(function () {
  //             // For header
  //             if ($(this).scrollTop() >= headerTopOffset + 400) {
  //                 $(".header").addClass("fixed");
  //             } else {
  //                 $(".header").removeClass("fixed");
  //             }
  //             // For sidebar anchors
  //             if ($(this).scrollTop() > anchorsTopOffset - 500) {
  //                 $(".filter-anchors").addClass("fixed");
  //             } else {
  //                 $(".filter-anchors").removeClass("fixed");
  //             }
  //         });
  //     }
  //     ;
  // }

  $('.top-banner__close').click(function () {
    $(this).parent().slideUp();
    headerTopOffset = 0;
  });

  if (!!$('.card-slider-nav__item').length) {
    $('.card-slider').on('mouseover', function (evt) {
      var self = $(this);
      var tgt = $(evt.target);

      if (tgt.hasClass('card-slider-nav__item')) {
        if (!tgt.hasClass('is-active')) {
          $('.card-slider-nav__item').removeClass('is-active');
          tgt.addClass('is-active'); // $('.gallery').attr('data-active', tgt.data('img-idx'));

          setNewImg(tgt.data('img-idx'));
          var srcImg = tgt.data('img');
          var srcBigImg = tgt.data('big-img') || tgt.data('img');

          var _bigImg = self.find('.card-slider-for img');

          _bigImg.attr('src', srcImg);

          _bigImg.attr('data-large', srcBigImg);
        }
      }
    });
  }

  if (typeof $.fn.imagezoomsl !== 'undefined' && $(window).width() > 767) {
    $('.card-slider-for img').imagezoomsl({
      zoomrange: [1, 12],
      zoomstart: 3,
      innerzoom: true,
      magnifierborder: "none"
    });
  } // Галлерея изображения


  $('.gallery__preview-item').each(function (idx) {
    $(this).attr('data-img-idx', idx);
  });
  $('.card-slider-nav__item').each(function (idx) {
    $(this).attr('data-img-idx', idx);
  });
  var activeItemIdx = $('.gallery').data('active');
  var bigImg = $('.gallery__view-img');
  var curSlide = activeItemIdx;
  setNewImg(activeItemIdx);
  $(document).on('click', function (evt) {
    if ($(evt.target).hasClass('tracker')) {
      evt.preventDefault();
      $('.popup-content').removeClass('active');
      $('.popup-content[data-popup="gallery"]').addClass('popup-content__p0');
      $('.popup-wrapper, .popup-content[data-popup="gallery"]').addClass('active');
      $('html').addClass('overflow-hidden');
      return false;
    }
  });
  $('.gallery').on('click', function (evt) {
    var tgt = evt.target;

    if ($(tgt).hasClass('gallery__preview-item')) {
      var clickIdx = $(tgt).data('img-idx');
      setNewImg(clickIdx);
    }

    if ($(tgt).parent().hasClass('gallery__btn_prev') || $(tgt).hasClass('gallery__btn_prev')) {
      var changeSlide = +curSlide - 1;

      if (changeSlide < 0) {
        changeSlide = 15;
      }

      setNewImg(changeSlide);
    }

    if ($(tgt).parent().hasClass('gallery__btn_next') || $(tgt).hasClass('gallery__btn_next')) {
      var _changeSlide = +curSlide + 1;

      if (_changeSlide > 15) {
        _changeSlide = 0;
      }

      setNewImg(_changeSlide);
    }
  });

  function setNewImg(i) {
    $('.gallery__preview-item').removeClass('active');
    var activeItem = $('.gallery').find('.gallery__preview-item[data-img-idx=' + i + ']');
    activeItem.addClass('active');
    var activeItemImg = activeItem.data('img');
    bigImg.attr('src', activeItemImg);
    curSlide = i;
    $('.gallery').attr('data-active', i);
  }

  ;
  var galleryLite = $('.js-card-slider-lite');

  if (galleryLite.length > 0) {
    galleryLite.on('click', function (evt) {
      var th = $(this);
      var curentSlide = th.find('.card-slider-nav__item.is-active');
      var slides = th.find('.card-slider-nav__item');
      var prevSlide = curentSlide.prev();
      var nextSlide = curentSlide.next();
      var generalSlide = th.find('.card-slider-for img');

      if (prevSlide.length === 0) {
        prevSlide = $(slides[slides.length - 2]);
      }

      if (nextSlide.length === 0 || nextSlide.hasClass('card-slider-nav__item_more')) {
        nextSlide = $(slides[0]);
      }

      if ($(evt.target).hasClass('slick-next')) {
        setNewImgLite(curentSlide, nextSlide, generalSlide);
      }

      if ($(evt.target).hasClass('slick-prev')) {
        setNewImgLite(curentSlide, prevSlide, generalSlide);
      }
    });
  }

  function setNewImgLite(slideCurent, slideChange, img) {
    slideCurent.removeClass('is-active');
    slideChange.addClass('is-active');
    var slideImg = slideChange.data('img');
    img.attr('src', slideImg);
    img.attr('data-large', slideImg);
  }
  /* Popup */

  /* ---------------------------------------------- */


  $(document).on('click', '.open-popup', function (e) {
    e.preventDefault();
    var curentPopup = $(this).data('popup');

    if (curentPopup === 'gallery') {
      var idxImg = $('.card-slider-nav__item.is-active').data('img-idx');
      $('.popup-content[data-popup="' + curentPopup + '"]').addClass('popup-content__p0');
    }

    if (curentPopup === 'full-map') {
      $('.popup-content[data-popup="' + curentPopup + '"]').addClass('popup-content__p0');
      myFullMap.container.fitToViewport();
      ;
    }

    $('.popup-content').removeClass('active');
    $('.popup-wrapper, .popup-content[data-popup="' + curentPopup + '"]').addClass('active');
    $('html').addClass('overflow-hidden');
    return false;
  });
  $(document).on('click', '.popup-wrapper .popup-close', function (e) {
    e.preventDefault();
    $('.popup-wrapper, .popup-content').removeClass('active');
    $('html').removeClass('overflow-hidden');
    $(".map-block .map-sidebar").removeClass('active');
    $(".map-filter").hide();
    return false;
  });
  $(document).on('click', '.popup-content', function (e) {
    if (e.target !== this) return;
    $('.popup-wrapper, .popup-content').removeClass('active');
    $('html').removeClass('overflow-hidden');
    return false;
  });
});
var myMap; // заглобалим переменную карты чтобы можно было ею вертеть из любого места

var myFullMap; // заглобалим переменную карты чтобы можно было ею вертеть из любого места

function getYaMap() {
  if (!!$('#map').length && !!$('#full-map').length) {
    // карта соберется после загрузки скрипта и элементов
    var init = function init() {
      // функция - собиралка карты и фигни
      myMap = new ymaps.Map("map", {
        center: [55.635691, 37.009368],
        zoom: 10,
        controls: []
      });
      myFullMap = new ymaps.Map("full-map", {
        center: [55.635691, 37.009368],
        zoom: 10,
        controls: []
      });
      myMap.behaviors.disable('scrollZoom', 'drag');
      myFullMap.behaviors.disable('scrollZoom', 'drag');
      myMap.controls.add('zoomControl', {
        position: {
          right: '20px',
          bottom: '108px'
        }
      });
      myFullMap.controls.add('zoomControl', {
        position: {
          right: '20px',
          bottom: '108px'
        }
      });
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        // hintContent: 'Собственный значок метки',
        balloonContentHeader: ' <div class="map-header"><img src="img/isolux_logo.png" alt="logo" class="map-logo"></div> ',
        balloonContentBody: '   <div class="map-content"><p class="map-title">Изолюкс</p> <p class="map-address">Москва, ул. Большая Сыромятническая, д. 5к2</p><p class="map-phone"><span>Телефон: </span> +7 (495) 897-52-33</p> <p class="map-graphic"><span>Режим работы:</span> Пн-Пт - 09:00-19:00, Сб - 09:00-19:00, Вс - 09:00-19:00</p><a href="#" class="btn btn-white">Перейти на сайт</a></div>'
      }, {
        iconLayout: 'default#image'
      });
      /* Добавляем метки на карту */

      myMap.geoObjects.add(myPlacemark);
      myFullMap.geoObjects.add(myPlacemark); //  Open map
      // $(".map-size ").on('click',function(){
      //     $(this).parents('.map-block').find("#map").toggleClass('s-lg');
      //     myMap.container.getElement()
      // 	    .style.height = '700px';
      // 	myMap.container.fitToViewport();
      //     return false;
      // });

      $('#tabs').bind('tabsshow', function (event, ui) {
        myMap.container.fitToViewport();
      });
    };

    ymaps.ready(init);
    var widthDots = $(".catalog-product").find(".slick-dots").width();
    console.log(widthDots);
    $(".catalog-product .slick-prev").css("right", widthDots + 63 + "px ");
  }
}

;
getYaMap();