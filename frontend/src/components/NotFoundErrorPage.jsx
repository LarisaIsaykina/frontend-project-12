import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <title>{t('404')}</title>
      <div>
        <header>{t('404')}</header>
      </div>
    </>
  );
};

export default NotFoundErrorPage;
