import * as filter from 'leo-profanity';

const getDictionary = () => {
  filter.loadDictionary('ru');
  filter.add(['русня', 'небинарная личность']);
};

export default getDictionary;
