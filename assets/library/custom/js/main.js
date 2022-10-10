$(document).ready(function(){
  
  // initiate the wow
  // new WOW().init();

  // swiper slide for testomonials 
  new Swiper('#testimonials-slider', {
    autoplay: {
      delay: 7500,
      disableOnInteraction: false
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 3,
    spaceBetween: 70,
    breakpoints: {
      767: {
        slidesPerView: 1
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }
  });

  // swiper slide for how it works
  new Swiper('#work-slider', {
    autoplay: {
      delay: 7500,
      disableOnInteraction: false
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 70,
    breakpoints: {
      767: {
        slidesPerView: 1
      },
      991: {
        slidesPerView: 1,
        spaceBetween: 40
      }
    }
  });

  // swiper slide for brands
  // new Swiper('#brands-slider', {
  //   autoplay: {
  //     delay: 400000000,
  //     disableOnInteraction: false
  //   },
  //   loop: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   slidesPerView: 5,
  //   spaceBetween: 70,
  //   breakpoints: {
  //     767: {
  //       slidesPerView: 1
  //     },
  //     991: {
  //       slidesPerView: 1,
  //       spaceBetween: 40
  //     }
  //   }
  // });

  // scroll to top  
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 150 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    $('.scroll-top').click(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return false;
    });
  }

});  

async function clientEnquiry(){
  var name = $('#client_name').val();
  var email = $('#client_email').val();
  var phone = $('#client_phone').val();
  var location = $("#client_location").val();
  var message = $('#client_message').val();
  var obj = {
    name: name,
    email: email, 
    phone: phone,
    location: location,
    message: message
  };
  // validation
  var validation = enquiryValidation(obj);

  if(validation == false){
    var btnName = ".client-enquiry"
    btnLoader(btnName, true);
    var body = enquiryTable(obj);
    console.log("table body: ", body);
    // await elasticEmail(obj, body, function(err, res){
    //   if(res == "OK"){
    //     showToast("Success", "Your details forwarded to our admin!");
    //     resetClientEnquiry();
    //   }else{
    //     console.log("res err: ", err);
    //     showToast("Error", "Not able to send your details!");
    //   }
    // });
    btnLoader(btnName, false);
  }  
};

function enquiryValidation(obj){
  var validation = false;
  if(obj.name == ''){
    var id = '#client_name_span';
    var msg = 'Name should not empty!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.name != '' && obj.name.length <= 2){
    var id = '#client_name_span';
    var msg = 'Name should be more than 2 characters!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(
    obj.email == '' || 
    obj.email.indexOf("@", 0) < 0 || 
    obj.email.indexOf(".", 0) < 0
  ){
    var id = '#client_email_span';
    var msg = 'Please enter a valid Email!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.phone == '' || obj.phone.length != 10){
    var id = '#client_phone_span';
    var msg = 'Please enter a valid Phone number!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.location == ''){
    var id = '#client_location_span';
    var msg = 'Location should not empty!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.message == ''){
    var id = '#client_message_span';
    var msg = 'Please enter your message!';
    showErrMsg(id, msg);
    var validation = true;
  }
  return validation;
};

function enquiryTable(obj){
  var table = `
    <table style='width:100%;border: 1px solid black;border-radius: 10px;'>
      <tr>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Name</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Email</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Phone number</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Location</th>
      </tr>
      <tr>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.name +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.email +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.phone +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.location +`
        </td>
      </tr>
      <tr>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Message</th>
        <td colspan="3" style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>
        `+ obj.message +`
        </th>
      </tr>
    </table>
  `;
  return table;
};

function resetEnquiry(){
  $('#client_name').val("");
  $('#client_email').val("");
  $('#client_phone').val("");
  $("#client_location").val("");
  $('#client_message').val("");  
};

async function getQuote(){
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var location = $("#location").val();
  var service = $("#service").val();
  var message = $('#message').val();
  var obj = {
    name: name,
    email: email, 
    phone: phone,
    location: location,
    service: service,
    message: message
  };
  // validation
  var validation = quoteValidation(obj);

  if(validation == false){
    var btnName = ".get-quote"
    btnLoader(btnName, true);
    var body = quoteTable(obj);
    console.log("table body: ", body);
    btnLoader(btnName, false);
    resetQuote();
    $("#get-quote").modal('hide');
    quoteMsg(true);
  }  
};

function quoteValidation(obj){
  var validation = false;
  if(obj.name == ''){
    var id = '#name_span';
    var msg = 'Name should not empty!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.name != '' && obj.name.length <= 2){
    var id = '#name_span';
    var msg = 'Name should be more than 2 characters!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(
    obj.email == '' || 
    obj.email.indexOf("@", 0) < 0 || 
    obj.email.indexOf(".", 0) < 0
  ){
    var id = '#email_span';
    var msg = 'Please enter a valid Email!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.phone == '' || obj.phone.length != 10){
    var id = '#phone_span';
    var msg = 'Please enter a valid Phone number!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.location == ''){
    var id = '#location_span';
    var msg = 'Location should not empty!';
    showErrMsg(id, msg);
    var validation = true;
  }
  if(obj.message == ''){
    var id = '#message_span';
    var msg = 'Please enter your message!';
    showErrMsg(id, msg);
    var validation = true;
  }
  return validation;
};

function quoteTable(obj){
  var table = `
    <table style='width:100%;border: 1px solid black;border-radius: 10px;'>
      <tr>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Name</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Email</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Phone number</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Location</th>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Service</th>
      </tr>
      <tr>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.name +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.email +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.phone +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.location +`
        </td>
        <td style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;text-align:center;'>
        `+ obj.service +`
        </td>
      </tr>
      <tr>
        <th style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>Message</th>
        <td colspan="3" style='border: 1px solid black;border-radius: 10px; padding: 5px 8px;'>
        `+ obj.message +`
        </th>
      </tr>
    </table>
  `;
  return table;
};

function quoteMsg(msg){
  var title;
  var content;
  if(msg){
    title = "Success";
    content = "Quote sent successfully!";
  }else{
    title = "Error";
    content = "technical issue, try again later!";
  }
  $('.quote-msg-title').html(title);
  $('.quote-msg-content').html(content);
  $("#quote-msg").modal('show');
}

function resetQuote(){
  $('#name').val("");
  $('#email').val("");
  $('#phone').val("");
  $("#location").val("");
  $("#service").val("Construction");
  $('#message').val("");  
};

function showErrMsg(id, msg){
  $(id).html(msg);
};

function resetErrMsg(value){
	$(value).next().html('');
}

function btnLoader(btnName, status){
  if(status){
    $(btnName).attr("disabled", true);
    $(btnName + " span").removeClass("visually-hidden");
  }else{
    $(btnName).removeAttr("disabled");
    $(btnName + " span").addClass("visually-hidden");
  }  
}

async function elasticEmail(obj, body, cb) {
  let host = "";
  let uname = "";
  let pass = "";
  
  let toEmail = "";
  let subject = "Vinra Enquiry!";
  
  await Email.send({
    Host: host,
    Username: uname,
    Password: pass,
    To: toEmail,
    Subject: subject,
    From: uname,
    Body: body,
  })
  .then(function(message){
    console.log("email success res: ", message);
    return cb(null, message);
  })
  .catch(function(err){
    console.log("email err: ", err);
    return cb(err);
  });
};

// $(".close-toast").click(function(){
//   $("#toaster").toast("hide");
// });
// function showToast(type, msg){
//   $(".toast-head").html(type);
//   $(".toast-msg").html(msg);
//   $("#toaster").toast("show");
// };