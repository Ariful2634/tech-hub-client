import { Container, Typography, TextField, Button } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h2" gutterBottom>
          About Our Tech Hub
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our Tech Hub, the go-to platform for discovering and sharing the latest tech products.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you are a tech enthusiast, developer, or just curious about the latest gadgets, you are in the right place.
        </Typography>
        {/* Add any additional paragraphs as needed */}
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          style={{ marginTop: '1rem' }}
        />
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Search
        </Button>
      </Container>
    );
};

export default About;