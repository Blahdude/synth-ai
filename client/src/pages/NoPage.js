import { Link } from "react-router-dom";

export const NoPage = () => {
  return (
    <div className="flex flex-col">
      <img src="../Images/error-404.png" className="m-auto mt-24"></img>
      <Link to='/home' className="m-auto bg-indigo-300 rounded-md border-4 border-slate-950 hover:bg-indigo-400 transition-all">
        <img src="../Images/take-me-home.png"></img>
      </Link>
    </div>
  )
}