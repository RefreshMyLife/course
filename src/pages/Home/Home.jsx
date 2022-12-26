//styles
import { Container, Box, LeftBox, RightBox } from './Home.styles';
import { ButtonFill } from '../../styles/styles';

import images from '../../assets';

import { useNavigate, Navigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="home__header">
        <div className="home__logo">
          <span>Notes</span>
        </div>
      </div>
      <Box>
        <LeftBox>
          <div className="home__main-heading">Зарегестрируйтесь или авторизуйтесь</div>
          <p className="home__sub-heading">
            Прежде чем пользоваться заметками, авторизуйтесь или зарегестрируйтесь
          </p>
          <ButtonFill className="home__btn" onClick={() => navigate('/registration')}>
            <span>Log in</span>
          </ButtonFill>
          <ButtonFill className="home__btn" onClick={() => navigate('/authoriztion')}>
            <span>Sign in</span>
          </ButtonFill>
        </LeftBox>
        <RightBox>
          <img src={images.homePageGif} alt="home_gif" />
        </RightBox>
      </Box>
    </Container>
  );
};

{
  /* <ButtonFill className="home__btn" onClick={() => }navigate('/notes', { state: 'notes' })>
<span>Log in</span>
</ButtonFill> */
}
export default Home;
