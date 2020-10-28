
	    /** global **/
var html = document.getElementsByTagName('html')[0];
html.style.opacity = '0';
var currentURL = window.location.href;
var posts = $('#posts');
var device = new MobileDetect(window.navigator.userAgent);
if(html.id == 'ind' && html.getAttribute('data-layout').indexOf('fixed') == -1 && device.phone() == null && device.tablet() == null){
	var postHeightCheck = true;
}else{
	var postHeightCheck = false;
	
}
/** global **/

//evil tricks https://stackoverflow.com/questions/1472303/jquery-get-width-of-element-when-not-visible-display-none

$.fn.getHiddenDimensions = function (includeMargin) {
    var $item = this,
    props = { position: 'absolute', visibility: 'hidden', display: 'block' },
    dim = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 },
    $hiddenParents = $item.parents().andSelf().not(':visible'),
    includeMargin = (includeMargin == null) ? false : includeMargin;

    var oldProps = [];
    $hiddenParents.each(function () {
        var old = {};

        for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
        }

        oldProps.push(old);
    });

    dim.width = $item.width();
    dim.outerWidth = $item.outerWidth(includeMargin);
    dim.innerWidth = $item.innerWidth();
    dim.height = $item.height();
    dim.innerHeight = $item.innerHeight();
    dim.outerHeight = $item.outerHeight(includeMargin);

    $hiddenParents.each(function (i) {
        var old = oldProps[i];
        for (var name in props) {
            this.style[name] = old[name];
			this.classList.add('getwidth')
        }
    });

    return dim;
}


//evil tricks


if (currentURL.indexOf('tagged') > -1) {
    html.classList.add('this-is-tag')
}

if(html.id == 'per'){
    if (currentURL.indexOf('post') > -1) {
        html.classList.add('this-is-permalink')
    }else{
        html.classList.add('this-is-page');
    }
}

if (currentURL.indexOf('customize') > -1) {
    html.classList.add('customize')
}
if (currentURL.indexOf('/page/') > -1) {
    html.classList.add('page-page')
}
if (device.phone()) {
    html.classList.add('mobile-version')
    html.classList.add('remote')
    html.classList.add('use-caption')
}

if (device.tablet()) {
    html.classList.add('tablet-version')
    html.classList.add('remote')
    html.classList.add('use-caption')
}

if (!device.tablet() && !device.phone()) {
    html.classList.add('desktop-version')
}

// IE8 and the lower. Who would use this browser anyways? 
if (document.all && !document.addEventListener) {
    window.location.href = 'https://browsehappy.com';
}


// IE doesn't support closest function.   
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}
// IE doesn't support closest function.

// number change to abbreviated number on post note counts
function nFormatter(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num;
}

var numberChange = function() {
        var noteCount = document.querySelectorAll('.notecount');
        for (var i = 0; i < noteCount.length; i++) {
            newCounts = noteCount[i].innerHTML;
            newCounts = nFormatter(newCounts)
            noteCount[i].innerHTML = newCounts;
        }
    }
    // number change to abbreviated number on post note counts

// TUMBLR LAYOUT BY THEMECLOSET //
// TUMBLR LAYOUT BY THEMECLOSET //
// TUMBLR LAYOUT BY THEMECLOSET //
// TUMBLR LAYOUT BY THEMECLOSET //
// TUMBLR LAYOUT BY THEMECLOSET // 

    

    
    
var imageLoadedFunction = function(selector, height, width) {

    var parentPhoto = selector.closest('.photo');
    var selectorHeight = selector.getAttribute('data-height');

    if (html.classList.toString().indexOf('fixed-layout') > -1) {
        var selectorWidth = 1280;
    }else{
        var selectorWidth = width.replace(/\D/g, "");
    }
    // trim px

    //set up height based on the data height value //250
    
    selectorHeight = parseInt(selectorHeight * (selectorWidth / 250));
    
    selector.style.height = selectorHeight + 'px';
    //set up height based on the data height value //250
 
    //functions until the images doesn't have 0 value
    var determine = setInterval(function() {
        if (selectorWidth == 0) {
            selectorWidth = selector.closest('.post-content').scrollWidth;
        }
        if (selectorWidth > 0) {

            if (selectorWidth >= 600) {
                selector.src = selector.getAttribute('data-image-retina');
            }
            if (selectorWidth < 600) {
                selector.src = selector.getAttribute('data-image-big');
            }
            if (selectorWidth <= 400) {
                selector.src = selector.getAttribute('data-image-medium');
            }

            if (selectorWidth <= 250) {
                selector.src = selector.getAttribute('data-image-small');
            }
            if(height >= 400){
                
                selector.src = selector.getAttribute('data-image-big');
            }
            if(height >= 600){
                
                selector.src = selector.getAttribute('data-image-retina');
            }
            
            if (device.tablet()) {
                selector.src = selector.getAttribute('data-image-retina');
            }

            if (device.phone()) {
                selector.src = selector.getAttribute('data-image-medium');
            }


            selector.closest('.post-content').classList.add('loaded');


    
    // this is for the post height
    if (height != 'auto' && postHeightCheck == true) { 

    parentPhoto.querySelectorAll('a')[0].style.backgroundImage = 'url('+parentPhoto.querySelectorAll('img')[0].getAttribute('data-image-retina')+')';
    selector.style.height = height;
    parentPhoto.classList.add('fixed-height');
         
    }else{
        
        selector.style.height = 'auto';
    }
    // this is for the post height
            if($(selector).imagesLoaded().length == 1){
                if(html.getAttribute('data-layout').indexOf('puzzle') > -1){
                selector.src = selector.getAttribute('data-image-retina');
                }
                clearInterval(determine);
                selector.removeAttribute('onload');
            }
            
        }
        
        posts.masonry(); 
    }, 100)


	}


// starts masonry and inifnite scroll
var layoutArrange = function(container, content, paginateContainer, paginateNext, mode) {
        var posts = $('#posts');
        if(html.getAttribute('data-layout').indexOf('puzzle') == -1){
            posts.masonry({
                itemSelector: content,
                transitionDuration: 0,
                fitWidth: true,
            });
             posts.masonry('on', 'layoutComplete', function() {
                html.classList.add('body-loaded');
                html.style.opacity = '1';
            });
        }else{            
            posts.masonry({
                fitWidth: true
            });
            html.classList.add('body-loaded');
            html.style.opacity = '1';
            
        }
       

        /** for not infinite **/


        if (mode == 'infinite' || mode == 'loadmore') {
            posts.infinitescroll({
                bufferPx: 2000 + $(window).height() / 2,
                navSelector: paginateContainer,
                nextSelector: paginateNext,
                itemSelector: content,
                loading: {
                    finishedMsg: function() {
                    $('#loadmore div').text(document.getElementById('loadmore').getAttribute('data-no-posts'));
                    },
                },
            }, function(t) {
                var i = $(t);
                $(t).addClass('infinite_appended');
                o = 0;
                a = i.map(function() {
                    return this.id
                }).get();
                Tumblr.LikeButton.get_status_by_post_ids(a);


                // recall
                numberChange();
				imageToHighresInTexts();
                // when images loaded rearrange 
                posts.imagesLoaded(function() {
                    photosetArrange();
                    setTimeout(function() {
                        $(t).addClass('loaded');
                        posts.masonry();
                    }, 300)
                    posts.masonry("appended", i);
                    $('#loadmore div').text(document.getElementById('loadmore').getAttribute('data-load'));

                })
                
            });
            
            if(mode == 'loadmore'){
                posts.infinitescroll('pause');
            }else{
            if(document.querySelectorAll(paginateNext)[0]){
                posts.infinitescroll('retrieve');}
            }
        }
        
        /** for not infinite **/


        $('#posts').imagesLoaded({
            background: true
        }, function() {
            setTimeout(function() {
                $('#posts').masonry();
                $(window).trigger('resize')
            },600);
        })
    
    }
    // starts masonry and inifnite scroll

var loadMore = function(selector){
    $('#posts').infinitescroll('retrieve')
    selector.querySelectorAll('div')[0].innerHTML = document.getElementById('loadmore').getAttribute('data-loading')+'..';
}

var textShorten = function(){
    var textpost = document.querySelectorAll('.text-body');
    for(var i = 0; i < textpost.length; i++){
        if(textpost[i].innerHTML.length >= 250){
           var link = textpost[i].closest('.post-content').querySelectorAll('.permalink-link a')[0].href;
        textpost[i].innerHTML = '<p>'+textpost[i].querySelectorAll('p')[0].innerHTML.slice(0,250) + '...</p><p><a href="'+link+'" target="_blank">Read more</a></p>';}
    }
}


var layout = function(commend, spacing) {
    var container = html;
    
    if (commend.indexOf('fixed') > -1) {
        var commend = commend.split(' ');
        var column = commend[0];
        var size = '-fixed-' + commend[1];
        html.classList.add('fixed-layout')
    } else if(commend.indexOf('puzzle') > -1){
        var commend = commend.split(' ');
        html.classList.add('puzzle-layout-'+commend[1])
    } else {
        commend = commend.split(' ');
        var column = commend[0];
        var size = parseInt(commend[1]);
    }

    /** add class to the container => layout400px **/
    html.classList.add('layout' + size)
    /** add class to the container **/
    var container = document.getElementById('layout');
	
    if(html.getAttribute('data-layout').match(/\d+$/)[0] <= 500){
        html.classList.add('small-layout')
    }

    document.addEventListener('DOMContentLoaded', function() {
        
        if(document.getElementById('pagination').querySelectorAll('.pagination_nextlink').length == 0){
            document.getElementById('loadmore').remove()
        }
        
        container = document.getElementById('layout');
        if (column == 'one') {
            size = size + (spacing * 2);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'two') {
            size = (size * 2) + (spacing * 4);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'three') {
            size = (size * 3) + (spacing * 6);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'four') {
            size = (size * 4) + (spacing * 8);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'five') {
            size = (size * 5) + (spacing * 10);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'six') {
            size = (size * 6) + (spacing * 12);
            container.style.maxWidth = size + 'px';
        }

        if (column == 'seven') {
            size = (size * 7) + (spacing * 14);
            container.style.maxWidth = size + 'px';
        }
    
            setTimeout(function(){ 
                $('#posts').masonry();  
                
    
            var videoSelector = document.querySelectorAll('.video iframe');
            for(var i = 0; i < videoSelector.length; i++){
                videoSelector[i].height = videoSelector[i].offsetWidth - 100;
        	}
            },300)
    });
    
    var videoSelector = document.querySelectorAll('.video iframe');
    for(var i = 0; i < videoSelector.length; i++){
        videoSelector[i].height = videoSelector[i].offsetWidth - 100;
	}
}


// if it's photoset it needs to be swaped.
var clickMoveLightbox = function(selector) {
    document.getElementById('lightbox-content').querySelectorAll('img')[0].src = selector.getAttribute('data-image');
    document.getElementsByClassName('active')[0]
    selector.classList.add('active')
}

var movePhotoset = function(selector, type){
    var src = selector.closest('#lightbox').querySelectorAll('.lightbox-image img')[0].src;
    var currentIndex = selector.closest('#lightbox').querySelectorAll('#lightbox-photoset span[data-image="'+src+'"]')[0].getAttribute('data-index')
    var maxIndex = selector.closest('#lightbox').querySelectorAll('#lightbox-photoset span[data-image="'+src+'"]')[0].getAttribute('data-max')
    if(type == 'next'){
        
            if(maxIndex == currentIndex){
                currentIndex = 0;
            }
    currentIndex = parseInt(currentIndex) + 1;
    }
    
    if(type == 'prev'){
        
    if(currentIndex == 0){
        currentIndex = maxIndex;
    }else{
        currentIndex = parseInt(currentIndex) - 1;}
        
    }
    maxIndex = parseInt(maxIndex);
    
    
    var imageURL = selector.closest('#lightbox').querySelectorAll('#lightbox-photoset span[data-index="'+currentIndex+'"]')[0].getAttribute('data-image');
    selector.closest('#lightbox').querySelectorAll('.lightbox-image img')[0].src = imageURL;
}



// this is for your lightbox
var lightbox = function(selector, type) {

    if (html.classList.toString().indexOf('disable-lightbox') > -1) {
        return false;
    } else {
        selector.removeAttribute('href');
        selector.removeAttribute('target');
    }

    if (type == 'photoset') {
        var photosetImages = []
        var photosetImagesSrc = '';
        var images = selector.closest('.post').querySelectorAll('.photoset img');
 
        for (var i = 0; i < images.length; i++) {
            photosetImages[i] = images[i].outerHTML
            photosetImagesSrc += '<span onclick="clickMoveLightbox(this)" class="" data-index="'+i+'" data-max="'+(images.length - 1)+'" style="background-image:url(' + images[i].src + ');" class="" data-image=' + images[i].getAttribute('data-image') + '></span>';
        }
        document.getElementById('lightbox').innerHTML = '<div '+'id="lightbox-content" data-type="photoset" onClick="event.stopPropagation()"><div class="lightbox-image"><img src="' + selector.getAttribute('data-image') + '"></div></div><div id="lightbox-photoset">' + photosetImagesSrc + '</div><div id="lightbox-control"><div data-icon="W" onclick="movePhotoset(this,\'prev\')"></div><div data-icon="V" onclick="movePhotoset(this,\'next\')"></div></div><div id="lightbox-close" onclick="closeLightbox()" data-icon="&#xe008;"></div>';

    } else {

        var dataImage = selector.getAttribute('data-image');
        document.getElementById('lightbox').innerHTML = '<div id="lightbox-content" data-type="photo" onClick="event.stopPropagation()"><img src="' + dataImage + '"></div><div  onclick="closeLightbox()" id="lightbox-close" data-icon="&#xe008;"></div>';

    }



    document.getElementById('lightbox').style.display = 'block';
    html.style.overflow = 'hidden';
}


//global close lightbox
var closeLightbox = function(selector) {
    document.getElementById('lightbox').style.display = 'none';
    html.style.overflow = 'auto';
}



// to close lightbox by 'Esc' key press
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        document.getElementById('lightbox').style.display = 'none';
        html.style.overflow = 'auto';
    }
    $('#posts').masonry();
};



// arrange photoset as the old one is loaded by iframe
var photosetArrange = function() {

    // if use selects the first image only show up
    var showfistImageOnly = false;
    if (html.classList.toString().indexOf('show-first-photoset') > -1) {
        showfistImageOnly = true;
    }


    // prevent function if already done. Added yet as not functioned
    var photosets = document.querySelectorAll('.photoset.yet');


    //starts beautifying
    for (var i = 0; i < photosets.length; i++) {

        //initial set up the first splits the arrange data given by Tumblr
        arrange = photosets[i].getAttribute('data-layout-arrangement').split("");
        images = [];
        photosetElements = [];


        //push images to the array
        for (var img = 0; img < photosets[i].querySelectorAll('img').length; img++) {
            images[img] = photosets[i].querySelectorAll('img')[img].outerHTML;
        }
        
        // if first image
        var firstImage = images[0];
        //sort it based on the arrange data

        for (var sort = 0; sort < arrange.length; sort++) {
            if (arrange[sort] == 1) {
                photosetElements += '<div class="photoset-one">' + images.shift() + '</div>';
            }
            if (arrange[sort] == 2) {
                photosetElements += '<div class="photoset-two photoset-multiple">' + images.shift() + images.shift() + '</div>';
            }
            if (arrange[sort] == 3) {
                photosetElements += '<div class="photoset-three photoset-multiple">' + images.shift() + images.shift() + images.shift() + '</div>';
            }
        }

        //function done
        photosets[i].classList.remove('yet')

        //push to the live view
        photosets[i].innerHTML = photosetElements;
        if (html.classList.toString().indexOf('show-first-photoset') > -1) {
            photosets[i].closest('.post').innerHTML += '<li class="photosethover">' + firstImage + '</li>';
        }
        //if photoset line has more than two images we need to get the height 
        heightFixElement = photosets[i].querySelectorAll('.photoset-multiple');


        for (var heightFix = 0; heightFix < heightFixElement.length; heightFix++) {

            //initial height set up pushes to the array 
            var imageHeight = [];
            for (var j = 0; j < heightFixElement[heightFix].querySelectorAll('img').length; j++) {
                imageHeight[j] = heightFixElement[heightFix].querySelectorAll('img')[j].getAttribute('data-height');
            }

            //got the value.

            // push to the live view, and remove the image if done.
            var smallest = Math.min.apply(Math, imageHeight); // get the small heighted image
            
            var checkValue = smallest + 1;
            smallest = smallest.toString();
            checkValue = checkValue.toString();
            
            if(imageHeight.indexOf(checkValue) > -1){
                smallest = imageHeight.indexOf(checkValue);

            }else{
                smallest = imageHeight.indexOf(smallest);
            }
            
            // apply to the container
            heightFixElement[heightFix].style.height = heightFixElement[heightFix].querySelectorAll('img')[smallest].classList.add('smallest');
            
        }

    }
    $('#posts').masonry();

}

var imageToHighresInTexts = function(){
	
  if(document.querySelectorAll('.post-content:not(.infinite_appended) img')[0]){
        var imgFix = document.querySelectorAll('.post-content:not(.infinite_appended) img');
        for(var i=0;i<imgFix.length;i++){
            if(imgFix[i].src.indexOf('500.jpg')){
                imgFix[i].src=imgFix[i].src.replace('500.jpg','1280.jpg').replace('500.png','1280.png')
                
            }
        }
    }

}




//plguins like Disqus, gogole font, and customize page
var plugins = function() {


    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);

    /** gogole font **/

    // handles disqus
    if (document.getElementById('disqus_thread') && document.getElementById('disqus_thread').getAttribute('shortname') != '') {
        var disqus_shortname = document.getElementById('disqus_thread').getAttribute('shortname');
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

var interval = setInterval(function() {
    var disqusHeight = $('#disqus_thread').height();
    if ( disqusHeight > 52 ) {  // height 52px is header of Disqus, more than 52px means that disqus load comments
      // Your code
        clearInterval(interval); // after loaded comment we stop this 
        setTimeout(function(){
            
         $(window).trigger('resize')
        $('#posts').masonry();
        },1000)
    } 
}, 100);
    }
    // handles disqus

    // Give some good looks to customize page
    if (currentURL.indexOf('customize') > -1 && document.getElementById('459260683')) {
        document.getElementById('459260683').querySelector('.audio').innerHTML = '<iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F229050560&amp;visual=true&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;origin=tumblr" frameborder="0" allowtransparency="true" class="soundcloud_audio_player" width="500" height="500"></iframe>';

        document.getElementById('459260683').querySelector('.caption').innerHTML = '<p><strong><a href="https://soundcloud.com/dasusound/places-and-spaces">DASU</a></strong> - Places and spaces</p>';
        document.getElementById('459009076').remove();
    }
}

var pageFixer = function(){
    
    if(html.id == 'per'){
        if (currentURL.indexOf('post') == -1) {
          var pageImages = document.querySelectorAll('.post-content img');
          for(var i = 0 ; i < pageImages.length; i++){
             if(pageImages[i].src.toString().indexOf('_500') > -1){
                  pageImages[i].src = pageImages[i].src.replace('500','1280')
             }
          }
        }
    }    
}

//open share by clicking
var openShare = function(selector) {

    if (selector.classList.toString().indexOf('close') > -1) {
        selector.closest('.share').querySelectorAll('.share-tooltip')[0].style.display = 'none';
        selector.classList.remove('close');
    } else {
        selector.closest('.share').querySelectorAll('.share-tooltip')[0].style.display = 'block';
        selector.classList.add('close')
    }
}

//remove share when not focused
var outShare = function(selector) {
    selector.querySelectorAll('.share-tooltip')[0].style.display = 'none';
    selector.querySelectorAll('.share_cont')[0].classList.remove('close');
}

//copy link share on posts
var copyLink = function(selector) {
    selector.querySelectorAll('input')[0].select();
    selector.querySelectorAll('a')[0].innerHTML = 'Copied!';
    setTimeout(function() {
        selector.querySelectorAll('a')[0].innerHTML = 'Copy link';
    }, 2000)
    document.execCommand('copy');
}


var relatedPhotosOnly = function(){
    if(document.querySelectorAll('.related-posts ul li img')[0]){
    var related = document.querySelectorAll('.related-posts ul li img');
    var imagePhoto = document.querySelectorAll('#posts .type-photo .photo img')[0].getAttribute('data-image-small');
    for(var i = 0; i < related.length; i++){
        if(related[i].src == imagePhoto){
            related[i].closest('li').remove();
        }
    }
    }
        
    }
    
    var ifNotFound = function(){
        if(document.querySelectorAll('.type-text h3')[0]){
        if(document.querySelectorAll('.type-text h3')[0].innerHTML.toLowerCase().indexOf('not found') > -1){
            html.classList.add('this-not-found')
            if(document.getElementById('disqus_thread')){
            document.getElementById('disqus_thread').remove();}
        }
        }
    }
	
    var asktrigger = function(){
        document.getElementById('ask-container').style.display = 'block';
    }   
    var closeAsk = function(){
        document.getElementById('ask-container').style.display = 'none';
    }
	

//this selects HTML, and add class no need to wait for dom

//webfont
WebFontConfig = {
    google: {
        families: ['Cormorant+Garamond:400,700:latin', 'Lato:100,300,400,700:latin']
    }
};

//////// variable ends //////////////
///// starts function //////////


var fireRefreshEventOnWindow = function () {
     var evt = document.createEvent("HTMLEvents");
     evt.initEvent('resize', true, false);
     window.dispatchEvent(evt);
 };
 
 var fireResizer = setInterval(function(){
        fireRefreshEventOnWindow();
 },100);
 
 $(window).load(function(){
    setTimeout(function(){
     clearInterval(fireResizer)
    },400)
})


document.addEventListener('DOMContentLoaded', function() {
            if(window.location.href.indexOf('/submit') > -1){
                    document.querySelectorAll('.post .text-title')[0].remove();
                    document.querySelectorAll('.post-content')[0].style.minWidth = '100%'
				}
	if(html.getAttribute('data-ask') == 'on'){
	document.getElementById('layout').innerHTML += '<div id="ask-container" onclick="closeAsk()"><div id="ask-content"><iframe frameborder="0" scrolling="no" width="100%" height="190" src="https://www.tumblr.com/ask_form/'+html.getAttribute('data-blog').replace('http://','').replace('https://','')+'" id="ask_form"></iframe></div></div>';
}

    var loadingType = html.getAttribute('data-loading-type').toString();
    // layout javascript masonry, and infinite scroll
    if (html.id == 'ind') {
        layoutArrange('#posts', '.post-content', '#pagination', "#pagination a.pagination_nextlink", loadingType);
    } else {
        html.classList.add('body-loaded');
        html.style.opacity = '1';
    }
    // rearrange layout when images loaded 


    if (html.id == 'per') {

        // fire more note counts on permalink

        // if related posts
        if (document.getElementsByClassName('caption')[0]) {
            for (var i = 0; i < document.getElementsByClassName('caption').length; i++) {
                if (document.getElementsByClassName('caption')[i].innerHTML == '') {
                    document.getElementsByClassName('caption')[i].style.display = 'none';
                } 
            } 
        } 
        
        
            
    } 


    
    // recall
    numberChange();
    plugins();
    photosetArrange();
    relatedPhotosOnly();
    pageFixer();
    ifNotFound();
	imageToHighresInTexts();
    
    
	
    /** Shorten Texts **/
    if(html.getAttribute('data-short-text') == 'on' && html.id == 'ind'){
    textShorten();}
    /** Shorten Texts **/
    
    
    
})


window.addEventListener('scroll', function() {
var windowWidth = window.innerWidth;
if ($(window).scrollTop() > 200) {
  html.classList.add('header-hidden');
}else{
  html.classList.remove('header-hidden');
}

});


/////if resize has to call masonry
window.addEventListener('resize', function() {
    $('#posts').masonry();
    if(html.classList.contains('image_resized') == false){
        html.classList.add('image_resized')
    }
	if (window.matchMedia("(orientation: portrait)").matches) {
		html.classList.add('portrait_mode')
		html.classList.remove('landsacpe-mode')
		}
		
		if (window.matchMedia("(orientation: landscape)").matches) {
			html.classList.add('landsacpe-mode')
			html.classList.remove('portrait_mode')
		}
		});
	
		/** layout **/
if(html.classList.contains('desktop-version')){
    if (html.id == 'ind') {
    var layoutData = html.getAttribute('data-layout');
    var paddingData = html.getAttribute('data-padding');
    layout(layoutData, paddingData);
    }
}
if(html.classList.contains('tablet-version')){
    if (html.id == 'ind') {
    layout('one 800', 20);
    }
}
    
if(html.classList.contains('mobile-version')){
    layout('fixed one', 20); 
}
/** layout **/

				
					
 const closeSearch = () => {
            document.getElementById('search_container').style.display = 'none';
        }
        const openSearch = () => {
            document.getElementById('search_container').style.display = 'block';
			}
			
			

    $(document).ready(function(){
   /** Instafeed.js plugin controller **/
   
        if(document.getElementById('instagram-feed')){
            
        
        var instagramToken = $('#instagram-feed').attr('data-instagram-accesstoken');
        var datauserID = instagramToken.split('.')[0];
    var feed = new Instafeed({
        get: 'user',
        userId: datauserID,
        accessToken: instagramToken,
        target: 'instagram-feed',
        limit: 8,
        resolution: 'low_resolution',
        after: function(){
            $('.instagram-feed-container').show()
            $('.instagram-feed-container a').attr('target','_blank')
        }
    });
    
        /** Ren feed **/
	feed.run();
        /** Ren feed **/
        /** Instafeed.js plugin controller **/

        }
		})
		
    		
  const openHidden = () => {
        var hiddenMenuWidth = document.getElementsByClassName('hidden-menu')[0].offsetWidth;
        if(document.getElementsByClassName('hidden-menu')[0].classList.contains('opened') == false){
        $('.hidden-menu').css({'transform':'translateX(0%)',
            '-moz-transform':'translateX(0%)',
            '-o-transform':'translateX(0%)',
            '-webkit-transform':'translateX(0%)'
        }).addClass('opened')
        document.getElementsByTagName('body')[0].style.left = hiddenMenuWidth + 'px';
        document.getElementsByClassName('trigger-buttons')[0].style.marginLeft = hiddenMenuWidth + 'px';

        document.getElementsByClassName('menu-trigger')[0].setAttribute('data-icon', document.getElementsByClassName('menu-trigger')[0].getAttribute('close-icon'))
        }else{
            $('.hidden-menu').css({'transform':'translateX(-'+hiddenMenuWidth+'px)',
            '-moz-transform':'translateX(-'+hiddenMenuWidth+'px)',
            '-o-transform':'translateX(-'+hiddenMenuWidth+'px)',
            '-webkit-transform':'translateX(-'+hiddenMenuWidth+'px)'
        }).removeClass('opened')
             document.getElementsByTagName('body')[0].style.left = '0px';
        document.getElementsByClassName('trigger-buttons')[0].style.marginLeft = '0px';
        
        document.getElementsByClassName('menu-trigger')[0].setAttribute('data-icon', document.getElementsByClassName('menu-trigger')[0].getAttribute('original-icon'))
        }
        
    }
    
    // leave spacing to separate icons, and links
    window.addEventListener('DOMContentLoaded',function(){
        if(document.querySelectorAll('.hidden-menu ul li')[0].classList.contains('spacing') == false){
            document.getElementsByClassName('spacing')[0].style.marginTop= '10px';
        }
        
        if(document.querySelectorAll('.salvia-occupations').length == 0){
            document.querySelectorAll('.salvia-title')[0].style.marginTop = '0px';
        }
		})