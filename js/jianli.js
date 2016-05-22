/**
 * Created by qiaoshi on 2016/5/15.
 */
$(function(){
    $(document).on('touchmove',function(e){
        e.preventDefault();
    });
    var winH=document.documentElement.clientHeight,winW=document.documentElement.clientWidth;
    //var desH=1008,desW=640;
    //if(winW/winH<=desW/desH){
    //    var scale=winH/desH;
    //    $('.main').css('transform','scale('+scale+')')
    //}else {
    //    scale = winW / desW;
    //    $('.main').css('transform','scale('+scale+')')
    //}
    var $oLis=$('.list>li');
    var Index=null,prevIndex=0,step=1/ 4,startY=null, movePos=null;
        slideFn();
        function slideFn(){
        $oLis.on('touchstart',function(e){
        Index=$(this).index();
        startY= e.originalEvent.changedTouches[0].pageY;
        $(this).on('touchmove ',function(e){
            $(this).attr('flag','true');
            $(this).siblings().hide();
            $oLis.removeClass('zIndex');
             var curY=e.originalEvent.changedTouches[0].pageY;
             movePos=curY-startY;
            if(movePos<0){
                prevIndex=Index==$oLis.length-1?0:Index+1;
                $(this).css('transform','translate(0,'+movePos/2+'px) scale('+(1-Math.abs(movePos/winH*step))+')');
                $oLis.eq(prevIndex).css('transform','translate(0,'+(winH+movePos)+'px) ');
            }else if(movePos>0){
                prevIndex=Index==0?$oLis.length-1:Index-1;
                $oLis.eq(prevIndex).css('transform','translate(0,'+(-winH+movePos)+'px)');
                $(this).css('transform','translate(0,'+movePos/2+'px) scale('+(1-Math.abs(movePos/winH*step))+')');
            }else{
                $(this).attr('flag','false');
            }

            $oLis.eq(prevIndex).show().addClass('zIndex');
        });
        $(this).on('touchend',function(e){
            if($(this).attr('flag')=='true') {
                if(movePos<0) {//up
                    $(this).css('transform','translate(0,'+(-winH*step*2)+'px)scale('+(1-step)+') ');
                }else if(movePos>0) {//down
                    $(this).css('transform','translate(0,'+(winH*step*2)+'px)scale('+(1-step)+')')
                }
                //
                $oLis.eq(prevIndex).css('transform', 'translate(0,0)');
                $oLis.eq(prevIndex).css('webkitTransition', '0.7s');
                $(this).css('webkitTransition', '0.7s');
                $(this).off('touchmove');
                $(this).off('touchend');
                $(this).attr('flag','false');
             }
            })
        });
    }
        $oLis.on('webkitTransitionEnd',function(e){
            if(!$oLis.is(e.target))return;
            $(this).css('transform','');
            $(this).css('transition','');
            $oLis.eq(prevIndex).css('transition','');
            $oLis.eq(Index).hide();
        });
$(btn).on('tap',function(){
        if(audio.paused){
            audio.play();
            $(btn).addClass('music audioMove');
        }else{
            audio.pause();
            $(btn).removeClass('audioMove');
        }
    });

    //~function(){
    //var music=document.getElementById('musicMp3');
    //var musicBtn=document.getElementById('musicBtn');
    //window.setTimeout(function(){
    //    music.play();
    //    music.addEventListener('canplay',function(){
    //        musicBtn.style.display='block';
    //        musicBtn.className="music audioMove";
    //    })
    //},800);

    //}();



});