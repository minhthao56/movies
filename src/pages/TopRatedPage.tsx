import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CircularIndeterminate from "../components/CircularIndeterminate";
import GirdMovie from "../components/GirdMovie";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import apiMovies from "../services/movies";

export default function TopRatedPage() {
  const { setOpened } = useSnackbarContext();
  const [page, setPage] = useState(1);

  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: ["top_rated", page],
    queryFn: async () => {
      return await apiMovies.getTopRatedMovies({ page });
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
