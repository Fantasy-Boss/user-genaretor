
var nation = 'us'

var code = {
    'us': '+1', 'gb': '+44', 'nz': '+64', 'au': '+61',
    'br': '+55', 'ca': '+1', 'de': '+49', 'dk': '+45',
    'es': '+34', 'fi': '+358', 'fr': '+33', 'ie': '+353',
    'ir': '+98', 'tr': '+90', 'no': '+47', 'nl': '+31',
}

$(document).ready(function(){
    get()
    $('#gen').click(function() {
        $('.img').hide(500).fadeOut(500)
        $('.load').slideDown(500).fadeIn(500)
        get()
    });

    $('#filter').click(function() {
        $('.filter').slideToggle(500)
    });
            
            
    var edit = false
    $('.edit').click(function() {
        if (edit === false) {
            $('span').attr('contenteditable', 'true')
            $('.edit').fadeOut(300).hide(function () {
                $('.edit img').toggle()
                $('.edit div').toggle()
            })
            $('.edit').fadeIn(300).show()
            $('#name').focus()
            edit = true
        }
        else {
            $('span').attr('contenteditable', 'false')
            $('.edit').fadeOut(300).hide(function() {
                $('.edit div').toggle()
                $('.edit img').toggle()
            })
            $('.edit').fadeIn(300).show()
            edit = false
        }
    });
    
    $('.dropdown button').click(function() {
        $('#li').toggle(600)
    });
    

    $('li').click(function() {
        $('#li').hide(600)
        $('.dropdown button').text($(this).text())
        nation = $(this).attr('value')
    });

});



function get() {
    var radio = $("input[name='gender']:checked").val()
    var gender_url = ""
    if (radio != '') {
        gender_url = "&gender=" + radio
    }
    
    
    $.ajax({
        url: "https://randomuser.me/api/?exc=login,registered,cell,id&results=1&nat="+ nation + gender_url ,
        type: "GET",
        dataType: "json",
        timeout: 10000,
        success: function(data) {
            parse(data);
        },
        error: function(error) {
            $('.container').html('<br><h4 style="color: black;">Uh oh, something went wrong. Try again later. Thank you.</h4><div class="load" style="display: none;"><div></div></div><br><button class="btn btn-my" id="ref">Refresh</button><br><br>');
            $('#ref').click(function(){
                $('.load').slideDown(500).fadeIn(500)
                location.reload(true);
                return false;
            });
        },
    })
}
    
    
function parse(data) {
    var basic = data.results[0]
    var name = (basic.name.title + " " + basic.name.first + " " + basic.name.last)
    var gender = basic.gender
    var picture = basic.picture.large
    
    var age = parseInt(basic.dob.age)
    var dob = (basic.dob.date).split('T')
    dob = dob[0].split('-')
    dob = dob.reverse()
    
    if (age > 54) {
        age = age - 15
        dob[2] = parseInt(dob[2]) + 15
    }
    dob = dob.join('-')
    
    // Contact
    let num = Math.floor(Math.random() * 9)
    let nums = Math.floor(Math.random() * 999)
    let domain = ['gmail', 'email', 'yahoo', 'hotmail', 'airmail', 'outlook', 'postmail', 'mailer', 'ark']
    var email = (basic.email).split('@')
    email = email[0]+'.'+nums+"@"+ domain[num]+'.com'
    var phone = basic.phone 
    phone = code[nation] +" "+ phone
    
    // Location
    var street = (basic.location.street.number + ' ' + basic.location.street.name)
    var city = basic.location.city
    var state = basic.location.state
    var country = basic.location.country
    var postcode = basic.location.postcode
    var latitude = basic.location.coordinates.latitude
    var longitude = basic.location.coordinates.longitude
    
    $('.img').attr('src', picture).show(1000).fadeIn(1000);
    
    // Basic
    $('#name').text(name);
    $('#gender').text(gender);
    $('#age').text(age);
    $('#dob').text(dob);
    
    // Contact
    $('#email').text(email);
    $('#phone').text(phone);
    
    // Location 
    $('#street').text(street);
    $('#postcode').text(postcode);
    $('#city').text(city);
    $('#state').text(state);
    $('#country').text(country);
    
    // Location Coordinates
    $('#latitude').text(latitude);
    $('#longitude').text(longitude);
    
    $('.box').slideDown(2000);
    $('.load').slideUp(700).fadeOut(700);
    
};




