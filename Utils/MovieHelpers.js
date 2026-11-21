function hasCircularDependency(movies, movieId, prerequisiteIds) {
  const movieMap = new Map();

  for (const movie of movies) {
    movieMap.set(movie._id.toString(), movie.prerequisites.map(String));
  }

  // নতুন prerequisite list সেট করা
  movieMap.set(movieId, prerequisiteIds.map(String));

  const visiting = new Set();
  const visited = new Set();

  function checkCycle(id) {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;

    visiting.add(id);

    const prerequisites = movieMap.get(id) || [];

    for (const prerequisiteId of prerequisites) {
      if (checkCycle(prerequisiteId)) {
        return true;
      }
    }

    visiting.delete(id);
    visited.add(id);

    return false;
  }

  for (const id of movieMap.keys()) {
    if (checkCycle(id)) return true;
  }

  return false;
}

function getRewatchOrder(movies, targetMovieId) {
  const movieMap = new Map();

  for (const movie of movies) {
    movieMap.set(movie._id.toString(), movie);
  }

  const visited = new Set();
  const rewatchOrder = [];

  function visitMovie(movieId) {
    if (visited.has(movieId)) return;

    visited.add(movieId);

    const movie = movieMap.get(movieId);

    if (!movie) return;

    for (const prerequisiteId of movie.prerequisites) {
      visitMovie(prerequisiteId.toString());
    }

    if (movieId !== targetMovieId) {
      rewatchOrder.push(movie);
    }
  }

  visitMovie(targetMovieId);

  const watchedCount = rewatchOrder.filter((movie) => movie.watched).length;

  const remainingRuntime = rewatchOrder
    .filter((movie) => !movie.watched)
    .reduce((total, movie) => total + movie.runtime, 0);

  return {
    rewatchOrder,
    watchedCount,
    totalMovies: rewatchOrder.length,
    remainingRuntime,
  };
}

module.exports = {
  hasCircularDependency,
  getRewatchOrder,
};
