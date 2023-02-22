export const releaseDate = (release_date: string) => {
  return new Date(release_date).getFullYear();
};

export const runtimeToHours = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

export const srcImage = (url: string) => {
  if (url !== null) {
    return `https://image.tmdb.org/t/p/w500${url}`;
  }
  return "/pictos/no-image.jpg";
};
