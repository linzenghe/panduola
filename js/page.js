(function($, window, undefined){
    
    var $window, $btnMv, $mvSuper;
    var mvKey= '';



    /*------------------------------------------------*/
    /*[INTRO 切り替え]*/
    
    var changeMvInit = function(){
        mvKey = $('#mainvisual ul').find('.is-active').attr('id');
        
        $('.'+mvKey+':not(p)', $mvSuper).addClass('is-active');
        setTimeout(function(){
            $('p.'+mvKey, $mvSuper).addClass('is-active');
        }, 1500);
        
        $btnMv.on('click', function(){
            var key = $(this).attr('id');
            if(mvKey==key || $(this).hasClass('cs')) return;
            
            $btnMv.removeClass('is-active');
            $(this).addClass('is-active');

            $('img', $mvSuper).removeClass('is-active');
            $('p', $mvSuper).removeClass('is-active');
            $('.'+key, $mvSuper).addClass('is-active');
            
            mvKey = key;
        });
    };



    $(function(){
        $window = $(window);
        $mvSuper = $('#mainvisual #visual');
        $btnMv = $('#mainvisual ul li');
/*
        $window.on('load', function(){
            setTimeout(function(){
                $('#mainvisual').addClass('on');
            }, 1500);
        });
*/
        changeMvInit();
    });
    
})(jQuery, window);