import { signIn} from "next-auth/react";
const Login = () => {
  return (
    <div className="fixed top-0 bg-cover  right-0 min-w-full h-full z-50 bg-login flex flex-row justify-center align-middle">
      <div className="absolute p-5 md:p-20 md:w-1/2 right-2 bottom-20  md:h-2/3 md:right-10 md:bottom-10 w-10/12 h-1/3  bg-[#ccd3db]">
        <h1 className="font-normal md:text-5xl text-3xl text-gray-600 mb-5 md:mb-10">
          Get Weather Updates
        </h1>
        <p className="text-2xl text-gray-800">
          We care abuout people so that we provide most predicted weather
          updated so that you never fall into problem.{" "}
          <span className="text-gray-900 underline pb-2">
            To know more please login{" "}
          </span>
          .
        </p>
        <button
          onClick={signIn}
          className="text-gray-50  border-2 mt-5 md:mt-10 rounded-full text-2xl md:text-3xl pt-2 pb-3 px-10 md:pt-1 md:mb-2 bg-blue-500 md:px-14 "
        >
          Login
        </button>
      </div>
    </div>
  );
};


export default Login;
