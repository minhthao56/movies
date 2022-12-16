import {
  Box,
  CardMedia,
  Chip,
  Container,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import apiMovies from "../services/movies";

export default function MovieDetailPage() {
  const { setOpened } = useSnackbarContext();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: async () => {
      return await apiMovies.getMovieDetail(id || "");
    },

    onError: (err) => {
      setOpened({
        isOpened: true,
        severity: "error",
        message: JSON.stringify(err),
      });
    },
  });
  return (
    <Container>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <Grid container>
          <Grid item xs={4}>
            {isLoadingImage ? (
              <Skeleton
                sx={{ height: 500 }}
                animation="wave"
                variant="rectangular"
              />
            ) : null}
            <CardMedia
              component="img"
              image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`}
              alt="Paella dish"
              onLoad={() => setIsLoadingImage(false)}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h6" color={"white"}>
              {data?.title}
            </Typography>
            <Typography gutterBottom variant="body1" color={"white"}>
              {data?.overview}
            </Typography>
            <Typography component="div" color={"white"}>
              {"Status: "}
              <Chip label={data?.status} color="primary" />
            </Typography>

            <Typography gutterBottom variant="body1" color={"white"}>
              Release date: {data?.release_date}
            </Typography>
            <Box justifyContent="center" display="flex" alignItems="center">
              <Typography color={"white"}>{`Vote: `}</Typography>
              <Rating
                name="half-rating-read"
                precision={0.5}
                readOnly
                value={data?.vote_average! / 2}
              />
              <Typography variant="subtitle2" color={"white"}>
                {" "}
                {data?.vote_count}{" "}
              </Typography>
            </Box>

            <Typography gutterBottom variant="body1" color={"white"}>
              Language: {data?.original_language}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
