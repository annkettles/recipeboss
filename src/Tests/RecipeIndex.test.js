import React from 'react';
import ReactDOM from 'react-dom';
import { RecipeIndex } from '../Components/RecipeIndex';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

configure({ adapter: new Adapter() });

describe('A suite', function() {
  let recipes = [
    {
      name: "Giada's Lasagna",
      description: 'Delicious 32 Cheese Lasagne',
      instructions: 'Lay down noodles and sauce, bake.',
      image: 'https://live.staticflickr.com/2376/5799408683_9cc6ffc686_b.jpg',
    },
    {
      name: "Guy's Kickin Chicken",
      description: "This chicken is kickin'",
      instructions: 'Put every spice on it and then fry.',
      image: 'https://live.staticflickr.com/4778/40733751321_2ec04268f7_b.jpg',
    },
    {
      name: 'Dr. Pepper Steak',
      description: '23 flavors and all of them yum.',
      instructions:
        'Marinade steak in Dr. Pepper for 24 hours. Grill to medium rare.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Reindeer_steak.jpg',
    },
    {
      name: 'Chicken Picatta',
      description: "I don't actually know what Chicken Picatta is",
      instructions: 'Make chicken Picatta. I think it has Capers',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/a6/Chicken_piccata_dinner_cooking_food.jpg',
    },
  ];

  const wrapper = shallow(<RecipeIndex state={recipes} />);

  it('should render without throwing an error', function() {
    expect(wrapper.exists()).to.equal(true);
  });

  it('renders the correct amount of Buttons', function() {
    expect(wrapper.find('ButtonWrapper')).to.have.length(1);
  });

  it('renders the the List and Grid links', function() {
    expect(wrapper.find('StyledLink')).to.have.length(2);
  });
});
