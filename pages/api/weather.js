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
        for (let i = 0; i < rainyAndTunderingWeatherCodes.length; i++) {
          if (rainyAndTunderingWeatherCodes[i].code === code) {
            rainy = true;
          }
        }
        toForecastDay[index].rainy = rainy;
      });

      let fromForecastDay = from.forecast.forecastday;
      fromForecastDay.forEach((daydetails, index) => {
        let code = daydetails.day.condition.code;
        let rainy = false;
        for (let i = 0; i < rainyAndTunderingWeatherCodes.length; i++) {
          if (rainyAndTunderingWeatherCodes[i].code === code) {
            rainy = true;
          }
        }
        fromForecastDay[index].rainy = rainy;
      });

      let startDay;
      let fromIndex = -1;
      let reachIndex = -1;
      for (let i = 0; i < toForecastDay.length; i++) {
        if (!startDay) {
          for (let j = i; j < fromForecastDay.length; j++) {
            if (!fromForecastDay[i].rainy && !toForecastDay[j].rainy) {
              if (j - i === travelTimeInDays) {
                startDay = new Date(
                  Date.now() + i * 60 * 60 * 24 * 1000
                ).toDateString();
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
      let message;
      if (startDay) {
        message =
          "Hii Mr/Mrs" +
          req.body.user +
          ".\n" +
          "We hope you are well.\n" +
          "No suitable date found withing next 14 days.";
      } else {
        message =
          "Hii Mr/Mrs" +
          req.body.user +
          ".\n" +
          "We hope you are well.\n We found that you can start your journey on " +
          startDay +
          "  best of luck for your journey.";
      }
      req.body = {
        phone: req.body.phone ? req.body.phone : undefined,
        email: req.body.email,
        message,
      };
      let data = await mailer(req);
      let resData = {
        startDay,
        tweets,
        to,
        from,
        condition: [fromForecastDay[fromIndex], toForecastDay[reachIndex]],
      };
      if (data.error) {
        resData.error =
          "Email has been sent to your mail but not sms beacsue your mobile is not verified by twillio to send sms.!";
      }
      return res.status(200).json(resData);
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
      console.log("The errors are : ", error.name);
      return {
        error: "something went wrong!.",
      };
    }
  } else {
    return {
      error: "Not a valid request method!",
    };
  }
}
