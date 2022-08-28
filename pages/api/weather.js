// setting  weather api options
import axios from "axios";
const twilio = require("twilio");
const nodeMailer = require("nodemailer");
// var Twitter = require("twitter");

// var twiiterClient = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWIITER_ACCESS_SECRET,
// });

const noRainyCodes = [
  {
    code: 1000,
    day: "Sunny",
    night: "Clear",
    icon: 113,
  },
  {
    code: 1003,
    day: "Partly cloudy",
    night: "Partly cloudy",
    icon: 116,
  },
  {
    code: 1006,
    day: "Cloudy",
    night: "Cloudy",
    icon: 119,
  },
  {
    code: 1009,
    day: "Overcast",
    night: "Overcast",
    icon: 122,
  },
  {
    code: 1030,
    day: "Mist",
    night: "Mist",
    icon: 143,
  },
  {
    code: 1213,
    day: "Light snow",
    night: "Light snow",
    icon: 326,
  },
  {
    code: 1216,
    day: "Patchy moderate snow",
    night: "Patchy moderate snow",
    icon: 329,
  },
  {
    code: 1219,
    day: "Moderate snow",
    night: "Moderate snow",
    icon: 332,
  },
  {
    code: 1222,
    day: "Patchy heavy snow",
    night: "Patchy heavy snow",
    icon: 335,
  },
  {
    code: 1225,
    day: "Heavy snow",
    night: "Heavy snow",
    icon: 338,
  },
  {
    code: 1237,
    day: "Ice pellets",
    night: "Ice pellets",
    icon: 350,
  },
  {
    code: 1066,
    day: "Patchy snow possible",
    night: "Patchy snow possible",
    icon: 179,
  },
  {
    code: 1135,
    day: "Fog",
    night: "Fog",
    icon: 248,
  },
  {
    code: 1147,
    day: "Freezing fog",
    night: "Freezing fog",
    icon: 260,
  },
];

const rainyAndTunderingWeatherCodes = [
  {
    code: 1063,
    day: "Patchy rain possible",
    night: "Patchy rain possible",
    icon: 176,
  },

  {
    code: 1072,
    day: "Patchy freezing drizzle possible",
    night: "Patchy freezing drizzle possible",
    icon: 185,
  },
  {
    code: 1087,
    day: "Thundery outbreaks possible",
    night: "Thundery outbreaks possible",
    icon: 200,
  },
  {
    code: 1069,
    day: "Patchy sleet possible",
    night: "Patchy sleet possible",
    icon: 182,
  },
  {
    code: 1114,
    day: "Blowing snow",
    night: "Blowing snow",
    icon: 227,
  },
  {
    code: 1117,
    day: "Blizzard",
    night: "Blizzard",
    icon: 230,
  },
  {
    code: 1150,
    day: "Patchy light drizzle",
    night: "Patchy light drizzle",
    icon: 263,
  },
  {
    code: 1153,
    day: "Light drizzle",
    night: "Light drizzle",
    icon: 266,
  },
  {
    code: 1168,
    day: "Freezing drizzle",
    night: "Freezing drizzle",
    icon: 281,
  },
  {
    code: 1171,
    day: "Heavy freezing drizzle",
    night: "Heavy freezing drizzle",
    icon: 284,
  },
  {
    code: 1180,
    day: "Patchy light rain",
    night: "Patchy light rain",
    icon: 293,
  },
  {
    code: 1183,
    day: "Light rain",
    night: "Light rain",
    icon: 296,
  },
  {
    code: 1186,
    day: "Moderate rain at times",
    night: "Moderate rain at times",
    icon: 299,
  },
  {
    code: 1189,
    day: "Moderate rain",
    night: "Moderate rain",
    icon: 302,
  },
  {
    code: 1192,
    day: "Heavy rain at times",
    night: "Heavy rain at times",
    icon: 305,
  },
  {
    code: 1195,
    day: "Heavy rain",
    night: "Heavy rain",
    icon: 308,
  },
  {
    code: 1198,
    day: "Light freezing rain",
    night: "Light freezing rain",
    icon: 311,
  },
  {
    code: 1201,
    day: "Moderate or heavy freezing rain",
    night: "Moderate or heavy freezing rain",
    icon: 314,
  },
  {
    code: 1204,
    day: "Light sleet",
    night: "Light sleet",
    icon: 317,
  },
  {
    code: 1207,
    day: "Moderate or heavy sleet",
    night: "Moderate or heavy sleet",
    icon: 320,
  },
  {
    code: 1210,
    day: "Patchy light snow",
    night: "Patchy light snow",
    icon: 323,
  },

  {
    code: 1240,
    day: "Light rain shower",
    night: "Light rain shower",
    icon: 353,
  },
  {
    code: 1243,
    day: "Moderate or heavy rain shower",
    night: "Moderate or heavy rain shower",
    icon: 356,
  },
  {
    code: 1246,
    day: "Torrential rain shower",
    night: "Torrential rain shower",
    icon: 359,
  },
  {
    code: 1249,
    day: "Light sleet showers",
    night: "Light sleet showers",
    icon: 362,
  },
  {
    code: 1252,
    day: "Moderate or heavy sleet showers",
    night: "Moderate or heavy sleet showers",
    icon: 365,
  },
  {
    code: 1255,
    day: "Light snow showers",
    night: "Light snow showers",
    icon: 368,
  },
  {
    code: 1258,
    day: "Moderate or heavy snow showers",
    night: "Moderate or heavy snow showers",
    icon: 371,
  },
  {
    code: 1261,
    day: "Light showers of ice pellets",
    night: "Light showers of ice pellets",
    icon: 374,
  },
  {
    code: 1264,
    day: "Moderate or heavy showers of ice pellets",
    night: "Moderate or heavy showers of ice pellets",
    icon: 377,
  },
  {
    code: 1273,
    day: "Patchy light rain with thunder",
    night: "Patchy light rain with thunder",
    icon: 386,
  },
  {
    code: 1276,
    day: "Moderate or heavy rain with thunder",
    night: "Moderate or heavy rain with thunder",
    icon: 389,
  },
  {
    code: 1279,
    day: "Patchy light snow with thunder",
    night: "Patchy light snow with thunder",
    icon: 392,
  },
  {
    code: 1282,
    day: "Moderate or heavy snow with thunder",
    night: "Moderate or heavy snow with thunder",
    icon: 395,
  },
];
function createQuery(to, from) {
  let searchKeyWords = [
    ` raining   ${to} `,
    `heavy raining flood  ${to} `,
    `raining flood weather update${to} `,
    ` heavy raining flood ${from} `,
    `raining weather  ${from} `,
    `raining weather update ${from} `,
    `heavy raining weather ${from} `,
    "weather updates",
    "weather news",
  ];

  let query = ``;
  searchKeyWords.forEach((keyword) => {
    query += `(${keyword})OR`;
  });
  query +=
    "(rain @IndiaWeatherMan) OR (rain @WeatherRadar_IN)OR(@weatherindia rain)";
  console.log(query);
  return query;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let fromReq = axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${req.body.from}&days=14`
      );
      let toReq = axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${req.body.to}&days=14`
      );
      let travelTimeInDays = Math.ceil(req.body.time / 24);

      let to, from;
      await axios
        .all([fromReq, toReq])
        .then(
          axios.spread((...responses) => {
            from = responses[0].data;
            to = responses[1].data;
            console.log(responses);
          })
        )
        .catch((e) => {
          console.log(e.message);
          res.status(500).json({
            message: "something went wrong while fetching weather data!",
          });
        });
      let toForecastDay = to.forecast.forecastday;
      toForecastDay.forEach((daydetails, index) => {
        let code = daydetails.day.condition.code;
        let rainy = false;
        for (let i = 0; i < noRainyCodes.length; i++) {
          if (noRainyCodes[i].code === code) {
            rainy = true;
          }
        }
        if (!rainy) {
          toForecastDay[index].rainy = false;
        }
      });

      let fromForecastDay = from.forecast.forecastday;
      fromForecastDay.forEach((daydetails, index) => {
        let code = daydetails.day.condition.code;
        let rainy = false;
        for (let i = 0; i < noRainyCodes.length; i++) {
          if (noRainyCodes[i].code === code) {
            rainy = true;
          }
        }
        if (!rainy) {
          fromForecastDay[index].rainy = false;
        }
      });
      let startDay;
      let fromIndex = -1;
      let reachIndex = -1;
      for (let i = 0; i < 14; i++) {
        if (!startDay) {
          for (let j = i; j < 14; j++) {
            if (!fromForecastDay[i].rainy && !toForecastDay[j].rainy) {
              if (j - i === travelTimeInDays) {
                startDay = new Date(
                  Date.now() + i * 60 * 60 * 24 * 1000
                ).toLocaleDateString();
                fromIndex = i;
                reachIndex = j;
                break;
              }
            }
          }
        } else break;
      }
      const bearer_token = process.env.TWITTER_BEARER_TOKEN;
      const query = createQuery(req.body.from, req.body.to);
      const config = {
        method: "get",
        url: `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=50&expansions=author_id`,
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      let tweets;
      await axios(config).then((res) => {
        tweets = res.data;
      });
      if (startDay) {
        req.body = {
          message:
            "Hii Mr/Mrs" +
            req.body.user +
            ".\n" +
            "We hope you are well. We found that you can start your journey on " +
            startDay +
            "best of luck for your journey.",
          phone: req.body.phone ? req.body.phone : undefined,
          email: req.body.email,
        };
        let data = await mailer(req);
        if (data.error) {
          return res.status(500).json({
            message: "something went wrong while sending sms and email",
          });
        }
        return res.status(200).json({
          startDay,
          tweets,
          condition: [fromForecastDay[fromIndex], toForecastDay[reachIndex]],
        });
      }
      return res.status(404).json({
        message: "No suitable date found withing next 14 days",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "something went wrong",
      });
    }
  } else {
    return res.json({
      error: "Not a valid request",
    });
  }
}

async function mailer(req) {
  if (req.method === "POST") {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });
    const accountSid = process.env.TWILLIO_ACC_ID;
    const authToken = process.env.TWILLIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);

    try {
      const options = {
        email: req.body.email,
        message: req.body.message,
        subject: "About your journey",
      };
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };

      await transporter.sendMail(mailOptions);

      if (req.body.phone) {
        await client.messages
          .create({
            body: options.subject + "\n" + options.message,
            to: req.body.phone,
            from: process.env.TWILLIO_PHONE,
          })
          .then((message) => console.log(message.sid));
      }

      return {
        message: "details has been send to email and mobile number",
      };
    } catch (error) {
      console.log(error);
      return {
        error: "something went wrong!.",
      };
    }
  } else {
    return {
      error: "something went wrong",
    };
  }
}
