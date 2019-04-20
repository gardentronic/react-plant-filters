import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import centered from '@storybook/addon-centered';
import { withKnobs } from '@storybook/addon-knobs';

setOptions({
  name: 'React Plant Filters',
  //url: 'https://gardentronic.github.io/react-plant-filters/',
  downPanelInRight: true,
})

//addDecorator(centered);
//addDecorator(withKnobs);

//const req = require.context('../stories', true, /\.?story\.js$/)
//const loadStories = () => req.keys().forEach((filename) => req(filename))

function loadStories() {
  require('../stories/colorfilter/story.js')
}

configure(loadStories, module);
