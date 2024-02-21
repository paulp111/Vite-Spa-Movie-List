import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { getMovies, createMovie, Movie } from "./handleMovies";

export async function loader() {
  const movies = await getMovies();
  return { movies };
}

export async function action() {
  const movie = await createMovie();
  return redirect(`/movies/${movie.id}/edit`);
}

export default function RootElement() {
  const { movies } = useLoaderData() as { movies: Movie[] };
  const navigate = useNavigation();
  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="term"
              aria-label="Search Movies"
              placeholder="Moviename"
              type="search"
              name="term"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">Add</button>
          </Form>
        </div>
        <nav>
          <ul>
            {movies.map((movie) => [
              <li key={movie.id}>
                <NavLink
                  to={`/movies/${movie.id}`}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  {movie.title ? movie.title : "no title"}
                </NavLink>
              </li>,
            ])}
          </ul>
        </nav>
      </div>
      <div
        id="content"
        className={navigate.state === "loading" ? "loading" : ""}
      >
        {<Outlet />}
      </div>
    </>
  );
}
