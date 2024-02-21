import { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getMovies, createMovie, Movie } from "./handleMovies";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");
  const movies = await getMovies(term!);
  return { movies, term };
}

export async function action() {
  const movie = await createMovie();
  return redirect(`/movies/${movie.id}/edit`);
}

export default function RootElement() {
  const { movies, term } = useLoaderData() as { movies: Movie[]; term: string };
  const navigate = useNavigation();
  const submit = useSubmit();

  const searching =
    navigate.location &&
    new URLSearchParams(navigate.location.search).has("term");

  useEffect(() => {
    const searchInput = document.getElementById(
      "term"
    ) as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = term;
    }
  }, [term]);

  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="term"
              className={searching ? "searching" : ""}
              aria-label="Search Movies"
              placeholder="Moviename"
              type="search"
              name="term"
              defaultValue={term}
              onChange={(e) => {
                submit(e.currentTarget.form!);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
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
        <Outlet />
      </div>
    </>
  );
}
