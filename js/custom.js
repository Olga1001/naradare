$(window).on('load', function () {
    $('body').removeClass('loaded');
});

$(function () {  
    var lengthTags =  $(".tags").find("li").length;
    function hideDetail() {
        if (lengthTags > 5) {
            $(".tags li").addClass('i-hidden');
            $(".filter-link-wrap.i-hidden").removeClass('i-hidden');
            for (var i = 1; i <= 5; i++) {
                $(".tags li:nth-child(" + i + ")").removeClass('i-hidden').addClass('fxm');
            }
        }
    }
    if (window.matchMedia("(max-width: 575px)").matches) { 
      
        hideDetail();
    }
  
    var maxHeight = -1;
    if (window.matchMedia("(min-width: 1025px)").matches) { 
        $('.navbar-menu-height').each(function() {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });
     
        $('.navbar-menu-height').each(function() {
          $(this).height(maxHeight);
        });
    }
  

//     var highestBox = 0;
//     $('.compare-string').each(function(){  
//       $(".compare-main [data-index='" + i + "'");
//         if(highestBox > $(this).height()){  
//             highestBox = highestBox; 
//             console.log(highestBox); 
//         } else {
//             highestBox = $(this).height(); 
//             console.log(highestBox); 
//         }
//     });    

// $('.compare-string ').height(highestBox);

    $("#file-download").on("change", function (evt) {
        let files = evt.target.files; // FileList object
        document.getElementsByClassName('uploaded-row').innerHTML = "";
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                alert("Только изображения....");
            }
            let reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    let label = document.createElement('label');
                    label.innerHTML = ['<img class="your-files_img" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>'].join('');
                    document.getElementById('uploaded-row').insertBefore(label, null);
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
        return false;
    });
    $('.catalog-product__col').on('click', function (e) {
        e.preventDefault();
        let _this = $(this);
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
  
    $(".footer__form_input").on('focus', function() {
        $(this).addClass('active').removeAttr("placeholder");
    });
    $(".footer__form_input").on('blur', function() {
        $(this).removeClass('active').attr("placeholder", "Поиск...");
    });

    $(".map-sidebar__toggle").on('click', function() {
        $(".map-block__category #map").toggleClass('active');
    });
    // rubricator: active element
    $(".rubricator__lv2_link").on('click', function() {
        $(this).addClass('active').parent().siblings().find(".rubricator__lv2_link").removeClass('active');
    });

    
    if (window.matchMedia("(min-width: 767px)").matches) {
        // search in header
        $(".search-form__input").on('focus', function() {
            $(this).addClass('active').removeAttr("placeholder");
        });
        $(".search-form__input").on('blur', function() {
            $(this).removeClass('active').attr("placeholder", "Поиск...");
        });
      } 
      if (window.matchMedia("(max-width: 767px)").matches) {
          // search in header
        $(".search-form__input").on('focus', function() {
            $(this).removeAttr("placeholder");
        });
        $(".search-form__input").on('blur', function() {
            $(this).attr("placeholder", "Поиск...");
        });
        // radio/checkbox in map sidebar
        $(".map-sidebar .radio").on('click', function() {
            $(this).find("input").attr("checked", true);
        });
        $(".map-sidebar .checkbox").on('click', function() {
            let $checkbox = $(this).find("input");
            $(this).find(".checkbox__figure").toggleClass('active');
            
            if($checkbox.is(":checked")) {  
                $checkbox.removeAttr("checked");
            
            } else {
                $checkbox.attr("checked", true);
            }
        });
      }

    
    // hide filter popup
    $(".btn-arrow").on('click', function() {
        $(this).toggleClass('active');
        $(".popup__body .map-block .map-sidebar").toggleClass('slideLeft');
    });

    $(".filter-remove").on('click', function(e) {
        e.preventDefault();
        $(".map-sidebar").toggleClass('active');
     });
     // rubricator accordion
    $(".rubricator__lv1_item").on('click', function() {
        $(this).siblings(".rubricator__lv2").slideToggle(300);
    });

    //sorting
    $(".select-sorting__item").on('click', function() {
        $(this).toggleClass('active');
        $(".select-sorting__dropdown").toggleClass('active');
    });

   $(".select-sorting__option").on('click', function() {
       let optionText = $(this).text();
       let itemSelected =  $(this).closest(".select-sorting").find(".select-sorting__item");
       $(this).addClass('active').siblings().removeClass('active');
       itemSelected.text(optionText);
       itemSelected.removeClass('active');
       $(this).closest(".select-sorting").find(".select-sorting__dropdown").removeClass('active');
   });

    // Rating
    let curW = 0;
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
            let valRatingPercent = +$(this).data('percent') || 0;
            let valRating = +$(this).width() * valRatingPercent / 100;

            if (valRating > +$(this).width()) {
                valRating = +$(this).width();
            } else if (valRating < 0) {
                valRating = 0;
            }

            let ratingEl = $(this).find('.rating-list__line-value');
            ratingEl.width(valRating);
        });
    };
    calcRatingLineWidht();

    if ($('.category-tags').length) {

        $('.category-tags').slick({
            arrows: true,
            dots: false,
            variableWidth: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        $('.category-tags .slick-prev').addClass('slick-disabled');
        $('.category-tags').on('afterChange', function () {
            $('.category-tags .slick-prev').removeClass('slick-disabled');
        });
    }

    let $input = $('.counter__input_input');
    let $buffer = $('.counter__input_buffer');

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
        $('.navbar').toggleClass("active");
        $('.overlay').toggleClass("is-open");
        $('.header').toggleClass("index");

    });

    $(".navbar__close").on('click', function () {
        $(".toggle-menu").removeClass('is-active');
        $('.navbar').removeClass("is-open");
        $('.navbar').removeClass("active");
        $('.header').removeClass("index");
        $('.overlay').removeClass("is-open");

    });

    $(".overlay").on('click', function () {
        $(".toggle-menu").removeClass('is-active');
        $('.navbar').removeClass("is-open");
        $('.navbar').removeClass("active");
        $('.filter').removeClass("is-open");
        $('.header').removeClass("index");
        $(this).removeClass("is-open");
        $('body').removeClass("lock");
    });

    $(".b-drop__link").on('click', function () {
        let th = $(this);
        th.parents('.b-drop').toggleClass('is-open');
        if (th.hasClass('b-drop__link_tab')) {
            let textNew = th.data('text');
            let textOld = th.text();
            th.text(textNew);
            th.data('text', textOld);
        }
        return false;
    });

    $(".i-like").on('click', function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active')

        } else {
            $(this).addClass('is-active')
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
        if ($(event.target).closest(".dropdown").length)
            return;
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
        let openSelect = $('.select .select-dropdown.is-open');
        let btnSelect = openSelect.siblings('.select__button');

        if (openSelect.length > 0 && !btnSelect.is(event.target)) {
            if (!(openSelect.has(event.target).length > 0)) {
                openSelect.removeClass('is-open');
                btnSelect.removeClass('is-open');
            }
        }
    });

    //  Открыть фильтр карты
    $(".select").on('click', function (evt) {
        $(this).addClass('rotate-arrow').siblings().removeClass('rotate-arrow');
        // evt.preventDefault();
        if (!!$(this).data('s-selcet')) {
            let thisData = $(this).data('s-selcet');
            let thisDataTitle = $(this).data('s-select-title');

            $('[data-s-dropdown= ' + thisData + ']').siblings('.map-filter__close').find('.map-filter__close-title').text(thisDataTitle);
            $('[data-s-dropdown= ' + thisData + ']').show();

            $('.map-filter').show();
            $('.select-dropdown').not('[data-s-dropdown= ' + thisData + ']').hide();
            return false;
        } else if (!!$(this).data('select') && $(this).data('select') === 'filter') {
            if (evt.target.classList.contains('select__button')) {
                let selectDropDown = $(this).find('.select-dropdown');
                let selectBtn = $(this).find('.select__button');
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
    });

    //  Закрыть фильтр карты
    $(".map-filter__close .icon-close").on('click', function () {
        var thisData = $(this).data('s-selcet');
        $('.map-filter').hide();
        $('.select-dropdown').hide();
        $(".select").removeClass('rotate-arrow');
        return false;
    });

    $(".fb-toggle").on('click', function () {
        $(this).parents('.filter-block').toggleClass('is-open').find('.filter-block__body').slideToggle();
        $('.filter-fix-message').hide()
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
                $(this).parents('.category-tags').find('.i-hidden').removeClass('i-hidden').addClass('i-visible')
            } else {
                $(this).removeClass('is-active').html(dataNameBl);
                $(this).parents('.category-tags').find('.i-visible').removeClass('i-visible').addClass('i-hidden')
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
                $(this).parents('.toggle-contanier').find('.i-hidden').removeClass('i-hidden').addClass('i-visible')
            } else {
                $(this).removeClass('is-active').html(dataNameBl);
                $(this).parents('.toggle-contanier').find('.i-visible').removeClass('i-visible').addClass('i-hidden')
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
                $(this).parents('.filter-block__body').find('.i-hidden').removeClass('i-hidden').addClass('i-visible')
            } else {
                $(this).removeClass('is-active').html(dataNameBl);
                $(this).parents('.filter-block__body').find('.i-visible').removeClass('i-visible').addClass('i-hidden')
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
                $(this).parents('.collection-wrap__item').find('.i-hidden').removeClass('i-hidden').addClass('i-visible')
                $(this).parents('.collection-wrap__item').find('.cl-toggle').not($(this)).html('Cвернуть');
                $(this).parents('.collection-wrap__item').find('.material-list').hide()
            } else {
                $(this).html(dataNameBl);
                $(this).parents('.collection-wrap__item').find('.i-visible').removeClass('i-visible').addClass('i-hidden')
                $(this).parents('.collection-wrap__item').find('.cl-toggle').not($(this)).html(dataNameBl);
                $(this).parents('.collection-wrap__item').find('.material-list').show()
            }

            return false;
        });

    }
    openAllCollection();

    function sortingGridProduct() {
        $('.sorting-grid__item').on('click', function () {
            $('.sorting-grid__item').removeClass('is-active')
            $(this).addClass('is-active')
            if ($(this).hasClass('sorting-grid__item--grid')) {
                $('.products-list').hide();
                $('.products-grid').show();
                $(".content .catalog-item").removeClass("list");
            } else {
                $('.products-list').show();
                $('.products-grid').hide();
                $(".content .catalog-item").addClass("list");
            }
            return false;
        });
    }
    sortingGridProduct();

    function openNavDropdown() {
        $('.is-dropdown > a').on('click', function () {
            $(this).parent().toggleClass('is-open')
            return false;
        });

    }
    openNavDropdown();

    function openMapFilterDropdown() {
        $('.sl-dropdown').on('click', function () {

            $(this).parents('.select-dropdown__body').find('.select-list__item > ul').not($(this).next()).slideUp(200)
            $(this).parents('.select-dropdown__body').find('.sl-dropdown').not($(this)).removeClass('is-open')
            $(this).toggleClass('is-open').next().slideToggle(200)

            return false;
        });
        $('.sl-sub-dropdown').on('click', function () {

            $(this).parents('.select-dropdown__body').find('.select-sub-list__item > ul').not($(this).next()).slideUp(200)
            $(this).parents('.select-dropdown__body').find('.sl-sub-dropdown').not($(this)).removeClass('is-open')
            $(this).toggleClass('is-open').next().slideToggle(200)

            return false;
        });

    }
    openMapFilterDropdown();

    $('.go-map').bind('click.smoothscroll', function () {

        $('#tabs_2').parents('.tab-wrap').find('.nav-tab__item').removeClass('is-active')
        $('#tabs_2').parents('.tab-wrap').find('.nav-tab__link[href="#tabs_2"]').parent().addClass('is-active')
        $('#tabs_2').parents('.box-tab').find('.tab-cont').addClass('is-hidden')
        $('#tabs_2').removeClass('is-hidden')
        setTimeout(function () {
            var bl_top = $('#tabs_2').offset().top;
            $('body,html').animate({scrollTop: bl_top}, 600);
        }, 100)


        return false;
    });

    function filterFixMessage() {
        $('.fxm').on('click', function () {
            var checkblock = $(this).find('input')
            var obj = $(this).position().top;
            if (checkblock.is(':checked')) {
                $('.filter-fix-message').show().css({'top': obj})
            } else {
                $('.filter-fix-message').hide()
            }

        });

        $(document).click(function (event) {
            if ($(event.target).closest(".filter-block__body").length)
                return;
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
            let trgt = $('#' + $(this).data('go'));
            let h = trgt.offset().top;
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
            $('.tab-wrap .styler').trigger('refresh')
            return false
        }
    });

    $('.tabs-s a').on('click', function () {
        $(this).parents('.tab-s-wrap').find('.tab-s-cont').addClass('is-hidden');
        $(this).parent().siblings().removeClass('is-active');
        var id = $(this).attr('href');
        $(id).removeClass('is-hidden');
        $(this).parent().addClass('is-active');
        return false
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

  
    if ($('.slider').length) {
        $('.slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.slider-pagination',
            prevArrow: '<button class="slick-arrow slick-prev"><img src="img/next.svg" alt="" /></button>',
            nextArrow: '<button class="slick-arrow slick-next"><img src="img/next.svg" alt="" /></button>',
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        variableWidth: true,
                        infinite: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        variableWidth: true,
                        infinite: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        variableWidth: true,
                        infinite: true
                    }
                }
                ,
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        // centerMode: true,
                        arrows: false,
                        variableWidth: true,
                        infinite: true
                    }
                }
            ]
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
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        variableWidth: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                        arrows: false,
                    }
                }
            ]
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
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        variableWidth: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                        arrows: false,
                    }
                }
            ]
        });
    }

    if (window.matchMedia("(max-width: 992px)").matches) {
        $('.slider.unslick-mob').slick('unslick');
    }
    /* Range */
    if ($("#range").length > 0) {
        $("#range").slider({
            range: true,
            min: 0,
            max: 12398,
            values: [350, 10398],
            slide: function (event, ui) {
                $('#rangefrom').val(ui.values[0].toLocaleString());
                $('#rangeto').val(ui.values[1].toLocaleString());


            },
            stop: function (event, ui) {
                var obj = $(this).position().top;
                $('.filter-fix-message').show().css({'top': obj - 11})
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
        responsive: [
            {
                breakpoint: 1259,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: "unslick"
            },
        ]
    });
  
    $('.banner-slider').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        fade: true,
    });

    // Sticky header
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

    if (window.matchMedia("(max-width: 575px)").matches) {
        $('.card-slider-for__wripper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            centerMode: true,
            infinite: true,
            asNavFor: '.card-slider-nav'
          });
        $('.card-slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: false,
            asNavFor: '.card-slider-for__wripper',
            dots: false,
            arrows: false,
            focusOnSelect: true,
            variableWidth: true,
            // centerMode: true,
            // centerPadding: '30px'
          });
    }
    
    if (window.matchMedia("(max-width: 575px)").matches) {
        $(".card-slider-nav__item, .card-slider-for img").removeClass('open-popup is-active i-hidden');
        $(".card-slider-nav__item_more").closest(".slick-slide").remove();
        
    }
 
    if (window.matchMedia("(min-width: 576px)").matches) { 
        if (!!$('.card-slider-nav__item').length) {
            $('.card-slider').on('mouseover', function(evt) {
                let self = $(this);
                let tgt = $(evt.target);
                if (tgt.hasClass('card-slider-nav__item')) {
                    if (!tgt.hasClass('is-active')) {
                        $('.card-slider-nav__item').removeClass('is-active');
                        tgt.addClass('is-active');
    
                        // $('.gallery').attr('data-active', tgt.data('img-idx'));
    
                        setNewImg(tgt.data('img-idx'));
    
                        let srcImg = tgt.data('img');
                        let srcBigImg = tgt.data('big-img') || tgt.data('img');
    
                        let bigImg = self.find('.card-slider-for img');
    
                        bigImg.attr('src', srcImg);
                        bigImg.attr('data-large', srcBigImg);
                    }
                }
            });
        }
    }

    if ((typeof $.fn.imagezoomsl !== 'undefined') && ($(window).width() > 767)) {
        $('.img-zoom').imagezoomsl({
            zoomrange: [1, 12],
            zoomstart: 3,
            classmagnifier: "classmagnifier1",
            innerzoom: true,
            magnifierborder: "none"
        });
    }

    // Галлерея изображения

    $('.gallery__preview-item').each(function(idx) {
        $(this).attr('data-img-idx', idx)
    });

    $('.card-slider-nav__item').each(function(idx) {
        $(this).attr('data-img-idx', idx)
    });

    let activeItemIdx = $('.gallery').data('active');
    let bigImg = $('.gallery__view-img');

    let curSlide = activeItemIdx;
    setNewImg(activeItemIdx);

    $(document).on('click', function(evt) {
        if ($(evt.target).hasClass('tracker')) {
            evt.preventDefault();
            $('.popup-content').removeClass('active');
            $('.popup-content[data-popup="gallery"]').addClass('popup-content__p0');
            $('.popup-wrapper, .popup-content[data-popup="gallery"]').addClass('active');
            $('html').addClass('overflow-hidden');
            return false;
        }
    });

    $('.gallery').on('click', function(evt) {
        let tgt = evt.target;

        if ($(tgt).hasClass('gallery__preview-item')) {
            let clickIdx = $(tgt).data('img-idx');
            setNewImg(clickIdx);
        }

        if ($(tgt).parent().hasClass('gallery__btn_prev') || $(tgt).hasClass('gallery__btn_prev')) {
            let changeSlide = +curSlide - 1;
            if (changeSlide < 0) {
                changeSlide = 15;
            }
            setNewImg(changeSlide);
        }

        if ($(tgt).parent().hasClass('gallery__btn_next') || $(tgt).hasClass('gallery__btn_next')) {
            let changeSlide = +curSlide + 1;
            if (changeSlide > 15) {
                changeSlide = 0;
            }
            setNewImg(changeSlide);
        }

    });

    function setNewImg(i) {
        $('.gallery__preview-item').removeClass('active');

        let activeItem = $('.gallery').find('.gallery__preview-item[data-img-idx=' + i + ']');

        activeItem.addClass('active');

        let activeItemImg = activeItem.data('img');
        bigImg.attr('src', activeItemImg);
        curSlide = i;
        $('.gallery').attr('data-active', i);
    };

    let galleryLite = $('.js-card-slider-lite');

    if (galleryLite.length > 0) {
        galleryLite.on('click', function(evt) {
            let th = $(this);
            let curentSlide = th.find('.card-slider-nav__item.is-active');
            let slides       = th.find('.card-slider-nav__item');
            let prevSlide   = curentSlide.prev();
            let nextSlide   = curentSlide.next();
            let generalSlide = th.find('.card-slider-for img');

            if (prevSlide.length === 0) {
                prevSlide = $(slides[slides.length - 2]);
            }

            if ((nextSlide.length === 0) || (nextSlide.hasClass('card-slider-nav__item_more'))) {
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
        slideChange.addClass('is-active')
        let slideImg = slideChange.data('img');
        img.attr('src', slideImg);
        img.attr('data-large', slideImg);
    }

    /* Popup */
    /* ---------------------------------------------- */
    
    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        let curentPopup = $(this).data('popup');

        if (curentPopup === 'gallery') {
            let idxImg = $('.card-slider-nav__item.is-active').data('img-idx');
            $('.popup-content[data-popup="' + curentPopup + '"]').addClass('popup-content__p0');
        }

        if (curentPopup === 'full-map') {
            $('.popup-content[data-popup="' + curentPopup + '"]').addClass('popup-content__p0');
            myFullMap.container.fitToViewport();;
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
        if (e.target !== this)
            return;
        $('.popup-wrapper, .popup-content').removeClass('active');
        $('html').removeClass('overflow-hidden');
        return false;
    });

});

var myMap;          // заглобалим переменную карты чтобы можно было ею вертеть из любого места
var myFullMap;      // заглобалим переменную карты чтобы можно было ею вертеть из любого места

function getYaMap() {
    if (!!$('#map').length && !!$('#full-map').length) {
        ymaps.ready(init);  // карта соберется после загрузки скрипта и элементов

        function init() {   // функция - собиралка карты и фигни
            myMap = new ymaps.Map("map", {
                center: [55.635691, 37.009368],
                zoom: 10,
                controls: [],

            });

            myFullMap = new ymaps.Map("full-map", {
                center: [55.635691, 37.009368],
                zoom: 10,
                controls: [],

            });

            myMap.behaviors.disable('scrollZoom', 'drag');
            myFullMap.behaviors.disable('scrollZoom', 'drag');

            myMap.controls.add('zoomControl', {position: {right: '20px', bottom: '108px'}});
            myFullMap.controls.add('zoomControl', {position: {right: '20px', bottom: '108px'}});

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                // hintContent: 'Собственный значок метки',
                balloonContentHeader: ' <div class="map-header"><img src="img/isolux_logo.png" alt="logo" class="map-logo"></div> ',
                balloonContentBody: '   <div class="map-content"><p class="map-title">Изолюкс</p> <p class="map-address">Москва, ул. Большая Сыромятническая, д. 5к2</p><p class="map-phone"><span>Телефон: </span> +7 (495) 897-52-33</p> <p class="map-graphic"><span>Режим работы:</span> Пн-Пт - 09:00-19:00, Сб - 09:00-19:00, Вс - 09:00-19:00</p><a href="#" class="btn btn-white">Перейти на сайт</a></div>',
            }, {
                iconLayout: 'default#image',

            })

            /* Добавляем метки на карту */
            myMap.geoObjects.add(myPlacemark);
            myFullMap.geoObjects.add(myPlacemark);

            //  Open map
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

        }
        let widthDots = $(".catalog-product").find(".slick-dots").width();
        console.log(widthDots);
        $(".catalog-product .slick-prev").css("right", widthDots +  63 + "px ");
    }
};
getYaMap();