'use client';
import {Box} from '@mui/material';
import Catalog from '../components/Catalog';
import MenuSuperior from '../components/MenuSuperior';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import News from '../components/News';
import Contact from '../components/Contact';
import Comments from '../components/Comments';
import Services from '../components/Services';
import Shipping from '../components/Shipping';
const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuSuperior />
      <Banner />
      <AboutUs />
      <Services />
      <Shipping />
      <Catalog />
      <News />
      <Contact />
      <Comments />
    </Box>
  );
};

export default HomePage;
