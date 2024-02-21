import sortBy from "sort-by";

export type Movie = {
  id: string;
  title: string;
  director: string;
  runtime: number;
  img: string;
  social: string;
};

let fakeCache: { [key: string]: boolean } = {};

function fakeDelay(key?: string) {
  if (!key) {
    fakeCache = {};
  }
  if (fakeCache[key!]) {
    return;
  }
  fakeCache[key!] = true;
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

export async function getMovies() {
  await fakeDelay(`getMovies`);
  const movies: Movie[] = await fetch("http://localhost:5001/movies").then(
    (res) => res.json()
  );
  return movies.sort(sortBy("title", "createdAt")) ?? [];
}

export async function createMovie() {
  await fakeDelay();
  const movie = {
    id: Math.random().toString(36).substring(2, 9),
    createdAt: Date.now(),
    title: "New Movie",
    director: "New Director",
    runtime: 0,
    img: "",
    social: "",
  };
  await fetch("http://localhost:5001/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return movie;
}

export async function getMovie(id: string) {
  await fakeDelay(`getMovie:${id}`);
  const movie: Movie = await fetch(`http://localhost:5001/movies/${id}`).then(
    (res) => res.json()
  );
  return movie;
}

export async function updateMovie(id: string, movie: Movie) {
  await fakeDelay();
  await fetch(`http://localhost:5001/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return movie;
}

export async function deleteMovie(id: string) {
  await fakeDelay();
  await fetch(`http://localhost:5001/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
