/**
 * UsersPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusWhenNavigate, LinkButton } from '@strapi/helper-plugin';
import { Main } from '@strapi/design-system/Main';
import { ContentLayout, HeaderLayout, Layout } from '@strapi/design-system/Layout';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import EmptyPictures from '@strapi/icons/EmptyPictures';
import ArrowRight from '@strapi/icons/ArrowRight';
import { useIntl } from 'react-intl';
import { Loader } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Button, Box, Typography, Flex, VisuallyHidden, Divider  } from '@strapi/design-system';
import { GridLayout } from '@strapi/design-system';
import { Searchbar, Tag } from '@strapi/design-system';
const NoContentType = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  const htmlTable = ``



const [userList, setUserList] = useState([])
const [userListFiltered, setUserListFiltered] = useState([])
const [userPaymentHistory, setUserPaymentHistory] = useState([])
const [loading, setLoading] = useState(true)
const [historyLoader, setHistoryLoader] = useState(false)
const [searchValue, setSearchValue] = useState('')

const [isUserDetail, setIsUserDetail] = useState(false)
const [selectedUser, setSelectedUser] = useState({})

const fetchUsers = async () => {
  var myHeaders = new Headers()
  myHeaders.append(
    'x-access-token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJNdWhhbW1hZCBhbGkiLCJjaXRpemVuc2hpcCI6Imluc2lkZV91cyIsInNvY2lhbFNlY3VyaXR5Tm8iOiIxMDAwIiwiZG9iIjoiMDAwMC0wMC0wMCIsInBob25lIjoiMDMyNDU0NTQ1NCIsImFubnVhbEluY29tZSI6IjIwMDAiLCJuZXRXb3J0aCI6IjQwMDAwIiwiaW52ZXN0b3JUeXBlIjoiNnM2ZDVhcyIsIm5vT2ZTaGFyZXMiOiIxMDAiLCJpbnZlc3RtZW50QW1vdW50IjoiMjUwMDAwIiwiZmluYW5jaWFsQWR2aXNvckFzc2lzdGFuY2UiOjAsInN0cmVldEFkZHJlc3MiOiJBIDE1ICAiLCJ1bml0IjoiQmxvY2siLCJjaXR5IjoiS2FyYWNoaSIsImNvdW50cnlJZCI6IlBhayIsInN0YXRlSWQiOiJTaW5kaCIsInBvc3RhbENvZGUiOiI3ODYwMCIsInN0ZXAiOjYsInN0YXR1cyI6MSwiY3JlYXRlZERhdGUiOiIyMDIzLTAyLTIzVDE4OjU4OjQ0LjAwMFoiLCJ1c2FDaXRpemVuIjowLCJleGVtcHRXaXRoaG9sZGluZyI6MCwiaW52ZXN0aW5nQXMiOiJDb21wbmF5Iiwic19hY2NvdW50IjpudWxsLCJpYXQiOjE2ODI2Nzk5OTUsImV4cCI6MTY4NTI3MTk5NX0.SjMEhNP-4Id2Z7TIe7b3j8v7T2xqn9H-CjUWdSTfPQ4'
  )

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }


  const sortByDate = (data) => {
    return data.sort(function(a, b) {
      return  (b.id - a.id)
    });
    }

  fetch('https://api.invest.nextthing.tech/api/v1/customers/strapi', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const dataInJson = JSON.parse(result)
      setUserList(sortByDate(dataInJson.data))
      setUserListFiltered(sortByDate(dataInJson.data))
      console.log('dataInJson.data', dataInJson.data)
      for (let i = 0; i < dataInJson.data.length; i++) {
        const user = dataInJson.data[i];
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
          if (user[key] === null || user[key] === undefined) {
            user[key] = "N/A";
          }
          }
        }
        }
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
    })
}

const fetchUserPaymentHistory = async (id) => {
  setHistoryLoader(true)
  var myHeaders = new Headers();
myHeaders.append("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJNdWhhbW1hZCBhbGkiLCJjaXRpemVuc2hpcCI6Imluc2lkZV91cyIsInNvY2lhbFNlY3VyaXR5Tm8iOiIxMDAwIiwiZG9iIjoiMDAwMC0wMC0wMCIsInBob25lIjoiMDMyNDU0NTQ1NCIsImFubnVhbEluY29tZSI6IjIwMDAiLCJuZXRXb3J0aCI6IjQwMDAwIiwiaW52ZXN0b3JUeXBlIjoiNnM2ZDVhcyIsIm5vT2ZTaGFyZXMiOiIxMDAiLCJpbnZlc3RtZW50QW1vdW50IjoiMjUwMDAwIiwiZmluYW5jaWFsQWR2aXNvckFzc2lzdGFuY2UiOjAsInN0cmVldEFkZHJlc3MiOiJBIDE1ICAiLCJ1bml0IjoiQmxvY2siLCJjaXR5IjoiS2FyYWNoaSIsImNvdW50cnlJZCI6IlBhayIsInN0YXRlSWQiOiJTaW5kaCIsInBvc3RhbENvZGUiOiI3ODYwMCIsInN0ZXAiOjYsInN0YXR1cyI6MSwiY3JlYXRlZERhdGUiOiIyMDIzLTAyLTIzVDE4OjU4OjQ0LjAwMFoiLCJ1c2FDaXRpemVuIjowLCJleGVtcHRXaXRoaG9sZGluZyI6MCwiaW52ZXN0aW5nQXMiOiJDb21wbmF5Iiwic19hY2NvdW50IjpudWxsLCJpYXQiOjE2ODI2Nzk5OTUsImV4cCI6MTY4NTI3MTk5NX0.SjMEhNP-4Id2Z7TIe7b3j8v7T2xqn9H-CjUWdSTfPQ4");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

return await fetch(`https://api.invest.nextthing.tech/api/v1/customers/strapi/payment/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    setHistoryLoader(false)
    const dataInJson = JSON.parse(result)
    return dataInJson.data
  })
  .catch(error => {
    setHistoryLoader(false)
    console.log('error', error)});


}




useEffect(() => {
  fetchUsers()
}, [])


const filterBy = (inputArr, searchStr) => {
  const filteredData = inputArr.filter((item) => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const value = item[key];
        if (value) {
          const valueStr = value.toString().toLowerCase();
          for (let i = 0; i < valueStr.length; i++) {
            for (let j = i + 1; j <= valueStr.length; j++) {
              const subStr = valueStr.substring(i, j);
              if (subStr.includes(searchStr.toLowerCase())) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  });
  filteredData.length > 0 ?  setUserListFiltered(filteredData) : setUserListFiltered([])
  }

  const sortByDate = (data) => {
    return data.sort(function(a, b) {
      return new Date(b.created_date) - new Date(a.created_date);
    });
    }

  const findUserById = async (id) => {
    setIsUserDetail(true)
    const userPaymentHistory = await fetchUserPaymentHistory(id)
    setUserPaymentHistory(sortByDate(userPaymentHistory))
    const userFound = userList.find((user) => user.id === id);
    setSelectedUser(userFound)
   
  }

  const calculateTotalByKey = (data, key) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += parseFloat(data[i][key]);
    }
    return total;
    }


    


if(isUserDetail) {

  if(isUserDetail && historyLoader) {
    return (
      <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100vh'}}> <Loader /> </div> 
    )
  }

  const citizen = (string) => {
    if (string == 'I am a US citizen, US resident, or other US person.') return '1'
    if (string == 1) return 'I am a US citizen, US resident, or other US person.'
    if (string == 'I am not a US citizen, US resident, or other US person.') return '0'
    if (string == 0) return 'I am not a US citizen, US resident, or other US person.'
  }

  const exempt = (string) => {
    if (string == 'I am exempt from backup withholding.') return '1'
    if (
      string ==
      `I am subject to backup withholding. (Only check this option if you've been notified by the IRS that you are subject to backup withholding.)`
    )
      return '0'
    if (string == 1) return 'I am exempt from backup withholding.'
    if (string == 0)
      return `I am subject to backup withholding. (Only check this option if you've been notified by the IRS that you are subject to backup withholding.)`
  }

  return (
    <Main labelledBy='title1'>
    
    <Layout>
      <>
        <HeaderLayout
          secondaryAction={
            <Button
              onClick={() => {
                setIsUserDetail(false)
                setUserPaymentHistory([])
              }}
              variant='tertiary'>
              Go Back
            </Button>
          }
          title={selectedUser?.fullName}
          subtitle={selectedUser?.email}
          as='h2'
        />
      </>
      {!userPaymentHistory.length ?
              <Box  background="neutral100">
              <EmptyStateLayout content={`You don't have any recode`} />
            </Box>
       :
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
                <Typography variant='delta'>Estimated Value</Typography>
                <Typography variant='alpha'>
                 {Number(calculateTotalByKey(userPaymentHistory, 'amount')).toLocaleString() || 0}
                  
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
                <Typography variant='delta'>Total Shares Purchased</Typography>
                <Typography variant='alpha'>
                {Number(calculateTotalByKey(userPaymentHistory, 'share')).toLocaleString() || 0}
                </Typography>
              </div>
            </Box>
          </GridLayout>
        </Box>
        <Box padding={[1, 0]} background='neutral100'>
          <GridLayout>
            <Box padding={4} hasRadius background='neutral0' shadow='tableShadow'>
              <Typography variant='alpha'>User Profile</Typography>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 20 }}>
                {Object.keys(selectedUser).length > 0
                  ? Object.keys(selectedUser).map((key, index) => {
                      const formattedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2')
                      // capitalize the first letter of each word
                      const capitalizedKey = formattedKey.replace(/\b\w/g, (char) => char.toUpperCase())

                      const renderInfo = capitalizedKey === 'Created Date' ? selectedUser?.[key] 
                      :  capitalizedKey === 'Usa Citizen' ? citizen(selectedUser?.[key]) :  capitalizedKey === 'Exempt Withholding' ? exempt(selectedUser?.[key]) : selectedUser?.[key]

                      return (
                        <>
                          <Box key={index} paddingTop={4} paddingBottom={1}>
                            <Typography variant='omega'>{capitalizedKey} : </Typography>{' '}
                            <Typography variant='omega'>{renderInfo}</Typography>
                            <div style={{ padding: '4px 0px' }}>
                              <Divider />
                            </div>
                          </Box>
                        </>
                      )
                    })
                  : null}
              </div>
            </Box>
          </GridLayout>
        </Box>

        <Box padding={2} hasRadius>
          <Typography variant='alpha'>Payment History</Typography>
        </Box>

        {userPaymentHistory.map((payment) => {
          const date = new Date(payment?.created_date)
          const formattedDate = date.toISOString().split('T')[0]

          return (
            <>
              <Box padding={[1, 0]} background='neutral100'>
                <GridLayout>
                  <Box padding={4} hasRadius background='neutral0' shadow='tableShadow'>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}>
                        <Typography variant='delta'>{`Invest on ${formattedDate}`}</Typography>
                        <Typography variant='alpha'>
                          {Number(payment?.amount) ? Number(payment?.amount).toLocaleString() : 0}
                        </Typography>
                      </div>
                      <div
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant='delta'>Shares Purchased</Typography>
                        <Typography variant='alpha'>
                          {Number(payment?.share) ? Number(payment?.share).toLocaleString() : 0}
                        </Typography>
                      </div>
                    </div>

                    <div style={{ padding: '4px 0px' }}>
                      <Divider />
                    </div>

                    <div style={{ display: 'flex', padding: 8, gap: 12, flexWrap: 'wrap', overflow: 'auto', width: '100%' }}>
                      {payment?.payment_method && <Tag icon={` ${payment?.payment_method}`}>Payment Method</Tag>}
                      {payment?.c_t && <Tag icon={` ${payment?.c_t}`}>Payment token</Tag>}
                      {payment?.payment_status && (
                        <Tag icon={`${payment?.payment_status}`} disabled={payment?.payment_status == 'pending'}>
                          Payment Status
                        </Tag>
                      )}
                    </div>
                  </Box>
                </GridLayout>
              </Box>
            </>
          )
        })}
      </ContentLayout>
    }
    </Layout> 
  </Main>
  
  )
}

  return (
    <Main labelledBy="title1">
      <HeaderLayout
        id="title2" data-ex="ali"
        title={formatMessage({
          id: 'content-manager.nextBolt',
          defaultMessage: '',
        })}
      />
      <Layout>
      <ContentLayout>
        <Box background="neutral100">
        <Searchbar name="searchbar" onClear={() => {
          setSearchValue('')
          setUserListFiltered(userList)
        }} value={searchValue} onChange={(e) => {
          setSearchValue(e.target.value)
          filterBy(userList,e.target.value)
          }} clearLabel="Clearing search" placeholder="Search User" >
          Search User
        </Searchbar>;
        </Box>
      
			{ loading ? <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}> <Loader /> </div> :
      <Box background="neutral100">
      {!userListFiltered.length ?
        <Box  background="neutral100">
          <EmptyStateLayout content={`You don't have any recode relative ${searchValue} ...`} />
        </Box>
      :
      <Table colCount={9} rowCount={userList?.length || 0}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Email</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Fullname</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Total Invest</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Total shares</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">double Invest</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Phone Number</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Country</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Step</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Checkout Link</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Refer Link</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Date</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
       
          {
          userListFiltered.map(item => <Tr key={item?.id}>
              <Td>
                <Typography textColor="neutral800">{item?.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.email}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.fullName}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.investmentAmount}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.noOfShares}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.double_investment}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.phone}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.countryId}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.step}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.checkout_url}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.refer_url}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{item?.createdDate}</Typography>
              </Td>
    
              <Td>
                <Flex>
                  <Button onClick={() => {
                    findUserById(item?.id)
                    }} variant='default'>View More</Button>
                </Flex>
              </Td>
            </Tr>)}
        </Tbody>
      </Table> }
    </Box>}


      </ContentLayout>
      </Layout>
    </Main>
  );
};

export default NoContentType;
