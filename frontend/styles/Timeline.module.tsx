import styled from "@emotion/styled";

/* #313638, #feb14b, #e85f5c, #f3f3f3 */

// styles available: https://github.com/fullcalendar/fullcalendar/tree/main/packages/core/src/styles
export const StyledCalendar = styled.div`
  .fc {
    font-family: "Montserrat", sans-serif;
  }

  .fc .fc-button-primary {
    background-color: #e85f5c;
    border-color: #e85f5c;
  }

  .fc .fc-button-primary:hover {
    background-color: #ff6a67;
    border-color: #ff6a67;
  }

  .fc .fc-button-primary:active {
    background-color: #e85f5c;
    border-color: #e85f5c;
  }

  .fc .fc-button-primary:focus {
    box-shadow: 0 0 0 0.2rem #e85e5c92;
  }

  .fc .fc-button-primary:not(:disabled):active:focus,
  .fc-button-primary:not(:disabled).fc-button-active:focus {
    box-shadow: 0 0 0 0.2rem #ff6a67;
  }

  .fc .fc-day-today {
    background-color: #31363839;
  }
`;
