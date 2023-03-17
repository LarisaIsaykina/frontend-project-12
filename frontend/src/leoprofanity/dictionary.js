import * as filter from "leo-profanity";

export default () => {
  filter.loadDictionary("ru");
  filter.add(["русня", "небинарная личность"]);
};
