const { google } = require("googleapis");

const { OAuth2 } = google.auth;

require("dotenv").config();

const key = process.env.API_KEY;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_ClIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function listEvents(calId, cb) {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  try {
    const res = await calendar.events.list({
      calendarId: calId,
      timeMin: new Date().toISOString(),
      maxResults: 7,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    cb(
      events.map((event) => ({
        summary: event.summary,
        start: event.start.dateTime || event.start.date,
      }))
    );
  } catch (err) {
    console.log("error getting events from gapi: ", err);
  }
}

module.exports = { listEvents: listEvents, key: key };
