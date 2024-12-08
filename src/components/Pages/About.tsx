import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import StudentImage from '../../assets/students.jpg';
import certificateImage from '../../assets/certificate.jpg';
import listImage from '../../assets/list.jpg';
import '../../css/Pages/About.css';

const About = () => {
  return (
    <div className="source-mission">
      <h1>Our Mission: Your Success</h1>
      <div className="mission-list-of-card">

        <Card className="mission-card">
          <Box>
            <CardContent className="content-text">
              <Typography component="div" variant="h5">
                What we do
              </Typography>
              <Typography component="p">
                At Resume Filtration, we strive to empower job seekers with personalized resume feedback. Our platform allows users to upload their resumes and receive insightful evaluations from industry experts, helping them to refine their application materials and increase their chances of landing their dream job.
              </Typography>
            </CardContent>
          </Box>
          <CardMedia component="img" image={StudentImage} alt="Students engaged in learning" className="about-image" />
        </Card>

        <Card className="mission-card-second">
          <CardMedia component="img" image={certificateImage} alt="Certificate of Achievement" className="about-image" />
          <Box>
            <CardContent className="content-text">
              <Typography component="div" variant="h5">
                What we offer
              </Typography>
              <Typography component="p">
                Our service includes expert insights on resume structure, content, and design. Users can receive tailored feedback that highlights strengths, suggests improvements, and provides strategies to stand out in the competitive job market.
              </Typography>
            </CardContent>
          </Box>
        </Card>

        <Card className="mission-card">
          <Box>
            <CardContent className="content-text">
              <Typography component="div" variant="h5">
                What you gain
              </Typography>
              <Typography component="p">
                By utilizing our platform, you'll gain access to professional guidance that can transform your resume into a powerful tool for job applications. We help you articulate your skills and experiences effectively, ensuring you make a lasting impression on recruiters.
              </Typography>
            </CardContent>
          </Box>
          <CardMedia component="img" image={listImage} alt="List of features" />
        </Card>

      </div>
    </div>
  );
};

export default About;
