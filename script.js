var snakeColors=[];

for(i=0; i<1000; i++){
    var bigDiv = $("<div>");
    $(bigDiv).addClass('bead-container');
    var smallDiv= $("<div>")
    $(smallDiv).addClass('bead');
    $(bigDiv).append(smallDiv);
    $(".all-container").append(bigDiv);
}


$(document).on('click','.beadroll', event=>{
    event.stopPropagation();
    event.preventDefault();
    var color=$(event.target).attr('style');
    color= color.split(':')
    color= color[1];
    snakeColors.push(color);
    var newDiv= $('<div>');
    $(newDiv).addClass('tail')
    $(newDiv).attr('style', 'background-color:'+color);
    $('body').append(newDiv);
    $(event.target).remove();
    //console.log tail
 

})

$("body").mousemove(event=>{
    event.stopPropagation();
    event.preventDefault();
    
    var tailArray=$('.tail');
    length=tailArray.length;

    
    for(let i=0;i<length;i++){
        setTimeout(() => {
             $(tailArray[i]).attr("style", " top :" + (event.pageY + 20) + "px; left :" + (event.pageX + 20) + "px; background-color:"+snakeColors[i])  
        },i*20);
    }    
})

$(".decorate").click(event=>{
    event.stopPropagation();
    event.preventDefault();
    
    var tailArray=$('.tail');
    length=tailArray.length;

    
    for(let i=0;i<length;i++){
        setTimeout(() => {
             $(tailArray[i]).addClass('bigTail')
             setTimeout(() => {
                $(tailArray[i]).removeClass('bigTail')
                 
             },i*100);  
        },i*100);
    }
    decorateCurtain(); 
  
})

function decorateCurtain(){
    $('.curtain').html('');
    $('.curtain').removeClass('invisibleP');
    for(let i=0; i<250;i++){
        setTimeout(() => {
            var randColor = Math.floor(Math.random()*snakeColors.length)
            var newStripe = $('<div>');
            $(newStripe).addClass('stripe')
            $(newStripe).attr('style', 'background-color:'+snakeColors[randColor]);
            $('.curtain').append(newStripe);
            
        }, i*10);
   
    }
}

$('.curtain').on("click",event=>{
    event.stopPropagation();
    event.preventDefault();
    location.reload();
})



document.addEventListener("DOMContentLoaded", function(){
    let lazyloadImages = document.querySelectorAll(".bead");
    // console.log(lazyloadImages);
    let lazyloadThrottleTimeout;

    function lazyload() {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }
      lazyloadThrottleTimeout = setTimeout(function(){
        let scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img){
          if(img.offsetTop < (window.innerHeight/2 + scrollTop)&&img.offsetTop>(window.innerHeight/2 + scrollTop)-40) {
            // $(smallDiv).attr('style', 'background-color:'+color);
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)]}
            img.setAttribute('style', 'background-color:'+color);
            img.classList.add('beadroll')
          }
           else{img.classList.remove('beadroll')
          }
        });
        // if(lazyloadImages.length == 0) {
        //   document.removeEventListener("scroll", lazyload);
        //   window.removeEventListener("resize", lazyload);
        //   window.removeEventListener("orientationChange", lazyload);
        // }
      }, 20);
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });



//   for (var i = 0; i < 5; i++) {
//     function timeout(val) {
//       setTimeout(function() {
//         console.log(val);
//       }, 1000);
//     }
//     timeout(i);
//   }