import React, { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import {
  Avatar, AvatarGroup, Box, Card,
} from '@mui/material';
import format from 'date-fns/format';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import isAfter from 'date-fns/isAfter';
import formatISO9075 from 'date-fns/formatISO9075';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Contact } from '../dto/Contact';
import { Event } from '../dto/Event';
import { getEvents } from '../redux/action/eventAction';
import { getContacts } from '../redux/action/contactAction';

const Greetings = () => {
  const theme = useTheme() as any;
  const user = useAppSelector((state) => state.auth.user);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const ticker = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => clearTimeout(ticker);
  });

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    }}
    >
      <Box sx={{ fontSize: theme.typography.h2 }}>
        Hello,
        {' '}
        <Box sx={{
          display: 'inline',
          fontSize: theme.typography.h2,
          color: theme.palette.primary.main,
        }}
        >
          { user ? `${user.userName}` : 'Guest'}
        </Box>
        !
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Box sx={{ fontSize: theme.typography.h4 }}>
          {format(time, 'eeee, dd MMMM yyyy')}
        </Box>
        <Box sx={{
          fontSize: theme.typography.h3,
          color: theme.palette.primary.main,
          textAlign: 'right',
        }}
        >
          {format(time, 'HH:mm:ss')}
        </Box>
      </Box>
    </Box>
  );
};

interface UpcomingEventsProps {
  events: Event[] | null;
  goToEvent: (id: string) => void;
}

const UpcomingEvents = ({ events, goToEvent }: UpcomingEventsProps) => {
  const theme = useTheme() as any;

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'grey',
      height: '100%',
      marginLeft: '1rem',
    }}
    >
      <Card sx={{
        padding: '2rem',
        height: '100%',
      }}
      >
        <Box sx={{
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: theme.typography.h4,
        }}
        >
          Upcoming Events
        </Box>
        {
          events
            ? (
              [...events]
                .filter((e) => isAfter(e.start, new Date()))
                .sort((e1, e2) => differenceInSeconds(
                  new Date(e1.start),
                  new Date(e2.start),
                ))
                .map((e) => {
                  return (
                    <Card
                      key={e.eventId}
                      sx={{
                        backgroundColor: theme.palette.grey[200],
                        padding: theme.spacing(2),
                        marginY: theme.spacing(2),
                        borderRadius: '5px',
                        boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
                        ':hover': {
                          backgroundColor: theme.palette.grey[300],
                        },
                      }}
                      onClick={() => goToEvent(e.eventId)}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <AvatarGroup max={4}>
                          {
                            e.contacts.map((c) => (
                              <Avatar alt={c.id} key={c.id} />
                            ))
                          }
                        </AvatarGroup>
                        <Box
                          sx={{
                            paddingLeft: 2,
                            fontWeight: 'bold',
                          }}
                        >
                          {e.title}
                        </Box>
                        <Box
                          sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            textAlign: 'right',
                          }}
                        >
                          {formatISO9075(new Date(e.start))}
                        </Box>
                      </Box>
                    </Card>
                  );
                })
            ) : (
              <Box sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: theme.spacing(5),
              }}
              >
                <Spinner dark />
              </Box>
            )
        }
      </Card>
    </Box>
  );
};

interface RecentContactsProps {
  contacts: Contact[] | null;
  goToContact: (id: string) => void;
}

const RecentContacts = ({ contacts, goToContact }: RecentContactsProps) => {
  const theme = useTheme() as any;

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'grey',
      height: '100%',
      marginLeft: '1rem',
    }}
    >
      <Card sx={{
        padding: '2rem',
        height: '100%',
      }}
      >
        <Box sx={{
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: theme.typography.h4,
        }}
        >
          Recently Added Contacts
        </Box>
        {
          contacts
            ? (
              [...contacts]
                .sort((c1, c2) => differenceInSeconds(
                  new Date(c2.dateAdded),
                  new Date(c1.dateAdded),
                ))
                .map((c) => {
                  const name = `${c.givenName} ${c.familyName}`;
                  return (
                    <Card
                      key={c.contactId}
                      sx={{
                        backgroundColor: theme.palette.grey[200],
                        padding: theme.spacing(2),
                        marginY: theme.spacing(2),
                        borderRadius: '5px',
                        boxShadow: '0 2px 3px rgb(0 0 0 / 0.2)',
                        ':hover': {
                          backgroundColor: theme.palette.grey[300],
                        },
                      }}
                      onClick={() => goToContact(c.contactId)}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar alt={name} src="" />
                        <Box
                          sx={{
                            paddingLeft: 2,
                            fontWeight: 'bold',
                          }}
                        >
                          {name}
                        </Box>
                        <Box
                          sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            textAlign: 'right',
                          }}
                        >
                          {formatISO9075(new Date(c.dateAdded))}
                        </Box>
                      </Box>
                    </Card>
                  );
                })
            ) : (
              <Box sx={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: theme.spacing(5),
              }}
              >
                <Spinner dark />
              </Box>
            )
        }
      </Card>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme() as any;

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);
  const contacts = useAppSelector((state) => state.contact.contacts);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getContacts());
  }, []);

  const history = useHistory();

  const goToContact = (id: string) => {
    history.push(`/contacts/${id}`);
  };

  const goToEvent = (id: string) => {
    history.push(`/events/${id}`);
  };

  return (
    <Page title="Dashboard - OneThread">
      <Box
        sx={{
          minHeight: '100vh',
          textAlign: 'center',
          marginTop: theme.spacing(8),
        }}
      >
        <Greetings />
        <Box sx={{
          marginTop: '2rem',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
        >
          <UpcomingEvents events={events} goToEvent={goToEvent} />
          <RecentContacts contacts={contacts} goToContact={goToContact} />
        </Box>
      </Box>
    </Page>
  );
};

export default Dashboard;
