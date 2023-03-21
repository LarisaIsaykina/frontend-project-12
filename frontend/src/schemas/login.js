import * as Yup from 'yup';
import i18n from '../locales/i18n';

export default Yup.object({
  username: Yup.string().required(i18n.t('err.empty')),

  password: Yup.string().required(i18n.t('err.empty')),
});
