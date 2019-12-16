const app = {};
const animations = {};
animations.rotateIn = {
  property: 'transform',
  type: 'rotateY',
  time: 1.2,
  delay: 0,
  targetValue: '0deg',
  easing: 'ease-in-out',
  topDistance: 500,
  bottomDistance: 100
}
animations.fadeIn = {
  property: 'opacity',
  type: 'calc',
  time: 0.5,
  delay: 0,
  targetValue: 1,
  easing: 'ease-in-out',
  topDistance: 800,
  bottomDistance: 100
}
animations.translateIn = {
  property: 'transform',
  type: 'translateX',
  time: 1.2,
  delay: 0,
  targetValue: '0px',
  easing: 'ease-in-out',
  topDistance: 600,
  bottomDistance: 100
}

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


// ajax formatting was taken from
// https://stackoverflow.com/questions/33984667/how-to-get-around-the-formspree-redirect
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

app.animateElement = (parent, child, amount, ao) => {
  const scrollPoint = $(parent).offset().top;
  const bottomHeight = scrollPoint + $(parent).height();
  const target = $(`${parent} ${child}`);
  target.css({
    [ao.property]: `${ao.type}(${amount})`,
  });
  if(window.scrollY >= scrollPoint - ao.topDistance && window.scrollY <= bottomHeight + ao.bottomDistance){
    target.css({
      [ao.property]: `${ao.type}(${ao.targetValue})`, 
      transition: `${ao.property} ${ao.time}s ${ao.delay}s ${ao.easing}`,
    });
  }
  $(window).scroll(function() {
    if(window.scrollY >= scrollPoint - ao.topDistance && window.scrollY <= bottomHeight + ao.bottomDistance){
      target.css({
        [ao.property]: `${ao.type}(${ao.targetValue})`, 
        transition: `${ao.property} ${ao.time}s ${ao.delay}s ${ao.easing}`,
      });
    }
  });
}

app.setupAnimations = () => {
  app.animateElement('#about', '#profile-text', '-100px', animations.translateIn);
  app.animateElement('#about', '#profile-photo', '100px', animations.translateIn);
  app.animateElement('#my-skills', 'li', '90deg', animations.rotateIn);
  app.animateElement('#project-one', '.project-image-border', 0, animations.fadeIn);
  app.animateElement('#project-two', '.project-image-border', 0, animations.fadeIn);
  app.animateElement('#project-three', '.project-image-border', 0, animations.fadeIn);
}

app.init = () => {
  app.bindDomElements();
  app.setUpContactForm();
  app.setupAnimations();
}

$(document).ready(function(){
  app.init();
  //Assigning smoothscroll to anchor tags.
  $('a').smoothScroll({
    offset: -50,
  });
});


