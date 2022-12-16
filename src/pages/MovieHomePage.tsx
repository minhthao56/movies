import { useQuery } from "@tanstack/react-query";
import apiMovies from "../services/movies";
import GirdMovie from "../components/GirdMovie";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import { useState } from "react";

export default function MovieHomePage() {
  const { setOpened } = useSnackbarContext();
  const [page, setPage] = useState(1);

  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: ["now_playing", page],
    queryFn: async () => {
      return await apiMovies.getMoviesPlayingNow({ page });
    },
    onError: (err) => {
      setOpened({
        isOpened: true,
        severity: "error",
        message: JSON.stringify(err),
      });
    },
  });

  return isLoading ? (
    <CircularIndeterminate />
  ) : (
    <GirdMovie
      data={data}
      refetch={refetch}
      isFetching={isFetching}
      setPage={setPage}
      page={data?.page || page}
    />
  );
}
