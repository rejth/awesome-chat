import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

function HomePage() {
  const { t } = useTranslation();
  return (
    <section className="home-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">{t('home.title')}</h1>
      </Container>
    </section>
  );
}

export default HomePage;
