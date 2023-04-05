import * as React from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
export default function Articles() {
  //   const [posts, setPosts] = React.useState<any>([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const navigate = useNavigate();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  React.useEffect(() => {
    const filtered = posts.filter((post: any) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm]);

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
            <Button
              component={Link}
              to="/new"
              variant="contained"
              color="primary">
              새 글 쓰기
            </Button>
          </Box>
        </Box>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "5%",
                  color: "#23131",
                  border: "none",
                }}>
                번호
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "50%",
                  color: "#23131",
                  border: "none",
                }}>
                제목
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "20%",
                  color: "#23131",
                  border: "none",
                }}>
                작성자
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "20%",
                  color: "#23131",
                  border: "none",
                }}>
                작성일자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post: any) => (
              <TableRow
                key={post.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                  textDecoration: "none",
                }}
                component={Link}
                to={`/user/community/${post.id}`}>
                <TableCell sx={{ color: "gray" }}>{post.id}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: "400px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "black",
                  }}>
                  {post.title}
                </TableCell>
                <TableCell sx={{ color: "gray" }}>{post.author}</TableCell>
                <TableCell sx={{ color: "gray" }}>{post.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          component="div"
          sx={{ mb: "20px", textAlign: "center", width: "300px" }}>
          <TextField
            id="search"
            label="검색"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
