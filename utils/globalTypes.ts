export type MovieProps = {
  id: string;
  title: string;
  director: {
    name: string;
  } | null;
  genre: {
    name: string;
  } | null;
  year: string | null;
  seen: boolean;
};
