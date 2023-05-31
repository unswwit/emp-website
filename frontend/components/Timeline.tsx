// Imports
import * as React from 'react';
import { Container, Box, SwipeableDrawer } from '@mui/material';
import {
  TextalignJustifycenter,
  Grid2,
  Link2,
  Calendar,
  Clock,
  Global,
} from 'iconsax-react';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { differenceInDays } from 'date-fns';

// FullCalendar
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

// Custom imports
import { timeline } from '../data/timeline';
import styles from '../styles/Timeline.module.css';
import {
  StyledCalendar,
  StyledTabs,
  StyledTab,
} from '../styles/Timeline.module';

// import { Montserrat } from "@next/font/google";
// const montserrat = Montserrat({ subsets: ["latin"] });

// docs: https://mui.com/material-ui/react-tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function TimelineTabs({ events, handleDrawer, handleEventNo }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="timeline tabs"
      >
        <StyledTab
          label="List"
          icon={<TextalignJustifycenter size="13" />}
          iconPosition="start"
        />
        <StyledTab
          label="Calendar"
          icon={<Grid2 size="13" />}
          iconPosition="start"
        />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <TimelineList
          events={events}
          handleDrawer={handleDrawer}
          handleEventNo={handleEventNo}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TimelineCalendarFC
          events={events}
          handleDrawer={handleDrawer}
          handleEventNo={handleEventNo}
        />
      </TabPanel>
    </Box>
  );
}

function TimelineList({ event, handleDrawer, handleEventNo }: any) {
  return (
    <div className={styles.timelineList}>
      {timeline.map((event, index) => (
        <div key={index}>
          <div className={styles.timelineCard}>
            {/* DATE INFORMATION */}
            <div className={styles.dateInfo}>
              {/* DATE DAY */}
              <h1 className={styles.day}>{event.start.slice(8, 10)}</h1>
              {/* DATE MONTH */}
              <h1 className={styles.month}>
                {new Date(event.start)
                  .toLocaleString('default', { month: 'short' })
                  .toUpperCase()}
              </h1>
            </div>

            {/* EVENT INFORMATION */}
            <div className={styles.eventInfo}>
              {/* DATE */}
              <h3 className={styles.date}>
                {new Date(event.start).toLocaleString('en-US', {
                  weekday: 'long',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </h3>
              {/* EVENT TITLE */}
              <h1 className={styles.title}>{event.title}</h1>
              {/* LOCATION */}
              <h3 className={styles.location}>{event.data.location}</h3>
              {/* TAGS */}
              <p className={styles.labels}>
                {event.data.labels.map((l: any, id: any) => (
                  <span key={id}>{l}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineCalendarFC({ events, handleDrawer, handleEventNo }: any) {
  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // initialView="dayGridWeek"
        weekends={true}
        // eventColor="#313638"
        // eventColor="#EFEFEF"
        // eventTextColor="#feb14b"
        // eventTextColor="#d18c32"
        height={700}
        titleFormat={{ year: 'numeric', month: 'short' }}
        buttonText={{ today: 'Today' }}
        eventClick={(e) => {
          handleEventNo(parseInt(e.event.id));
          handleDrawer();
        }}
        events={events}
      />
    </StyledCalendar>
  );
}

function InfoPanel({ event, drawer, handleDrawer }: any) {
  const eventDateStart = new Date(event.start);
  const eventDateEnd = new Date(event.end);
  const daysLeftUntilEventStarts = differenceInDays(eventDateStart, new Date());
  const daysLeftUntilEventEnds = differenceInDays(eventDateEnd, new Date());

  const startDate = eventDateStart.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const endDate = eventDateEnd.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleBackgroundScroll = () => {
    document.head.style.overflowY == 'scroll'
      ? (document.head.style.overflowY = 'hidden')
      : (document.head.style.overflowY = 'scroll');
  };

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      anchor="right"
      open={drawer}
      onClose={() => {
        handleDrawer();
        handleBackgroundScroll;
      }}
      onOpen={handleBackgroundScroll}
    >
      <Container maxWidth="sm" className={styles.infoPanel}>
        <div>
          {/* Header */}
          <div className={styles.header}>
            <button onClick={handleDrawer}>
              <KeyboardDoubleArrowRightRoundedIcon />
            </button>
          </div>

          {/* Banner */}
          <div className={styles.banner}>
            <img
              src={event.data.photo.src || 'WIT-banner.png'}
              alt={event.data.photo.alt || 'wit-banner'}
            />
          </div>

          {/* Heading */}
          <div className={styles.heading || 'Event Title'}>
            <h1>{event.title}</h1>
          </div>

          {/* Subheading */}
          <div className={styles.subheading}>
            {/* Link */}
            <div>
              <Link2 style={{ rotate: '135deg' }} />
              {event.data.link ? (
                <a href={event.data.link}>{event.data.link}</a>
              ) : (
                '-'
              )}
            </div>
            {/* Start date */}
            <div>
              <Calendar />
              <span>{startDate || '-'}</span>
              {/* <span>{startDate + " until " + endDate || "-"}</span> */}
            </div>
            {/* Days left until event starts */}
            <div>
              <Clock />
              <span>
                {daysLeftUntilEventStarts > 0
                  ? 'Starting in ' + daysLeftUntilEventStarts + ' days'
                  : daysLeftUntilEventEnds > 0
                  ? 'Ending in ' + daysLeftUntilEventEnds + ' days'
                  : daysLeftUntilEventStarts == 0
                  ? 'Today'
                  : daysLeftUntilEventEnds == 0
                  ? 'Last day'
                  : 'Ended'}
              </span>
            </div>
            {/* Location */}
            <div>
              <Global />
              <span>{event.data.location || '-'}</span>
            </div>
            {/* Labels */}
            <p className={styles.labels}>
              {event.data.labels.map((l: any, id: any) => (
                <span key={id}>{l}</span>
              ))}
            </p>
          </div>

          {/* Body */}
          {event.data.description && (
            <div className={styles.body}>
              <h2>Description</h2>
              <p>{event.data.description}</p>
            </div>
          )}
        </div>
      </Container>
    </SwipeableDrawer>
  );
}

export default function Timeline() {
  const [drawer, setDrawer] = React.useState(false);
  const [events, setEvents] = React.useState(
    timeline.map((e: any, id: number) => {
      return {
        id: id,
        title: e.title,
        start: e.start,
        end: e.end,
        data: e.data,
      };
    })
  );
  const [eventNo, setEventNo] = React.useState(0);

  const handleDrawer = () => {
    setDrawer((open) => !open);
  };

  const handleEventNo = (n: any) => {
    setEventNo(n);
  };

  return (
    <div className={styles.wrapper}>
      <TimelineTabs
        events={events}
        handleDrawer={handleDrawer}
        handleEventNo={handleEventNo}
      />
      <InfoPanel
        drawer={drawer}
        handleDrawer={handleDrawer}
        event={events.find((e) => e.id == eventNo)}
      />
    </div>
  );
}
