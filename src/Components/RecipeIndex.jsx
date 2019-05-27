import React, { useEffect, useState } from 'react';

import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import { Button } from '@bootstrap-styled/v4';
import { connect } from 'react-redux';
import { gettingAllRecipes } from '../Store/reducer';
import AddRecipe from '../Forms/AddRecipe';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList';

export const RecipeIndex = ({ recipes, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [listView, setlistView] = useState('grid');

  const { state } = props.state;
  useEffect(() => {
    props.grabAllRecipes();
  }, []);

  const viewModal = () => {
    setShowModal(!showModal);
  };

  const viewMode = mode => {
    setlistView(mode);
  };

  const allRecipes = props.state;
  console.log('these are all the recipes', allRecipes);
  return (
    <Background>
      <HomeWrapper>
        <Container>
          <Welcome>
            Welcome to Recipe Boss, <strong>User@RecipeBoss.com</strong>!
          </Welcome>
          <ButtonWrapper>
            <Button onClick={viewModal} color="info">
              Add a Recipe
            </Button>
          </ButtonWrapper>
          <LinkWrapper>
            <Link onClick={() => viewMode('list')}>List View </Link>||
            <Link onClick={() => viewMode('grid')}>Grid View</Link>
          </LinkWrapper>
          {showModal ? (
            <AddRecipe
              showModal={showModal}
              viewModal={viewModal}
              id={allRecipes.length}
            />
          ) : null}
          <HomePageImage
            src="https://cdn.pixabay.com/photo/2018/10/01/12/04/cookbook-3716009_1280.jpg"
            alt="homepagesalad"
          />
          <p>Welcome to Recipe Boss!</p>
        </Container>
        <CardWrapper>
          {allRecipes
            ? allRecipes.map((recipe, index) =>
                recipe && recipe.length !== 0 ? (
                  listView === 'grid' ? (
                    <RecipeCard id={index} {...recipe} key={index} />
                  ) : (
                    <RecipeList />
                  )
                ) : null
              )
            : 'Loading...'}
        </CardWrapper>
      </HomeWrapper>
    </Background>
  );
};

const mapStateToProps = state => ({
  state: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  grabAllRecipes: () => dispatch(gettingAllRecipes()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeIndex);

export const Background = styled.div`
  background: white;
`;

const LinkWrapper = styled.div`
  padding: 15px 45px;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
`;

export const ButtonWrapper = styled.div`
  margin: 1em;
  padding: 15px 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
`;

const Container = styled.div`
  margin-top: 50px;
  position: relative;
  text-align: center;
  z-index: 1;
  max-height: 350px;
  object-fit: cover;
  overflow: hidden;
  color: #303030;
`;

const HomeWrapper = styled.div`
  background: #f5f5f5;
  margin-left: 100px;
  margin-right: 100px;
  box-shadow: 0 15px 10px #777;
  min-height: 800px;
`;

const Welcome = styled.div`
  font-size: 2em;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const HomePageImage = styled.img`
  width: 100%;
`;
