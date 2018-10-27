//wait DOM is ready for JavaScript 
$(document).ready(function() {
	//had been set event handler for the submit event
	$('#registration').submit(function() {
		//value fields user and city save in variables
		var user_ = $('input[name="user"]').val();
		var city_ = $('select[name="city"]').val();
		if(city_ === null){
			city_ = "No city";
		}
		//check the fields for correct values
		if(cheked_form() === true)
		//send ajax
			$.ajax({
			            type: 'GET', //POST
			            url: 'index.html', //data.php
			            data: $(this).serialize(),      
			            success: function() {
			            	//$("#place").html(html);
			            }
			        }).done(function() {
	    //Hide and reset form. Show PopUp 
			        	$('#registration').hide();
			        	$('#registration')[0].reset();
			        	$("#message").html("Senks registration " + user_ + " from " + city_ +"!");
			        	$("#confirm").show();

			        });
			return false;
	    });

	$('#close').click(function() {
		$('#registration').show();
		$("#confirm").hide();
	});
});

function cheked_form(){
	var user_field = $("input[name='user']");
	var email_field = $("input[name='email']");
	var password_field = $("input[name='password']");
	var password_confirm_field = $("input[name='password_confirm']");

	var user = validation(user_field,'check_empty','check_char', null, null, null);
	var email = validation(email_field,'check_empty', null, 'check_email', null, null);
	var password = validation(password_field,'check_empty', null, null, 'check_length', null);
	var password_confirm = validation(password_confirm_field,'check_empty', null, null, 'check_length', password_field);

	if((user && email && password && password_confirm) === false){
		 return false;
	}else{
		 return true;

	}
}



function validation(field, check_empty, check_char, check_email, check_length, password_confirm){
	if(check_empty !== null){
		if (field.val()==''){
			field.next().html("*This field is required");
     		return false;
		}
	}

	if(check_char !== null){
		var reg = new RegExp("[а-яА-Яa-zA-z_]{2,}");
		if (!reg.test(field.val())){
			field.next().html("*Incorrect name");
     		return false;
		}
	}
    
	if(check_email !== null){
		var reg = new RegExp("[@a-zA-z_0_9]{4}");
		if (!reg.test(field.val())){
			field.next().html("*Incorrect email");
     		return false;
		}
	}

	if(check_length !== null){
		if(field.val().length<6){
			field.next().html("*At least 6 characters");
     		return false;
		}
	}


	if(password_confirm !== null){
		if(field.val() !== password_confirm.val()){
			field.next().html("*Passwords do not match");
     		return false;
		}
	}


	field.next().html('');
	return true;
}



