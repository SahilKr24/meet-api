const fs = require('fs');
const { google } = require('googleapis');

var oAuth2Client, gevents;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

//always runs
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content));
});

function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
}


//for initializing new user (has to be called)
function getAccessUrl() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl
}


async function getAccessToken(code) {
  try{
    const token = await oAuth2Client.getToken(code)
    return token.tokens
  }
  catch(error){
    console.error(error);
  }
  

}

async function listEvents(token) {
  const auth = oAuth2Client
  await oAuth2Client.setCredentials(token);
  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const list = await calendar.calendarList.list()
  console.log('printing list')
  console.log(list.data.items)

  gevents = response.data.items
  console.log('returning all events')
  // return all events
  return gevents
}

async function createEvent(params, token) {
  const auth = oAuth2Client
  await oAuth2Client.setCredentials(token);
  const calendar = google.calendar({ version: 'v3', auth });
  // console.log(params)
  var event = {
    'summary': params.name,
    'location': 'KIIT University',
    'description': params.code,
    'start': {
      'dateTime': `${params.date}T${params.stime}:00+05:30`,
      'timeZone': 'Asia/Kolkata',
    },
    'end': {
      'dateTime': `${params.date}T${params.etime}:00+05:30`,
      'timeZone': 'Asia/Kolkata',
    },
    'attendees':[{'email':params.attendees}],
    'colorId': '1',
    'conferenceData': {
      'conferenceSolution': {
        'key': {
          'type': 'hangoutsMeet'
        }
      },
      'createRequest': {
        'requestId': `random69`
      }
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 },
      ],
    },
  };
  try {
    // console.log(event)
    console.log('request sent')
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    },)
    console.log('after request sent')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return 'error'
  }
// .then( request => console.log(request.data))
// .catch(err => console.log(err))
}

module.exports = { getAccessUrl, getAccessToken, listEvents ,createEvent}