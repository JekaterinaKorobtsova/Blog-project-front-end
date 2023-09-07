import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header/header";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import AddPost from "./pages/AddPost/addPost";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import { Tag } from "./pages/Tag";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={  <Registration /> } />
          <Route path="/tags/:tag" element={<Tag />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
