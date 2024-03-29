import { Outlet } from "react-router-dom";
import { NavLink, useLoaderData } from "react-router-dom";
import gamesBg from "../assets/game_wallpaper.jpg";

let key = "2a3e3c54685146fe8d40f600aef2df29";

export default function GamesLayout() {
  let gamesCategories = useLoaderData();

  gamesCategories = gamesCategories.results;

  const activeLink =
    "bg-white text-black rounded flex items-center justify-center text-center h-8 text-sm xl:text-base";
  const normalLink =
    "bg-black text-white flex items-center justify-center text-center h-8 text-sm xl:text-base";

  return (
    <div>
      <img
        src={gamesBg}
        alt="various games image"
        className="flex w-full object-cover object-center md:h-[500px] "
      />
      <section className="flex flex-col">
        <nav className="grid grid-cols-3 gap-3 border-b-4 border-white bg-black p-2 shadow-2xl xl:grid-cols-4 xl:gap-5 2xl:grid-cols-5">
          {gamesCategories.map((categorie) => (
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
              to={categorie.id.toString()}
              key={categorie.id}
            >
              <h2>{categorie.name}</h2>
            </NavLink>
          ))}
        </nav>
        <div className=" bg-gray-100 p-4">
          <Outlet></Outlet>
        </div>
      </section>
    </div>
  );
}

export const categoriesLoader = async () => {
  const res = await fetch("https://api.rawg.io/api/genres?key=" + key, {
    mode: "cors",
  });

  if (!res.ok) {
    throw Error("Could not fetch games");
  }

  return res.json();
};
