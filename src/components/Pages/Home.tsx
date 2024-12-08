import { Stack, Typography, Button } from '@mui/material';
import HomeImg from '../../assets/FAQ.png';
import '../../css/Pages/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const HandleStart = () => {
    navigate('/about');
  }
  return (
    <Stack direction="row" className='home-container'>
      <img src={HomeImg} alt="Creative Resume Filtering" className='image-FQA' />
      <Stack direction="column" spacing={4} className="home-box-all">
        <Typography variant="h2" className="home-title">
          Unlock Your Career Potential!
        </Typography>
        <Typography variant="h5" className="home-subtitle">
          Your Resume, Your Gateway to Success
        </Typography>
        <Typography variant="body1" className="home-description">
          Upload your resume and get insights from experts. Whether you're looking for advice from recruiters or guidance from experienced professionals, we're here to help you stand out in your job search. Your future starts here!
        </Typography>
        <Button variant="contained" color="primary" className="upload-button">
          Know About More
        </Button>
      </Stack>
    </Stack>
  );
};

export default Home;
