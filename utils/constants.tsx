export const releaseDate = (release_date: string) => {
  return new Date(release_date).toLocaleDateString();
};

export const srcImage = (url: string) => {
  if (url !== null) {
    return `https://image.tmdb.org/t/p/w500${url}`;
  }
  return "/pictos/no-image.jpg";
};
