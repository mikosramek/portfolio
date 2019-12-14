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
  const offset = window.innerWidth * 0.3;
  app.$follower.css({'transform':`translateY(${event.pageY - 15}px) translateX(${event.pageX - 30 - offset}px)`});
  app.$smallFollower.css({'transform':`translateY(${event.pageY - 10}px) translateX(${event.pageX - 10 - offset}px)`});
  $("html").mousemove(function(event) {
    app.$follower.css({'transform':`translateY(${event.pageY - 15}px) translateX(${event.pageX - 30 - offset}px)`});
    app.$smallFollower.css({'transform':`translateY(${event.pageY - 10}px) translateX(${event.pageX - 10 - offset}px)`});
  });
  app.$follower.addClass('active');
  app.$smallFollower.addClass('active');
}

app.setUpContactForm = function() {
  const $form = $('#contact-form');
  const $name = $('#name');
  const $email = $('#email');
  const $message = $('#message');
  $form.on('submit', function(event) {
    event.preventDefault();
    const messageString = `Name: ${$name.val()}\nEmail: ${$email.val()} \nMessage: "${$message.val()}"`;
    $.ajax({
      url: 'https://formspree.io/xgevgoyy', 
      method: 'POST',
      data: {
        message: messageString
      },
      dataType: 'json'
    }).then(function(data){
      console.log(data);
      $name.val('');    
      $email.val('');
      $message.val('');
      $('#contact-form-status').text('Message sent! Thank you!').fadeIn(1000);
      setTimeout(() => { $('#contact-form-status').fadeOut(1000); }, 2000);
    }).fail((function(data) {
      console.log(data);
      $('#contact-form-status').text('There was a problem submitting this email.').fadeIn(1000);
      setTimeout(() => { $('#contact-form-status').fadeOut(1000); }, 2000);
    }));
  })
}

app.init = () => {
  app.bindDomElements();
  app.setUpContactForm();
}

$(document).ready(function(){
  app.init();
  //Assigning smoothscroll to anchor tags.
  $('a').smoothScroll({
    offset: -50,
  });
});


