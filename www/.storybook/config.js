import { configure, setAddon } from '@kadira/storybook';
import  infoAddon  from '@kadira/react-storybook-addon-info'
const req = require.context('../src/components', true, /.stories.js$/)
setAddon(infoAddon);
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)