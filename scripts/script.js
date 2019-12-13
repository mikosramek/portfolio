const app = {};

app.isFollowerActive = false;

app.bindDomElements = function() {
  // $('#header-image').on('click', function(){
  //   $(this).addClass('animate');
  // })
  app.$follower = $('#hidden-button');
  app.$smallFollower = $('#hidden-button-small');
  $('#egg').on('click', function() {
    if(!app.isFollowerActive){
      app.isFollowerActive = true;
      app.follower();
    }
  });
}

app.follower = function() {
  app.$follower.css({'z-index':'0'});
  app.$smallFollower.css({'z-index':'0'});
  $("html").mousemove(function(event) {
    app.$follower.css({'top':`${event.pageY - 15}px`, 'left':`${event.pageX - 30}px`});
    app.$smallFollower.css({'top':`${event.pageY - 10}px`, 'left':`${event.pageX - 10}px`});
  });
  app.$follower.addClass('active');
  app.$smallFollower.addClass('active');
}


app.init = () => {
  app.bindDomElements();
}

$(document).ready(function(){
  app.init();
});


