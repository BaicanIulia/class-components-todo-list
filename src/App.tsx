import { Content } from './components/Content';
import { Container, Typography } from '@mui/material';
import { Header } from './components/Header';

function App() {
  return (
    <Container
      sx={{
        width: '750px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          display: 'inline-block',
          width: '100%',
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        TODO LIST
      </Typography>
      <Header />
      <Content />
    </Container>
  );
}

export default App;
