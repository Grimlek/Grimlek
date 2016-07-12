/**
 * Created by csexton on 6/30/16.
 */
/*
* Setup object for the different slide groups and represents the current slide num
* for pass by reference parameters and styling.
*/
var classworkSlide = { num: 0 };
var personalSlide = { num: 0 };

// Class project slides, some are dynamically added
var gameOfPigSlides = ['div#pig-slide-0'];
var tetrisBrainSlides = ['div#tetris-slide-0'];
var shapeMakerSlides = ['div#shape-slide-0'];
var boundedQueueComponentSlides = ['div#component-slide-0'];
var adventureGameSlides = ['div#adventure-slide-0'];

// Personal project slides, some are dynamically added
var tscoAppSlides = ['div#tsco-slide-0', 'div#tsco-slide-1', 'div#tsco-slide-2'];


$(function () {
    arrowsClickEvent($('input#left-arrow-classwork'), $('input#right-arrow-classwork'), classworkSlide, gameOfPigSlides);
    arrowsClickEvent($('input#left-arrow-personal'), $('input#right-arrow-personal'), personalSlide, tscoAppSlides);
    tabHoverEvent($("a.active"));
    tabClickEvent($("a.tab, a.active"));
});


/*
* Changes the active tab to the tab that was clicked, also changes the slide content.
 */
function changeActiveTab($activeTab, $selectedTab) {
    // Change Event Listeners and class names for the current active tab
    $activeTab.off('mouseenter mouseleave');
    $activeTab.removeClass('active').addClass('tab');
    $activeTab.removeAttr('style');

    // Setup the clicked tab
    $selectedTab.removeClass('tab').addClass('active');
    tabHoverEvent($selectedTab);
    $selectedTab.parent().parent().children('div').next().css('opacity', '.75');

    // Change slide content for the appropriate tab clicked
    hideSlide($activeTab.text());
    showNewSlide($selectedTab.text());
    resetSlideNum($($selectedTab).parent().attr('id'));
}


/*
* Resets the current slide group number. This is needed for new slides to reset the currently shown slide to the first one.
 */
function resetSlideNum(containerId) {
    switch(containerId) {
        case 'classwork-tabs':
            classworkSlide.num = 0;
            break;
        case 'personal-tabs':
            personalSlide.num = 0;
            break;
    }
}


/*
* Unbinds and binds the left and right arrows for the specified arrows per a particular slide group.
 */
function arrowsClickEvent($leftArrowElement, $rightArrowElement, slideNum, slides) {
    $rightArrowElement.off('click').on('click', function () {
        rightArrowNext(slideNum, slides);
    });
    $leftArrowElement.off('click').on('click', function () {
        leftArrowNext(slideNum, slides);
    });
}


/*
* Shows the new set of slides and resets the arrows for that particular slide group.
 */
function showNewSlide(tabName) {
    classworkArrows = { left: $('input#left-arrow-classwork'), right: $('input#right-arrow-classwork')};
    personalArrows = { left: $('input#left-arrow-personal'), right: $('input#right-arrow-personal')};
    switch(tabName) {
        case 'Game of Pig':
            $(gameOfPigSlides[0]).removeClass('hidden');
            arrowsClickEvent(classworkArrows.left, classworkArrows.right, classworkSlide, gameOfPigSlides);
            break;
        case 'Tetris Brain':
            $(tetrisBrainSlides[0]).removeClass('hidden');
            arrowsClickEvent(classworkArrows.left, classworkArrows.right, classworkSlide, tetrisBrainSlides);
            break;
        case 'Shape Maker':
            $(shapeMakerSlides[0]).removeClass('hidden');
            arrowsClickEvent(classworkArrows.left, classworkArrows.right, classworkSlide, shapeMakerSlides);
            break;
        case 'Bounded Queue Component':
            $(boundedQueueComponentSlides[0]).removeClass('hidden');
            arrowsClickEvent(classworkArrows.left, classworkArrows.right, classworkSlide, boundedQueueComponentSlides);
            break;
        case 'Adventure Game':
            $(adventureGameSlides[0]).removeClass('hidden');
            arrowsClickEvent(classworkArrows.left, classworkArrows.right, classworkSlide, adventureGameSlides);
            break;
        case 'TSCO Application':
            $(tscoAppSlides[0]).removeClass('hidden');
            arrowsClickEvent(personalArrows.left, personalArrows.right, personalSlide, tscoAppSlides);
            break;
    }
}


/*
* Hides the current visible slide based on the tab name specified.
 */
function hideSlide(tabName) {
    switch(tabName) {
        case 'Game of Pig':
            $(gameOfPigSlides[classworkSlide.num]).addClass('hidden');
            break;
        case 'Tetris Brain':
            $(tetrisBrainSlides[classworkSlide.num]).addClass('hidden');
            break;
        case 'Shape Maker':
            $(shapeMakerSlides[classworkSlide.num]).addClass('hidden');
            break;
        case 'Bounded Queue Component':
            $(boundedQueueComponentSlides[classworkSlide.num]).addClass('hidden');
            break;
        case 'Adventure Game':
            $(adventureGameSlides[classworkSlide.num]).addClass('hidden');
            break;
        case 'TSCO Application':
            $(tscoAppSlides[personalSlide.num]).addClass('hidden');
            break;
    }
}


/*
* Unbinds and binds a particular click event to the selected tab(s) based on a particular tab group.
 */
function tabClickEvent($element) {
    $element.off('click').on('click', function () {
        containerId = $(this).parent().attr('id');
        if (containerId == 'classwork-tabs') {
            changeActiveTab($('div#classwork-tabs a.active'), $(this));
        }
    });
}


/*
 * Unbinds and binds mouse enter and mouse leave events to the selected tab(s).
 */
function tabHoverEvent($element) {
    $element.off('mouseenter').on('mouseenter', function () {
        changeSlideOpacity($(this), '.75');
    });
    $element.off('mouseleave').on('mouseleave', function () {
        changeSlideOpacity($(this), '1');
    });
}


function changeSlideOpacity($element, opacity) {
    if ($element.parent().attr('id') == 'classwork-tabs') {
        $("div#classwork-container").css('opacity', opacity);
    }
    else if ($element.parent().attr('id') == 'personal-tabs') {
        $("div#personal-container").css('opacity', opacity);
    }
}


/*
* On right arrow click changes the current slide based on the current slide number and the slide array passed in. The
 * current slide number is an object with the variable num. The passed in current slide number must be an object to
 * obtain pass by reference instead of value.
 */
function rightArrowNext(currentSlide, slideArray) {
    if (slideArray.length == currentSlide.num + 1) {
        $(slideArray[slideArray.length - 1]).addClass('hidden');
        var $nextSlide = $(slideArray[0]);
        $nextSlide.removeClass('hidden');
        $('a.active').css('background-color', $nextSlide.css('backgroundColor'));
        currentSlide.num = 0;
    }
    else {
        for (var i = 0; i < slideArray.length; i++) {
            if (i == currentSlide.num) {
                console.log('nested if');
                $(slideArray[i]).addClass('hidden');
                var $nextSlide = $(slideArray[i + 1]);
                $nextSlide.removeClass('hidden');
                $('a.active').css('background-color', $nextSlide.css('backgroundColor'));
                currentSlide.num++;
                break;
            }
        }
    }
}


/*
 * On left arrow click changes the current slide based on the current slide number and the slide array passed in. The
 * current slide number is an object with the variable num. The passed in current slide number must be an object to
 * obtain pass by reference instead of value.
 */
function leftArrowNext(currentSlide, slideArray) {
    if (currentSlide.num == 0) {
        $(slideArray[0]).addClass('hidden');
        var $nextSlide = $(slideArray[slideArray.length - 1]);
        $nextSlide.removeClass('hidden');
        $('a.active').css('background-color', $nextSlide.css('backgroundColor'));
        currentSlide.num = slideArray.length - 1;
    }
    else {
        for (var i = 0; i < slideArray.length; i++) {
            if (i == currentSlide.num) {
                $(slideArray[i]).addClass('hidden');
                var $nextSlide = $(slideArray[i - 1]);
                $nextSlide.removeClass('hidden');
                $('a.active').css('background-color', $nextSlide.css('backgroundColor'));
                currentSlide.num--;
                break;
            }
        }
    }
}


/*
* Returns a promise that gets a Gist using JSONP (security concern if web app uses sensitive data),
* adds it to the DOM and then adds it to the correct slide set.
 */
function getGistSlide(jsonpUrl, slideId, slideClassNames, slideArray) {
    return $.getJSON(jsonpUrl, function (result) {
        $('div#classwork-container').append('<div id="' + slideId + '" class="row slide hidden ' + slideClassNames + '"><div class="col-xs-offset-2 col-xs-8">' + result.div + '</div></div>');
        $('head').append('<link rel="stylesheet" href="' + result.stylesheet + '"/>');
        slideArray.push('div#' + slideId);
    });
}

/*
*
* Add all the gists to the DOM. Chain promises to load in the desired order.
*
*/
getGistSlide("https://gist.github.com/Grimlek/dc607ba0049b76db9b0e7a85fe67ebc5.json?callback=?", 'pig-slide-1', 'sub-slide-1', gameOfPigSlides);
getGistSlide("https://gist.github.com/Grimlek/9a4fba6ee232453d3726e9b4ea16967e.json?callback=?", 'tetris-slide-1', 'sub-slide-1', tetrisBrainSlides);
getGistSlide("https://gist.github.com/Grimlek/6fa059db141ca0e6ba27ae213e097926.json?callback=?", 'shape-slide-1', 'sub-slide-1', shapeMakerSlides);
getGistSlide("https://gist.github.com/Grimlek/231eaa8fa36a3784660afcbde379f6e4.json?callback=?", 'component-slide-1', 'sub-slide-1', boundedQueueComponentSlides).then( function() {
    getGistSlide("https://gist.github.com/Grimlek/a2699e940c638ca6f5c0316420ea8d05.json?callback=?", 'component-slide-2', 'sub-slide-2', boundedQueueComponentSlides);
});
getGistSlide("https://gist.github.com/Grimlek/156c9082872bccff8013a5adcbf6e1c4.json?callback=?", 'adventure-slide-1', 'sub-slide-1', adventureGameSlides).then( function () {
    return getGistSlide("https://gist.github.com/Grimlek/bd67652930d8699e357ab1fae6ec3da6.json?callback=?", 'adventure-slide-2', 'sub-slide-2', adventureGameSlides);
}).then( function () {
    getGistSlide("https://gist.github.com/Grimlek/ae65778b6a1289677f4ad87cb444762d.json?callback=?", 'adventure-slide-3', 'sub-slide-3', adventureGameSlides);
});


// $gameOfPigSlide = '<div id="game-of-pig" class="row slide main-slide">' +
//     '<div class="col-xs-offset-1 col-xs-6">' +
//     '<img src="http://res.cloudinary.com/grimly/image/upload/c_scale,h_506,q_100,r_0,w_600/v1467253684/Screen_Shot_2016-06-29_at_10.22.59_PM_xbcb3b.png"/>' +
//     '</div>' +
//     '<div class="col-xs-5 col-lg-5">' +
//     '<h4>The Game of Pig</h4>' +
//     '<p>This project is one of the best examples of my expertise with object oriented programming in Java. The' +
//     'project was a school assignment in CS5044 at Virginia Tech and a very interesting one. The Game of Pig' +
//     'is a command line interface program in' +
//     'which the user plays against the computer. Both the user and the computer take turns rolling a pair of' +
//     'dice. The first player to a hundred points wins the game. For more game specific details please see the' +
//     '<a target="_blank" href="https://github.com/Grimlek/Course-Work/blob/master/Pig%20Game/README.md">project outline</a>.' +
//     '</p>' +
//     '</div>' +
//     '</div>';