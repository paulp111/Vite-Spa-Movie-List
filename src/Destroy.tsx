import { redirect } from "react-router-dom";
import { deleteMovie } from "./handleMovies";

export async function action({ params }: { params: { id: string } }) {
  await deleteMovie(params.id);
  return redirect("/");
}
