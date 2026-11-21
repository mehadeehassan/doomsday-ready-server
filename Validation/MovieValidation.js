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

function validateMovieUpdate(updateData) {
  if (updateData.title !== undefined) {
    if (typeof updateData.title !== 'string' || !updateData.title.trim()) {
      return 'Movie title is required';
    }
  }

  if (updateData.releaseYear !== undefined) {
    if (!Number.isInteger(updateData.releaseYear) || updateData.releaseYear < 1) {
      return 'Invalid release year';
    }
  }

  if (updateData.runtime !== undefined) {
    if (
      !Number.isInteger(updateData.runtime) ||
      updateData.runtime < 1 ||
      updateData.runtime > 300
    ) {
      return 'Runtime must be between 1 and 300 minutes';
    }
  }

  if (updateData.prerequisites !== undefined && !Array.isArray(updateData.prerequisites)) {
    return 'Prerequisites must be an array';
  }

  if (updateData.watched !== undefined && typeof updateData.watched !== 'boolean') {
    return 'Watched must be a boolean';
  }

  return null;
}

module.exports = { validateMovie, validateMovieUpdate };
