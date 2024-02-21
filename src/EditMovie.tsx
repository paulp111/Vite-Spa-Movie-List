import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { Movie, updateMovie } from "./handleMovies";

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const formData = await request.formData();
  const updatedMovie = Object.fromEntries(formData) as unknown;
  await updateMovie(params.id, updatedMovie as Movie);
  return redirect(`/movies/${params.id}`);
}

export default function EditMovie() {
  const { movie } = useLoaderData() as { movie: Movie };
  const navigate = useNavigate();
  return (
    <>
      <h1 id="edit-heading">Edit Movie</h1>
      <Form method="POST" id="edit-movie">
        <div>
          <label>
            <span>Title</span>
            <input
              type="text"
              name="title"
              placeholder="title"
              defaultValue={movie.title}
            />
          </label>
          <label>
            <span>Director</span>
            <input
              type="text"
              name="director"
              placeholder="director"
              defaultValue={movie.director}
            />
          </label>
          <label>
            <span>Social</span>
            <input
              type="text"
              name="social"
              placeholder="@movie"
              defaultValue={movie.social}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Image URL</span>
            <input
              type="text"
              name="img"
              placeholder="https://www.example.com/img"
              defaultValue={movie.img}
            />
          </label>
          <label>
            <span>Runtime</span>
            <input
              type="number"
              name="runtime"
              placeholder="166"
              defaultValue={movie.runtime}
            />
          </label>
          <p>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </p>
        </div>
      </Form>
    </>
  );
}
