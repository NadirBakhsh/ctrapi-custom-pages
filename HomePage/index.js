/*
 * HomePage
 *
 */

import React, { memo, useMemo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { LoadingIndicatorPage, useGuidedTour } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import cornerOrnamentPath from './assets/corner-ornament.svg';
import { useModels } from '../../hooks';
import isGuidedTourCompleted from '../../components/GuidedTour/utils/isGuidedTourCompleted';
import GuidedTourHomepage from '../../components/GuidedTour/Homepage';
import SocialLinks from './SocialLinks';
import HomeHeader from './HomeHeader';
import ContentBlocks from './ContentBlocks';
import { Typography, ContentLayout, GridLayout, HeaderLayout, Loader } from '@strapi/design-system';

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;

const HomePage = () => {
  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();
  const { guidedTourState, isGuidedTourVisible, isSkipped } = useGuidedTour();

  const [investmentData, setInvestmentData] = useState(null)
  const [investmentLoading, setInvestmentLoading] = useState(true)


  const fetchAllAboutInvestment = async () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "token": "dasdasdasdas",
  "amount": "100",
  "share": "10"
});



await fetch("https://api.invest.nextthing.tech/api/v1/investment")
  .then(response =>  response.json())
  .then(result => {
    setInvestmentData(result.data[0])
    setInvestmentLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setInvestmentLoading(false)
  });

  }


useEffect(() => {
  fetchAllAboutInvestment()
}, [])

  const showGuidedTour =
    !isGuidedTourCompleted(guidedTourState) && isGuidedTourVisible && !isSkipped;

  const { push } = useHistory();
  const handleClick = (e) => {
    e.preventDefault();

    push('/plugins/content-type-builder/content-types/create-content-type');
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) => contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Layout>
         <HeaderLayout
          title={'Nextbolt Dashboard'}
          as='h2'
        />
      <Main>
      <ContentLayout>


      <Box padding={[1, 0]} background='neutral100'>
      <GridLayout>

      <Box padding={4} hasRadius background='neutral0' shadow='tableShadow'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography variant='delta'>Total Investment</Typography>
                <Typography variant='alpha'>
                {!investmentLoading ?  Number( Math.round(investmentData?.all_investment)).toLocaleString() : <Loader />}
                </Typography>
              </div>
            </Box>
      <Box padding={4} hasRadius background='neutral0' shadow='tableShadow'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography variant='delta'>Total Share Purchased</Typography>
                <Typography variant='alpha'>
                 { !investmentLoading ? Number(Math.round(investmentData?.total_shares)).toLocaleString() : <Loader />}
                </Typography>
              </div>
            </Box>
            <Box padding={4} hasRadius background='neutral0' shadow='tableShadow'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography variant='delta'>Total Investors</Typography>
                <Typography variant='alpha'>
                {!investmentLoading ?Number(Math.round(investmentData?.total_investor)).toLocaleString()  : <Loader />}
                </Typography>
              </div>
            </Box>
      </GridLayout>
        
      </Box>

      </ContentLayout>


        

      </Main>
    </Layout>
  );
};

export default memo(HomePage);
