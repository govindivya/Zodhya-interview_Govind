import { useSession, signIn, getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import axios from "axios";
import Tweet from "../components/Tweet";
import Spinner from "../components/spinner";
import { useAlert } from "react-alert";

export default function Home() {
  const { data: session } = useSession();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState();
  const [tweets, setTweets] = useState([]);
  const [sheduleTime, setSheduleTime] = useState();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const alert = useAlert();
  const submitForm = (e) => {
    e.preventDefault();
    setTo(e.target.to.value);
    setFrom(e.target.from.value);
    setTime(e.target.time.value);
    setPhone(e.target.phone.value);
  };

  useEffect(() => {
    if (to && from && time) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      let data = {
        from,
        to,
        time,
        user: session.user.name,
        email: session.user.email,
      };
      if (phone) {
        if (String(phone).length === 10) {
          data.phone = "+91" + String(phone);
        }
      }
      axios
        .post("/api/weather", data, config)
        .then((res) => {
          setTweets(res.data.tweets.data);
          setLoading(false);
          setSheduleTime(res.data.startDay);
          alert.success(
            "All the details has been set to your mobile and email."
          );
        })
        .catch((e) => {
          console.log(e);
          alert.error(e.response.data.message);
          setLoading(false);
        });
    }
  }, [to, from, time, phone]);

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }

  return (
    <>
      <div className="relative w-full min-h-screen p-0 m-0 flex flex-col justify-center">
        <div className="relative  w-full m-0 flex md:flex-row flex-col md:justify-center justify-start align-middle pt-20 md:p-5 bg-login  min-h-screen py-10 md:py-20 px-5 md:px-10">
          <div
            style={{ borderRadius: "50%" }}
            className="absolute right-5 top-5 border px-3 py-1 border-b-slate-700"
          >
            <button
              onClick={() => {
                let logout = window.confirm("Do you really want to logout ?");
                if (logout) {
                  signOut();
                }
              }}
              className="text-pink-400 md:text-5xl  text-2xl"
            >
              {session.user.name.split(" ")[0].charAt(0)}
            </button>
          </div>
          <div className="flex-1 md:mr-1`0 flex flex-col justify-center align-middle md:pl-5 p-2 bg-gray-400 opacity-75">
            <h1 className="font-normal md:text-7xl text-3xl text-orange-800 mb-2 md:mb-5">
              Welcome
            </h1>
            <h1 className="font-normal md:text-4xl text-3xl text-gray-600-800 ">
              Know weather updates in few soconds. We help people to start their
              journey in beautiful weather.
            </h1>
          </div>
          <div className="flex-1 md:mt-20  flex flex-col justify-center align-middle md:pl-5 p-2 opacity-75">
            <form
              onSubmit={submitForm}
              className="flex flex-col align-middle justify-center md:w-2/3 w-full mx-auto"
            >
              <input
                name="from"
                className=" mx-auto h-14 w-2/3 px-2 rounded-lg mb-4 outline-none border-gray-600"
                placeholder="From"
                type="text"
              />
              <input
                name="to"
                className="h-14 mx-auto w-2/3 px-2 rounded-lg mb-4 outline-none border-gray-600"
                placeholder="To"
                type="text"
              />
              <input
                name="time"
                className="h-14 mx-auto w-2/3 px-2 rounded-lg mb-4 outline-none border-gray-600"
                placeholder="Average travel in hour"
                type="number"
              />
              <input
                name="phone"
                className="h-14 mx-auto w-2/3 px-2 rounded-lg mb-4 outline-none border-gray-600"
                placeholder="Optional Mobile number to get sms ."
                type="number"
              />
              <button
                type="submit"
                className="hover:bg-blue-800 py-2 px-6 rounded-full mx-auto md:pt-2 md:pb-3  md:px-14 border-blue-300 bg-blue-400 text-lg text-gray-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {tweets.length !== 0 && (
          <div className="w-full  flex flex-col md:flex-row flex-wrap justify-center align-middle">
            <h1 className="w-full text-gray-600 text-5xl p-10 justify-center align-middle flex flex-row">
              All Related Tweets
            </h1>
            {tweets.map((tweet, index) => (
              <Tweet tweet={tweet} key={index} />
            ))}
          </div>
        )}
      </div>
      {loading == true && <Spinner />}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
