export const releaseDate = (release_date: string) => {
  return new Date(release_date).toLocaleDateString();
};
