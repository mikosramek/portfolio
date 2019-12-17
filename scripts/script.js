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
  time: 0.5,
  delay: 0,
  targetValue: '0px',
  easing: 'ease-in-out',
  topDistance: 600,
  bottomDistance: 100
}

app.isFollowerActive = false;

app.bindDomElements = function() {
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
  const offset = window.innerWidth * 0.2;
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

app.animateElement = (parent, children, amount, ao) => {
  const scrollPoint = $(parent).offset().top;
  const bottomHeight = scrollPoint + $(parent).height();
  children.forEach(function(child){
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
  })
}

app.setupAnimations = () => {
  app.animateElement('#about', ['#profile-text'], '-100px', animations.translateIn);
  app.animateElement('#about', ['#profile-photo'], '100px', animations.translateIn);
  app.animateElement('#my-skills', ['li'], '90deg', animations.rotateIn);
  app.animateElement('#project-one', ['.project-image-border', 'h3', 'p', 'a'], 0, animations.fadeIn);
  app.animateElement('#project-one', ['.project-text'], '-100px', animations.translateIn);
  app.animateElement('#project-two', ['.project-image-border', 'h3', 'p', 'a'], 0, animations.fadeIn);
  app.animateElement('#project-two', ['.project-text'], '100px', animations.translateIn);
  app.animateElement('#project-three', ['.project-image-border', 'h3', 'p', 'a'], 0, animations.fadeIn);
  app.animateElement('#project-three', ['.project-text'], '-100px', animations.translateIn);
}

app.setupNav = () => {
  const home = $('#homeNav');
  const homeSection = $('#home');
  const about = $('#aboutNav');
  const aboutSection = $('#about');
  const projects = $('#projectsNav');
  const projectsSection = $('#projects');
  const contact = $('#contactNav');
  const contactSection = $('#contact');
  const positions = [homeSection, aboutSection, projectsSection, contactSection];
  const navs = [home, about, projects, contact];
  $(window).scroll(function() {
    let closest = 0;
    positions.forEach(function(pos, index) {
      
      const a = Math.abs(window.scrollY - pos.offset().top);
      const b = Math.abs(window.scrollY - positions[closest].offset().top);
      // console.log(pos, a,b);
      if(a < b){
        closest = index;
      }
    });
    navs.forEach(function(item, index) {
      if(index === closest) {
        item.addClass('activeNav');
      }else{
        item.removeClass('activeNav');
      }
    })
    // console.log(positions[closest]);
    // if(window.scrollY >= homeSection.offset().top - offset && window.scrollY <= homeSection.offset().top + homeSection.height()){
    //   home.addClass('activeNav');
    // }else{
    //   home.removeClass('activeNav');
    // }
    // if(window.scrollY >= aboutSection.offset().top - offset && window.scrollY <= aboutSection.offset().top + aboutSection.height()){
    //   about.addClass('activeNav');
    // }else{
    //   about.removeClass('activeNav');
    // }
    // if(window.scrollY >= projectsSection.offset().top - offset && window.scrollY <= projectsSection.offset().top + projectsSection.height()){
    //   projects.addClass('activeNav');
    // }else{
    //   projects.removeClass('activeNav');
    // }
    // if(window.scrollY >= contactSection.offset().top - offset && window.scrollY <= contactSection.offset().top + contactSection.height()){
    //   contact.addClass('activeNav');
    // }else{
    //   contact.removeClass('activeNav');
    // }

  });
}

app.init = () => {
  app.bindDomElements();
  app.setUpContactForm();
  app.setupAnimations();
  app.setupNav();
}

$(document).ready(function(){
  app.init();
  //Assigning smoothscroll to anchor tags.
  $('a').smoothScroll({
    offset: -50,
  });
});


