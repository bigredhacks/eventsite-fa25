import brhLogo from "@/assets/brh_logo_red_text.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red1 to-red3 flex items-center justify-center px-4">
      <div className="bg-white3 rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl text-brown1 text-center mb-2 font-poppins">
            <img
            src={brhLogo}
            alt="logo"
            className="mx-auto mb-6 w-40"
            />
          Login
        </h1>

        <form className="space-y-5">
          <div className="px-16 font-poppins">
            <label htmlFor="email" className="block text-sm font-medium text-brown3 mb-2">
              Email <span className="text-red4">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              className="text-brown3 w-full px-4 py-3 border border-brown3 rounded-lg focus:ring-2 focus:ring-red4 focus:border-transparent outline-none transition"
              placeholder="Email"
            />
          </div>

          <div className="px-16 font-poppins">
            <label htmlFor="password" className="block text-sm font-medium text-brown3 mb-2">
              Password <span className="text-red4">*</span>
            </label>
            <input
              id="password"
              type="password"
              required
              className="text-brown3 w-full px-4 py-3 border border-brown3 rounded-lg focus:ring-2 focus:ring-red4 focus:border-transparent outline-none transition"
              placeholder="Password"
            />
          </div>

          <div className="text-center font-poppins text-sm text-brown3">
            <a href="#" className="underline hover:text-red4 transition">
              Forgot password?
            </a>
          </div>

          <div className="px-5">
            <button
                type="submit"
                className="w-full bg-red4 py-2.5 rounded-lg font-semibold font-poppins hover:bg-red3 transition shadow-md"
            >
                Sign In
            </button>
          </div>
          
        </form>

        <div className="mt-6 text-center">
            <Link to="/signup" className="underline text-brown3 hover:text-red4 font-medium font-poppins transition">
              Create New Account
            </Link>
        </div>
      </div>

      
    </div>
  );
};

export default Login;