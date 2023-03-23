import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <title>{t('404')}</title>
      <div>
        <header4>{t('404')}</header4>
      </div>
    </>
  );
};

export default NotFoundErrorPage;
