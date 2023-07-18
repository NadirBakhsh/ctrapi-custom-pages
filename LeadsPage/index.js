import React, { useCallback, useEffect, useState } from 'react';
import { useFocusWhenNavigate, LinkButton } from '@strapi/helper-plugin';
import { Main } from '@strapi/design-system/Main';
import { ContentLayout, HeaderLayout, Layout } from '@strapi/design-system/Layout';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import File from '@strapi/icons/File';
import { Icon } from '@strapi/design-system';
import ArrowRight from '@strapi/icons/ArrowRight';
import { useIntl } from 'react-intl';
import { Loader } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Button, Box, Typography, Flex, VisuallyHidden, Divider  } from '@strapi/design-system';
import { GridLayout } from '@strapi/design-system';
import { Searchbar, Tag } from '@strapi/design-system';
 const LeadsPage = () => {
     const [leads, setLeads] = useState([])
     
    const fetchLeads = async () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJNdWhhbW1hZCBhbGkiLCJjaXRpemVuc2hpcCI6Imluc2lkZV91cyIsInNvY2lhbFNlY3VyaXR5Tm8iOiIxMDAwIiwiZG9iIjoiMDAwMC0wMC0wMCIsInBob25lIjoiMDMyNDU0NTQ1NCIsImFubnVhbEluY29tZSI6IjIwMDAiLCJuZXRXb3J0aCI6IjQwMDAwIiwiaW52ZXN0b3JUeXBlIjoiNnM2ZDVhcyIsIm5vT2ZTaGFyZXMiOiIxMDAiLCJpbnZlc3RtZW50QW1vdW50IjoiMjUwMDAwIiwiZmluYW5jaWFsQWR2aXNvckFzc2lzdGFuY2UiOjAsInN0cmVldEFkZHJlc3MiOiJBIDE1ICAiLCJ1bml0IjoiQmxvY2siLCJjaXR5IjoiS2FyYWNoaSIsImNvdW50cnlJZCI6IlBhayIsInN0YXRlSWQiOiJTaW5kaCIsInBvc3RhbENvZGUiOiI3ODYwMCIsInN0ZXAiOjYsInN0YXR1cyI6MSwiY3JlYXRlZERhdGUiOiIyMDIzLTAyLTIzVDE4OjU4OjQ0LjAwMFoiLCJ1c2FDaXRpemVuIjowLCJleGVtcHRXaXRoaG9sZGluZyI6MCwiaW52ZXN0aW5nQXMiOiJDb21wbmF5Iiwic19hY2NvdW50IjpudWxsLCJpYXQiOjE2ODI2Nzk5OTUsImV4cCI6MTY4NTI3MTk5NX0.SjMEhNP-4Id2Z7TIe7b3j8v7T2xqn9H-CjUWdSTfPQ4");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        };

            fetch("https://api.invest.nextthing.tech/api/v1/customer/email/capture", requestOptions)
            .then(response => response.json())
            .then(result => setLeads(result?.data))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetchLeads()
    }, [])

    const getFullDate = (date) => {
      const date = new Date(date);

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();

      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      return fullDate

    }

  return (

    <Main labelledBy='title1'>
         <Layout>
         <>
        <HeaderLayout
          secondaryAction={
            <Button
            //   onClick={() => {
            //   }}
              variant='tertiary'>
              Go Back
            </Button>
          }
          title={'Leads'}
          as='h2'
        />
      </>


      <ContentLayout>
      <Table colCount={4} rowCount={leads?.length || 0}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">S.No</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Email</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Created Date</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
       
          {
          leads.map((item, index) => <Tr key={item?.id}>
              <Td>
                <Typography textColor="neutral800">{index + 1}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.email}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{getFullDate(item?.created_date)}</Typography>
              </Td>
              <Td>
                <Typography style={{
                  display: 'flex',
                  itemsCenter: 'center',
                  gap: '6px'
                }} textColor="neutral800">
                  <span>
                  {item?.uniqueId?.split('-')[4]}
                  </span>
                  {/* <span style={{
                    cursor: 'pointer'
                  }}>
                  <Icon onClick={() => {
                   
                  }} as={File} />
                  </span> */}

                </Typography>
              </Td>

            </Tr>)}
        </Tbody>
      </Table> 
      </ContentLayout>
         </Layout>
    </Main>
  )
}

export default LeadsPage
