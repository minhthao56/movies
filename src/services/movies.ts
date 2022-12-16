import axiosClient from "./axiosClient";
import playNowJSON from "./jsons/playNowJSON.json";
import movieDetailJSON from "./jsons/movieDetailJSON.json";
import topRatedMovieJSON from "./jsons/topRatedMovieJSON.json";

export type PlayNowRespType = typeof playNowJSON;

export type MovieDetailJSONType = typeof movieDetailJSON;

export type TopRatedMovieJSONType = typeof topRatedMovieJSON;

const apiMovies = {
  getMoviesPlayingNow: (params: { page: number }) => {
    const url = `/movie/now_playing`;
    return axiosClient.get<any, PlayNowRespType>(url, {
      params,
    });
  },
  getMovieDetail: (movieId: string) => {
    return axiosClient.get<any, MovieDetailJSONType>(`/movie/${movieId}`);
  },
  getTopRatedMovies: (params: { page: number }) => {
    const url = `/movie/top_rated`;
    return axiosClient.get<any, TopRatedMovieJSONType>(url, {
      params,
    });
  },
};
export default apiMovies;
