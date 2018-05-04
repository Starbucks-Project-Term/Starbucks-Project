const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const maps = require('./maps.js')

const crypto = require('crypto')

var app = express();
const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var Accs = []
var place = '';
var logged_in = ""
var current_long = ''
var current_lat = ''
var last_save = ""
var user_id = '';
/**
 * Calls the function ReadAccfile and returns the list into the variable Accs
 */
var LoadAccfile = () => {
    Accs = ReadAccfile('accounts.json')
};

/**
 * Reads the file and returns the contents so its usable in node. 
 * If the file doesnt exist it will create the file with an empty list
 * @param {string} file - The file that you want to read
 */
var ReadAccfile = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file))
    }
    catch (exception) {
        if (exception.code === 'ENOENT') {
            fs.writeFileSync(file, '[]');
            return JSON.parse(fs.readFileSync(file))
        }
        else {
            window.alert(exception)
        }
    }
};

/**
 * Turns the variable Accs into a string and writes it into the accounts.json file
 */

var WriteAccfile = () => {
    fs.writeFileSync('accounts.json', JSON.stringify(Accs));
};

/**
 * Reads the account file and also calls the function LoginCheck. Renders error page or index page
 * @param {string} request - Grabs the username and password values from the form lin loginbox
 * @param {string} response - Renders index2.hbs or error1.hbs
 */

var Login = (request, response) => {
    var filecontents = ReadAccfile('accounts.json')
    if (LoginCheck(request, filecontents) == 0) {
    displaySaved = ''
    LoadAccfile()
    var userdata = Accs[user_id]
    console.log(userdata.saved);

    for (var i = 0; i < userdata.saved.length; i++) {
        console.log(userdata.saved[i]);
        displaySaved += `<div class="favItems"><a onclick="getMap(${userdata.saved[i]})"> ${userdata.saved[i]}</a></div>`
    }
    response.render('index2.hbs', {
        savedSpots: displaySaved
    })
    }
    else {
        response.render('index.hbs', {
            username: 3
        });
    }
};

/**
 * Verifies that the username and password exist in the accs arg.
 * @param {string} request - Grabs the username and password values from the form
 * @param {string} accs - The list object passed in from Login fucntion
 */

var LoginCheck = (request, accs) => {
    hashing_password = hash_data(request.body.password)

    for (i = 0; i < accs.length; i++) {
        if ((request.body.username == accs[i].user) && (hashing_password == accs[i].pass)) {
            console.log("User pass is ", accs[i].pass);
        	logged_in = accs[i]
            user_id = i
            return 0
        }
    };
};

/**
 * Adds a user to the file and Acc list variable if UserNameCheck and PasswordCheck returns 0.
 * @param {string} request - Grabs the username, password and confirm password values from the form createacc 
 * @param {string} response - renders origional login page 
 */

var AddUsr = (request, response) => {
    LoadAccfile()
    if (UserNameCheck(request, response, Accs) == 0 && PasswordCheck(request, response) == 0){
        hash_password = hash_data(request.body.NewPassword)    
        var acc = {
            'user': request.body.NewUser,
            'pass': hash_password,
            'saved': []
        }
        Accs.push(acc)
        WriteAccfile()
		response.render('index.hbs', {
            username:0
        });
    }
};

var hash_data = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
}

/**
 * checks if new username is already saved
 * @param {string} request - Grabs the new username
 * @param {string} response - renders errorpage
 */

var UserNameCheck = (request, response, Accs) => {
    if (request.body.NewUser.length <= 12 && request.body.NewUser.length >= 3 ) {
        console.log(request.body.NewUser.length)
        console.log(Accs.length)
        for (i = 0; i < Accs.length; i++) {
            console.log(Accs[i].user)
            if (request.body.NewUser == Accs[i].user) {
                response.render('index.hbs', {
                    username:2
                });
                return 1
            }
        }
        return 0
    }
    response.render('index.hbs', {
        username: 1
    });
    return 2
};


/**
 * checks if password and confirmed password is not the same
 * @param {string} request - Grabs the password and confirm password
 * @param {string} response - renders errorpage 
 */

var PasswordCheck = (request, response) => {
    if (request.body.NewPassword.length >= 5 && request.body.confirmp.length >= 5){
        if (request.body.NewPassword != request.body.confirmp) {
            response.render('index.hbs', {
                username: 4
            });
            return 1
        } else {
            return 0
        }
    }
    response.render('index.hbs', {
        username: 5
    });
    return 2
};

app.get('/places_funct', (request,response) => {
    var places = fs.readFileSync('places.json');
    var parsed_places = JSON.parse(places)
    response.end(places)
})

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');
});

app.get('/map', (request, response) => {
    response.render('map_view.hbs');
});

app.post('/login', (request, response) => {
    Login(request, response);
});

app.post('/home', (request, response) => {
    AddUsr(request, response);
}); 

app.post('/starbucksnearme', (request,response) => {
    longitude = request.body.longitude;
    latitude = request.body.latitude;
    maps.get_sturbuckses(latitude, longitude).then((response1) => {
        console.log(response1.list_of_places);
})
});


/**
 * gets the starbucks locations based on the location you enter and populates the div
 * @param {string} request - Grabs the location that you enter in
 * @param {string} response - Renders the index2.hbs page with the starbucks locations
 */
app.post('/loginsearch', (request, response) => {
    place = request.body.search
    maps.getAddress(place).then((coordinates) => {
        console.log(coordinates);
        maps.get_sturbuckses(coordinates.lat, coordinates.long).then((response1) => {
            console.log(response1.list_of_places);
            displayText = '<ul>'
            for (var i = 0; i < maps.listofmaps.length; i++) {
                displayText += `<div class='favItems'><a href="#" onclick="getMap(\'${maps.listofmaps[i]}\'); currentSB=\'${maps.listofmaps[i]}\'"> ${maps.listofmaps[i]}</a></div>`
            }
            response.render('index2.hbs', {
                testvar: displayText,
                coord: `<script>latitude = ${coordinates.lat}; longitude = ${coordinates.long};defMap()</script>`
            })
        }).catch((error) => {
            console.log("Error ", error);
        })
    })
})
/**
 * gets the longitude and latitude of the location that you enter in
 * @param {string} request - gets the value of the location that you enter in 
 * @param {string} response - sends the coordinates of the location that you entered in
 */
app.post('/getLocation', (request, response) => {
    place = request.body.location
    maps.getAddress(place).then((coordinates) => {
        console.log(coordinates.lat, coordinates.long);
        response.send(coordinates)
    })
})

/**
 * saves the selected location into the file
 * @param {string} request - grabs the location that you have clicked on
 */
app.post('/storeuserdata', (request, response) => {
	let account = JSON.parse(fs.readFileSync('accounts.json'));
	for (var i = 0; i < account.length; i++) {
		if (logged_in.user == account[i].user) {
            console.log('push list');
			account[i].saved.push(request.body.location)
            last_save = request.body.location
		}
	}
    console.log(account);
	fs.writeFileSync('accounts.json', JSON.stringify(account));
})
/**
 * populates the saved div with all the locations that you have saved to your account
 * @param {string} response - Renders the index2.hbs page with the variable displaySaved which is a list of all your saved locations
 */
app.post('/favdata', (request, response) => {
    displaySaved = ''
    LoadAccfile()
    var userdata = Accs[user_id]
    console.log(userdata.saved);

    for (var i = 0; i < userdata.saved.length; i++) {
    	console.log(userdata.saved[i]);
        displaySaved += `<div class="favItems"><a onclick="getMap(${userdata.saved[i]})"> ${userdata.saved[i]}</a></div>`
    }
	response.render('index2.hbs', {
        savedSpots: displaySaved
    })
})

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on the port 8080');
});

module.exports = {
    UserNameCheck,
    PasswordCheck,
    LoginCheck
}