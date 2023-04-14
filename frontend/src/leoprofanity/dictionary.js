import * as filter from 'leo-profanity';

const getDictionary = () => {
  filter.loadDictionary('ru');

  filter.add(['boobs', 'cunt', 'fuck', 'asshole', 'ass', 'jerk']);
};

export default getDictionary;
