import Header from "../Header";

export default function LoginPage()
{
    return (
     
      <div className="flex justify-center items-center h-screen">
      <div className="mt-4 border border-grey-4 p-6 translate-x-10 -translate-y-10">
        <h1 className="text-l text-center">LOGIN</h1>
        <form className="p-4">
          <input
            type="text"
            placeholder="your@email.com"
            className="border border-grey rounded-2xl my-1 px-2 py-3 mb-2"
          /><br /><br />
          <input
            type="password"
            placeholder="password"
            className="border border-grey rounded-2xl my-1 px-2 py-3 mb-2"
          /><br /><br />
          <button className="border border-grey-4 rounded-full gap-4 p-1 bg-primary text-white">
            Login
          </button>
        </form>
      </div>
    </div>
    
    
    );
}