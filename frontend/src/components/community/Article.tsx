import * as React from "react";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d23131",
    },
    secondary: {
      main: "#dbdbdb",
    },
    background: {
      default: "white",
    },
  },
});

const posts: any = [
  {
    title: "첫 번째 글",
    author: "작성자1",
    content: "내용1",
    id: "1",
    created_at: "1632622657000",
  },
  {
    title: "두 번째 글",
    author: "작성자2",
    content: "내용2",
    id: "2",
    created_at: "1632562467000",
  },
  {
    title: "세 번째 글",
    author: "작성자3",
    content: "내용3",
    id: "3",
    created_at: "1632429545000",
  },
];

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p: any) => p.id === id);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: "50px" }}>
        <Box component="div" sx={{ mb: "40px" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Community Board
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleBackClick}>
              목록으로 돌아가기
            </Button>
          </Box>
        </Box>
        <Box component="div" sx={{ mb: "40px" }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            작성자: {post.author}
          </Typography>
          <Typography variant="subtitle2" component="p">
            작성일: {new Date(parseInt(post.created_at)).toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ mb: "40px" }} />
        <Typography variant="body1" component="p">
          {post.content}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
