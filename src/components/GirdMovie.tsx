import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { PlayNowRespType, TopRatedMovieJSONType } from "../services/movies";
import CardMovie from "./CardMovie";
import PullToRefresh from "react-simple-pull-to-refresh";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

export interface GirdMovieProps extends Pick<UseQueryResult, "refetch"> {
  data?: PlayNowRespType | TopRatedMovieJSONType;
  isFetching?: boolean;
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function GirdMovie({
  data,
  refetch,
  isFetching,
  setPage,
  page,
}: GirdMovieProps) {
  const [isRefetching, setIsRefetching] = useState(false);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (!isFetching) {
      setIsRefetching(false);
    }
  }, [isFetching]);
  return (
    <PullToRefresh
      onRefresh={async () => {
        setIsRefetching(true);
        await refetch();
      }}
    >
      <>
        <Grid container gap={2} justifyContent="center">
          {data?.results.map((movie) => {
            return (
              <Grid xs={12} sm={6} md={4} lg={3} xl={2} item key={movie.id}>
                <Link
                  to={`movie/${movie.id}`}
                  onClick={(e) => {
                    if (isRefetching) {
                      e.preventDefault();
                    }
                  }}
                >
                  <CardMovie
                    title={movie.title}
                    content={movie.overview}
                    image={
                      "https://www.themoviedb.org/t/p/w440_and_h660_face/" +
                      movie.poster_path
                    }
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          my={2}
        >
          <Pagination
            count={data?.total_pages}
            sx={{ color: "brown" }}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </>
    </PullToRefresh>
  );
}
