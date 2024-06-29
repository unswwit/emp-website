export type TimelineEvent = {
  title: string;
  start: string;
  end: string;
  data: {
    link: string;
    location: string;
    labels: string[];
    description: string;
    photo: {
      src: string;
      alt: string;
    };
  };
};

export type TimelineInfo = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  data: {
    link: string;
    location: string;
    labels: string[];
    description: string;
    photo: {
      src: string;
      alt: string;
    };
  };
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type EventsInput = {
  events: TimelineInfo[];
  handleDrawer: handleDrawerFunction;
  handleEventNo: handleEventNoFunction;
};

export type EventInput = {
  event: TimelineInfo;
  handleDrawer: handleDrawerFunction;
  handleEventNo: handleEventNoFunction;
};

export type InfoPanelInput = {
  event: TimelineInfo;
  drawer: boolean;
  handleDrawer: handleDrawerFunction;
};

type handleDrawerFunction = () => void;

type handleEventNoFunction = (input: number) => void;
