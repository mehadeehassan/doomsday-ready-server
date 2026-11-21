
function validateMovie(movieData) {
  const { title, releaseYear, runtime, prerequisites, watched } = movieData;

  if (typeof title !== 'string' || !title.trim()) {
    return 'Movie title is required';
  }

  if (!Number.isInteger(releaseYear) || releaseYear < 1) {
    return 'Release year must be a valid positive number';
  }

  if (!Number.isInteger(runtime) || runtime < 1 || runtime > 300) {
    return 'Runtime must be between 1 and 300 minutes';
  }

  if (prerequisites !== undefined && !Array.isArray(prerequisites)) {
    return 'Prerequisites must be an array';
  }

  if (watched !== undefined && typeof watched !== 'boolean') {
    return 'Watched must be a boolean';
  }

  return null;
}

module.exports = { validateMovie };
