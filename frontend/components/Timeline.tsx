// Imports
import * as React from "react";
import { Container, Box, SwipeableDrawer } from "@mui/material";
import {
  TextalignJustifycenter,
  Grid2,
  Link2,
  Calendar,
  Clock,
  Global,
} from "iconsax-react";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { differenceInDays } from "date-fns";

// FullCalendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

// Custom imports
import { timeline } from "../data/timeline";
import styles from "../styles/Timeline.module.css";
import {
  StyledCalendar,
  StyledTabs,
  StyledTab,
} from "../styles/Timeline.module";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TimelineTabs({ events, handleDrawer, handleEventNo }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        <TimelineList />
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

function TimelineList() {
  return (
    <div>
      <p>Timeline stuff</p>
      <p>Check montserrat</p>
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
        eventColor="#313638"
        eventTextColor="#feb14b"
        titleFormat={{ year: "numeric", month: "short" }}
        buttonText={{ today: "TODAY" }}
        eventClick={(e) => {
          handleEventNo(parseInt(e.event.id));
          handleDrawer();
        }}
        events={events}
      />
    </StyledCalendar>
  );
}

function InfoPanel({ drawer, handleDrawer, events, eventNo }: any) {
  const eventDateStart = new Date(events[eventNo].start);
  const eventDateEnd = new Date(events[eventNo].end);
  const daysLeftUntilEventStarts = differenceInDays(eventDateStart, new Date());
  const daysLeftUntilEventEnds = differenceInDays(eventDateEnd, new Date());

  const startDate = eventDateStart.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const endDate = eventDateEnd.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handleBackgroundScroll = () => {
    document.head.style.overflowY == "scroll"
      ? (document.head.style.overflowY = "hidden")
      : (document.head.style.overflowY = "scroll");
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
      <Container maxWidth="sm" className={styles.container}>
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
              src={events[eventNo].data.photo.src || "WIT-banner.png"}
              alt={events[eventNo].data.photo.alt || "wit-banner"}
            />
          </div>
          {/* Heading */}
          <div className={styles.heading || "Event Title"}>
            <h1>{events[eventNo].title}</h1>
          </div>
          {/* Subheading */}
          <div className={styles.subheading}>
            {/* Link */}
            <div>
              <Link2 style={{ rotate: "135deg" }} />
              {events[eventNo].data.link ? (
                <a href={events[eventNo].data.link}>
                  {events[eventNo].data.link}
                </a>
              ) : (
                "-"
              )}
            </div>
            {/* Start startDate */}
            <div>
              <Calendar />
              {/* <span>{startDate + " - " + endDate || "-"}</span> */}
              <span>{startDate || "-"}</span>
            </div>
            {/* Days left until event starts */}
            <div>
              <Clock />
              <span>
                {daysLeftUntilEventStarts > 0
                  ? "Starting in " + daysLeftUntilEventStarts + " days"
                  : daysLeftUntilEventEnds > 0
                  ? "Ending in " + daysLeftUntilEventEnds + " days"
                  : daysLeftUntilEventStarts == 0
                  ? "Today"
                  : daysLeftUntilEventEnds == 0
                  ? "Last day"
                  : "Ended"}
              </span>
            </div>
            {/* Location */}
            <div>
              <Global />
              <span>{events[eventNo].data.location || "-"}</span>
            </div>
            {/* Labels */}
            <div className={styles.labels}>
              {events[eventNo].data.labels.map((l: any, id: any) => (
                <span key={id}>{l}</span>
              ))}
            </div>
          </div>
          {/* Body */}
          {events[eventNo].data.description && (
            <div className={styles.body}>
              <h2>Description</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {events[eventNo].data.description}
              </p>
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
      {/* <div> */}
      <TimelineTabs
        events={events}
        handleDrawer={handleDrawer}
        handleEventNo={handleEventNo}
      />
      <InfoPanel
        drawer={drawer}
        handleDrawer={handleDrawer}
        events={events}
        eventNo={eventNo}
      />
    </div>
  );
}
