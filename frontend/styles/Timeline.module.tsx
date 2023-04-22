import styled from '@emotion/styled';
import { styled as mui_styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/* #313638, #feb14b, #e85f5c, #f3f3f3 */
// styles available: https://github.com/fullcalendar/fullcalendar/tree/main/packages/core/src/styles
export const StyledCalendar = styled.div`
  .fc {
    text-transform: capitalize;

    & .fc-button-primary {
      background-color: #e85f5c;
      border-color: #e85f5c;
      transition: all 200ms;
    }

    & .fc-button-primary:hover {
      background-color: #ff6a67;
      border-color: #ff6a67;
      transition: all 200ms;
    }

    & .fc-button-primary:active {
      background-color: #e85f5c;
      border-color: #e85f5c;
    }

    & .fc-button-primary:focus {
      box-shadow: 0 0 0 0.2rem #e85e5c92;
      transition: all 200ms;
    }

    & .fc-button-primary:not(:disabled):active:focus,
    .fc-button-primary:not(:disabled).fc-button-active:focus {
      box-shadow: 0 0 0 0.2rem #ff6a67;
      transition: all 200ms;
    }

    & .fc-day-today {
      background-color: #31363839;
    }

    & .fc-event {
      cursor: pointer;
      user-select: none;
      transition: all 200ms;

      color: black;
    }

    & .fc-event:hover {
      color: #feb14b;
      background-color: #404040;
    }

    & .fc-daygrid-event-dot {
      border: calc(var(--fc-daygrid-event-dot-width) / 2) solid #feb14b;
      border-radius: calc(var(--fc-daygrid-event-dot-width) / 2);
      transition: all 200ms;
    }
  }

  .fc-h-event {
    display: block;
    /* border: 1px solid var(--fc-event-border-color); */
    border: 1px solid #efefef;
    background-color: #efefef;
    transition: 200ms;
    overflow: hidden;

    & .fc-event-main {
      /* color: #d18c32; */
      color: #404040;
      transition: all 200ms;
    }

    & .fc-event-main:hover {
      color: #feb14b;
      background-color: #404040;
    }
  }
`;

// docs: https://mui.com/material-ui/react-tabs/
interface StyledTabProps {
  label: string;
  icon: string | React.ReactElement;
  iconPosition?: 'top' | 'bottom' | 'start' | 'end';
}

const tabHeight = 34; // default: '48px'
const tabBorderRadius = 5;
const tabIndicatorTopPadding = 34;
const tabIndicatorBottomMargin = 13;

export const StyledTabs = mui_styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',

  '& .MuiTabs-indicator': {
    zIndex: '0',
    backgroundColor: '#404040',
    paddingTop: tabIndicatorTopPadding,
    marginBottom: tabIndicatorBottomMargin,
    borderRadius: tabBorderRadius,
  },
});

export const StyledTab = mui_styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  zIndex: '1',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '15px',
  fontWeight: theme.typography.fontWeightMedium,
  // color: "#FEB14B",
  color: '#313638',
  borderRadius: tabBorderRadius,

  marginRight: theme.spacing(1),
  paddingRight: 10,
  paddingLeft: 10,

  minWidth: 0,
  minHeight: tabHeight,
  height: tabHeight,
  transition: '200ms',

  '&:hover': {
    color: '#FEB14B',
    // backgroundColor: "#40404088",
  },

  '&.Mui-selected': {
    color: '#FEB14B',
    backgroundColor: 'transparent',
  },

  '&& > svg': {
    marginRight: 3,
    [theme.breakpoints.down('xs')]: {
      marginRight: 1,
    },
  },
}));
