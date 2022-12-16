import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import useLazyLoad from "../hooks/useLazyLoad";
export interface CardMovieProps extends Pick<CardMediaProps, "image"> {
  title: string;
  content: string;
}

export default function CardMovie({ content, title, image }: CardMovieProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { isVisible, ref } = useLazyLoad({ threshold: 0.25 });

  return (
    <Card ref={ref}>
      <CardActionArea>
        {isLoadingImage ? (
          <Skeleton
            sx={{ height: 400 }}
            animation="wave"
            variant="rectangular"
          />
        ) : null}

        {isVisible ? (
          <CardMedia
            component="img"
            image={image}
            alt="green iguana"
            onLoad={() => setIsLoadingImage(false)}
          />
        ) : null}

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
