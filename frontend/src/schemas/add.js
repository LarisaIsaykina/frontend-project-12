import * as Yup from 'yup';
import i18n from '../locales/i18n';

const schema = (channels) => Yup.string()
  .required(i18n.t('err.empty'))
  .min(3, i18n.t('err.length'))
  .max(20, i18n.t('err.length'))
  .notOneOf(channels, i18n.t('err.uniq'));

export default schema;
